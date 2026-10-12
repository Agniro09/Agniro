import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Inbox, LogOut, Mail, Phone, RefreshCw, Search } from "lucide-react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const statusOptions = ["new", "reviewed", "contacted", "closed"];
const statusStyles = {
  new: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  reviewed: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  contacted: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  closed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

const formatDate = (date) => new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date(date));

const requestInquiries = async (status = "", search = "") => {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  const query = params.toString();
  const response = await fetch(`/api/admin/inquiries${query ? `?${query}` : ""}`, {
    credentials: "include",
  });
  const result = await response.json();

  if (response.status === 401) {
    const error = new Error("Your admin session has expired. Please sign in again.");
    error.status = 401;
    throw error;
  }
  if (!response.ok) throw new Error(result.message || "Could not load inquiries.");
  return result.inquiries;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin } = useOutletContext();
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const loadInquiries = useCallback(async (status = "", search = "") => {
    setLoading(true);
    setError("");
    try {
      const loadedInquiries = await requestInquiries(status, search);
      setInquiries(loadedInquiries);
    } catch (loadError) {
      if (loadError.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(loadError.message || "Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let active = true;
    requestInquiries()
      .then((loadedInquiries) => {
        if (active) setInquiries(loadedInquiries);
      })
      .catch((loadError) => {
        if (!active) return;
        if (loadError.status === 401) {
          navigate("/admin/login", { replace: true });
          return;
        }
        setError(loadError.message || "Could not reach the server.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const counts = useMemo(() => ({
    total: inquiries.length,
    new: inquiries.filter(({ status }) => status === "new").length,
    contacted: inquiries.filter(({ status }) => status === "contacted").length,
  }), [inquiries]);

  const changeStatus = async (id, status) => {
    setUpdatingId(id);
    setError("");
    try {
      const response = await fetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!response.ok) throw new Error(result.message || "Could not update inquiry status.");
      setInquiries((current) => current.map((inquiry) => (
        inquiry._id === id ? { ...inquiry, status: result.inquiry.status } : inquiry
      )));
    } catch (updateError) {
      setError(updateError.message || "Could not update inquiry status.");
    } finally {
      setUpdatingId("");
    }
  };

  const logout = async () => {
    setLoggingOut(true);
    setError("");
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not sign out.");
      navigate("/admin/login", { replace: true });
    } catch (logoutError) {
      setError(logoutError.message || "Could not sign out.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-8 font-sans text-[#F7F0E5] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-[#29272A] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFAD33]">Agniro // admin</p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Project inquiries</h1>
            <p className="mt-2 text-sm text-[#A6A3A5]">Signed in as {admin?.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#29272A] px-4 text-sm transition hover:border-[#FF6B00]/60 hover:text-[#FFAD33]" to="/admin/projects">
              Manage projects
            </Link>
            <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#29272A] px-4 text-sm transition hover:border-[#FF6B00]/60 hover:text-[#FFAD33]" disabled={loggingOut} onClick={logout} type="button">
              <LogOut aria-hidden="true" className="h-4 w-4" /> {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </header>

        <section aria-label="Inquiry summary" className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Matching inquiries", counts.total],
            ["New requests", counts.new],
            ["Contacted", counts.contacted],
          ].map(([title, value]) => (
              <div className="rounded-xl border border-[#29272A] bg-[#121216] p-5" key={title}>
                <p className="text-sm text-[#A6A3A5]">{title}</p>
                <p className="mt-2 font-display text-3xl font-bold">{value}</p>
              </div>
          ))}
        </section>

        <section className="mt-7 rounded-xl border border-[#29272A] bg-[#121216] p-4 sm:p-5">
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); const term = searchInput.trim(); setSearchTerm(term); loadInquiries(statusFilter, term); }}>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search inquiries</span>
              <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777277]" />
              <input className="min-h-11 w-full rounded-lg border border-[#29272A] bg-[#0D0D0F] pl-10 pr-3 text-sm outline-none placeholder:text-[#777277] focus:border-[#FF6B00]/70" onChange={(event) => setSearchInput(event.target.value)} placeholder="Search name, email, company…" value={searchInput} />
            </label>
            <label>
              <span className="sr-only">Filter by status</span>
              <select className="min-h-11 w-full rounded-lg border border-[#29272A] bg-[#0D0D0F] px-3 text-sm text-[#F7F0E5] outline-none focus:border-[#FF6B00]/70 sm:w-44" onChange={(event) => { const status = event.target.value; setStatusFilter(status); loadInquiries(status, searchTerm); }} value={statusFilter}>
                <option value="">All statuses</option>
                {statusOptions.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}
              </select>
            </label>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1B1A1D] px-4 text-sm transition hover:bg-[#252328]" type="submit">Search</button>
            <button aria-label="Refresh inquiries" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#29272A] px-4 text-sm transition hover:border-[#FF6B00]/60" disabled={loading} onClick={() => loadInquiries(statusFilter, searchTerm)} type="button">
              <RefreshCw aria-hidden="true" className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="sm:hidden">Refresh</span>
            </button>
          </form>
        </section>

        {error && <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300" role="alert">{error}</p>}

        <section aria-label="Inquiry list" className="mt-5 space-y-3">
          {loading && inquiries.length === 0 ? (
            <p className="rounded-xl border border-[#29272A] bg-[#121216] p-8 text-center text-sm text-[#A6A3A5]">Loading inquiries…</p>
          ) : inquiries.length === 0 ? (
            <div className="rounded-xl border border-[#29272A] bg-[#121216] px-5 py-14 text-center">
              <Inbox aria-hidden="true" className="mx-auto h-8 w-8 text-[#777277]" />
              <h2 className="mt-4 font-display text-lg font-semibold">No inquiries found</h2>
              <p className="mt-1 text-sm text-[#A6A3A5]">New contact requests will appear here.</p>
            </div>
          ) : inquiries.map((inquiry) => (
            <article className="rounded-xl border border-[#29272A] bg-[#121216] p-4 sm:p-5" key={inquiry._id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold">{inquiry.name}</h2>
                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${statusStyles[inquiry.status]}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="mt-1 break-all text-sm text-[#A6A3A5]">{inquiry.company || "Individual"} · {inquiry.projectType.replaceAll("_", " ")}</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-[#A6A3A5]">
                  <span className="sr-only">Update inquiry status</span>
                  <select className="min-h-9 rounded-md border border-[#29272A] bg-[#0D0D0F] px-2 text-xs text-[#F7F0E5] disabled:opacity-60" disabled={updatingId === inquiry._id} onChange={(event) => changeStatus(inquiry._id, event.target.value)} value={inquiry.status}>
                    {statusOptions.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}
                  </select>
                </label>
              </div>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-[#D5D1D3]">{inquiry.description}</p>
              <div className="mt-5 flex flex-col gap-3 border-t border-[#29272A] pt-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <a className="inline-flex min-w-0 items-center gap-2 break-all text-[#FFAD33] hover:text-[#FFEBC7]" href={`mailto:${inquiry.email}`}>
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" /> {inquiry.email} <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                </a>
                {inquiry.phone && <a className="inline-flex items-center gap-2 text-[#D5D1D3] hover:text-[#FFAD33]" href={`tel:${inquiry.phone}`}>
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0" /> {inquiry.phone}
                </a>}
                {inquiry.budget && <span className="text-xs text-[#A6A3A5]">Budget: {inquiry.budget.replaceAll("_", " ")}</span>}
                <time className="text-xs text-[#777277]" dateTime={inquiry.createdAt}>{formatDate(inquiry.createdAt)}</time>
              </div>
            </article>
          ))}
          {inquiries.length === 200 && <p className="pb-3 text-center text-xs text-[#777277]">Showing the latest 200 inquiries. Refine your search to find older requests.</p>}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;

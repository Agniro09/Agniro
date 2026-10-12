import { useState } from "react";
import { ArrowRight, KeyRound, LoaderCircle, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to sign in.");
      }

      navigate("/admin", { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Unable to reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-5 py-12 font-sans text-[#F7F0E5]">
      <div aria-hidden="true" className="contact-grid pointer-events-none absolute inset-0 opacity-20" />
      <div aria-hidden="true" className="pointer-events-none absolute h-96 w-96 rounded-full bg-[#FF6B00]/10 blur-[120px]" />
      <section className="relative w-full max-w-md rounded-2xl border border-[#29272A] bg-[#121216] p-6 shadow-2xl sm:p-9">
        <Link aria-label="Agniro home" className="inline-flex" to="/">
          <img alt="Agniro" className="h-9 w-[110px] object-contain" src="/agniro-logo.svg" />
        </Link>
        <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FFAD33]">
          <LockKeyhole aria-hidden="true" className="h-5 w-5" />
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFAD33]">Secure access</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Admin sign in</h1>
        <p className="mt-2 text-sm leading-6 text-[#A6A3A5]">Sign in to review project inquiries and contact prospective clients.</p>

        <form className="mt-8 space-y-5" onSubmit={submitLogin}>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A6A3A5]" htmlFor="admin-email">
            Email address
            <input autoComplete="username" className="mt-2 min-h-12 w-full rounded-lg border border-[#29272A] bg-[#0D0D0F] px-4 text-sm text-[#F7F0E5] outline-none focus:border-[#FF6B00]/70 focus:ring-2 focus:ring-[#FF6B00]/15" id="admin-email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A6A3A5]" htmlFor="admin-password">
            Password
            <input autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-lg border border-[#29272A] bg-[#0D0D0F] px-4 text-sm text-[#F7F0E5] outline-none focus:border-[#FF6B00]/70 focus:ring-2 focus:ring-[#FF6B00]/15" id="admin-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
          </label>
          {error && <p className="text-sm text-rose-400" role="alert">{error}</p>}
          <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FFAD33] to-[#FF6B00] px-4 font-semibold text-[#17100A] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70" disabled={submitting} type="submit">
            {submitting ? <><LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> Signing in</> : <>Sign in <ArrowRight aria-hidden="true" className="h-4 w-4" /></>}
          </button>
        </form>
        <div className="mt-7 flex items-center gap-2 border-t border-[#29272A] pt-5 text-xs text-[#777277]">
          <KeyRound aria-hidden="true" className="h-3.5 w-3.5" />
          This area is restricted to authorized administrators.
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;

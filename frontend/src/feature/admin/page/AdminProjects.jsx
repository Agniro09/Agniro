import { useCallback, useState } from "react";
import { ArrowLeft, ExternalLink, ImagePlus, Trash2 } from "lucide-react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import useProjects from "../../projects/hook/useProjects.js";

const emptyProject = {
  title: "",
  category: "",
  tagline: "",
  description: "",
  imageUrl: "",
  projectUrl: "",
};

const fields = [
  { name: "title", label: "Project name", placeholder: "RehabZ", required: true },
  { name: "category", label: "Category", placeholder: "Flagship product", required: true },
  { name: "tagline", label: "Short headline", placeholder: "A connected digital platform for modern physiotherapy.", required: true },
  { name: "imageUrl", label: "Preview image URL (HTTPS)", placeholder: "https://example.com/project-preview.png", required: true, type: "url" },
  { name: "projectUrl", label: "Live project URL (optional)", placeholder: "https://example.com", type: "url" },
];

const AdminProjects = () => {
  const navigate = useNavigate();
  const { admin } = useOutletContext();
  const handleUnauthorized = useCallback(
    () => navigate("/admin/login", { replace: true }),
    [navigate],
  );
  const {
    projects,
    loading,
    error,
    saving,
    removingId,
    createProject,
    removeProject,
  } = useProjects({
    admin: true,
    onUnauthorized: handleUnauthorized,
  });
  const [form, setForm] = useState(emptyProject);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitProject = async (event) => {
    event.preventDefault();
    const created = await createProject(form);
    if (created) setForm(emptyProject);
  };

  const confirmRemoval = async (project) => {
    if (!window.confirm(`Remove "${project.title}" from the public projects section?`)) return;
    await removeProject(project._id);
  };

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-8 font-sans text-[#F7F0E5] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-[#29272A] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link className="inline-flex items-center gap-2 text-sm text-[#9B9BA3] transition hover:text-[#FFAD33]" to="/admin">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to inquiries
            </Link>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFAD33]">Agniro // admin</p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Manage projects</h1>
            <p className="mt-2 text-sm text-[#A6A3A5]">Signed in as {admin?.email}. Projects added here appear in the public Work section.</p>
          </div>
          <Link className="inline-flex min-h-10 items-center justify-center self-start rounded-lg border border-[#29272A] px-4 text-sm transition hover:border-[#FF6B00]/60 hover:text-[#FFAD33] sm:self-auto" to="/#work">
            View public section
          </Link>
        </header>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section className="rounded-xl border border-[#29272A] bg-[#121216] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/10 text-[#FFAD33]">
                <ImagePlus aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold">Add a project</h2>
                <p className="mt-1 text-xs text-[#9B9BA3]">Use publicly accessible HTTPS URLs for images and links.</p>
              </div>
            </div>

            {error && <p className="mt-5 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300" role="alert">{error}</p>}

            <form className="mt-5 space-y-4" onSubmit={submitProject}>
              {fields.map((field) => (
                <label className="block" key={field.name}>
                  <span className="mb-1.5 block text-xs font-medium text-[#D5D1D3]">{field.label}</span>
                  <input
                    autoComplete="off"
                    className="min-h-11 w-full rounded-lg border border-[#29272A] bg-[#0D0D0F] px-3 text-sm outline-none placeholder:text-[#777277] focus:border-[#FF6B00]/70"
                    maxLength={field.name === "title" ? 100 : field.name === "category" ? 60 : field.name === "tagline" ? 180 : 2048}
                    minLength={field.name === "title" || field.name === "category" ? 2 : field.name === "tagline" ? 4 : undefined}
                    name={field.name}
                    onChange={updateField}
                    placeholder={field.placeholder}
                    pattern={field.type === "url" ? "https://.+" : undefined}
                    required={field.required}
                    type={field.type || "text"}
                    value={form[field.name]}
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#D5D1D3]">Description</span>
                <textarea
                  className="min-h-28 w-full resize-y rounded-lg border border-[#29272A] bg-[#0D0D0F] px-3 py-3 text-sm leading-6 outline-none placeholder:text-[#777277] focus:border-[#FF6B00]/70"
                  maxLength={2000}
                  minLength={10}
                  name="description"
                  onChange={updateField}
                  placeholder="Describe the project and what makes it useful."
                  required
                  value={form.description}
                />
              </label>
              {form.imageUrl && (
                <div className="overflow-hidden rounded-lg border border-[#29272A] bg-[#0a0a0d] p-2">
                  <img
                    alt="Project preview"
                    className="max-h-48 w-full rounded object-contain"
                    key={form.imageUrl}
                    onError={(event) => { event.currentTarget.hidden = true; }}
                    src={form.imageUrl}
                  />
                </div>
              )}
              <button
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#ED1F00] px-4 text-sm font-semibold text-[#100a04] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={saving}
                type="submit"
              >
                {saving ? "Adding project…" : "Add to selected work"}
              </button>
            </form>
          </section>

          <section aria-label="Project list">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFAD33]">Portfolio</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">Published projects</h2>
              </div>
              <span className="rounded-full border border-[#29272A] px-3 py-1 font-mono text-xs text-[#9B9BA3]">{projects.length} total</span>
            </div>

            {loading ? (
              <p className="rounded-xl border border-[#29272A] bg-[#121216] p-8 text-center text-sm text-[#A6A3A5]">Loading projects…</p>
            ) : projects.length === 0 ? (
              <div className="rounded-xl border border-[#29272A] bg-[#121216] px-5 py-12 text-center">
                <p className="font-display text-lg font-semibold">No projects yet</p>
                <p className="mt-2 text-sm text-[#9B9BA3]">Add a project using the form and it will show up on the website.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <article className="flex flex-col gap-4 rounded-xl border border-[#29272A] bg-[#121216] p-4 sm:flex-row sm:items-center" key={project._id}>
                    <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg border border-[#25252A] bg-[#0a0a0d] sm:w-32">
                      <img alt="" className="h-full w-full object-cover" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} src={project.imageUrl} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-[#FF6B00]">{String(index + 1).padStart(2, "0")}</span>
                        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                      </div>
                      <p className="mt-1 text-xs uppercase tracking-wider text-[#9B9BA3]">{project.category}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-[#A6A3A5]">{project.tagline}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                      {project.projectUrl && (
                        <a aria-label={`Open ${project.title} website`} className="rounded-lg border border-[#29272A] p-2 text-[#9B9BA3] transition hover:text-[#FFAD33]" href={project.projectUrl} rel="noreferrer" target="_blank">
                          <ExternalLink aria-hidden="true" className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        aria-label={`Remove ${project.title}`}
                        className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-rose-400/20 px-3 text-xs text-rose-300 transition hover:bg-rose-400/10 disabled:opacity-50"
                        disabled={removingId === project._id}
                        onClick={() => confirmRemoval(project)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                        {removingId === project._id ? "Removing…" : "Remove"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminProjects;

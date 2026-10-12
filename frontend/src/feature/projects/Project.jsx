import { useState } from "react";
import { ArrowRight, ExternalLink, RefreshCw } from "lucide-react";
import useProjects from "./hook/useProjects.js";

const Project = () => {
  const { projects, loading, error, loadProjects } = useProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[Math.min(activeIndex, projects.length - 1)];

  return (
    <section
      aria-labelledby="selected-work-title"
      className="relative overflow-hidden bg-[#080808] px-4 py-20 font-sans text-[#F7F0E5] sm:px-8 md:py-28 lg:px-12"
      id="work"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,107,0,0.07)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#16161a_1px,transparent_1px),linear-gradient(to_bottom,#16161a_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_65%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-7 border-b border-[#25252A] pb-8 md:mb-14 md:flex-row md:items-end md:justify-between md:pb-10">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF6B00] sm:text-xs">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#FF6B00]" />
              <span>Selected work</span>
            </div>
            <h2 id="selected-work-title" className="font-display text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Built with purpose.
              <span className="agniro-gradient-text block">More on the way.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9B9BA3] sm:text-base">
              A look at what we&apos;re building today, with more digital products coming soon.
            </p>
          </div>

          {projects.length > 0 && (
            <div aria-label="Choose a project" className="flex max-w-full gap-1.5 overflow-x-auto rounded-xl border border-[#25252A] bg-[#121216] p-1.5">
              {projects.map((project, index) => (
                <button
                  aria-pressed={activeIndex === index}
                  className={`shrink-0 rounded-lg px-3 py-2 font-mono text-[10px] transition sm:text-xs ${
                    activeIndex === index
                      ? "bg-[#1d1d24] font-semibold text-[#FF6B00]"
                      : "text-[#9B9BA3] hover:text-[#F7F0E5]"
                  }`}
                  key={project._id}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")} {project.title}
                </button>
              ))}
            </div>
          )}
        </header>

        {error && (
          <div className="rounded-2xl border border-rose-400/20 bg-[#121216] px-5 py-10 text-center">
            <p className="text-sm text-rose-300" role="alert">{error}</p>
            <button
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#29272A] px-4 py-2 text-sm text-[#F7F0E5] transition hover:border-[#FF6B00]/60"
              onClick={loadProjects}
              type="button"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
            </button>
          </div>
        )}

        {!error && loading && (
          <div aria-live="polite" className="rounded-2xl border border-[#25252A] bg-[#121216] px-5 py-16 text-center text-sm text-[#9B9BA3]">
            Loading selected work…
          </div>
        )}

        {!error && !loading && !activeProject && (
          <div className="rounded-2xl border border-[#25252A] bg-[#121216] px-5 py-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFAD33]">In the works</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">Our first project is on its way.</h3>
            <p className="mt-2 text-sm text-[#9B9BA3]">New work will appear here as soon as it&apos;s ready to share.</p>
          </div>
        )}

        {activeProject && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <aside className="hidden rounded-2xl border border-[#25252A] bg-[#121216]/90 p-5 lg:sticky lg:top-28 lg:col-span-3 lg:block">
              <div className="mb-6 flex items-center justify-between border-b border-[#25252A] pb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9B9BA3]">Stage</span>
                <span className="font-mono text-xs font-bold text-[#FF6B00]">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <nav aria-label="Selected projects" className="space-y-4">
                {projects.map((project, index) => (
                  <button
                    aria-current={activeIndex === index ? "step" : undefined}
                    className="group flex w-full items-start gap-3 text-left"
                    key={project._id}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    <span className={`mt-0.5 h-3 w-3 shrink-0 rounded-full border-2 transition ${
                      activeIndex === index ? "border-[#FF6B00] bg-[#FF6B00] shadow-[0_0_12px_#FF6B00]" : "border-[#34343A] group-hover:border-[#9B9BA3]"
                    }`} />
                    <span className="min-w-0">
                      <span className={`block truncate font-mono text-[10px] font-bold uppercase ${activeIndex === index ? "text-[#FF6B00]" : "text-[#9B9BA3]"}`}>
                        {String(index + 1).padStart(2, "0")}. {project.title}
                      </span>
                      <span className="mt-1 block truncate text-[11px] text-[#777277]">{project.category}</span>
                    </span>
                  </button>
                ))}
              </nav>
              <div className="mt-7 border-t border-[#25252A] pt-5">
                <div className="mb-2 flex justify-between font-mono text-[9px] uppercase text-[#777277]">
                  <span>Showcase</span><span>{Math.round(((activeIndex + 1) / projects.length) * 100)}%</span>
                </div>
                <div className="h-1 rounded-full bg-[#25252A]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFAD33] transition-all" style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} />
                </div>
              </div>
            </aside>

            <article className="relative overflow-hidden rounded-[24px] border border-[#FF6B00]/30 bg-[#121216] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)] sm:p-8 lg:col-span-9 lg:p-9">
              <span aria-hidden="true" className="pointer-events-none absolute -right-3 -bottom-10 select-none font-mono text-[160px] leading-none text-white/[0.025] sm:text-[220px]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10 grid items-center gap-8 xl:grid-cols-2">
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-[#FFAD33]">
                      {activeProject.category}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{activeProject.title}</h3>
                    <p className="mt-3 text-base font-medium leading-snug text-[#FFAD33] sm:text-lg">{activeProject.tagline}</p>
                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-[#9B9BA3]">{activeProject.description}</p>
                  </div>
                  {activeProject.projectUrl && (
                    <a
                      className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#ED1F00] px-5 py-3 text-sm font-semibold text-[#100a04] shadow-[0_4px_24px_rgba(255,107,0,0.3)] transition hover:brightness-110"
                      href={activeProject.projectUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Explore {activeProject.title}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-[#25252A] bg-[#0a0a0d] p-3 sm:min-h-80">
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-[#00A896]/10 via-transparent to-[#FF6B00]/10" />
                  <div aria-hidden="true" className="absolute h-48 w-48 rounded-full bg-[#FF6B00]/10 blur-3xl" />
                  <img
                    alt={`${activeProject.title} project preview`}
                    className="relative z-10 max-h-[440px] w-full rounded-xl object-contain"
                    key={activeProject._id}
                    loading="lazy"
                    onError={(event) => { event.currentTarget.hidden = true; }}
                    src={activeProject.imageUrl}
                  />
                  <span aria-hidden="true" className="absolute z-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#777277]">Project preview</span>
                  {activeProject.projectUrl && (
                    <a
                      aria-label={`Open ${activeProject.title} website`}
                      className="absolute bottom-3 right-3 z-20 rounded-lg border border-white/10 bg-[#080808]/80 p-2 text-[#FFAD33] transition hover:bg-[#080808]"
                      href={activeProject.projectUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
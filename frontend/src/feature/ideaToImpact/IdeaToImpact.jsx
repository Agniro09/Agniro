const phases = [
  {
    number: "01",
    title: "Understand",
    description: "Define the problem, users, goals, and requirements.",
    color: "border-[#FFEBC7]/40 bg-[#FFEBC7]",
    hoverBorder: "group-hover:border-[#FFEBC7]/30",
    hoverText: "group-hover:text-[#FFEBC7]",
  },
  {
    number: "02",
    title: "Design",
    description: "Shape the experience, architecture, and product direction.",
    color: "border-[#FFAD33]/60 bg-[#FFAD33]",
    hoverBorder: "group-hover:border-[#FFAD33]/40",
    hoverText: "group-hover:text-[#FFAD33]",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop, integrate, test, and refine the product.",
    color: "border-[#FF6B00]/80 bg-[#FF6B00]",
    hoverBorder: "group-hover:border-[#FF6B00]/50",
    hoverText: "group-hover:text-[#FF6B00]",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deploy the product and make it ready for real users.",
    color: "border-[#FF6B00] bg-[#FF6B00]",
    hoverBorder: "group-hover:border-[#FF6B00]/60",
    hoverText: "group-hover:text-[#FFAD33]",
  },
  {
    number: "05",
    title: "Scale",
    description: "Measure, improve, and evolve as the business grows.",
    color: "border-[#ED1F00] bg-[#ED1F00]",
    hoverBorder: "group-hover:border-[#ED1F00]",
    hoverText: "group-hover:text-[#FFAD33]",
    terminal: true,
  },
];

const IdeaToImpact = () => (
  <section
    aria-labelledby="idea-to-impact-heading"
    className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#080808] py-16 text-neutral-300 md:py-24"
    id="section-how-we-work"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_60%,rgba(255,107,0,0.06),transparent_75%)]"
    />

    <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
      <div className="mb-12 flex items-center justify-between border-b border-white/[0.08] pb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
          <span>SEC.06 // HOW WE WORK</span>
        </div>
        <span className="hidden text-right sm:block">PIPELINE // EXECUTION ENGINE</span>
      </div>

      <div className="mb-14 max-w-3xl md:mb-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-neutral-900/60 px-3 py-1 backdrop-blur-sm">
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 sm:text-xs">
            How we work
          </span>
        </div>
        <h2
          className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          id="idea-to-impact-heading"
        >
          From idea to impact<span className="text-[#FF6B00]">.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
          A clear, collaborative process that turns complex ideas into reliable digital products.
        </p>
      </div>

      <div className="relative my-8 w-full pb-4">
        <div aria-hidden="true" className="pointer-events-none absolute top-[128px] left-0 z-0 hidden h-16 w-full lg:block">
          <svg
            className="h-full w-full overflow-visible"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1200 64"
          >
            <defs>
              <linearGradient id="idea-impact-wave" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#FFEBC7" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#FFAD33" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#FF6B00" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ED1F00" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 60 32 C 180 10, 240 54, 360 32 C 480 10, 540 54, 660 32 C 780 10, 840 54, 960 32 C 1040 16, 1100 24, 1140 32"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <path
              className="idea-impact-wave"
              d="M 60 32 C 180 10, 240 54, 360 32 C 480 10, 540 54, 660 32 C 780 10, 840 54, 960 32 C 1040 16, 1100 24, 1140 32"
              stroke="url(#idea-impact-wave)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {phases.map((phase) => (
            <article className="group flex cursor-default flex-col" key={phase.number}>
              <div className="relative mb-4 flex h-28 items-end">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-0 select-none font-mono text-6xl leading-none font-bold tracking-tighter text-white/[0.04] transition duration-300 group-hover:-translate-y-1 group-hover:text-[#FF6B00]/[0.18] md:text-7xl"
                >
                  {phase.number}
                </span>
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#080808] shadow-lg shadow-black/80 transition duration-300 group-hover:scale-110 group-hover:border-[#FF6B00] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.6)] ${phase.color} ${phase.terminal ? "shadow-[0_0_35px_8px_rgba(237,31,0,0.28),0_0_70px_20px_rgba(255,107,0,0.12)]" : ""}`}
                >
                  {phase.terminal && (
                    <span aria-hidden="true" className="absolute h-3 w-3 animate-ping rounded-full bg-[#ED1F00] opacity-40" />
                  )}
                  <span aria-hidden="true" className={`relative z-10 h-2.5 w-2.5 rounded-full ${phase.color.split(" ").at(-1)}`} />
                  <span
                    className={`absolute -top-7 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest transition-opacity group-hover:opacity-100 sm:text-[10px] ${
                      phase.terminal ? "font-semibold text-[#FFAD33]" : "text-neutral-400 opacity-75"
                    }`}
                  >
                    {phase.terminal ? "Terminal // Scale" : `Phase // ${phase.number}`}
                  </span>
                </div>
              </div>

              <div className={`border-t border-white/[0.06] pt-3 transition-colors ${phase.hoverBorder}`}>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className={`font-display text-xl font-bold tracking-tight text-white uppercase transition-colors md:text-2xl ${phase.hoverText}`}>
                    {phase.title}
                  </h3>
                  {phase.terminal && (
                    <span className="rounded border border-[#ED1F00]/30 bg-[#ED1F00]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#FFAD33]">
                      Impact
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-neutral-400">{phase.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-7 font-mono text-[10px] tracking-wider text-neutral-500 md:flex-row md:items-center sm:text-xs">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-300 sm:text-xs md:text-sm">
          CLEAR PROCESS. REAL PRODUCTS. MEASURABLE IMPACT.
        </p>
        <div className="flex items-center gap-3">
          <span>AGNIRO ENGAGEMENT PIPELINE v2.4</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#ED1F00]" />
        </div>
      </div>
    </div>

    <style>{`
      @keyframes ideaImpactWavePulse {
        0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 6px rgba(255, 107, 0, 0.35)); }
        50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(255, 107, 0, 0.7)); }
      }
      .idea-impact-wave {
        animation: ideaImpactWavePulse 4s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .idea-impact-wave {
          animation: none;
        }
      }
    `}</style>
  </section>
);

export default IdeaToImpact;

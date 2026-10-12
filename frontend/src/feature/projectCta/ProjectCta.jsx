import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ProjectCta = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const motion = gsap.matchMedia()
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('[data-cta-reveal]',
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 68%',
              toggleActions: 'play none none reverse',
            },
          },
        )

        gsap.to('[data-cta-particle]', {
          y: (index) => -24 - (index % 3) * 12,
          x: (index) => index % 2 === 0 ? 9 : -8,
          opacity: 0.25,
          duration: (index) => 3.5 + (index % 4) * 1.2,
          repeat: -1,
          yoyo: true,
          stagger: 0.3,
          ease: 'sine.inOut',
        })

        gsap.to('[data-cta-stream]', {
          strokeDashoffset: -30,
          opacity: 0.75,
          duration: 5,
          repeat: -1,
          yoyo: true,
          stagger: 0.8,
          ease: 'sine.inOut',
        })
      })
    }, sectionRef)

    return () => {
      motion.revert()
      context.revert()
    }
  }, [])

  return (
    <section
      id="project-cta"
      ref={sectionRef}
      aria-labelledby="project-cta-heading"
      className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden bg-[#080808] px-5 pb-10 pt-28 text-[#F7F0E5] sm:px-8 sm:pb-12 sm:pt-32 md:px-14 md:pb-14 lg:min-h-screen lg:px-24 lg:pb-16 lg:pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[880px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#ED1F00]/10 via-[#FF6B00]/20 to-[#FFAD33]/15 opacity-75 blur-[160px]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-8">
        <div className="h-36 w-full bg-[radial-gradient(ellipse_65%_100%_at_50%_50%,rgba(255,107,0,0.28)_0%,rgba(237,31,0,0.12)_45%,transparent_75%)] opacity-60 blur-2xl" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6B00]/90 to-transparent opacity-80" />
        <div className="-mt-px mx-auto h-1 w-3/4 bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent blur-[2px]" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          'left-[18%] top-[45%] size-1.5 bg-[#FFEBC7] shadow-[0_0_8px_#FFEBC7]',
          'left-[34%] top-[60%] size-1 bg-[#FFAD33] shadow-[0_0_6px_#FFAD33]',
          'right-[28%] top-[38%] size-1.5 bg-[#FF6B00] shadow-[0_0_10px_#FF6B00]',
          'right-[15%] top-[55%] size-1 bg-[#ED1F00] shadow-[0_0_8px_#ED1F00]',
          'left-[48%] top-[28%] size-1 bg-[#FFAD33]/80',
          'right-[42%] top-[68%] size-1.5 bg-[#FF6B00]/80',
        ].map((position, index) => (
          <span key={position} data-cta-particle className={`absolute rounded-full ${position}`} style={{ willChange: 'transform, opacity' }} />
        ))}
      </div>

      <div data-cta-reveal className="relative z-10 flex w-full items-center justify-between border-b border-[#25252A]/60 pb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[#9B9BA3] sm:text-[11px] sm:tracking-[0.2em]">
        <span className="flex items-center gap-2.5"><span className="size-1.5 animate-pulse rounded-full bg-[#FF6B00]" /><span className="text-[#F7F0E5]/90">Initiation // Phase_Alpha</span></span>
        <span className="flex items-center gap-3"><span className="hidden text-[#9B9BA3]/70 sm:inline">Radial_Beacon: 840nm</span><span className="hidden text-[#9B9BA3]/40 sm:inline">//</span><span className="text-[#F7F0E5]/90">Agniro Ventures</span></span>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center opacity-35 md:opacity-55">
        <svg className="h-full max-h-[720px] w-full max-w-7xl" fill="none" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="project-cta-stream-one" x1="0%" x2="100%" y1="50%" y2="50%"><stop offset="0%" stopColor="#FFEBC7" stopOpacity=".8" /><stop offset="40%" stopColor="#FF6B00" stopOpacity=".6" /><stop offset="100%" stopColor="#ED1F00" stopOpacity=".05" /></linearGradient>
            <linearGradient id="project-cta-stream-two" x1="0%" x2="100%" y1="50%" y2="50%"><stop offset="0%" stopColor="#FFAD33" stopOpacity=".7" /><stop offset="60%" stopColor="#ED1F00" stopOpacity=".4" /><stop offset="100%" stopColor="#FFEBC7" stopOpacity=".1" /></linearGradient>
            <radialGradient id="project-cta-ignition" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFEBC7" /><stop offset="40%" stopColor="#FF6B00" stopOpacity=".6" /><stop offset="100%" stopColor="#ED1F00" stopOpacity="0" /></radialGradient>
          </defs>
          <circle cx="210" cy="300" r="16" fill="url(#project-cta-ignition)" />
          <circle cx="210" cy="300" r="3.5" fill="#FFEBC7" />
          <circle cx="210" cy="300" r="32" stroke="#FF6B00" strokeDasharray="3 3" opacity=".4" />
          <path data-cta-stream d="M210 300 C340 300, 390 190, 560 190 S780 230, 920 220" stroke="url(#project-cta-stream-one)" strokeWidth="1.25" strokeDasharray="8 6" />
          <path data-cta-stream d="M210 300 C370 300, 440 390, 620 390 S810 330, 930 330" stroke="url(#project-cta-stream-two)" strokeWidth="1.25" strokeDasharray="8 6" />
          <path d="M210 300 C390 270, 540 260, 910 270" stroke="#FFAD33" strokeWidth=".75" opacity=".35" />
          <path d="M210 300 C360 340, 520 340, 915 310" stroke="#FF6B00" strokeWidth=".75" opacity=".3" />
          <g stroke="#25252A"><path d="M420 210v180M680 170v260M880 200v200" /></g>
          <circle cx="420" cy="245" r="2.5" fill="#FFAD33" /><circle cx="680" cy="355" r="2.5" fill="#FF6B00" /><circle cx="880" cy="225" r="2.5" fill="#ED1F00" />
          <polygon points="920,180 1060,130 1060,390 920,440" fill="#121216" fillOpacity=".35" stroke="#FFAD33" strokeWidth="1.2" />
          <polygon points="1060,130 1140,170 1140,430 1060,390" fill="#080808" fillOpacity=".6" stroke="#ED1F00" />
          <polygon points="920,180 1000,220 1140,170 1060,130" fill="#FF6B00" fillOpacity=".08" stroke="#FFEBC7" strokeWidth=".8" />
          <path d="m920 265 140-50M920 350l140-50M966 197v226m47-243v227" stroke="#25252A" strokeWidth=".75" />
          <circle cx="990" cy="310" r="4" fill="#FFEBC7" /><path d="M920 310h70" stroke="#FFEBC7" strokeDasharray="2 2" opacity=".7" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center py-14 text-center sm:py-20 lg:py-24">
        <div data-cta-reveal className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#FF6B00]/30 bg-[#121216]/80 px-3.5 py-1.5 shadow-[0_0_20px_-3px_rgba(255,107,0,0.18)] backdrop-blur-md sm:mb-10">
          <span className="size-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_#FF6B00]" />
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#FFEBC7] sm:text-[11px] sm:tracking-[0.2em]">Let’s build something</span>
        </div>
        <h2 data-cta-reveal id="project-cta-heading" className="max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[84px]">
          Have an idea<br /><span className="flame-gradient-text drop-shadow-[0_0_35px_rgba(255,107,0,0.3)]">worth building?</span>
        </h2>
        <p data-cta-reveal className="mt-5 max-w-2xl text-sm leading-relaxed text-[#9B9BA3] sm:mt-8 sm:text-lg md:text-xl">
          Tell us what you’re imagining. We’ll help turn the idea into a clear product, a practical plan, and technology that works.
        </p>
        <div data-cta-reveal className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-6">
          <a href="#contact" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-[#FFAD33] via-[#FF6B00] to-[#ED1F00] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#080808] shadow-[0_0_28px_-2px_rgba(255,107,0,0.45),0_0_10px_rgba(237,31,0,0.35)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_38px_2px_rgba(255,107,0,0.65)] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4 sm:text-base">
            Start a Project <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#25252A] bg-[#121216]/50 px-7 py-3.5 text-sm font-medium tracking-wide text-[#F7F0E5] backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:border-[#FF6B00]/80 hover:bg-[#121216]/90 hover:text-[#FFEBC7] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4 sm:text-base">
            Talk to Us <ArrowRight aria-hidden="true" size={16} className="text-[#9B9BA3] transition group-hover:translate-x-1 group-hover:text-[#FF6B00]" />
          </a>
        </div>
      </div>

      <div data-cta-reveal className="relative z-10 mt-4 flex w-full flex-col items-start justify-between gap-3 border-t border-[#25252A]/60 pt-5 sm:flex-row sm:items-center sm:gap-4 sm:pt-6">
        <p className="flex items-center gap-3 font-mono text-[10px] font-medium tracking-[0.18em] text-[#F7F0E5]/95 sm:text-xs md:text-[13px] md:tracking-[0.25em]">
          <span className="size-1.5 rounded-full bg-[#FFAD33]/80" />FROM IDEA TO IMPACT.
        </p>
        <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#9B9BA3] sm:text-[10px] sm:tracking-[0.2em]">
          AGNIRO ARCHITECTURE // CORE 07 <span className="size-1.5 rounded-full bg-[#FF6B00]" />
        </p>
      </div>
    </section>
  )
}

export default ProjectCta

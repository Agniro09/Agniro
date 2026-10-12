import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TechnologySection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const motion = gsap.matchMedia()
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })

        reveal
          .fromTo('[data-technology-badge]',
            { autoAlpha: 0, y: 22, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' },
          )
          .fromTo('[data-technology-heading]',
            { autoAlpha: 0, y: 42, filter: 'blur(10px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
            '-=0.18',
          )
          .fromTo('[data-technology-accent]',
            { scaleX: 0, transformOrigin: 'center' },
            { scaleX: 1, duration: 0.55, ease: 'power2.out' },
            '-=0.35',
          )
          .fromTo('[data-technology-copy]',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.25',
          )
      })

    }, sectionRef)

    return () => {
      motion.revert()
      context.revert()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="technology-heading"
      className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#080808] py-24 sm:py-28 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,107,0,0.08)_0%,rgba(255,173,51,0.03)_35%,rgba(8,8,8,0)_70%)]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-center opacity-25">
        <div className="flex h-full w-full max-w-[1320px] justify-between px-6">
          <span className="h-full w-px bg-gradient-to-b from-transparent via-[#25252A] to-transparent" />
          <span className="h-full w-px bg-gradient-to-b from-transparent via-[#25252A]/50 to-transparent" />
          <span className="h-full w-px bg-gradient-to-b from-transparent via-[#25252A] to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="relative mx-auto flex max-w-[920px] flex-col items-center py-8 text-center sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/[0.07] blur-[100px]" />
          <div data-technology-badge className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#25252A] bg-[#080808]/70 px-4 py-1.5 backdrop-blur-sm sm:mb-10">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#FF6B00]" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[2px] text-[#FF6B00] sm:text-xs sm:tracking-[3px]">
                Building products. Solving problems.
              </span>
          </div>

          <h2 data-technology-heading id="technology-heading" className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#F7F0E5] sm:text-5xl md:text-6xl lg:text-7xl">
            Technology built around{' '}
            <span className="text-gradient-orange">real-world needs</span>
          </h2>
          <div data-technology-accent aria-hidden="true" className="mt-7 h-px w-28 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent shadow-[0_0_18px_rgba(255,107,0,0.65)] sm:mt-8" />

          <p data-technology-copy className="mt-7 max-w-[720px] text-base font-normal leading-relaxed text-[#9B9BA3] sm:mt-8 sm:text-lg md:text-xl">
            AGNIRO develops its own products while building a passionate software company focused on diverse, scalable digital solutions.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TechnologySection

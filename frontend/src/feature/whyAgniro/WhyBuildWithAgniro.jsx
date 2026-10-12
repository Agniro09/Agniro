import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, BadgeCheck, Lightbulb, Settings2, UsersRound, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const advantages = [
  {
    title: 'Product Mindset',
    description: "We don't just write code. We think about the product, the users and the business behind it.",
    Icon: Lightbulb,
  },
  {
    title: 'Built for Real Problems',
    description: 'Every design choice and technical decision is validated against real-world client and user requirements.',
    Icon: BadgeCheck,
  },
  {
    title: 'Modern Technology',
    description: 'We use next-generation frameworks, tools and technologies for scalability, stability and long-term reliability.',
    Icon: LayersIcon,
  },
  {
    title: 'End-to-End Development',
    description: 'From blueprint to deployment, we cover the complete product journey under one roof.',
    Icon: Settings2,
  },
  {
    title: 'Long-Term Partnership',
    description: 'We believe in long-term partnerships and continue supporting our clients as they grow.',
    Icon: UsersRound,
  },
]

const WhyBuildWithAgniro = () => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const motion = gsap.matchMedia()
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-why-reveal]',
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          },
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
      id="why-agniro"
      ref={sectionRef}
      aria-labelledby="why-agniro-heading"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808] px-4 py-12 text-[#F7F0E5] sm:px-6 md:py-20 lg:px-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,107,0,0.08)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 size-96 rounded-full bg-[#FF6B00]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-10 left-1/3 size-80 rounded-full bg-[#ED1F00]/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1680px] rounded-3xl border border-[#25252A]/60 bg-[#080808]/90 p-5 shadow-2xl backdrop-blur-sm sm:p-7 md:p-10 lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 items-center gap-3 font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9B9BA3]/70 xl:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
          <span>Build</span><span className="text-[#FF6B00]">·</span><span>Solve</span><span className="text-[#FF6B00]">·</span><span>Grow</span>
          <span className="size-1.5 rounded-sm bg-[#FF6B00]" />
        </div>

        <div className="grid grid-cols-1 items-stretch gap-9 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-5 sm:space-y-6">
              <div data-why-reveal className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3.5 py-1.5 backdrop-blur-md">
                <span className="size-2 animate-pulse rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#FFAD33] sm:text-[11px]">Our unique advantage</span>
              </div>

              <h2 data-why-reveal id="why-agniro-heading" className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
                Why build <br className="hidden sm:inline" />with <span className="text-gradient-orange drop-shadow-[0_2px_18px_rgba(255,107,0,0.35)]">Agniro?</span>
              </h2>

              <p data-why-reveal className="max-w-xl text-sm leading-relaxed text-[#9B9BA3] sm:text-base lg:text-lg">
                More than just development, we bring a product mindset, real-world approach, and long-term commitment to every project.
              </p>

              <div data-why-reveal className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-3 sm:gap-3">
                <ValueBadge Icon={Lightbulb} first="Ideas to" second="Impact" />
                <ValueBadge Icon={BadgeCheck} first="Focused on" second="Real Solutions" />
                <ValueBadge Icon={Zap} first="Your Growth" second="Partner" />
              </div>
            </div>

            <div data-why-reveal className="group relative mt-1 overflow-hidden rounded-2xl border border-[#25252A]/80 bg-[#0D0D0F]">
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
                <img
                  alt="Agniro obsidian monolith with glowing magma circuit pathways"
                  className="size-full object-cover object-left-bottom transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFPe89L01cMibD5PCCN2bngxuI5TmYrWb2BjX5RW3bVnfhaTXdVW_6HrEUFogfjgYIEPwgugGbhwZxN2LzmGZJHqzRhX8MYwIM-opNcwFQS4glq5tbAzgWCUU1dENFWisRg-aFs9UE0NBh03qO9N3EZKj9-wMCTCl_yDwjtOQKXBpPFd8hLIXUn6P1mBU0KAJ2_QfWC06lUssaY6Q3ypm9wKyRr-eNstDN2Gjjbb6G-N16nTig0Ot-XWA5Y-vadWg408U"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]/70 lg:to-[#080808]/90" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded border border-[#FF6B00]/30 bg-[#080808]/80 px-2.5 py-1 backdrop-blur-md sm:bottom-4 sm:left-4">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#FFAD33] sm:text-[10px]">Core monolith // online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center lg:col-span-7">
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 top-0 z-0 hidden w-28 select-none lg:block">
              <svg className="size-full" fill="none" viewBox="0 0 110 520" preserveAspectRatio="none">
                <path d="M 45 42 C 78 130, 85 240, 72 320 C 60 390, 48 440, 42 478" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" opacity=".65" className="why-neon-spine" />
                <path d="M 45 42 C 78 130, 85 240, 72 320 C 60 390, 48 440, 42 478" stroke="#FF6B00" strokeWidth="8" strokeLinecap="round" opacity=".16" />
                {[
                  { x: 45, y: 42 }, { x: 78, y: 150 }, { x: 75, y: 260 }, { x: 62, y: 368 }, { x: 42, y: 478 },
                ].map((point, index) => (
                  <line key={point.y} x1={point.x} x2="110" y1={point.y} y2={point.y} stroke={activeIndex === index ? '#FFAD33' : '#FF6B00'} strokeWidth={activeIndex === index ? 2.5 : 2} strokeDasharray="3 3" opacity={activeIndex === index ? 1 : 0.35} className="transition-all duration-300" />
                ))}
              </svg>
            </div>

            <div className="relative z-10 space-y-3.5 sm:space-y-4 lg:pl-24">
              {advantages.map(({ title, description, Icon }, index) => {
                const isActive = activeIndex === index
                return (
                  <button
                    key={title}
                    type="button"
                    data-why-reveal
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group relative flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 hover:translate-x-1.5 hover:border-[#FF6B00]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD33] sm:gap-4 sm:p-4 lg:p-5 ${isActive ? 'border-[#FF6B00] bg-[linear-gradient(145deg,#181820_0%,#121216_100%)] shadow-[0_0_32px_-4px_rgba(255,107,0,0.32),inset_0_0_16px_rgba(255,107,0,0.08)]' : 'border-[#25252A] bg-[#121216]/90'}`}
                  >
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-display text-[10px] font-bold transition-all duration-300 sm:size-9 sm:text-xs lg:absolute lg:-left-24 lg:top-1/2 lg:-translate-y-1/2 ${isActive ? 'scale-110 border-[#FFAD33] bg-[#FF6B00] text-[#080808] shadow-[0_0_24px_rgba(255,107,0,0.7)]' : 'border-[#25252A] bg-[#121216] text-[#9B9BA3]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 sm:size-12 ${isActive ? 'border-[#FF6B00]/60 bg-[#FF6B00]/10 text-[#FFAD33]' : 'border-[#25252A] bg-[#0D0D0F] text-[#FF6B00]'}`}>
                        <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 space-y-1">
                        <span className={`block font-display text-sm font-bold tracking-wide transition-colors sm:text-base lg:text-lg ${isActive ? 'text-[#FFAD33]' : 'text-white group-hover:text-[#FFAD33]'}`}>{title}</span>
                        <span className="block text-[11px] leading-relaxed text-[#9B9BA3] sm:text-xs lg:text-sm">{description}</span>
                      </span>
                    </span>
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:size-10 ${isActive ? 'translate-x-1 border-[#FF6B00] bg-[#FF6B00] text-[#080808]' : 'border-[#25252A] text-[#9B9BA3] group-hover:border-[#FF6B00] group-hover:text-white'}`}>
                      <ArrowRight aria-hidden="true" size={15} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-neon-spine { filter: drop-shadow(0 0 8px rgba(255, 107, 0, .7)) drop-shadow(0 0 20px rgba(255, 173, 51, .4)); }
        @media (prefers-reduced-motion: reduce) { .why-neon-spine { filter: none; } }
      `}</style>
    </section>
  )
}

function ValueBadge({ Icon, first, second }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[#25252A]/70 bg-[#121216]/80 p-2.5 transition-colors duration-200 hover:border-[#FF6B00]/50">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#FF6B00]/30 bg-[#0D0D0F] text-[#FF6B00]">
        <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
      </span>
      <span className="text-[11px] font-medium leading-tight text-[#F7F0E5] sm:text-xs">{first}<br />{second}</span>
    </div>
  )
}

function LayersIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 10 6-10 6L2 9l10-6Z" />
      <path d="m2 12 10 6 10-6M2 15l10 6 10-6" />
    </svg>
  )
}

export default WhyBuildWithAgniro

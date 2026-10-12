import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Bot,
  CloudCog,
  Database,
  Globe2,
  Layers3,
  PanelsTopLeft,
  Smartphone,
  Terminal,
  X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01', title: 'Website Development', category: 'products', icon: Globe2,
    description: 'Modern, performance-focused websites built for scalability and impact.',
    pillars: ['Ultra-low latency rendering', 'Core Web Vitals 99+ score', 'Headless CMS integration', 'Adaptive responsive frameworks'],
    position: 'left-2 top-0',
  },
  {
    number: '02', title: 'Mobile App Development', category: 'products', icon: Smartphone,
    description: 'Native and cross-platform apps designed for seamless user experiences.',
    pillars: ['Swift and Kotlin native builds', 'High-FPS fluid transitions', 'Offline-first sync engine', 'Secure biometrics authentication'],
    position: 'left-0 top-[195px]',
  },
  {
    number: '03', title: 'Web Applications', category: 'products', icon: Layers3,
    description: 'Feature-rich web platforms built for performance, security, and growth.',
    pillars: ['Single-page enterprise apps', 'Real-time websocket telemetry', 'Complex role-based access', 'State-machine predictability'],
    position: 'left-0 top-[395px]',
  },
  {
    number: '04', title: 'Custom Software', category: 'engineering', icon: Terminal,
    description: 'Tailored software solutions for unique business challenges and opportunities.',
    pillars: ['Domain-driven architecture', 'Legacy modernization pipelines', 'Bespoke internal dashboards', 'Audit-grade data compliance'],
    position: 'left-2 top-[580px]',
  },
  {
    number: '05', title: 'AI & Automation', category: 'ai', icon: Bot,
    description: 'Smart, intelligent solutions to drive efficiency and innovation.',
    pillars: ['Local and cloud LLM pipelines', 'Agentic task automation', 'Vector embedding search', 'Predictive inference modeling'],
    position: 'right-2 top-0',
  },
  {
    number: '06', title: 'Backend & APIs', category: 'engineering', icon: Database,
    description: 'Robust and scalable backend systems and API integrations.',
    pillars: ['High-throughput microservices', 'GraphQL and RESTful gateways', 'Distributed caching strategies', 'Zero-trust protocol security'],
    position: 'right-0 top-[195px]',
  },
  {
    number: '07', title: 'Cloud & DevOps', category: 'engineering', icon: CloudCog,
    description: 'Automated deployment, monitoring, and cloud infrastructure for modern businesses.',
    pillars: ['Immutable infrastructure (IaC)', 'Automated CI/CD pipelines', 'Kubernetes cluster orchestration', 'Multi-region resilience'],
    position: 'right-0 top-[395px]',
  },
  {
    number: '08', title: 'UI/UX Design', category: 'products', icon: PanelsTopLeft,
    description: 'Intuitive and modern user experiences that enhance engagement.',
    pillars: ['Design systems and tokens', 'Micro-interaction prototyping', 'Cognitive usability audits', 'Accessible visual systems'],
    position: 'right-2 top-[580px]',
  },
]

const filters = [
  { id: 'all', label: 'All 8 Services' },
  { id: 'products', label: 'Digital Products' },
  { id: 'engineering', label: 'Engineering & Cloud' },
  { id: 'ai', label: 'AI & Intelligence' },
]

const conduits = [
  'M 700 380 C 580 320, 420 180, 290 95',
  'M 700 380 C 540 370, 390 320, 290 270',
  'M 700 380 C 540 390, 390 430, 290 475',
  'M 700 380 C 580 440, 420 570, 290 645',
  'M 700 380 C 820 320, 980 180, 1110 95',
  'M 700 380 C 860 370, 1010 320, 1110 270',
  'M 700 380 C 860 390, 1010 430, 1110 475',
  'M 700 380 C 820 440, 980 570, 1110 645',
]

const WhatWeBuild = () => {
  const sectionRef = useRef(null)
  const dialogRef = useRef(null)
  const openerRef = useRef(null)
  const [category, setCategory] = useState('all')
  const [selectedService, setSelectedService] = useState(null)
  const [reactorActive, setReactorActive] = useState(false)
  const visibleServices = services

  useEffect(() => {
    const motion = gsap.matchMedia()
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('[data-service-reveal]',
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', toggleActions: 'play none none reverse' },
          },
        )
      })

      motion.add('(min-width: 1280px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-energy-stream]', {
          strokeDashoffset: -36,
          duration: 2.8,
          repeat: -1,
          ease: 'none',
        })
      })
    }, sectionRef)

    return () => {
      motion.revert()
      context.revert()
    }
  }, [])

  useEffect(() => {
    if (!selectedService) return undefined

    const previousFocus = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedService(null)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      if (openerRef.current) openerRef.current.focus()
      else previousFocus?.focus?.()
    }
  }, [selectedService])

  const openService = (service, event) => {
    openerRef.current = event.currentTarget
    setSelectedService(service)
  }

  return (
    <section id="services" ref={sectionRef} aria-labelledby="services-heading" className="relative isolate w-full overflow-hidden bg-[#080808] px-4 pb-16 pt-20 text-[#F7F0E5] sm:px-6 md:pb-20 md:pt-24 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] -z-10 size-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/10 blur-[130px] sm:size-[850px] sm:blur-[170px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED1F00]/10 blur-[110px] sm:size-[550px] sm:blur-[130px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center">
        <header data-service-reveal className="mx-auto mb-8 flex max-w-4xl flex-col items-center text-center sm:mb-10 md:mb-14">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#25252A] bg-[#0D0D0F]/80 px-4 py-1.5 shadow-inner backdrop-blur-md sm:mb-6">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FF6B00] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[#FF6B00]" /></span>
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF6B00] sm:text-xs sm:tracking-[0.25em]">Our services</span>
          </div>
          <h2 id="services-heading" className="mb-4 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
            What we <span className="text-gradient-orange">build</span>
          </h2>
          <p className="max-w-[680px] text-sm leading-relaxed text-[#9B9BA3] sm:text-base md:text-xl">
            From idea to deployment, we build digital solutions tailored to your business needs.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={category === filter.id}
                onClick={() => setCategory(filter.id)}
                className={`rounded-full border px-3.5 py-2 font-display text-[11px] font-medium tracking-wide transition sm:px-4 sm:text-xs ${category === filter.id
                  ? 'border-[#FF6B00] bg-[#FF6B00]/15 text-[#F7F0E5] shadow-[0_0_12px_rgba(255,107,0,0.3)]'
                  : 'border-[#25252A] bg-[#121216]/80 text-[#9B9BA3] hover:border-[#FF6B00]/50 hover:text-[#F7F0E5]'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </header>

        <div className="relative my-2 hidden min-h-[760px] w-full max-w-[1400px] xl:block" aria-label="Services connected through the Agniro digital architecture core">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 size-full" fill="none" viewBox="0 0 1400 760" preserveAspectRatio="none">
            <defs>
              <linearGradient id="service-energy-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#FFAD33" stopOpacity=".85" />
                <stop offset="50%" stopColor="#FF6B00" stopOpacity=".55" />
                <stop offset="100%" stopColor="#ED1F00" stopOpacity=".2" />
              </linearGradient>
              <filter id="service-energy-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle cx="700" cy="380" r="170" stroke="#25252A" strokeDasharray="3 6" opacity=".6" />
            <circle cx="700" cy="380" r="280" stroke="#25252A" strokeDasharray="4 8" opacity=".35" />
            <circle cx="700" cy="380" r="380" stroke="#25252A" opacity=".15" />
            {conduits.map((path, index) => (
              <g key={path}>
                <path d={path} stroke="#25252A" strokeWidth="1.5" />
                <path d={path} data-energy-stream stroke="url(#service-energy-gradient)" strokeWidth="2" strokeDasharray="6 12" filter="url(#service-energy-glow)" opacity={reactorActive ? 1 : 0.65} />
                <circle cx={[610, 585, 610, 655, 790, 815, 790, 745][index]} cy={[330, 380, 430, 470, 330, 380, 430, 470][index]} r="3.5" fill="#FF6B00" />
              </g>
            ))}
          </svg>

          {visibleServices.map((service) => (
            <ServiceCard key={service.number} service={service} onOpen={openService} desktop dimmed={category !== 'all' && service.category !== category} />
          ))}

          <button
            type="button"
            aria-label="Agniro digital architecture core. Activate to energize service connections."
            onPointerEnter={() => setReactorActive(true)}
            onPointerLeave={() => setReactorActive(false)}
            onFocus={() => setReactorActive(true)}
            onBlur={() => setReactorActive(false)}
            className={`group absolute left-1/2 top-1/2 z-20 flex size-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD33] ${reactorActive ? 'wwb-core-active' : ''}`}
          >
            <span className="absolute inset-0 rounded-full border border-dashed border-[#FF6B00]/30 wwb-spin-slow" />
            <span className="absolute inset-2 rounded-full border border-[#25252A] wwb-spin-reverse">
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-[#FF6B00]" />
              <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#ED1F00]" />
            </span>
            <span className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#ED1F00]/30 via-[#FF6B00]/40 to-[#FFAD33]/20 blur-xl wwb-glow-pulse" />
            <span className="relative flex size-48 flex-col items-center justify-center overflow-hidden rounded-full border-2 border-[#FF6B00]/60 bg-[#0D0D0F] p-4 text-center shadow-[0_0_50px_rgba(255,107,0,0.3)] transition duration-500 group-hover:scale-105 group-hover:border-[#FF6B00]">
              <span aria-hidden="true" className="mb-1 text-3xl text-[#FFAD33]">✦</span>
              <img alt="Agniro" className="w-32 object-contain" src="/agniro-logo.svg" />
              <span className="mt-2 font-mono text-[8px] font-semibold uppercase tracking-wider text-[#FF6B00]">Digital architecture core</span>
              <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#9B9BA3]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#FF6B00]" />System active
              </span>
            </span>
          </button>
        </div>

        <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
          {visibleServices.map((service) => (
            <ServiceCard key={service.number} service={service} onOpen={openService} dimmed={category !== 'all' && service.category !== category} />
          ))}
        </div>

        <div className="mt-12 flex w-full max-w-[1400px] flex-col items-center justify-between gap-2 border-t border-[#25252A] pt-4 font-mono text-[9px] text-[#9B9BA3]/60 sm:mt-16 sm:flex-row sm:text-[10px]">
          <span>AGNIRO DIGITAL ARCHITECTURE <span className="px-2 text-[#FF6B00]">/</span> FULL-CYCLE CAPABILITY DELIVERY</span>
          <span className="text-[#FFEBC7]/70">SECTION 04</span>
        </div>
      </div>

      {selectedService && <ServiceDialog service={selectedService} dialogRef={dialogRef} onClose={() => setSelectedService(null)} />}

      <style>{`
        @keyframes wwb-orbit { to { transform: rotate(360deg); } }
        @keyframes wwb-orbit-reverse { to { transform: rotate(-360deg); } }
        @keyframes wwb-glow { 0%, 100% { opacity: .45; transform: scale(1); } 50% { opacity: .8; transform: scale(1.04); } }
        .wwb-spin-slow { animation: wwb-orbit 30s linear infinite; }
        .wwb-spin-reverse { animation: wwb-orbit-reverse 24s linear infinite; }
        .wwb-glow-pulse { animation: wwb-glow 4s ease-in-out infinite; }
        .wwb-core-active .wwb-glow-pulse { opacity: .95; transform: scale(1.15); }
        @media (prefers-reduced-motion: reduce) {
          .wwb-spin-slow, .wwb-spin-reverse, .wwb-glow-pulse { animation: none; }
        }
      `}</style>
    </section>
  )
}

function ServiceCard({ service, onOpen, desktop = false, dimmed = false }) {
  const Icon = service.icon
  return (
    <button
      type="button"
      data-service-reveal
      data-category={service.category}
      onClick={(event) => onOpen(service, event)}
      className={`group cursor-pointer rounded-xl border border-[#25252A] bg-[#121216]/95 p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00] hover:shadow-[0_16px_36px_-10px_rgba(255,107,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD33] sm:p-5 ${dimmed ? 'opacity-25 grayscale-[.75]' : ''} ${desktop ? `service-card absolute z-10 w-[310px] ${service.position}` : 'w-full'}`}
    >
      <span className="mb-3 flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-lg border border-[#25252A] bg-[#0D0D0F] text-[#FF6B00] transition-colors group-hover:bg-[#FF6B00]/10">
          <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
        </span>
        <span className="font-mono text-xs font-semibold tracking-wider text-[#9B9BA3]">{service.number}</span>
      </span>
      <span className="mb-1.5 block font-display text-base font-bold text-[#F7F0E5] transition-colors group-hover:text-[#FF6B00] sm:text-lg">{service.title}</span>
      <span className="mb-3 block text-xs leading-relaxed text-[#9B9BA3]">{service.description}</span>
      <span className="flex items-center text-xs font-semibold text-[#FF6B00]">
        Learn more <ArrowRight aria-hidden="true" size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  )
}

function ServiceDialog({ service, dialogRef, onClose }) {
  const Icon = service.icon
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <button type="button" aria-label="Close service details" onClick={onClose} className="absolute inset-0 bg-[#080808]/85 backdrop-blur-md" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="service-dialog-title" tabIndex={-1} className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#25252A] bg-[#0D0D0F] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] outline-none sm:p-8">
        <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#25252A] bg-[#121216] text-[#FF6B00]"><Icon aria-hidden="true" size={22} /></span>
            <div>
              <span className="font-mono text-[10px] font-semibold text-[#FF6B00]">{service.number} <span className="pl-2 tracking-widest text-[#9B9BA3]">SERVICE OVERVIEW</span></span>
              <h3 id="service-dialog-title" className="font-display text-xl font-bold text-[#F7F0E5] sm:text-2xl">{service.title}</h3>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#25252A] bg-[#121216] text-[#9B9BA3] transition hover:border-[#FF6B00]/50 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div>
          <h4 className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9B9BA3]">Core objective</h4>
          <p className="text-sm leading-relaxed text-[#F7F0E5] sm:text-base">{service.description}</p>
        </div>
        <div className="mt-5 border-t border-[#25252A] pt-4">
          <h4 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[#9B9BA3]">Technical execution pillars</h4>
          <ul className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            {service.pillars.map((pillar) => (
              <li key={pillar} className="flex items-start gap-2 rounded-lg border border-[#25252A] bg-[#121216] p-2.5 text-[#B8B5B2]">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6B00]" />{pillar}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#25252A]/60 pt-4">
          <span className="font-mono text-[9px] text-[#9B9BA3] sm:text-[10px]">AGNIRO DIGITAL ARCHITECTURE</span>
          <button type="button" onClick={onClose} className="rounded-lg bg-[#FF6B00] px-4 py-2 font-display text-xs font-semibold tracking-wider text-[#080808] transition hover:bg-[#FFAD33]">GOT IT</button>
        </div>
      </div>
    </div>
  )
}

export default WhatWeBuild

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  GraduationCap,
  HeartPulse,
  Rocket,
  X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const sectors = [
  {
    id: 'healthcare', title: 'Healthcare', category: 'HEALTHCARE DOMAIN', Icon: HeartPulse,
    description: 'Patient portals, care delivery pipelines, and HIPAA-compliant clinical systems.',
    detail: 'Patient portals, care delivery pipelines, and clinical systems engineered with zero-trust access and health data integrations.',
    compliance: 'HIPAA Title II, SOC 2 Type II, HITRUST, HL7 FHIR v4',
    sla: '99.995% uptime · zero data-at-rest exposure',
    deliverables: ['Encrypted patient-physician messaging', 'Prescription and lab dispatch APIs', 'Biometric authentication and audit-logged access'],
  },
  {
    id: 'startups', title: 'Startups', category: 'STARTUP ACCELERATION', Icon: Rocket,
    description: 'Fast-to-market MVPs, secure backend builds, and cloud scaling pathways.',
    detail: 'Fast-to-market MVPs, secure backend builds, and cloud scaling pathways configured for rapid product iteration.',
    compliance: 'SOC 2 ready, GDPR/CCPA, multi-tenant isolation',
    sla: 'Automated horizontal scaling for rapid growth',
    deliverables: ['MVP-ready product architecture', 'Event queues and automated deployment pipelines', 'Telemetry dashboards for product adoption'],
  },
  {
    id: 'education', title: 'Education', category: 'EDTECH PLATFORMS', Icon: GraduationCap,
    description: 'Interactive student apps, resource systems, and scalable curriculum delivery.',
    detail: 'Interactive student apps, resource systems, and scalable curriculum delivery for virtual and hybrid learning.',
    compliance: 'FERPA, COPPA, SCORM, LTI 1.3',
    sla: 'Low-latency edge delivery for global learners',
    deliverables: ['Interactive virtual classroom modules', 'Assignment and evaluation workflows', 'Content delivery with adaptive caching'],
  },
  {
    id: 'smes', title: 'SMEs', category: 'ENTERPRISE TRANSFORMATION', Icon: Building2,
    description: 'Modern information, optimized operational workflows, and CRM synchronization.',
    detail: 'Modern information systems, optimized operational workflows, and CRM synchronization with automated ERP ingestion.',
    compliance: 'ISO/IEC 27001, PCI-DSS, OAuth 2.0 / SAML',
    sla: 'Real-time two-way data synchronization',
    deliverables: ['Unified inventory and sales dashboards', 'Custom legacy database connectors', 'Automated financial reconciliation'],
  },
  {
    id: 'services', title: 'Professional Services', category: 'PROFESSIONAL SERVICES', Icon: BriefcaseBusiness,
    description: 'Intelligent scheduling engines, client billing systems, and reporting pipelines.',
    detail: 'Scheduling, billing, and reporting systems designed for high-touch agency, consulting, and legal operations.',
    compliance: 'PCI-DSS 4.0, eIDAS-compatible digital signatures',
    sla: 'Reliable scheduling with conflict resolution',
    deliverables: ['Multi-timezone booking and calendar coordination', 'Milestone billing and payment workflows', 'White-label client portals with analytics'],
  },
  {
    id: 'custom', title: 'Custom Solutions', category: 'CUSTOM R&D ARCHITECTURES', Icon: Code2,
    description: 'Engineered products built for highly specific operational requirements.',
    detail: 'Purpose-built products for specific operational requirements, bespoke integrations, and specialist hardware.',
    compliance: 'Tailored to relevant industry and regional requirements',
    sla: 'Custom high-availability deployments',
    deliverables: ['Greenfield system design and implementation', 'Custom streaming and integration protocols', 'Handover documentation and ongoing support'],
  },
]

const IndustrySolutions = () => {
  const sectionRef = useRef(null)
  const dialogRef = useRef(null)
  const openerRef = useRef(null)
  const [activeId, setActiveId] = useState('startups')
  const [selectedSector, setSelectedSector] = useState(null)

  useEffect(() => {
    const motion = gsap.matchMedia()
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('[data-industry-reveal]',
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          },
        )
      })
    }, sectionRef)

    return () => {
      motion.revert()
      context.revert()
    }
  }, [])

  useEffect(() => {
    if (!selectedSector) return undefined

    const previousFocus = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedSector(null)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      if (openerRef.current) openerRef.current.focus()
      else previousFocus?.focus?.()
    }
  }, [selectedSector])

  const openSector = (sector, event) => {
    openerRef.current = event.currentTarget
    setActiveId(sector.id)
    setSelectedSector(sector)
  }

  return (
    <section
      id="industries"
      ref={sectionRef}
      aria-labelledby="industries-heading"
      className="relative isolate w-full overflow-hidden bg-[#080808] px-4 py-16 text-[#F7F0E5] sm:px-6 sm:py-20 lg:px-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,107,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,107,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-[600px] rounded-full bg-[#FF6B00]/10 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-20 size-[500px] rounded-full bg-[#ED1F00]/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 items-center gap-9 lg:mb-16 lg:grid-cols-12 lg:gap-12">
          <div data-industry-reveal className="flex flex-col items-start lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#FF6B00]/30 bg-[#0D0D0F]/90 px-3.5 py-1.5 backdrop-blur-md sm:mb-6">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FF6B00] opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-[#FFAD33]" /></span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-[#FFAD33] sm:text-xs">Our industries</span>
            </div>
            <h2 id="industries-heading" className="mb-5 font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[54px]">
              Technology for different kinds of <span className="flame-gradient-text">businesses</span>
            </h2>
            <p className="mb-7 max-w-xl text-sm leading-relaxed text-[#9B9BA3] sm:text-base lg:text-lg">
              We adapt our digital products and engineered architectures to fit the regulatory, scaling, and deployment realities of your industry.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[9px] tracking-wider text-[#9B9BA3] sm:gap-3 sm:text-[10px]">
              <Telemetry label="SECTOR MATRIX // 06 VERTICALS" color="bg-[#FF6B00]" />
              <Telemetry label="COMPLIANCE // READY" color="bg-emerald-400" />
              <Telemetry label="LATENCY // <12ms" color="bg-[#FFAD33]" className="hidden sm:flex" />
            </div>
          </div>

          <div data-industry-reveal className="group relative overflow-hidden rounded-2xl border border-[#25252A] bg-[#0D0D0F] shadow-2xl shadow-black/80 lg:col-span-6">
            <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-[#FF6B00]/30 sm:h-[320px]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1VALpjOVvecjdpQJ-yb453mmY6DyQW2cQs9GHp0WZwHNnNARBo50kkw6s97jqbYWFGmPZ8DYjg_2PhQKCe5Vhs6gIFnYuQtT96Vcxk70BFoXZpPPlA4C9S6IHXbyAi5IUMgfaSU5HuYR-QndRqrv7f0xtb4dvNR-F_OQjGgSJhTrpFr7cYWlKLtZoQIezi84EFFu8a5bdHJ5bnC7zDBVyAOaQ8Xnhj-Q5pSTJgSBlisRVT3zHsAzpRlMUHp"
                alt="Obsidian telemetry network representing technology for multiple industries"
                loading="lazy"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/40" />
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded border border-[#25252A] bg-[#080808]/80 px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest text-[#FFAD33] backdrop-blur-md sm:left-3.5 sm:top-3.5 sm:text-[10px]">
                <span className="size-1.5 animate-ping rounded-full bg-[#FF6B00]" />Telemetry matrix // active
              </div>
              <div className="absolute right-3 top-3 flex items-center gap-2 rounded border border-emerald-400/20 bg-[#080808]/80 px-2.5 py-1 font-mono text-[8px] text-emerald-300 backdrop-blur-md sm:right-3.5 sm:top-3.5 sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-emerald-400" />6 / 6 nodes online
              </div>
              <div className="absolute inset-x-2 bottom-2 flex flex-wrap justify-between gap-1 rounded-xl border border-[#25252A]/80 bg-[#0D0D0F]/90 p-2 backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:p-2.5">
                {['HEALTHCARE', 'STARTUPS', 'EDTECH', 'SMES', 'SERVICES', 'CUSTOM'].map((label, index) => (
                  <span key={label} className="flex items-center gap-1 font-mono text-[8px] text-[#F7F0E5] sm:text-[10px]"><span className="text-[#FF6B00]">{String(index + 1).padStart(2, '0')}</span>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {sectors.map((sector, index) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              number={index + 1}
              active={activeId === sector.id}
              onFocus={() => setActiveId(sector.id)}
              onOpen={(event) => openSector(sector, event)}
            />
          ))}
        </div>
      </div>

      {selectedSector && <SectorDrawer sector={selectedSector} dialogRef={dialogRef} onClose={() => setSelectedSector(null)} />}
    </section>
  )
}

function Telemetry({ label, color, className = '' }) {
  return <span className={`flex items-center gap-2 rounded-md border border-[#25252A] bg-[#121216] px-2.5 py-1.5 ${className}`}><span className={`size-1.5 rounded-full ${color}`} />{label}</span>
}

function SectorCard({ sector, number, active, onFocus, onOpen }) {
  const { Icon } = sector
  return (
    <button
      type="button"
      data-industry-reveal
      aria-pressed={active}
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onClick={onOpen}
      className={`group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl border bg-[#121216]/90 p-5 text-left backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FF6B00] hover:shadow-[0_0_28px_rgba(255,107,0,0.18),inset_0_0_16px_rgba(255,107,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD33] sm:p-6 lg:p-7 ${active ? 'border-[#FF6B00] ring-1 ring-[#FF6B00]/70' : 'border-[#25252A]'}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-[#FF6B00]/10 blur-3xl transition-all group-hover:bg-[#FF6B00]/20" />
      <span className="mb-4 flex items-center justify-between border-b border-[#25252A]/80 pb-3.5">
        <span className="font-mono text-[10px] font-semibold tracking-wider text-[#FFAD33]/80 sm:text-xs">{String(number).padStart(2, '0')} // SECTOR</span>
        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-emerald-300">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />ONLINE
        </span>
      </span>
      <span className="relative grid flex-1 grid-cols-12 items-center gap-2.5">
        <span className="col-span-7 pr-1">
          <span className="mb-3.5 flex size-10 items-center justify-center rounded-xl border border-[#FF6B00]/30 bg-black/80 text-[#FF6B00] transition-all group-hover:border-[#FF6B00] group-hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] sm:size-12">
            <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
          </span>
          <span className="mb-1.5 block font-display text-lg font-bold tracking-tight text-[#F7F0E5] transition-colors group-hover:text-white sm:text-[21px]">{sector.title}</span>
          <span className="mb-4 block text-xs leading-relaxed text-[#9B9BA3] sm:text-sm">{sector.description}</span>
        </span>
        <span aria-hidden="true" className="col-span-5 flex aspect-square max-w-[130px] items-center justify-center justify-self-end text-[#FFAD33] transition-transform duration-300 group-hover:scale-110">
          <SectorGlyph id={sector.id} />
        </span>
      </span>
      <span className="relative mt-3 flex items-center justify-between border-t border-[#25252A]/70 pt-3 font-mono text-[9px] tracking-widest text-[#9B9BA3]">
        <span className="text-[#FFAD33]/80">{sector.category}</span>
        <ArrowUpRight aria-hidden="true" size={15} className="text-[#FF6B00] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}

function SectorGlyph({ id }) {
  return (
    <svg viewBox="0 0 120 120" className="size-full drop-shadow-lg">
      <defs>
        <linearGradient id={`sector-${id}-gradient`} x1="0%" x2="100%" y1="0%" y2="100%"><stop stopColor="#FFAD33" /><stop offset="1" stopColor="#FF6B00" /></linearGradient>
      </defs>
      <polygon points="60,16 103,39 60,63 17,39" fill="#191922" stroke="#FF6B00" strokeOpacity=".7" />
      <polygon points="17,39 60,63 60,91 17,67" fill="#0D0D12" stroke="#25252A" />
      <polygon points="60,63 103,39 103,67 60,91" fill="#14141A" stroke="#25252A" />
      <polygon points="60,31 79,42 60,53 41,42" fill={`url(#sector-${id}-gradient)`} opacity=".95" />
      <polygon points="41,42 60,53 60,72 41,61" fill="#FF6B00" opacity=".75" />
      <polygon points="60,53 79,42 79,61 60,72" fill="#ED1F00" opacity=".85" />
      <ellipse cx="60" cy="94" rx="36" ry="12" fill="none" stroke="#FF6B00" strokeDasharray="3 4" opacity=".75" />
      <circle cx="60" cy="94" r="3" fill="#FFAD33" />
    </svg>
  )
}

function SectorDrawer({ sector, dialogRef, onClose }) {
  const { Icon } = sector
  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Close industry details" onClick={onClose} className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm" />
      <aside ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="sector-drawer-title" tabIndex={-1} className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto border-l border-[#25252A] bg-[#0D0D0F] shadow-[-20px_0_60px_rgba(0,0,0,0.7)] outline-none">
        <div className="h-0.5 w-full shrink-0 bg-gradient-to-r from-transparent via-[#FF6B00] to-[#FFAD33]" />
        <div className="flex items-start justify-between gap-4 border-b border-[#25252A] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#FF6B00]/30 bg-[#121216] text-[#FF6B00]"><Icon size={23} aria-hidden="true" /></span>
            <div>
              <p className="font-mono text-[9px] font-semibold tracking-wider text-[#FFAD33] sm:text-[10px]">ARCHITECTURE SPEC // SEC-{String(sectors.findIndex((item) => item.id === sector.id) + 1).padStart(2, '0')}</p>
              <h3 id="sector-drawer-title" className="font-display text-xl font-bold text-[#F7F0E5] sm:text-2xl">{sector.title}</h3>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#25252A] text-[#9B9BA3] transition hover:border-[#FF6B00]/50 hover:text-white"><X size={18} /></button>
        </div>

        <div className="flex-1 space-y-6 p-5 sm:p-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-[#FFAD33]">{sector.category}</span>
          <p className="text-sm leading-relaxed text-[#D2CECA] sm:text-base">{sector.detail}</p>

          <div className="rounded-xl border border-[#25252A] bg-[#121216] p-4">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[#9B9BA3]">Compliance & standards</p>
            <p className="text-sm leading-relaxed text-[#F7F0E5]">{sector.compliance}</p>
          </div>
          <div className="rounded-xl border border-[#25252A] bg-[#121216] p-4">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[#9B9BA3]">Reliability target</p>
            <p className="text-sm leading-relaxed text-[#F7F0E5]">{sector.sla}</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-[#9B9BA3]">Typical deliverables</p>
            <ul className="space-y-2">
              {sector.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2.5 rounded-lg border border-[#25252A] bg-[#121216] p-3 text-xs leading-relaxed text-[#C7C3C0] sm:text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#FF6B00]" />{deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#25252A] p-5 sm:p-7">
          <span className="font-mono text-[8px] tracking-wider text-[#9B9BA3] sm:text-[10px]">AGNIRO INDUSTRY ARCHITECTURE</span>
          <button type="button" onClick={onClose} className="rounded-lg bg-[#FF6B00] px-4 py-2 font-display text-xs font-semibold tracking-wider text-[#080808] transition hover:bg-[#FFAD33]">CLOSE</button>
        </div>
      </aside>
    </div>
  )
}

export default IndustrySolutions

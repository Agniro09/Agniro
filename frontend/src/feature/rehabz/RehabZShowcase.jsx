import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const devices = [
  {
    label: 'SCHEDULING',
    status: 'OCT 2026',
    alt: 'RehabZ calendar and appointment schedule interface',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnV4HvgrqJkGf9kkepyuvuKs52ZA37w86qHsfg_uOPEYJRHpyn_oVsaUI5Aej40qyT7UJ8PK0XOHk-cF_hgsduhVcBKd2f6t6et2msAdTXGWbpJ37U80OPaD2s9phRsUVW7XhbL2QVz1tW7uKij_yK7z6utp0HG7Gv9KdYuCl6YBzIZ8uaOtJBxhBM1xMg9zMRccTWiPRKczPjfe8KpjN5cAdk4itMtpM4fTxCS1KluNCqOyh7gj5Qgihcn2VC3RoItQ',
    position: 'left-0 top-3 z-10 -rotate-6 origin-bottom-left',
    size: 'w-[180px] sm:w-[230px] lg:w-[245px]',
  },
  {
    label: 'PATIENT MGMT',
    status: 'SYS.DIR',
    alt: 'RehabZ patient directory interface',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHzqnKKojzEOtntkzxBYTtx3AeY5svXN8jypYhqWOD_iLNmxDpFrfG9eqKrLh1r_HomctODgwdUBCX0ugjR5l8HgjOW9Uv1SR-Xx3eiQcx1qCbQvA6tW1yskWrmJF2YOmuuJypIDa8bM5q99L9LZL_YjW-U03jwyrlnzJIzRmIkLbTdYGc0hTu3nY-xn2LCK4MRJJkpjGf051EsrvUh6jnLIdYivuSideTwGVDhvwXm5T23WFcRlsyVq7MlBWo3F8AgQ',
    position: 'bottom-3 right-0 z-10 rotate-6 origin-bottom-right',
    size: 'w-[180px] sm:w-[230px] lg:w-[245px]',
  },
  {
    label: 'WORKSPACE // DR. JAIN',
    status: 'ACTIVE CLINICAL',
    alt: 'RehabZ doctor clinic workspace',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_wHgC0lpy1CeFllsLYoyqA-3VgcbSxkteUmeD2VZy8By9hvZl48dlmluOjQIpK_UxAokuz8bKIC8qScLoMMYEzOcEA5Dk-NUtKCxzLMAbXV5PYA8xt3gEyGA8Oo993mh6hh0RljNl4FFdfAlChk72DVSPLkEd7AZ7-NoO5PmBEKrruGP1oJpJrCTUFrq4MG9U_Th4ufufFUYP0Cna6kIPf20Y1B1b-qC23NzywKsf3prLpg-9HAoz94lFxD0sfO3DFg',
    position: 'z-20 rotate-2',
    size: 'w-[200px] sm:w-[255px] lg:w-[275px]',
    featured: true,
  },
]

const RehabZShowcase = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const motion = gsap.matchMedia()
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-rehabz-reveal]',
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
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
      id="products"
      ref={sectionRef}
      aria-labelledby="rehabz-heading"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-1/2 size-[620px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.1)_0%,rgba(255,173,51,0.04)_38%,transparent_72%)] blur-3xl sm:size-[850px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl rounded-2xl border border-[#25252A] bg-[#121216]/95 p-5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] sm:rounded-[16px] sm:p-8 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center space-y-6 sm:space-y-7 lg:col-span-5">
            <div data-rehabz-reveal className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#25252A] bg-[#16161B] px-3 py-1.5 shadow-inner">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#FF6B00] shadow-[0_0_6px_#FF6B00]" />
              </span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#FFEBC7] sm:text-[11px] sm:tracking-[0.18em]">Our flagship project</span>
            </div>

            <div data-rehabz-reveal className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                <h2 id="rehabz-heading" className="font-display text-5xl font-bold tracking-tight text-[#F7F0E5] sm:text-6xl lg:text-7xl">Rehab<span className="text-gradient-orange">Z</span></h2>
                <span className="inline-flex rounded border border-[#25252A] bg-[#16161B] px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-[#FFAD33] sm:text-[11px]">[SYS.03 // CLINICAL]</span>
              </div>
              <p className="font-display text-xl font-bold leading-snug tracking-tight text-[#F7F0E5] sm:text-2xl lg:text-3xl">
                A connected digital platform for <span className="text-[#FFEBC7]">modern physiotherapy.</span>
              </p>
            </div>

            <p data-rehabz-reveal className="max-w-lg text-sm leading-relaxed text-[#9B9BA3] sm:text-base">
              RehabZ brings physiotherapists and patients into one connected digital ecosystem, helping streamline clinical workflows, patient management, treatment programs, exercises, communication, and recovery tracking.
            </p>

            <div data-rehabz-reveal className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
              <a href="#explore-rehabz" className="group inline-flex items-center gap-3 rounded-xl border border-[#FF6B00]/40 bg-gradient-to-br from-[#FF6B00] to-[#ED1F00] px-5 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_4px_24px_-2px_rgba(255,107,0,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_30px_rgba(255,107,0,0.45)] sm:px-7">
                Explore RehabZ <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <div className="flex items-center gap-2 rounded-xl border border-[#25252A] bg-[#16161B] px-3.5 py-3 text-[10px] font-mono text-[#9B9BA3] sm:text-xs">
                <span className="size-1.5 rounded-full bg-[#FFAD33] shadow-[0_0_5px_#FFAD33]" />
                LIVE CLINICAL SUITE
              </div>
            </div>
          </div>

          <div id="explore-rehabz" className="relative flex min-h-[440px] items-center justify-center py-6 sm:min-h-[560px] sm:py-8 lg:col-span-7 lg:py-12">
            <div aria-hidden="true" className="absolute -top-1 right-1 z-30 hidden items-center gap-2 rounded-full border border-[#25252A] bg-[#16161B] px-3 py-1 font-mono text-[10px] text-[#FFAD33] shadow-md sm:flex">
              <span className="size-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_5px_#FF6B00]" />
              REHABZ_AUTHENTIC_SUITE
            </div>
            <div className="relative flex h-[430px] w-full max-w-[540px] items-center justify-center sm:h-[550px]">
              {devices.map((device) => <PhoneMockup key={device.label} device={device} />)}
            </div>
          </div>
        </div>

        <div data-rehabz-reveal className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-[#25252A] pt-4 font-mono text-[9px] text-[#9B9BA3]/70 sm:mt-8 sm:flex-row sm:text-[10px]">
          <span>AGNIRO PRODUCT STUDIO <span className="px-2 text-[#FF6B00]">/</span> REHABILITATION TECHNOLOGY</span>
          <span className="text-[#FFEBC7]/70">SECTION 03</span>
        </div>
      </div>
    </section>
  )
}

function PhoneMockup({ device }) {
  return (
    <div data-rehabz-reveal className={`${device.featured ? 'relative' : 'phone-mockup absolute'} ${device.position} ${device.size}`}>
      <div className={`relative rounded-[26px] border bg-[#0E0E12] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/5 sm:rounded-[28px] sm:p-2.5 ${device.featured ? 'border-[#35353A] ring-[#FF6B00]/25 shadow-[0_0_35px_rgba(255,107,0,0.12)]' : 'border-[#25252A]'}`}>
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[19px] bg-white sm:rounded-[22px]">
          <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 flex h-3.5 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-black sm:top-3 sm:h-4 sm:w-20">
            <span className="mr-1.5 size-2.5 rounded-full bg-[#16161B] sm:mr-2" />
            <span className="size-1.5 rounded-full bg-[#25252A] sm:size-2" />
          </div>
          <img src={device.image} alt={device.alt} loading="lazy" className="block size-full select-none object-cover object-top" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-70" />
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-1 px-1 font-mono text-[7px] text-[#9B9BA3]/70 sm:mt-2 sm:px-2 sm:text-[9px]">
          <span className={device.featured ? 'text-[#FFEBC7]' : ''}>{device.label}</span>
          <span className="shrink-0 text-[#FFAD33]">{device.status}</span>
        </div>
      </div>
    </div>
  )
}

export default RehabZShowcase

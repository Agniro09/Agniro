import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Navbar from '../navbar/Navbar.jsx'
import TechnologySection from '../technology/TechnologySection.jsx'
import RehabZShowcase from '../rehabz/RehabZShowcase.jsx'
import WhatWeBuild from '../services/WhatWeBuild.jsx'
import WhyBuildWithAgniro from '../whyAgniro/WhyBuildWithAgniro.jsx'
import IdeaToImpact from '../ideaToImpact/IdeaToImpact.jsx'
import IndustrySolutions from '../industries/IndustrySolutions.jsx'
import ContactUs from '../contactUs/page/ContactUs.jsx'
import ProjectCta from '../projectCta/ProjectCta.jsx'
import Project from '../projects/Project.jsx'
import {
  BriefcaseBusiness,
  HeartPulse,
  Rocket,
  School,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react'

gsap.registerPlugin(ScrollToPlugin)

const industries = [
  { title: 'Healthcare', detail: 'Digital Solutions', Icon: HeartPulse },
  { title: 'Startups', detail: 'MVP to Scale', Icon: Rocket },
  { title: 'Education', detail: 'Smart Learning', Icon: School },
  { title: 'SMEs', detail: 'Business Tools', Icon: BriefcaseBusiness },
  { title: 'Professional Services', detail: 'Workflow Automation', Icon: SlidersHorizontal },
  { title: 'Custom Solutions', detail: 'Tailored Software', Icon: Terminal },
]

const Landingpage = () => {
  const pageRef = useRef(null)

  useEffect(() => {
    const handleSmoothScroll = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const clickedElement = event.target instanceof Element ? event.target : null
      const anchor = clickedElement?.closest('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      let destination
      try {
        destination = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || !destination.hash) return

      let targetId
      try {
        targetId = decodeURIComponent(destination.hash.slice(1))
      } catch {
        return
      }

      const target = document.getElementById(targetId)
      if (!target) return

      event.preventDefault()
      if (window.location.hash !== destination.hash) {
        window.history.pushState(null, '', `${destination.pathname}${destination.search}${destination.hash}`)
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.to(window, {
        duration: reduceMotion ? 0 : 1.1,
        ease: 'power3.inOut',
        overwrite: 'auto',
        scrollTo: {
          y: target,
          offsetY: targetId === 'home' ? 0 : 96,
          autoKill: true,
        },
      })
    }

    const page = pageRef.current
    page?.addEventListener('click', handleSmoothScroll)

    const context = gsap.context(() => {
      const motion = gsap.matchMedia()

      motion.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .from('[data-animate="nav"]', { y: -24, opacity: 0, duration: 0.7 })
          .from('[data-animate="hero"] > *', {
            y: 28,
            opacity: 0,
            duration: 0.75,
            stagger: 0.12,
          }, '-=0.35')
          .from('[data-animate="industry"]', {
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
          }, '-=0.2')

        gsap.to('[data-animate="scroll-dot"]', {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.7,
          ease: 'sine.inOut',
        })
      })

      return () => motion.revert()
    }, pageRef)

    return () => {
      page?.removeEventListener('click', handleSmoothScroll)
      context.revert()
    }
  }, [])

  return (
    <div ref={pageRef} className="relative isolate min-h-screen overflow-x-hidden bg-[#080808] text-[#F7F0E5]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <img
          alt=""
          className="h-full w-full object-cover object-center"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9hDud1X03EI4OxOng7LJnLqEwsYVhAXqj0bmHr7P2_gYjcv88XFkHT2vcWRLI-Oq-Z2InOs7zFv9bY1YDJ2i2EchTSE6ct6f0gPTDL2CHQI5XnOaxovsB6STrvZxYVEUaZgeQaqTQHf4CVb9mSicSlAHlA5k7Dt9Mmps46pJ2hqHNvlQ8GCb-Jdciu7haMKfM8aeus3EVX8lmFAHzl2IH1AAQkVNM8Y1bkcGCx1prw0G3sWfU_MSxfw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/70 to-[#080808]/35 md:via-[#080808]/55 md:to-[#080808]/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-transparent to-[#080808]/95" />
      </div>

      <Navbar />

      <main id="home" className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-6 pt-28 sm:px-8 md:px-12 md:pt-32">
        <section data-animate="hero" className="flex flex-1 flex-col justify-center py-14 md:max-w-[700px] md:py-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-0.5 w-6 rounded-full bg-[#FF6B00] shadow-[0_0_6px_#FF6B00]" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[2px] text-[#FF6B00] sm:text-xs sm:tracking-[3px]">
              Building products. Solving problems.
            </span>
          </div>
          <h1 className="mb-6 font-display text-[clamp(2.5rem,7vw,4.25rem)] font-bold leading-[1.05] tracking-tight text-[#F7F0E5]">
            We build digital products that solve{' '}
            <span className="flame-gradient-text drop-shadow-[0_0_35px_rgba(255,107,0,0.3)]">real-world problems</span>
          </h1>
          <p className="mb-8 max-w-[580px] text-base leading-relaxed text-[#B0AEB3] sm:text-[17px]">
            AGNIRO is a technology and product company building innovative software products and delivering custom digital solutions for businesses, startups, and organizations.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFAD33] via-[#FF6B00] to-[#ED1F00] px-5 py-3 font-display text-sm font-semibold tracking-wide text-[#080808] shadow-[0_0_24px_rgba(255,107,0,0.38)] transition hover:brightness-110 hover:shadow-[0_0_36px_rgba(255,107,0,0.55)] sm:px-7" href="#contact">
              Build with Agniro <span aria-hidden="true" className="ml-2">→</span>
            </a>
            <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#FF6B00]/40 bg-[#0D0D10]/70 px-5 py-3 font-display text-sm font-medium tracking-wide text-[#F7F0E5] backdrop-blur-sm transition hover:border-[#FF6B00] hover:bg-[#121216]/90 sm:px-7" href="#products">
              Explore RehabZ <span aria-hidden="true" className="ml-2">→</span>
            </a>
          </div>
        </section>

        <section aria-label="Industries we serve" className="mt-auto w-full border-t border-[#25252A]/80 pt-4">
          <div className="grid grid-cols-2 divide-y divide-[#25252A]/60 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6 lg:divide-x lg:divide-[#25252A]">
            {industries.map(({ title, detail, Icon }) => (
              <div key={title} data-animate="industry" className="group flex min-h-[68px] items-center gap-3 px-2 py-3 sm:px-4">
                <Icon aria-hidden="true" className="size-[21px] shrink-0 text-[#FF6B00] transition-transform group-hover:scale-110" strokeWidth={1.8} />
                <div className="min-w-0">
                  <h2 className="truncate font-display text-[13px] font-medium leading-tight text-[#F7F0E5] sm:text-sm">{title}</h2>
                  <p className="mt-0.5 truncate text-[11px] leading-tight text-[#9B9BA3] sm:text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <a href="#about" className="group mx-auto mt-5 flex flex-col items-center gap-1.5 text-[#9B9BA3] transition-colors hover:text-[#F7F0E5]">
          <span className="font-mono text-[9px] uppercase tracking-[3px] group-hover:text-[#FF6B00]">Scroll to explore</span>
          <span className="flex h-7 w-4 items-start justify-center rounded-full border border-[#FF6B00]/50 p-1 transition-colors group-hover:border-[#FF6B00]">
            <span data-animate="scroll-dot" className="size-1 rounded-full bg-[#FF6B00]" />
          </span>
        </a>
      </main>

      <TechnologySection />
      <RehabZShowcase />
      <WhatWeBuild />
      <WhyBuildWithAgniro />
      <IdeaToImpact />
      <IndustrySolutions />
      <Project />
      <ProjectCta />
      <ContactUs embedded />
    </div>
  )
}

export default Landingpage

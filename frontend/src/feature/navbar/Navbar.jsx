import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navigation = ['About', 'Products', 'Services', 'Work', 'Contact']

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8">
      <div data-animate="nav" className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between rounded-[14px] border border-[#25252A] bg-[#0A0A0C]/85 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:h-[72px] md:px-8">
        <a href="/#home" onClick={closeMenu} className="group flex items-center gap-2.5" aria-label="Agniro home">
          <span className="flex flex-col">
            <img alt="Agniro" className="h-9 w-[105px] object-contain sm:h-10 sm:w-[116px]" src="/agniro-logo.svg" />
            <span className="mt-1 font-mono text-[9px] tracking-[0.18em] text-[#9B9BA3] sm:text-[10px] sm:tracking-[0.24em]">BUILD · SOLVE · GROW</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-wider md:flex">
          <a className="relative py-1 font-semibold text-[#FF6B00]" href="/#home">
            Home<span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
          </a>
          {navigation.map((item) => (
            <a key={item} className="py-1 text-[#9B9BA3] transition-colors hover:text-[#F7F0E5]" href={`/#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a className="hidden rounded-full bg-gradient-to-br from-[#FFAD33] via-[#FF6B00] to-[#ED1F00] px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-[#080808] shadow-[0_0_20px_rgba(255,107,0,0.35)] transition hover:brightness-110 sm:inline-flex" href="/#contact">
            Let’s Build <span aria-hidden="true" className="ml-1">→</span>
          </a>
          <button
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#34343A] text-[#F7F0E5] transition hover:border-[#FF6B00] md:hidden"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="mx-auto mt-2 grid max-w-[1440px] gap-1 rounded-2xl border border-[#25252A] bg-[#0A0A0C]/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          {['Home', ...navigation].map((item) => (
            <a key={item} href={item === 'Home' ? '/#home' : `/#${item.toLowerCase()}`} onClick={closeMenu} className="rounded-lg px-4 py-3 text-sm uppercase tracking-wider text-[#D8D4CE] transition hover:bg-white/5 hover:text-[#FF6B00]">
              {item}
            </a>
          ))}
          <a href="/#contact" onClick={closeMenu} className="mt-1 rounded-lg bg-gradient-to-r from-[#FFAD33] to-[#FF6B00] px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-[#080808]">Let’s Build →</a>
        </nav>
      )}
    </header>
  )
}

export default Navbar

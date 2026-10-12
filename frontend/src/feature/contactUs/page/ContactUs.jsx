import { ArrowRight, ArrowUpRight, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react';
import useContactUs from '../hook/use.contactUs.js';

const projectTypes = [
  ['mobile_app', 'Mobile application'],
  ['web_platform', 'Web platform'],
  ['custom_erp', 'Custom ERP'],
  ['ecommerce', 'E-commerce'],
  ['other', 'Other'],
];

const budgetRanges = [
  ['under_5l', 'Under ₹5 lakh'],
  ['5l_15l', '₹5-15 lakh'],
  ['15l_50l', '₹15-50 lakh'],
  ['50l_plus', '₹50 lakh+'],
  ['not_sure', 'Not sure yet'],
];

const fieldClass =
  'mt-2 min-h-12 w-full rounded-lg border border-[#29272A] bg-[#0D0D0F] px-4 py-3 text-sm text-[#F7F0E5] outline-none transition placeholder:text-[#68666A] focus:border-[#FF6B00]/70 focus:ring-2 focus:ring-[#FF6B00]/15';
const labelClass =
  'block font-mono text-[11px] uppercase tracking-[0.12em] text-[#A6A3A5]';

const ContactUs = ({ embedded = false }) => {
  const { form, submitting, feedback, updateField, submitInquiry } = useContactUs();

  return (
    <main id="contact" className={`relative min-h-screen overflow-hidden bg-[#080808] px-5 font-sans text-[#F7F0E5] sm:px-8 lg:px-12 ${embedded ? 'pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20' : 'py-12 sm:py-16 lg:py-20'}`}>
      <div aria-hidden="true" className="contact-grid pointer-events-none absolute inset-0 opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-1/4 h-[520px] w-[520px] rounded-full bg-[#ED1F00]/15 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 right-0 h-[480px] w-[480px] rounded-full bg-[#FF6B00]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-12 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-[#777277] sm:mb-16 sm:text-[10px]">
          <span><span className="mr-2 text-[#FF6B00]">+</span>Inquiry.engine // module.04</span>
          <span className="hidden sm:inline">Coordinates // India <span className="ml-2 text-[#FF6B00]">+</span></span>
        </div>

        <header className="mb-12 max-w-3xl sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29272A] bg-[#121216]/90 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FFEBC7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Start a conversation
          </div>
          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-[68px]">
            Let&apos;s build something
            <span className="agniro-gradient-text block">together.</span>
          </h1>
          <div className="my-6 flex w-36 items-center gap-3">
            <span className="h-0.5 flex-1 bg-gradient-to-r from-[#FFAD33] to-[#ED1F00]" />
            <span className="h-1 w-1 rounded-full bg-[#FF6B00]" />
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#A6A3A5] sm:text-base sm:leading-7">
            Have a project in mind? Tell us what you&apos;re building, what you need, and where you want to go. We&apos;ll get back to you with the next steps.
          </p>
        </header>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="flex flex-col justify-between gap-10 lg:col-span-5 lg:py-1">
            <div>
              <h2 className="font-display text-2xl leading-tight font-bold sm:text-3xl">
                Have a project,<br />question, or idea?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#A6A3A5]">
                Whether you&apos;re starting from scratch or improving an existing product, we&apos;d love to hear about it.
              </p>
            </div>

            <div className="divide-y divide-[#29272A] border-y border-[#29272A]">
              <a className="group flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between" href="mailto:hello@agniro.com">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#777277]">Email</span>
                <span className="inline-flex items-center gap-2 font-mono text-sm group-hover:text-[#FFAD33]">
                  <Mail aria-hidden="true" className="h-4 w-4 text-[#FF6B00] sm:hidden" />
                  hello@agniro.com
                </span>
              </a>
              <div className="group flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#777277]">Phone</span>
                <span className="inline-flex items-center gap-2 font-mono text-sm group-hover:text-[#FFAD33]">
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#FF6B00] sm:hidden" />
                  +91 XXXXX XXXXX
                </span>
              </div>
              <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#777277]">Location</span>
                <span className="inline-flex items-center gap-2 font-mono text-sm">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-[#FF6B00] sm:hidden" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFAD33]" /> India
                </span>
              </div>
            </div>

            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#777277]">Networks</p>
              <div className="flex flex-wrap gap-2">
                {[
                  ['LinkedIn', 'https://linkedin.com'],
                  ['GitHub', 'https://github.com'],
                  ['Instagram', 'https://instagram.com'],
                ].map(([name, href]) => (
                  <a
                    key={name}
                    className="inline-flex items-center gap-2 rounded border border-[#29272A] bg-[#121216]/60 px-3 py-2 font-mono text-[11px] transition hover:border-[#FF6B00]/60 hover:text-[#FFAD33]"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {name}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-3 border-t border-[#29272A]/70 pt-5 opacity-50 sm:flex">
              <span aria-hidden="true" className="font-mono text-2xl text-[#FFAD33]">◇</span>
              <p className="font-mono text-[9px] uppercase leading-4 tracking-widest text-[#A6A3A5]">
                Precision spec // Agniro channel<br />Direct inquiry protocol : 00-ENG
              </p>
            </div>
          </aside>

          <div className="relative lg:col-span-7">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-3xl bg-[#FF6B00]/10 blur-xl" />
            <section aria-label="Project inquiry form" className="relative rounded-2xl border border-[#29272A] bg-[#121216] p-5 shadow-2xl sm:p-8 lg:p-9">
              <div className="mb-7 flex items-center justify-between border-b border-[#29272A] pb-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  Project inquiry dossier
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#777277] sm:text-[10px]">Secure intake</span>
              </div>

              <form className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 sm:gap-y-6" onSubmit={submitInquiry}>
                <label className={labelClass} htmlFor="contact-name">
                  Full name <span className="text-[#FF6B00]">*</span>
                  <input autoComplete="name" className={fieldClass} id="contact-name" maxLength={100} name="name" onChange={updateField} placeholder="Your name" required value={form.name} />
                </label>
                <label className={labelClass} htmlFor="contact-email">
                  Email address <span className="text-[#FF6B00]">*</span>
                  <input autoComplete="email" className={fieldClass} id="contact-email" maxLength={254} name="email" onChange={updateField} placeholder="you@example.com" required type="email" value={form.email} />
                </label>
                <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-phone">
                  Phone
                  <input autoComplete="tel" className={fieldClass} id="contact-phone" maxLength={30} name="phone" onChange={updateField} placeholder="+91 00000 00000" type="tel" value={form.phone} />
                </label>
                <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-company">
                  Company / organization
                  <input autoComplete="organization" className={fieldClass} id="contact-company" maxLength={160} name="company" onChange={updateField} placeholder="Your company" value={form.company} />
                </label>
                <label className={labelClass} htmlFor="contact-project">
                  What are you looking to build? <span className="text-[#FF6B00]">*</span>
                  <select className={`${fieldClass} cursor-pointer`} id="contact-project" name="projectType" onChange={updateField} required value={form.projectType}>
                    <option disabled value="">Select an option</option>
                    {projectTypes.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                  </select>
                </label>
                <label className={labelClass} htmlFor="contact-budget">
                  Budget range
                  <select className={`${fieldClass} cursor-pointer`} id="contact-budget" name="budget" onChange={updateField} value={form.budget}>
                    <option value="">Select your budget</option>
                    {budgetRanges.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                  </select>
                </label>
                <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-description">
                  Project details <span className="text-[#FF6B00]">*</span>
                  <textarea className={`${fieldClass} min-h-32 resize-y leading-6`} id="contact-description" maxLength={5000} minLength={20} name="description" onChange={updateField} placeholder="Tell us briefly about your project, goals and requirements..." required rows={4} value={form.description} />
                </label>
                <div className="sm:col-span-2">
                  <button className="contact-submit-glow flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FFEBC7] via-[#FFAD33] to-[#ED1F00] px-5 py-3 text-sm font-bold text-[#17100A] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-70" disabled={submitting} type="submit">
                    {submitting ? <><LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> Sending inquiry</> : <>Send project inquiry <ArrowRight aria-hidden="true" className="h-4 w-4" /></>}
                  </button>
                  {feedback.message && (
                    <p className={`mt-3 text-sm ${feedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
                      {feedback.message}
                    </p>
                  )}
                  <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-[#777277]">
                    Response time: &lt; 24 hours // NDA on request
                  </p>
                </div>
              </form>
            </section>
          </div>
        </div>

        <footer className="mt-12 flex flex-col gap-2 border-t border-[#29272A]/70 pt-5 font-mono text-[9px] uppercase tracking-widest text-[#777277] sm:flex-row sm:justify-between">
          <span>Agniro studio // Architectural inquiry suite</span>
          <span>Term.10 // 08-contact-matrix</span>
        </footer>
      </div>
    </main>
  );
};

export default ContactUs;

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { EVENT_CONFIG } from "@/lib/event"

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nextupboxingleague/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590315922265",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

const QUICK_LINKS = [
  { label: "Boxers", href: "/boxers" },
  { label: "Events", href: "/events" },
  { label: "Rankings", href: "/rankings" },
  { label: "Champions", href: "/champions" },
]

export function Footer() {
  return (
    <footer id="about" className="footer-nike">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16 lg:gap-24">

          {/* Brand */}
          <Reveal as="fade-up" delay={0} duration={0.8}>
            <div>
              <Image
                src="/logo-footer.png"
                alt="NextUp Boxing"
                width={140}
                height={56}
                className="h-auto w-28 sm:w-32"
              />
              <p className="mt-5 max-w-sm text-sm font-normal leading-relaxed text-white/55">
                Premium boxing events, live fight nights, and fighter stories — showcasing elite amateurs on Long Island.
              </p>

              <div className="mt-8 flex items-center gap-5">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-magnetic
                    className="text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    <span className="block h-5 w-5">{icon}</span>
                  </a>
                ))}
              </div>

              <nav aria-label="Quick links" className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="editorial-meta text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </Reveal>

          {/* Next event */}
          <Reveal as="fade-up" delay={120} duration={0.8}>
            <div className="border border-white/10 bg-white/[0.02] p-7 sm:p-9">
              <span className="section-eyebrow text-[var(--gold)]">Next Event</span>
              <h3 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-white sm:text-4xl">
                {EVENT_CONFIG.name}
              </h3>
              <p className="mt-4 text-sm text-white/55">
                {EVENT_CONFIG.displayDate} · {EVENT_CONFIG.venue}, {EVENT_CONFIG.city}
              </p>
              <a
                href="https://strongislandfights.com"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="cta-cinematic cta-primary-c mt-7 flex h-12 w-full items-center justify-center bg-white px-8 font-sans text-sm font-medium uppercase tracking-wide text-[#111111] sm:w-auto"
              >
                <span className="cta-sweep" />
                <span className="cta-inner">
                  <span className="cta-label cta-label-top">Buy Tickets</span>
                  <span className="cta-label cta-label-bot">Buy Tickets</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal as="fade-up" delay={200} duration={0.7}>
          <div className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-xs font-normal text-white/40">
              © {new Date().getFullYear()} NextUp Boxing League. All rights reserved.
            </p>
            <Image
              src="/usa-boxing-metro-logo.png"
              alt="USA Boxing Metro"
              width={72}
              height={28}
              className="h-auto opacity-70"
            />
          </div>
        </Reveal>
      </div>
    </footer>
  )
}

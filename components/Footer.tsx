import Image from "next/image"
import Link from "next/link"

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

const EXPLORE_LINKS = [
  { label: "Boxers", href: "/boxers" },
  { label: "Events", href: "/events" },
  { label: "Rankings", href: "/rankings" },
  { label: "Champions", href: "/champions" },
  { label: "Stream", href: "/#youtube" },
]

export function Footer() {
  return (
    <footer id="about" className="footer-nike">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
          {/* Brand */}
          <div>
            <Image
              src="/logo-footer.png"
              alt="NextUp Boxing"
              width={140}
              height={56}
              className="h-auto w-28 sm:w-32"
            />
            <p className="mt-4 max-w-sm text-sm font-normal leading-relaxed text-white/60">
              Premium boxing events, live fight nights, and fighter stories.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white transition-colors hover:text-white/60"
                >
                  <span className="block h-5 w-5">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base font-medium text-white">Explore</h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-base font-normal text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tickets */}
          <div>
            <h3 className="text-base font-medium text-white">Fight Night 11</h3>
            <p className="mt-4 text-base font-normal text-white/60">
              Get your tickets for the next event.
            </p>
            <a
              href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-gold px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#111111] transition-colors hover:bg-[var(--gold-light)]"
            >
              Buy Tickets
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs font-normal text-white/50">
            © 2026 NextUp Boxing League. All rights reserved.
          </p>
          <div className="rounded-full  px-3 py-1.5">
            <Image
              src="/usa-boxing-metro-logo.png"
              alt="USA Boxing Metro"
              width={72}
              height={28}
              className="h-auto opacity-80"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Image from "next/image"

const footerLinks = {
  "The League": ["About Us", "Our Story", "Press", "Careers"],
  Events: ["Upcoming Fights", "Past Events", "Fight Calendar", "Tickets"],
  Streaming: ["Live PPV", "On Demand", "Subscriptions", "Apps"],
  Support: ["Help Center", "Contact Us", "FAQs", "Terms"],
}

export function Footer() {
  return (
    <footer id="about" className="relative overflow-hidden bg-[#0d1124] text-white">
      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#1e2d5e]/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#c5203a]/4 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/5 py-12 sm:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div
                className="mb-1 select-none uppercase leading-none text-white/6"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  letterSpacing: "0.04em",
                  WebkitTextStroke: "1px rgba(184, 150, 46, 0.15)",
                  color: "transparent",
                }}
              >
                NEXTUP
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="NextUp Boxing"
                  width={140}
                  height={70}
                  className="h-auto w-28 sm:w-36"
                />
                <div className="h-12 w-px bg-white/10" />
                <p className="max-w-[210px] text-sm leading-relaxed text-white/38">
                  The future of boxing entertainment. Premium fights, world-class streaming, and a
                  sharper editorial voice around the sport.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="section-eyebrow text-white/32">Follow the League</span>
              <p className="max-w-xs text-sm leading-relaxed text-white/38">
                Coverage, announcements, and fighter stories across live, social, and editorial
                channels.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-12 sm:py-16 md:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="section-eyebrow mb-5 text-[#d4ae44]/72">{heading}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/34 transition-colors duration-300 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#b8962e]/30" />
            <p className="text-[0.72rem] text-white/22">© 2026 NextUp Boxing League. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[0.72rem] text-white/22 transition-colors duration-300 hover:text-white/50"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

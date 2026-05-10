"use client"

import Image from "next/image"
import {  MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  "The Club": ["About Us", "Our Story", "Coaches & Staff", "Careers", "Press"],
  Programs: ["Youth Boxing", "Amateur Competition", "Fitness Boxing", "Personal Coaching"],
  Community: ["Events & Fights", "Tournaments", "Merchandise", "News & Stories"],
  Support: ["Help Center", "Contact Us", "FAQs", "Terms & Privacy"],
}



const contact = [
  { icon: MapPin, text: "142 Flatbush Ave, Brooklyn, NY 11217" },
  { icon: Phone, text: "+1 (718) 555-0192" },
  { icon: Mail, text: "info@nextupboxing.com" },
]

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0d1124] text-white overflow-hidden">
      {/* Brand gradient top rule */}
      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1e2d5e]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c5203a]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Masthead top block */}
        <div className="border-b border-white/5 py-12 sm:py-16">
          <div className="grid sm:grid-cols-[1fr,auto] gap-10 items-start">

            {/* Brand + contact */}
            <div>
              {/* Ghost wordmark */}
              <div className="uppercase leading-none mb-4 select-none"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(184, 150, 46, 0.12)',
                  letterSpacing: '0.04em',
                }}>
                NEXTUP
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Image src="/logo.png" alt="NextUp Boxing League" width={140} height={70} className="w-28 sm:w-36 h-auto" />
                <div className="w-px h-12 bg-white/8" />
                <p className="text-xs text-white/30 leading-relaxed max-w-[200px]">
                  Brooklyn's premier boxing club. Developing champions since 2014.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-2">
                {contact.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="w-3.5 h-3.5 text-[#b8962e] flex-shrink-0" />
                    <span className="text-xs text-white/35 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social + hours */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/25 mb-3 block">Follow Us</span>
              </div>

              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/25 mb-3 block">Gym Hours</span>
                <div className="space-y-1">
                  {[
                    ["Mon – Fri", "6:00 AM – 10:00 PM"],
                    ["Saturday", "8:00 AM – 6:00 PM"],
                    ["Sunday", "10:00 AM – 4:00 PM"],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex gap-4">
                      <span className="text-[10px] font-medium text-white/25 w-24">{day}</span>
                      <span className="text-[10px] text-[#b8962e]/60">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12 sm:py-14">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b8962e]/65 mb-5">{heading}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/28 hover:text-white transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#b8962e]/25" />
            <p className="text-[10px] text-white/18">© 2026 NextUp Boxing League. All rights reserved.</p>
          </div>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-[10px] text-white/18 hover:text-white/45 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

/* ─────────────────────────────────────────── */
/*  Data                                       */
/* ─────────────────────────────────────────── */

const TICKER_ITEMS = [
  "STRONG ISLAND FIGHT NIGHT 11",
  "BUY TICKETS NOW",
  "SANCTIONED BY USA BOXING METRO",
  "PREMIUM FIGHTS · WORLD-CLASS STREAMING",
  "THE FUTURE OF BOXING ENTERTAINMENT",
  "NEXTUP BOXING LEAGUE",
]

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nextupboxingleague/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590315922265",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

const NAV_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Our Story", href: "#" },
  { label: "Press", href: "#" },
  { label: "Boxers", href: "/boxers" },
]

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"]

/* ─────────────────────────────────────────── */
/*  Sub-components                             */
/* ─────────────────────────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="nub-eyebrow">
      <span className="nub-eyebrow-line" aria-hidden="true" />
      <span className="nub-eyebrow-text">{children}</span>
    </div>
  )
}

function DiamondDivider() {
  return (
    <div className="nub-divider" aria-hidden="true">
      <span className="nub-divider-line" />
      <span className="nub-divider-gem" />
      <span className="nub-divider-line" />
    </div>
  )
}

/* ─────────────────────────────────────────── */
/*  Footer                                     */
/* ─────────────────────────────────────────── */

export function Footer() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Azeret+Mono:wght@300;400;500&display=swap');

        @keyframes nub-ticker { to { transform: translateX(-50%); } }
        @keyframes nub-glow   { 0%,100%{opacity:1} 50%{opacity:.48} }
        @keyframes nub-scan   {
          0%  { left:-70px; opacity:0 }
          12% { opacity:1 }
          88% { opacity:1 }
          100%{ left:100%; opacity:0 }
        }

        .nub-footer {
          --gold:       #b8962e;
          --gold-lt:    #d4ae44;
          --gold-dim:   rgba(184,150,46,.38);
          --red:        #c5203a;
          --navy:       #1e2d5e;
          --bg:         #080c18;
          --border:     rgba(255,255,255,.05);
          --text-ghost: rgba(255,255,255,.26);

          position: relative;
          overflow: hidden;
          background: var(--bg);
          color: #fff;
          font-family: 'General', sans-serif;
        }

        .nub-atmo {
          position:absolute;
          inset:0;
          pointer-events:none;
          background:
            radial-gradient(ellipse 90% 55% at 10% -8%, rgba(30,45,94,.28) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 110%, rgba(197,32,58,.08) 0%, transparent 50%);
        }

        .nub-dots {
          position:absolute;
          inset:0;
          pointer-events:none;
          background-image: radial-gradient(circle, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .nub-top-border {
          position:relative;
          height:2px;
          z-index:2;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--navy) 8%,
            var(--gold) 30%,
            var(--gold-lt) 50%,
            var(--gold) 70%,
            var(--red) 90%,
            transparent 100%
          );

          animation: nub-glow 3.6s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(184,150,46,.35);
        }

        .nub-top-border::after {
          content:'';
          position:absolute;
          top:-4px;
          width:60px;
          height:10px;
          background: rgba(212,174,68,.4);
          filter:blur(6px);
          animation: nub-scan 7s ease-in-out infinite 1s;
        }

        .nub-ticker-wrap {
          position:relative;
          overflow:hidden;
          z-index:2;
          background: rgba(184,150,46,.038);
          border-bottom: 1px solid rgba(184,150,46,.1);
          padding: 9px 0;
        }

        .nub-ticker-fade {
          position:absolute;
          top:0;
          bottom:0;
          width:90px;
          z-index:2;
        }

        .nub-ticker-fade--l {
          left:0;
          background:linear-gradient(90deg, var(--bg), transparent);
        }

        .nub-ticker-fade--r {
          right:0;
          background:linear-gradient(270deg, var(--bg), transparent);
        }

        .nub-ticker-track {
          display:flex;
          width:max-content;
          animation: nub-ticker 32s linear infinite;
        }

        .nub-ticker-item {
          display:inline-flex;
          align-items:center;
          gap:24px;
          padding:0 28px;
          white-space:nowrap;
          font-family:'Barlow Condensed',sans-serif;
          font-weight:600;
          font-size:.68rem;
          letter-spacing:.24em;
          text-transform:uppercase;
          color: rgba(212,174,68,.6);
        }

        .nub-ticker-gem {
          width:5px;
          height:5px;
          flex-shrink:0;
          background:rgba(197,32,58,.45);
          transform:rotate(45deg);
        }

        .nub-inner {
          position:relative;
          z-index:1;
          max-width:1280px;
          margin:0 auto;
          padding:0 28px;
        }

        .nub-ghost {
          position:absolute;
          top:-10px;
          left:-12px;
          pointer-events:none;
          user-select:none;
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900;
          font-size:clamp(5rem,12vw,8.5rem);
          letter-spacing:.06em;
          text-transform:uppercase;
          color:transparent;
          -webkit-text-stroke: 1px rgba(184,150,46,.055);
          line-height:1;
        }

        .nub-grid {
          position:relative;
          z-index:1;
          display:grid;
          grid-template-columns: 1.25fr 1fr .6fr;
          padding-top:52px;
        }

        .nub-brand {
          padding:0 52px 56px 0;
          border-right:1px solid var(--border);
        }

        .nub-bracket {
          position:relative;
          display:inline-block;
          margin-bottom:28px;
          padding:10px 12px;
        }

        .nub-bracket::before,
        .nub-bracket::after {
          content:'';
          position:absolute;
          width:18px;
          height:18px;
        }

        .nub-bracket::before {
          top:0;
          left:0;
          border-top:1.5px solid var(--gold-dim);
          border-left:1.5px solid var(--gold-dim);
        }

        .nub-bracket::after {
          bottom:0;
          right:0;
          border-bottom:1.5px solid var(--gold-dim);
          border-right:1.5px solid var(--gold-dim);
        }

        .nub-tagline {
          max-width:275px;
          margin:0;
          font-weight:300;
          font-size:.77rem;
          line-height:1.9;
          color: var(--text-ghost);
        }

        .nub-social-col {
          padding:24px 44px 56px;
          border-right:1px solid var(--border);
        }

        .nub-social-desc {
          margin:0 0 28px;
          max-width:240px;
          font-weight:300;
          font-size:.73rem;
          line-height:1.82;
          color:rgba(255,255,255,.22);
        }

        .nub-icon-row {
          display:flex;
          gap:10px;
          margin-bottom:34px;
        }

        .nub-icon-btn {
          position:relative;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:7px;
          width:56px;
          text-decoration:none;
          color:rgba(255,255,255,.36);
          transition: color .28s;
        }

        .nub-icon-cell {
          width:52px;
          height:52px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:1px solid rgba(255,255,255,.1);
          background:rgba(255,255,255,.022);
          clip-path:polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px);
          transition: border-color .28s, background .28s;
        }

        .nub-icon-cell svg {
          width:20px;
          height:20px;
        }

        .nub-icon-label {
          font-size:.5rem;
          letter-spacing:.14em;
          text-transform:uppercase;
          color:rgba(255,255,255,.22);
          font-family:'Azeret Mono',monospace;
        }

        .nub-icon-btn:hover {
          color: var(--gold-lt);
        }

        .nub-icon-btn:hover .nub-icon-cell {
          border-color: rgba(184,150,46,.65);
          background:rgba(184,150,46,.06);
        }

        .nub-divider {
          display:flex;
          align-items:center;
          gap:8px;
          margin:0 0 28px;
        }

        .nub-divider-line {
          flex:1;
          height:1px;
          background:rgba(255,255,255,.05);
        }

        .nub-divider-gem {
          width:5px;
          height:5px;
          background:var(--gold-dim);
          transform:rotate(45deg);
        }

        .nub-cta {
          position:relative;
          overflow:hidden;
          display:inline-flex;
          align-items:center;
          gap:10px;
          color:#fff;
          text-decoration:none;
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;
          font-size:.82rem;
          letter-spacing:.17em;
          text-transform:uppercase;
          border:1px solid rgba(197,32,58,.5);
          padding:11px 22px;
          clip-path:polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px);
        }

        .nub-nav-col {
          padding:92px 0 56px 38px;
        }

        .nub-nav-list {
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        .nub-nav-link {
          display:flex;
          align-items:center;
          gap:10px;
          color:rgba(255,255,255,.22);
          font-size:.64rem;
          letter-spacing:.15em;
          text-transform:uppercase;
          text-decoration:none;
          transition:color .28s;
        }

        .nub-nav-dot {
          width:4px;
          height:4px;
          flex-shrink:0;
          background:rgba(184,150,46,.28);
          transform:rotate(45deg);
        }

        .nub-nav-link:hover {
          color:rgba(255,255,255,.72);
        }

        .nub-eyebrow {
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:14px;
        }

        .nub-eyebrow-line {
          display:block;
          width:18px;
          height:1px;
          background:rgba(184,150,46,.42);
          flex-shrink:0;
        }

        .nub-eyebrow-text {
          font-size:.58rem;
          letter-spacing:.26em;
          text-transform:uppercase;
          color:rgba(212,174,68,.5);
          font-weight:500;
        }

        .nub-hud {
          position:relative;
          display:flex;
          align-items:center;
          justify-content:space-between;
          flex-wrap:wrap;
          gap:12px;
          padding:14px 0 22px;
          border-top:1px solid var(--border);
        }

        .nub-hud::before {
          content:'';
          position:absolute;
          top:-1px;
          left:0;
          width:72px;
          height:1px;
          background:linear-gradient(90deg, var(--gold), transparent);
        }

        .nub-hud-left {
          display:flex;
          align-items:center;
          gap:8px;
          flex-wrap:wrap;
        }

        .nub-hud-gem {
          color:rgba(184,150,46,.32);
          font-size:.42rem;
        }

        .nub-copyright {
          font-size:.58rem;
          color:rgba(255,255,255,.15);
          letter-spacing:.05em;
        }

        .nub-hud-sanc {
          display:flex;
          align-items:center;
          margin-left:10px;
          padding-left:14px;
          border-left:1px solid rgba(255,255,255,.06);
        }

        .nub-legal-links {
          display:flex;
          gap:20px;
          flex-wrap:wrap;
        }

        .nub-legal-link {
          color:rgba(255,255,255,.15);
          font-size:.58rem;
          letter-spacing:.09em;
          text-transform:uppercase;
          text-decoration:none;
          transition:color .25s;
        }

        .nub-legal-link:hover {
          color:rgba(255,255,255,.44);
        }

        @media (max-width:860px) {
          .nub-grid {
            grid-template-columns:1fr;
          }

          .nub-brand,
          .nub-social-col {
            border-right:none;
            border-bottom:1px solid var(--border);
            padding-right:0;
          }

          .nub-nav-col {
            padding:36px 0 48px;
          }

          .nub-ghost {
            font-size:18vw;
          }
        }
      `}</style>

      <footer id="about" className="nub-footer">
        <div className="nub-atmo" aria-hidden="true" />
        <div className="nub-dots" aria-hidden="true" />
        <div className="nub-top-border" aria-hidden="true" />

        {/* Ticker */}
        <div className="nub-ticker-wrap" aria-label="Latest updates">
          <div className="nub-ticker-fade nub-ticker-fade--l" aria-hidden="true" />
          <div className="nub-ticker-fade nub-ticker-fade--r" aria-hidden="true" />

          <div className="nub-ticker-track" aria-hidden="true">
            {doubled.map((item, i) => (
              <span key={i} className="nub-ticker-item">
                {item}
                <span className="nub-ticker-gem" />
              </span>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="nub-inner">
          <div className="nub-ghost" aria-hidden="true">
            NEXTUP
          </div>

          <div className="nub-grid">
            {/* Brand */}
            <div className="nub-brand">
              <div className="nub-bracket">
                <Image
                  src="/logo.png"
                  alt="NextUp Boxing"
                  width={140}
                  height={56}
                  className="h-auto w-28 sm:w-36"
                />
              </div>

              <p className="nub-tagline">
                The future of boxing entertainment. Premium fights, world-class
                streaming, and a sharper editorial voice around the sport.
              </p>
            </div>

            {/* Social */}
            <div className="nub-social-col">
              <Eyebrow>Follow the League</Eyebrow>

              <p className="nub-social-desc">
                Coverage, announcements, and fighter stories across live,
                social, and editorial channels.
              </p>

              <div className="nub-icon-row">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="nub-icon-btn"
                  >
                    <span className="nub-icon-cell">{icon}</span>
                    <span className="nub-icon-label">{label}</span>
                  </a>
                ))}
              </div>

              <DiamondDivider />

              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="nub-cta"
              >
                <span>Buy Tickets — Fight Night 11</span>
              </a>
            </div>

            {/* Nav */}
            <div className="nub-nav-col">
              <Eyebrow>The League</Eyebrow>

              <nav className="nub-nav-list" aria-label="Footer navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="nub-nav-link"
                  >
                    <span className="nub-nav-dot" aria-hidden="true" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* HUD */}
          <div className="nub-hud">
            <div className="nub-hud-left">
              <span className="nub-hud-gem" aria-hidden="true">
                ◆
              </span>

              <span className="nub-copyright">
                © 2026 NextUp Boxing League. All rights reserved.
              </span>

              <div className="nub-hud-sanc">
                <Image
                  src="/usa-boxing-metro-logo.png"
                  alt="USA Boxing Metro"
                  width={72}
                  height={28}
                  className="h-auto opacity-70"
                />
              </div>
            </div>

            <div className="nub-legal-links">
              {LEGAL_LINKS.map((item) => (
                <a key={item} href="#" className="nub-legal-link">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
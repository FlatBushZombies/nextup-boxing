"use client"

import Image from "next/image"

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

export function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Azeret+Mono:wght@300;400;500&display=swap');

        @keyframes nub-glow { 0%,100%{opacity:1} 50%{opacity:.48} }

        .nub-footer {
          --gold:       #b8962e;
          --gold-lt:    #d4ae44;
          --gold-dim:   rgba(184,150,46,.38);
          --navy:       #1e2d5e;
          --bg:         #080c18;
          --border:     rgba(255,255,255,.08);
          --text-ghost: rgba(255,255,255,.26);

          position: relative;
          overflow: hidden;
          background: var(--bg);
          color: #fff;
          font-family: var(--font-sans);
        }

        .nub-top-border {
          position: relative;
          height: 2px;
          z-index: 2;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--navy) 8%,
            var(--gold) 30%,
            var(--gold-lt) 50%,
            var(--gold) 70%,
            var(--navy) 90%,
            transparent 100%
          );
          animation: nub-glow 3.6s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(184,150,46,.35);
        }

        .nub-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 42px 28px 24px;
        }

        .nub-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 32px;
        }

        .nub-brand {
          display: flex;
          align-items: center;
          gap: 24px;
          min-width: 0;
        }

        .nub-bracket {
          position: relative;
          display: inline-block;
          flex-shrink: 0;
          padding: 10px 12px;
        }

        .nub-bracket::before,
        .nub-bracket::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
        }

        .nub-bracket::before {
          top: 0;
          left: 0;
          border-top: 1.5px solid var(--gold-dim);
          border-left: 1.5px solid var(--gold-dim);
        }

        .nub-bracket::after {
          bottom: 0;
          right: 0;
          border-bottom: 1.5px solid var(--gold-dim);
          border-right: 1.5px solid var(--gold-dim);
        }

        .nub-tagline {
          max-width: 390px;
          margin: 0;
          font-weight: 300;
          font-size: .77rem;
          line-height: 1.75;
          color: var(--text-ghost);
        }

        .nub-social-col {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 18px;
        }

        .nub-icon-row {
          display: flex;
          gap: 10px;
        }

        .nub-icon-btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          width: 56px;
          text-decoration: none;
          color: rgba(255,255,255,.36);
          transition: color .28s;
        }

        .nub-icon-cell {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.022);
          clip-path: polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px);
          transition: border-color .28s, background .28s;
        }

        .nub-icon-cell svg {
          width: 20px;
          height: 20px;
        }

        .nub-icon-label {
          font-size: .5rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.22);
          font-family: 'Azeret Mono', monospace;
        }

        .nub-icon-btn:hover {
          color: var(--gold-lt);
        }

        .nub-icon-btn:hover .nub-icon-cell {
          border-color: rgba(184,150,46,.65);
          background: rgba(184,150,46,.06);
        }

        .nub-cta {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: .82rem;
          letter-spacing: .17em;
          text-transform: uppercase;
          border: 1px solid rgba(184,150,46,.46);
          padding: 11px 22px;
          clip-path: polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px);
        }

        .nub-hud {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
          padding-top: 18px;
          border-top: 1px solid var(--border);
        }

        .nub-hud::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 72px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .nub-hud-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .nub-hud-gem {
          color: rgba(184,150,46,.32);
          font-size: .42rem;
        }

        .nub-copyright {
          font-size: .58rem;
          color: rgba(255,255,255,.18);
          letter-spacing: .05em;
        }

        .nub-hud-sanc {
          display: flex;
          align-items: center;
          margin-left: 10px;
          padding-left: 14px;
          border-left: 1px solid rgba(255,255,255,.06);
        }

        @media (max-width: 860px) {
          .nub-grid {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }

          .nub-brand {
            align-items: flex-start;
          }

          .nub-social-col {
            justify-content: flex-start;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 560px) {
          .nub-inner {
            padding: 34px 20px 22px;
          }

          .nub-brand {
            flex-direction: column;
            gap: 16px;
          }

          .nub-social-col {
            gap: 14px;
          }

          .nub-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <footer id="about" className="nub-footer">
        <div className="nub-top-border" aria-hidden="true" />

        <div className="nub-inner">
          <div className="nub-grid">
            <div className="nub-brand">
              <div className="nub-bracket">
                <Image
                  src="/logo-footer.png"
                  alt="NextUp Boxing"
                  width={140}
                  height={56}
                  className="h-auto w-28 sm:w-36"
                />
              </div>
              <p className="nub-tagline">
                Premium boxing events, live fight nights, and fighter stories.
              </p>
            </div>

            <div className="nub-social-col">
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

              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="nub-cta"
              >
                <span>Buy Tickets — Fight Night 11</span>
              </a>
            </div>
          </div>

          <div className="nub-hud">
            <div className="nub-hud-left">
              <span className="nub-hud-gem" aria-hidden="true">◆</span>
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
          </div>
        </div>
      </footer>
    </>
  )
}
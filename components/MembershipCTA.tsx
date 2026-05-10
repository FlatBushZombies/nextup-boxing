"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Check, Loader2, CheckCircle2 } from "lucide-react"

const tiers = [
  {
    id: "foundation",
    name: "Foundation",
    price: "$75",
    period: "/ month",
    desc: "Perfect for beginners exploring the sport",
    features: [
      "3 classes per week",
      "Access to gym floor",
      "Basic equipment provided",
      "Group coaching sessions",
    ],
    highlight: false,
    accent: "#1e2d5e",
  },
  {
    id: "champion",
    name: "Champion",
    price: "$120",
    period: "/ month",
    desc: "Our most popular membership tier",
    features: [
      "Unlimited classes",
      "Full gym access 6AM–10PM",
      "Competition pathway access",
      "Monthly coach check-in",
      "Member discount on events",
    ],
    highlight: true,
    accent: "#c5203a",
  },
  {
    id: "elite",
    name: "Elite",
    price: "$200",
    period: "/ month",
    desc: "For serious competitors and aspiring pros",
    features: [
      "Everything in Champion",
      "2x private coaching/month",
      "Fight camp preparation",
      "Video analysis sessions",
      "Priority event registration",
      "Nutrition consultation",
    ],
    highlight: false,
    accent: "#b8962e",
  },
]

export function MembershipCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    await new Promise(r => setTimeout(r, 1200))
    setStatus("success")
    setEmail("")
  }

  return (
    <section id="membership" ref={ref} className="relative overflow-hidden">
      {/* Membership tiers — dark section */}
      <div className="relative bg-[#0d1124] py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', backgroundSize: '128px', mixBlendMode: 'overlay',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

        {/* Ghost watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span className="text-white/[0.02] uppercase"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(8rem, 22vw, 20rem)', lineHeight: 1 }}>
            JOIN
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Membership</span>
              <span className="h-px w-10 bg-[#c5203a]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-[0.88] mb-4"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              Choose Your{" "}
              <span style={{ color: '#b8962e' }}>Journey</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              className="text-white/40 max-w-xl mx-auto text-sm" style={{ lineHeight: '1.8' }}
            >
              All memberships include full access to our state-of-the-art facility, expert coaching staff, 
              and a community of serious athletes. No contracts — cancel anytime.
            </motion.p>
          </div>

          {/* Tiers grid */}
          <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
            {tiers.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                className={`relative rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  t.highlight
                    ? "border-2 hover:shadow-2xl hover:shadow-[#c5203a]/20"
                    : "border hover:shadow-xl hover:shadow-black/20"
                }`}
                style={{ borderColor: t.highlight ? t.accent : "rgba(255,255,255,0.08)" }}
              >
                {t.highlight && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-white"
                    style={{ background: t.accent }}>
                    Most Popular
                  </div>
                )}

                <div className={`p-7 sm:p-8 ${t.highlight ? "pt-10" : ""} bg-white/4 flex flex-col h-full`}>
                  <div className="mb-5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 block" style={{ color: t.accent }}>
                      {t.name}
                    </span>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-white leading-none"
                        style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '3rem' }}>
                        {t.price}
                      </span>
                      <span className="text-white/30 text-sm font-medium pb-1">{t.period}</span>
                    </div>
                    <p className="text-xs text-white/35">{t.desc}</p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: t.accent }} />
                        <span className="text-xs text-white/55">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold uppercase tracking-[0.18em] text-sm rounded-sm transition-all duration-300 hover:-translate-y-0.5 group"
                    style={{
                      background: t.highlight ? t.accent : "transparent",
                      color: t.highlight ? "white" : "white",
                      border: t.highlight ? "none" : `1px solid rgba(255,255,255,0.12)`,
                    }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
            className="text-center text-xs text-white/20 mt-8 font-medium"
          >
            No contracts. Cancel anytime. First session free — come and see for yourself.
          </motion.p>
        </div>
      </div>

      {/* Email CTA strip — white */}
      <div className="relative bg-[#c5203a] py-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat', backgroundSize: '128px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white uppercase leading-[0.9] mb-3"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Stay in the Fight
          </motion.h3>
          <p className="text-white/70 text-sm mb-8 max-w-md mx-auto" style={{ lineHeight: '1.8' }}>
            Get exclusive club news, training tips, event announcements, and member offers delivered to your inbox.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold text-sm uppercase tracking-[0.15em]">You're in the ring! Check your inbox.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 bg-white/15 border border-white/25 rounded-sm text-white placeholder:text-white/50 text-sm font-medium outline-none focus:bg-white/20 focus:border-white/50 transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1e2d5e] hover:bg-[#0d1124] text-white font-bold uppercase tracking-[0.18em] text-sm rounded-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, X, Loader2, CheckCircle2, AlertCircle, Ticket } from "lucide-react"
import { isValidEmail } from "@/lib/validation"

const STORAGE_KEY = "nub-newsletter-dismissed"
const OPEN_DELAY_MS = 1800

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setIsOpen(true), OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const close = () => {
    setIsOpen(false)
    sessionStorage.setItem(STORAGE_KEY, "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!isValidEmail(trimmedEmail)) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "You're on the list. We'll notify you first.")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f1e] shadow-2xl md:grid-cols-[1.1fr_1fr]"
          >
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden min-h-[260px] overflow-hidden md:block"
            >
              <Image
                src="/hero-boxers.webp"
                alt="NextUp Boxing League fighters"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                style={{ objectPosition: "center 20%" }}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0f1e]/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1e] via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white"
              >
                <span className="pulse-glow h-1.5 w-1.5 rounded-full bg-[#d4ae44]" />
                Fight Night 11
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-5 left-5 right-5"
              >
                <p className="font-display text-2xl uppercase leading-none text-white">
                  Strong Island
                  <span className="block text-[#d4ae44]">Fight Night 11</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Content side */}
            <div className="relative px-6 py-8 sm:px-8 sm:py-10">
              <button
                onClick={close}
                aria-label="Close newsletter signup"
                className="absolute right-4 top-4 rounded-full bg-white/5 p-1.5 text-white/40 transition-all hover:rotate-90 hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#d4ae44]/25 bg-[#d4ae44]/10 text-[#d4ae44]"
                    >
                      <Ticket size={20} />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                      className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl"
                    >
                      Get Notified First
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28, duration: 0.4, ease: "easeOut" }}
                      className="mt-2 text-sm leading-relaxed text-white/55"
                    >
                      Drop your email for ticket releases, fight card updates, and exclusive stream alerts from Next Up Boxing League.
                    </motion.p>

                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.36, duration: 0.4, ease: "easeOut" }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="mt-6"
                    >
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (status !== "idle") {
                              setStatus("idle")
                              setMessage("")
                            }
                          }}
                          disabled={status === "loading"}
                          className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#d4ae44]/50 focus:ring-1 focus:ring-[#d4ae44]/50 disabled:opacity-60"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#b8962e] via-[#d4ae44] to-[#b8962e] py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(212,174,68,0.2)] transition-all hover:shadow-[0_4px_28px_rgba(212,174,68,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            Sending
                          </>
                        ) : (
                          "Notify Me"
                        )}
                      </button>

                      {status === "error" && message ? (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-2 text-xs text-[#f87171]"
                        >
                          <AlertCircle size={14} />
                          {message}
                        </motion.p>
                      ) : null}
                    </motion.form>

                    <p className="mt-4 text-center text-[10px] text-white/30">
                      No spam. Unsubscribe any time.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex h-full flex-col items-center justify-center py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="rounded-full border border-emerald-500/25 bg-emerald-500/10 p-3 text-emerald-400"
                    >
                      <CheckCircle2 size={40} />
                    </motion.div>

                    <h4 className="mt-4 font-display text-2xl uppercase text-white">
                      You&apos;re In
                    </h4>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55">
                      {message}
                    </p>

                    <button
                      onClick={close}
                      className="mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

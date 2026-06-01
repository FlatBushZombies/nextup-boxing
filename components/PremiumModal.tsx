"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { X, User, Mail, ShieldAlert, CheckCircle2, Clock, Loader2 } from "lucide-react"

import { useCountdown } from "@/hooks/use-countdown"
import { EVENT_CONFIG, EVENT_DATE } from "@/lib/event"

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
}

// Client-side Zod validation and sanitization schema
const clientSignupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be less than 100 characters.")
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase(),
})

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const timeLeft = useCountdown(EVENT_DATE)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setName("")
      setEmail("")
      setErrors({})
      setServerError(null)
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen])

  const validateField = (field: "name" | "email", value: string) => {
    try {
      if (field === "name") {
        clientSignupSchema.shape.name.parse(value)
        setErrors((prev) => ({ ...prev, name: undefined }))
      } else {
        clientSignupSchema.shape.email.parse(value)
        setErrors((prev) => ({ ...prev, email: undefined }))
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    const validationResult = clientSignupSchema.safeParse({ name, email })

    if (!validationResult.success) {
      const formattedErrors: { name?: string; email?: string } = {}
      validationResult.error.issues.forEach((err) => {
        const path = err.path[0] as "name" | "email"
        formattedErrors[path] = err.message
      })
      setErrors(formattedErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/premium-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validationResult.data.name,
          email: validationResult.data.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("Premium sign-in error:", error)
      setServerError(error instanceof Error ? error.message : "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/8 bg-[#0c0f1e] shadow-2xl"
          >
            {/* Top accent line */}
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#c5203a] via-[#d4ae44] to-[#c5203a]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/5 p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="px-7 pb-7 pt-8">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold tracking-tight text-white">
                        Get VIP Access
                      </h4>
                      <p className="mt-1 text-sm text-white/50">
                        Fight card updates &amp; live stream links straight to your inbox.
                      </p>
                    </div>

                    {/* Countdown strip */}
                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                      <Clock size={13} className="shrink-0 text-[#d4ae44]" />
                      <span className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                        June 6 · Stereo Garden
                      </span>
                      <div className="ml-auto flex gap-2">
                        {[
                          { label: "d", val: timeLeft.days },
                          { label: "h", val: timeLeft.hours },
                          { label: "m", val: timeLeft.minutes },
                          { label: "s", val: timeLeft.seconds },
                        ].map((unit) => (
                          <div key={unit.label} className="text-center">
                            <span className="block text-sm font-bold tabular-nums text-white">
                              {unit.val.toString().padStart(2, "0")}
                            </span>
                            <span className="text-[9px] text-white/30">{unit.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Server Error */}
                    {serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400"
                      >
                        <ShieldAlert size={15} className="mt-0.5 shrink-0" />
                        <span>{serverError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3">
                      {/* Name */}
                      <div className="space-y-1">
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                            <User size={15} />
                          </span>
                          <input
                            id="premium-name"
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value)
                              if (errors.name) validateField("name", e.target.value)
                            }}
                            onBlur={() => validateField("name", name)}
                            disabled={isSubmitting}
                            className={`w-full rounded-xl border ${
                              errors.name
                                ? "border-red-500/40 bg-red-500/5"
                                : "border-white/8 bg-white/5"
                            } py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#d4ae44]/50 focus:ring-1 focus:ring-[#d4ae44]/50 disabled:opacity-50`}
                          />
                        </div>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pl-1 text-[10px] font-semibold text-red-400"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                            <Mail size={15} />
                          </span>
                          <input
                            id="premium-email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (errors.email) validateField("email", e.target.value)
                            }}
                            onBlur={() => validateField("email", email)}
                            disabled={isSubmitting}
                            className={`w-full rounded-xl border ${
                              errors.email
                                ? "border-red-500/40 bg-red-500/5"
                                : "border-white/8 bg-white/5"
                            } py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#d4ae44]/50 focus:ring-1 focus:ring-[#d4ae44]/50 disabled:opacity-50`}
                          />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pl-1 text-[10px] font-semibold text-red-400"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8962e] via-[#d4ae44] to-[#b8962e] py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(212,174,68,0.2)] transition-all hover:shadow-[0_4px_28px_rgba(212,174,68,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Securing Entry…</span>
                          </>
                        ) : (
                          <span>Reserve My Spot</span>
                        )}
                      </button>
                    </form>

                    <p className="mt-4 text-center text-[10px] text-white/30">
                      No spam. Unsubscribe any time.
                    </p>
                  </motion.div>
                ) : (
                  /* Success */
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex flex-col items-center py-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="rounded-full border border-emerald-500/25 bg-emerald-500/10 p-3 text-emerald-400"
                    >
                      <CheckCircle2 size={40} />
                    </motion.div>

                    <h4 className="mt-4 text-xl font-bold tracking-tight text-white">
                      You're In
                    </h4>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55 [overflow-wrap:anywhere]">
                      We've sent confirmation to <strong className="text-white">{email}</strong>.
                    </p>

                    <div className="mt-6 w-full rounded-xl border border-white/8 bg-white/4 p-4 text-left">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#d4ae44]">
                        Event Details
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                        <div>
                          <div className="text-[10px] uppercase text-white/35">Event</div>
                          <div className="font-semibold text-white">{EVENT_CONFIG.name}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-white/35">Date</div>
                          <div className="font-semibold text-white">{EVENT_CONFIG.displayDate}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-white/35">Venue</div>
                          <div className="font-semibold text-[#c5203a]">Stereo Garden</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-white/35">Time</div>
                          <div className="font-semibold text-white">{EVENT_CONFIG.displayTime}</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="mt-5 w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Back to Fight Hub
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
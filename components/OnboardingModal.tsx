"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { z } from "zod"
import { Phone, MapPin, ShieldCheck, CheckCircle2, Loader2, ShieldAlert } from "lucide-react"

interface OnboardingModalProps {
  isOpen: boolean
  firstName?: string
  onComplete: () => void
  onSkip: () => void
}

const onboardingSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number must be less than 20 characters."),
  location: z
    .string()
    .trim()
    .min(2, "Location is required.")
    .max(120, "Location must be less than 120 characters."),
})

type FormErrors = {
  phone?: string
  location?: string
}

export function OnboardingModal({ isOpen, firstName, onComplete, onSkip }: OnboardingModalProps) {
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [policyError, setPolicyError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const validateField = (field: keyof FormErrors, value: string) => {
    try {
      onboardingSchema.shape[field].parse(value)
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    const validationResult = onboardingSchema.safeParse({ phone, location })

    if (!validationResult.success) {
      const formattedErrors: FormErrors = {}
      validationResult.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormErrors
        formattedErrors[path] = err.message
      })
      setErrors(formattedErrors)
      return
    }

    if (!policyAccepted) {
      setPolicyError(true)
      return
    }
    setPolicyError(false)

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: validationResult.data.phone,
          location: validationResult.data.location,
          policyAccepted: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setIsSuccess(true)
      setTimeout(onComplete, 1100)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative z-10 w-full max-w-md overflow-hidden border border-white/10 bg-[#0c0f1e] shadow-2xl"
          >
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#c5203a] via-[#b8962e] to-[#c5203a]" />

            <div className="px-7 pb-7 pt-8">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="onboarding-form"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-crimson font-sans">
                        One Last Step
                      </span>
                      <h4 className="mt-2 text-2xl font-display uppercase tracking-tight text-white">
                        {firstName ? `Welcome, ${firstName}` : "Complete Your Profile"}
                      </h4>
                      <p className="mt-1 text-sm text-white/50 font-sans">
                        Tell us where you&apos;re fighting from so we can send you the right event alerts.
                      </p>
                    </div>

                    {serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 flex items-start gap-2 border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400 font-sans"
                      >
                        <ShieldAlert size={15} className="mt-0.5 shrink-0" />
                        <span>{serverError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                            <Phone size={15} />
                          </span>
                          <input
                            id="onboarding-phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                              if (errors.phone) validateField("phone", e.target.value)
                            }}
                            onBlur={() => validateField("phone", phone)}
                            disabled={isSubmitting}
                            className={`w-full border ${
                              errors.phone ? "border-red-500/40 bg-red-500/5" : "border-white/10 bg-white/5"
                            } py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#b8962e]/50 disabled:opacity-50 font-sans`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="pl-1 text-[10px] font-semibold text-red-400 font-sans">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                            <MapPin size={15} />
                          </span>
                          <input
                            id="onboarding-location"
                            type="text"
                            placeholder="City, State"
                            value={location}
                            onChange={(e) => {
                              setLocation(e.target.value)
                              if (errors.location) validateField("location", e.target.value)
                            }}
                            onBlur={() => validateField("location", location)}
                            disabled={isSubmitting}
                            className={`w-full border ${
                              errors.location ? "border-red-500/40 bg-red-500/5" : "border-white/10 bg-white/5"
                            } py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#b8962e]/50 disabled:opacity-50 font-sans`}
                          />
                        </div>
                        {errors.location && (
                          <p className="pl-1 text-[10px] font-semibold text-red-400 font-sans">{errors.location}</p>
                        )}
                      </div>

                      <label className="flex cursor-pointer items-start gap-3 border border-white/10 bg-white/4 p-3.5">
                        <input
                          type="checkbox"
                          checked={policyAccepted}
                          onChange={(e) => {
                            setPolicyAccepted(e.target.checked)
                            if (e.target.checked) setPolicyError(false)
                          }}
                          disabled={isSubmitting}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#b8962e]"
                        />
                        <span className="text-xs leading-relaxed text-white/55 font-sans">
                          <ShieldCheck size={12} className="mb-0.5 mr-1 inline text-[#b8962e]" />
                          I agree to Next Up Boxing League&apos;s{" "}
                          <Link
                            href="/privacy-policy"
                            target="_blank"
                            className="font-semibold text-white underline hover:text-[#b8962e]"
                          >
                            data collection &amp; privacy policy
                          </Link>
                          .
                        </span>
                      </label>
                      {policyError && (
                        <p className="pl-1 text-[10px] font-semibold text-red-400 font-sans">
                          You must accept the data policy to continue.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-[#b8962e] via-[#d4b65a] to-[#b8962e] py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(184,150,46,0.2)] transition-all hover:shadow-[0_4px_28px_rgba(184,150,46,0.35)] disabled:pointer-events-none disabled:opacity-60 font-sans"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Saving…</span>
                          </>
                        ) : (
                          <span>Finish Setup</span>
                        )}
                      </button>
                    </form>

                    <button
                      onClick={onSkip}
                      className="mt-4 w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/55 font-sans"
                    >
                      Maybe later
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="onboarding-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="border border-emerald-500/25 bg-emerald-500/10 p-3 text-emerald-400"
                    >
                      <CheckCircle2 size={36} />
                    </motion.div>
                    <h4 className="mt-4 text-xl font-display uppercase text-white">You&apos;re All Set</h4>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55 font-sans">
                      Your profile is complete. Welcome to the league.
                    </p>
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

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { isValidEmail } from "@/lib/validation"

type EmailSignupProps = {
  className?: string
  variant?: "default" | "hero"
}

const copyByVariant = {
  default: {
    title: "Stay in the loop",
    description: "Get event news, ticket drops, and stream updates first.",
  },
  hero: {
    title: "Get notified first",
    description: "Drop your email for ticket releases, fight card updates, and stream alerts.",
  },
} as const

export function EmailSignup({
  className,
  variant = "default",
}: EmailSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [fieldError, setFieldError] = useState("")

  const trimmedEmail = email.trim()
  const isLoading = status === "loading"
  const variantCopy = copyByVariant[variant]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trimmedEmail) {
      setStatus("error")
      setFieldError("Email is required.")
      setMessage("")
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      setStatus("error")
      setFieldError("Please enter a valid email address.")
      setMessage("")
      return
    }

    setFieldError("")
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
        setEmail("")
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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "w-full",
        variant === "hero"
          ? "editorial-surface-dark p-3"
          : "editorial-surface-light p-3",
        className
      )}
    >
      <div className="mb-3 px-1">
        <p
          className={cn(
            "section-eyebrow",
            variant === "hero" ? "text-[#b8962e]" : "text-primary"
          )}
        >
          {variantCopy.title}
        </p>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            variant === "hero" ? "text-white/55" : "text-muted-foreground"
          )}
        >
          {variantCopy.description}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2",
              variant === "hero" ? "text-white/35" : "text-muted-foreground"
            )}
          />
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (fieldError) {
                setFieldError("")
              }
              if (status !== "idle") {
                setStatus("idle")
                setMessage("")
              }
            }}
            className={cn(
              "h-14 rounded-full pl-12 pr-4 font-medium shadow-none",
              variant === "hero"
                ? "border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-[#b8962e]/60 focus-visible:ring-[#b8962e]/20"
                : "border-[#0d1124]/10 bg-white/75 text-primary placeholder:text-muted-foreground"
            )}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby="email-signup-feedback"
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "editorial-button h-14 rounded-full px-7",
            variant === "hero"
              ? "bg-[#b8962e] text-[#0d1124] hover:bg-[#a7862b] hover:shadow-[0_20px_45px_rgba(184,150,46,0.25)]"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_20px_45px_rgba(30,45,94,0.16)]"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            "Get Notified"
          )}
        </Button>
      </div>

      <div
        id="email-signup-feedback"
        aria-live="polite"
        className="min-h-6 px-1 pt-3 text-sm"
      >
        {fieldError ? (
          <p className="flex items-center gap-2 text-[#f87171]">
            <AlertCircle className="h-4 w-4" />
            {fieldError}
          </p>
        ) : null}

        {!fieldError && status === "success" ? (
          <p
            className={cn(
              "flex items-center gap-2",
              variant === "hero" ? "text-[#b8962e]" : "text-primary"
            )}
          >
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </p>
        ) : null}

        {!fieldError && status === "error" && message ? (
          <p className="flex items-center gap-2 text-[#f87171]">
            <AlertCircle className="h-4 w-4" />
            {message}
          </p>
        ) : null}
      </div>
    </motion.form>
  )
}

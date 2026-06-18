"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function SignUpForm() {
  const router = useRouter()
  const { signUp } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("Please fill in all fields.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setSubmitting(true)
    const result = await signUp(email, password, firstName, lastName)
    setSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    setSuccess(true)
    if (result.needsConfirmation) {
      setNeedsConfirmation(true)
    } else {
      setTimeout(() => router.push("/account/dashboard"), 2000)
    }
  }

  if (success) {
    return (
      <div className="flex w-full flex-col gap-4 text-center py-8">
        <div className="text-4xl">🥊</div>
        <h2 className="text-2xl font-display uppercase text-[#111111]">You&apos;re In</h2>
        {needsConfirmation ? (
          <>
            <p className="text-sm text-[#707072] font-sans">
              Account created. Check your email and click the confirmation link to activate your account.
            </p>
            <p className="text-xs text-[#9e9ea0] font-sans">
              Once confirmed,{" "}
              <Link href="/sign-in" className="font-semibold text-[#111111] hover:text-crimson transition-colors">
                sign in here
              </Link>
              {" "}to access your dashboard.
            </p>
          </>
        ) : (
          <p className="text-sm text-[#707072] font-sans">
            Account created. Taking you to your dashboard…
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-crimson font-sans">
          Join the League
        </p>
        <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight leading-none text-[#111111]">
          Create Account
        </h1>
        <p className="text-sm leading-relaxed text-[#707072] font-sans">
          Get a dashboard with upcoming events and fight-night notifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="first-name" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First"
              className="h-12 border border-[#e5e5e5] bg-white px-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="last-name" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last"
              className="h-12 border border-[#e5e5e5] bg-white px-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-email" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 border border-[#e5e5e5] bg-white px-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-password" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="h-12 w-full border border-[#e5e5e5] bg-white px-4 pr-12 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9ea0] hover:text-[#111111] transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-confirm" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
            Confirm Password
          </label>
          <input
            id="signup-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat password"
            className="h-12 border border-[#e5e5e5] bg-white px-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
          />
        </div>

        {error && (
          <p className="text-xs font-semibold text-crimson font-sans" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="h-12 w-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-[#1a1a1a] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer font-sans mt-1"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-xs text-[#707072] font-sans">
          Already a member?{" "}
          <Link href="/sign-in" className="font-semibold text-[#111111] hover:text-crimson transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useSignUp, useSignIn } from "@clerk/nextjs"

export function SignUpForm() {
  const router = useRouter()
  const { signUp, setActive, isLoaded } = useSignUp()
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return
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
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        setSuccess(true)
        setTimeout(() => router.push("/account/dashboard"), 1500)
      } else {
        // Clerk requires email verification
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        setSuccess(true)
        setNeedsConfirmation(true)
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] }
      setError(clerkErr.errors?.[0]?.message ?? "Something went wrong. Please try again.")
      setSubmitting(false)
    }
  }

  const handleGoogle = async () => {
    if (!signInLoaded) return
    setError(null)
    setGoogleLoading(true)
    try {
      await signIn!.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/account/dashboard",
      })
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] }
      setError(clerkErr.errors?.[0]?.message ?? "Google sign-in failed.")
      setGoogleLoading(false)
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

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading || submitting}
        className="h-12 w-full border border-[#e5e5e5] bg-white text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#111111] disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer font-sans"
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e5e5e5]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans">or</span>
        <div className="h-px flex-1 bg-[#e5e5e5]" />
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
          disabled={submitting || googleLoading}
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

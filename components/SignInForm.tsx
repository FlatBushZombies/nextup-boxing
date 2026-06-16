"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function SignInForm() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }
    setSubmitting(true)
    const result = await signIn(email, password)
    setSubmitting(false)
    if (result.error) {
      setError("Invalid email or password.")
      return
    }
    router.push("/account/dashboard")
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-crimson font-sans">
          Members Area
        </p>
        <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight leading-none text-[#111111]">
          Sign In
        </h1>
        <p className="text-sm leading-relaxed text-[#707072] font-sans">
          Access your dashboard, upcoming events, and fight-night notifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 border border-[#e5e5e5] bg-white px-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] font-sans">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-12 w-full border border-[#e5e5e5] bg-white px-4 pr-12 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#9e9ea0] focus:border-[#111111] font-sans"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9ea0] transition-colors hover:text-[#111111]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <a href="#" className="text-xs font-semibold text-[#707072] hover:text-[#111111] transition-colors font-sans">
            Forgot password?
          </a>
        </div>

        {error && (
          <p className="text-xs font-semibold text-crimson font-sans" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="h-12 w-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-[#1a1a1a] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer font-sans"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center text-xs text-[#707072] font-sans">
          Not a member yet?{" "}
          <Link href="/sign-up" className="font-semibold text-[#111111] hover:text-crimson transition-colors">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}

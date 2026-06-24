"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useSignIn } from "@clerk/nextjs/legacy"
import { useUser, useClerk } from "@clerk/nextjs"
import { AccountExistsModal } from "@/components/AccountExistsModal"

export function SignUpForm() {
  const { signIn, isLoaded } = useSignIn()
  const { user, isLoaded: isUserLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogle = async () => {
    if (!isLoaded) return
    setError(null)
    setGoogleLoading(true)
    try {
      await signIn.authenticateWithRedirect({
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

  return (
    <>
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
        disabled={googleLoading}
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

      {error && (
        <p className="text-xs font-semibold text-crimson font-sans text-center" role="alert">
          {error}
        </p>
      )}

      <p className="text-center text-xs text-[#707072] font-sans">
        Already a member?{" "}
        <Link href="/sign-in" className="font-semibold text-[#111111] hover:text-crimson transition-colors">
          Sign in
        </Link>
      </p>
    </div>

    <AccountExistsModal
      isOpen={isUserLoaded && !!user}
      avatarUrl={user?.imageUrl}
      name={[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Member"}
      email={user?.primaryEmailAddress?.emailAddress ?? ""}
      memberSince={user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : undefined}
      onContinue={() => router.push("/account/dashboard")}
      onSwitchAccount={signOut}
      onClose={() => router.push("/")}
    />
    </>
  )
}

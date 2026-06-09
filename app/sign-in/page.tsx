import Image from "next/image"
import { SignInForm } from "@/components/SignInForm"

export const metadata = {
  title: "Sign In | Next Up Boxing League",
  description: "Sign in to your Next Up Boxing League member account.",
}

export default function SignInPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      {/* Form side - white background */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>

      {/* Visual side - dark hero */}
      <div className="relative hidden overflow-hidden bg-black lg:block">
        <Image
          src="/hero-boxers.webp"
          alt="Professional boxer standing in a dark arena"
          fill
          priority
          className="object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Next Up Boxing League
          </p>
          <h2 className="mt-3 text-balance text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            The best.
            <br />
            The elite.
            <br />
            The next up.
          </h2>
          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-white/70">
            Live today. Legends tomorrow. Join the members who never miss a
            move.
          </p>
        </div>
      </div>
    </main>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SignInForm } from "@/components/SignInForm"

export const metadata: Metadata = {
  title: "Sign In | Next Up Boxing League",
  description: "Sign in to your Next Up Boxing League member account.",
}

export default function SignInPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-between px-8 py-10 sm:px-12 lg:px-16">
        <Link href="/" className="block w-fit mb-12">
          <Image src="/logo.png" alt="Next Up Boxing" width={90} height={45} className="h-auto" />
        </Link>

        <div className="w-full max-w-sm mx-auto lg:mx-0">
          <SignInForm />
        </div>

        <p className="text-[10px] font-sans text-[#9e9ea0] mt-12">
          © {new Date().getFullYear()} Next Up Boxing League
        </p>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-[#111111] lg:block">
        <Image
          src="/hero-boxers.webp"
          alt="Boxing arena"
          fill
          priority
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-crimson font-sans block mb-4">
            Next Up Boxing League
          </span>
          <h2 className="text-5xl lg:text-6xl font-display uppercase leading-none text-white mb-5">
            The Best.
            <br />
            The Elite.
            <br />
            The Next Up.
          </h2>
          <p className="text-sm text-white/60 font-sans max-w-xs leading-relaxed">
            Live today. Legends tomorrow. Join the members who never miss a move.
          </p>
        </div>
      </div>
    </main>
  )
}

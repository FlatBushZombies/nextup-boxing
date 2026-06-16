import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SignUpForm } from "@/components/SignUpForm"

export const metadata: Metadata = {
  title: "Create Account | Next Up Boxing League",
  description: "Join Next Up Boxing League — get event access, fight notifications, and your member dashboard.",
}

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-between px-8 py-10 sm:px-12 lg:px-16">
        <Link href="/" className="block w-fit mb-12">
          <Image src="/logo.png" alt="Next Up Boxing" width={90} height={45} className="h-auto" />
        </Link>

        <div className="w-full max-w-sm mx-auto lg:mx-0">
          <SignUpForm />
        </div>

        <p className="text-[10px] font-sans text-[#9e9ea0] mt-12">
          © {new Date().getFullYear()} Next Up Boxing League
        </p>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-[#111111] lg:block">
        <Image
          src="/boxer-shadow.png"
          alt="Boxing"
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold font-sans block mb-4">
            Member Benefits
          </span>
          <h2 className="text-5xl lg:text-6xl font-display uppercase leading-none text-white mb-5">
            Your Fight.
            <br />
            Your League.
            <br />
            Your Dashboard.
          </h2>
          <ul className="space-y-2 text-sm text-white/60 font-sans">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-crimson block shrink-0" />
              Upcoming event schedule
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-crimson block shrink-0" />
              Fight night notifications
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-crimson block shrink-0" />
              Live stream access
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

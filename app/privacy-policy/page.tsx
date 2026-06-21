import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Next Up Boxing League",
  description: "How Next Up Boxing League collects, uses, and protects your member data.",
}

const sections = [
  {
    title: "What We Collect",
    body: "When you create a member account, we collect the information available from your Google account (name and email address) along with the phone number and location you provide during onboarding.",
  },
  {
    title: "Why We Collect It",
    body: "Your phone number and location let us send fight-night reminders, ticket releases, and venue-specific updates relevant to where you live. Your email is used for account access and event notifications.",
  },
  {
    title: "How We Store It",
    body: "Member data is stored in our secured Supabase database, accessible only via service-role credentials on our backend. We do not sell or share your information with third parties.",
  },
  {
    title: "Your Choices",
    body: "You can request access to, correction of, or deletion of your member data at any time by contacting us. Removing your account will delete your stored profile information.",
  },
  {
    title: "Contact",
    body: "Questions about this policy can be sent to our team via the contact details listed in the site footer.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#111111] pb-12 pt-32 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-crimson font-sans mb-3">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-display uppercase leading-none">
            Privacy &amp; Data Policy
          </h1>
          <p className="mt-4 text-sm text-white/55 font-sans">
            Last updated June 2026
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="border border-[#e5e5e5] p-6">
              <h2 className="text-lg font-display uppercase tracking-tight text-[#111111] mb-2">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-[#707072] font-sans">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

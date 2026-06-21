"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { OnboardingModal } from "@/components/OnboardingModal"

const SKIP_KEY = "nub-onboarding-skipped"

export function OnboardingGate() {
  const { user, isLoaded } = useUser()
  const [skipped, setSkipped] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(SKIP_KEY) === "true"
  )

  if (!user) return null

  const onboardingComplete = user.unsafeMetadata?.onboardingComplete === true
  const isOpen = isLoaded && !onboardingComplete && !skipped

  const handleComplete = async () => {
    await user.update({ unsafeMetadata: { ...user.unsafeMetadata, onboardingComplete: true } })
  }

  const handleSkip = () => {
    sessionStorage.setItem(SKIP_KEY, "true")
    setSkipped(true)
  }

  return (
    <OnboardingModal
      isOpen={isOpen}
      firstName={user.firstName ?? undefined}
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  )
}

import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { z } from "zod"

import { upsertMemberProfile } from "@/lib/member-profiles"

export const runtime = "nodejs"

const onboardingSchema = z.object({
  phone: z
    .string({ message: "Phone number is required." })
    .trim()
    .min(7, { message: "Phone number must be at least 7 characters." })
    .max(20, { message: "Phone number must be less than 20 characters." }),
  location: z
    .string({ message: "Location is required." })
    .trim()
    .min(2, { message: "Location must be at least 2 characters." })
    .max(120, { message: "Location must be less than 120 characters." }),
  policyAccepted: z.literal(true, {
    message: "You must accept the data collection policy to continue.",
  }),
})

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 })
  }

  const result = onboardingSchema.safeParse(body)

  if (!result.success) {
    const errorMessages = result.error.issues.map((err) => err.message).join(" ")
    return NextResponse.json({ error: errorMessages }, { status: 400 })
  }

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress

  if (!email) {
    return NextResponse.json({ error: "No email found on your account." }, { status: 400 })
  }

  try {
    await upsertMemberProfile({
      clerkUserId: userId,
      email,
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
      phone: result.data.phone,
      location: result.data.location,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Failed to save onboarding profile:", error)
    return NextResponse.json(
      { error: "We couldn't save your details. Please try again." },
      { status: 500 }
    )
  }
}

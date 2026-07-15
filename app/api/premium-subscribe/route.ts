import { NextResponse } from "next/server"
import { z } from "zod"

import { sendPremiumWelcomeEmail } from "@/lib/resend"
import { addEmailSubscriber } from "@/lib/subscribers"

export const runtime = "nodejs"

const premiumSubscribeSchema = z.object({
  firstName: z
    .string({ message: "First name is required." })
    .trim()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must be less than 50 characters." })
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
  lastName: z
    .string({ message: "Last name is required." })
    .trim()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must be less than 50 characters." })
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
  email: z
    .string({ message: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." })
    .toLowerCase(),
  cellNumber: z
    .string({ message: "Cell number is required." })
    .trim()
    .min(7, { message: "Cell number must be at least 7 characters." })
    .max(20, { message: "Cell number must be less than 20 characters." })
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
  location: z
    .string({ message: "Location is required." })
    .trim()
    .min(2, { message: "Location must be at least 2 characters." })
    .max(120, { message: "Location must be less than 120 characters." })
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
})

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 })
  }

  const result = premiumSubscribeSchema.safeParse(body)

  if (!result.success) {
    const errorMessages = result.error.issues.map((err) => err.message).join(" ")
    return NextResponse.json({ error: errorMessages }, { status: 400 })
  }

  const { firstName, lastName, email, cellNumber, location } = result.data
  const fullName = `${firstName} ${lastName}`.trim()

  try {
    await addEmailSubscriber(
      email,
      {
        firstName,
        lastName,
        cellNumber,
        location,
      },
      "navbar-premium"
    )

    let emailSent = false
    let emailErrorMsg = ""

    try {
      await sendPremiumWelcomeEmail({ email, name: fullName })
      emailSent = true
    } catch (resendError) {
      console.error("Resend notification failed:", resendError)
      emailErrorMsg = resendError instanceof Error ? resendError.message : String(resendError)
    }

    if (!emailSent) {
      return NextResponse.json(
        {
          message: `Welcome, ${fullName}! You've been subscribed in our database, but we couldn't send the premium notification email. (Error: ${emailErrorMsg || "Resend not configured"})`,
          partialSuccess: true,
        },
        { status: 201 }
      )
    }

    return NextResponse.json(
      {
        message: `Welcome, ${fullName}! You are locked in for the September 12 event updates. Check your inbox for your premium invite!`,
        success: true,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to process premium subscription:", error)

    const isMissingSupabaseConfig =
      error instanceof Error &&
      error.message ===
        "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."

    return NextResponse.json(
      {
        error: isMissingSupabaseConfig
          ? "Database is not configured yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable subscriptions."
          : "We couldn't process your subscription at this moment. Please try again later.",
      },
      { status: isMissingSupabaseConfig ? 503 : 500 }
    )
  }
}

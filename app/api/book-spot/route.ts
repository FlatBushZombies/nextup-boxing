import { NextResponse } from "next/server"

export const runtime = "nodejs"

type BookingPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  weightClass: string
  record: string
  gym?: string
  message?: string
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const body = payload as BookingPayload

  if (!body.firstName || !body.lastName || !body.email || !body.weightClass) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@nextupboxingleague.com"

  if (resendKey) {
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)

      await resend.emails.send({
        from: fromEmail,
        to: "noirsfera@gmail.com",
        subject: `Fighter Booking Request — ${body.firstName} ${body.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 40px;">
            <h1 style="font-size: 28px; text-transform: uppercase; letter-spacing: 2px; color: #fff; margin-bottom: 8px;">
              New Booking Request
            </h1>
            <div style="width: 48px; height: 3px; background: #c8102e; margin-bottom: 32px;"></div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; width: 140px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${body.firstName} ${body.lastName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${body.email}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${body.phone || "—"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Weight Class</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${body.weightClass}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Record</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${body.record || "—"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Gym / Trainer</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${body.gym || "—"}</td></tr>
            </table>

            ${body.message ? `
            <div style="margin-top: 24px;">
              <p style="color: #707072; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Message</p>
              <p style="color: #fff; font-size: 14px; line-height: 1.6;">${body.message}</p>
            </div>` : ""}

            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #222;">
              <p style="color: #707072; font-size: 11px;">Next Up Boxing League · Long Island, NY</p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error("Resend error:", err)
    }
  }

  return NextResponse.json(
    { message: "Your booking request has been received. We'll be in touch within 48 hours." },
    { status: 201 }
  )
}

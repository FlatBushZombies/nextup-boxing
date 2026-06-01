import "server-only"

import { env } from "@/lib/env"
import { EVENT_CONFIG } from "@/lib/event"

type SendReminderEmailParams = {
  email: string
  reminderType: "sevenDay" | "oneDay"
}

type ResendSendResponse = {
  id?: string
  error?: {
    message?: string
  }
  message?: string
  statusCode?: number
}

function getResendConfig() {
  const apiKey = env.resendApiKey
  const fromEmail = env.resendFromEmail
  const siteUrl = env.siteUrl

  if (!apiKey || !fromEmail) {
    throw new Error(
      "Resend is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL."
    )
  }

  return { apiKey, fromEmail, siteUrl }
}

function buildEmailCopy(reminderType: "sevenDay" | "oneDay") {
  if (reminderType === "oneDay") {
    return {
      subject: "Fight Night is tomorrow",
      eyebrow: "Tomorrow Night",
      intro:
        "You asked to be notified, and the event is almost here. Here are the details for fight night.",
    }
  }

  return {
    subject: "Fight Night is getting closer",
    eyebrow: "Event Reminder",
    intro:
      "You joined the notification list, and fight night is now close. Here are the key event details.",
  }
}

/**
 * Sends an email using the Resend API with fallback to onboarding@resend.dev
 * if the configured domain is not verified.
 */
async function sendResendEmail({
  apiKey,
  fromEmail,
  toEmail,
  subject,
  html,
}: {
  apiKey: string
  fromEmail: string
  toEmail: string
  subject: string
  html: string
}) {
  const makeRequest = async (sender: string) => {
    return await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [toEmail],
        subject,
        html,
      }),
    })
  }

  let response = await makeRequest(fromEmail)
  let data = (await response.json()) as ResendSendResponse

  // Check for 403 validation error (domain unverified)
  const isUnverifiedDomain =
    response.status === 403 &&
    (data.message?.toLowerCase().includes("domain is not verified") ||
      data.error?.message?.toLowerCase().includes("domain is not verified"))

  if (isUnverifiedDomain && !fromEmail.includes("onboarding@resend.dev")) {
    console.warn(
      `Resend domain in "${fromEmail}" is unverified. Retrying with fallback sender "onboarding@resend.dev"...`
    )
    
    // Retry with onboarding@resend.dev
    // Preserve the display name if present, e.g. "Next Up Boxing <ringside@...>" -> "Next Up Boxing <onboarding@resend.dev>"
    let fallbackFrom = "onboarding@resend.dev"
    const displayNameMatch = fromEmail.match(/^([^<]+)</)
    if (displayNameMatch) {
      fallbackFrom = `${displayNameMatch[1].trim()} <onboarding@resend.dev>`
    }

    response = await makeRequest(fallbackFrom)
    data = (await response.json()) as ResendSendResponse
  }

  if (!response.ok || data.error) {
    const errorMsg =
      data.error?.message ||
      data.message ||
      `Resend failed with status ${response.status}.`
    throw new Error(errorMsg)
  }

  return data.id
}

export async function sendReminderEmail({
  email,
  reminderType,
}: SendReminderEmailParams) {
  const { apiKey, fromEmail, siteUrl } = getResendConfig()
  const copy = buildEmailCopy(reminderType)
  const eventUrl = new URL(EVENT_CONFIG.homepagePath, siteUrl).toString()

  const html = `
    <div style="background:#f5efe4;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#0d1124;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid rgba(13,17,36,0.08);border-radius:20px;overflow:hidden;">
        <div style="height:4px;background:#c5203a;"></div>
        <div style="padding:32px 28px;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#c5203a;">
            ${copy.eyebrow}
          </p>
          <h1 style="margin:0 0 16px;font-size:34px;line-height:0.95;font-family:Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#0d1124;">
            ${EVENT_CONFIG.name}
          </h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:rgba(13,17,36,0.72);">
            ${copy.intro}
          </p>
          <div style="border:1px solid rgba(13,17,36,0.1);border-radius:16px;padding:20px 18px;background:#faf8f3;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#b8962e;">
              Event Details
            </p>
            <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0d1124;">
              ${EVENT_CONFIG.displayDate}
            </p>
            <p style="margin:0 0 8px;font-size:15px;color:rgba(13,17,36,0.72);">
              ${EVENT_CONFIG.displayTime}
            </p>
            <p style="margin:0;font-size:15px;color:rgba(13,17,36,0.72);">
              ${EVENT_CONFIG.venue}, ${EVENT_CONFIG.city}
            </p>
          </div>
          <div style="margin-top:28px;">
            <a href="${eventUrl}" style="display:inline-block;background:#0d1124;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">
              View Event
            </a>
          </div>
        </div>
      </div>
    </div>
  `

  return await sendResendEmail({
    apiKey,
    fromEmail,
    toEmail: email,
    subject: copy.subject,
    html,
  })
}

export async function sendPremiumWelcomeEmail({
  email,
  name,
}: {
  email: string
  name: string
}) {
  const { apiKey, fromEmail } = getResendConfig()
  const youtubeUrl = process.env.YOUTUBE_CHANNEL_URL?.trim() || "https://www.youtube.com/@NextUpBoxing"

  const html = `
    <div style="background:#0d1124;padding:48px 16px;font-family:Inter,Arial,sans-serif;color:#ffffff;min-height:100%;">
      <div style="max-width:600px;margin:0 auto;background:#161c36;border:1px solid rgba(212,174,68,0.2);border-radius:24px;overflow:hidden;box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <div style="height:6px;background:linear-gradient(90deg, #1e2d5e, #c5203a, #d4ae44);"></div>
        <div style="padding:40px 32px;">
          <h1 style="margin:0 0 20px;font-size:36px;line-height:0.95;font-family:Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;letter-spacing:0.02em;color:#ffffff;">
            WELCOME TO NEXTUP BOXING
          </h1>
          <p style="margin:0 0 24px;font-size:18px;font-weight:600;color:#ffffff;">
            Hello ${name},
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.76);">
            You have successfully joined the premium notification list. The highly anticipated <strong>${EVENT_CONFIG.name}</strong> on June 6 is rapidly approaching, and you're officially locked in to receive exclusive alerts before fight night.
          </p>
          
          <div style="border:1px solid rgba(212,174,68,0.25);border-radius:18px;padding:24px 20px;background:rgba(212,174,68,0.04);margin-bottom:32px;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#d4ae44;">
              EVENT DETAILS
            </p>
            <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#ffffff;">
              Sat June 6th
            </p>
            <p style="margin:0 0 8px;font-size:15px;color:rgba(255,255,255,0.85);">
              Starts at ${EVENT_CONFIG.displayTime}
            </p>
            <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.65);line-height:1.4;">
              Venue: Stereo Garden<br />
              9 Railroad Ave Patchogue NY
            </p>
          </div>
          
          <p style="margin:0 0 32px;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.6);">
            We will send you reminder updates 7 days and 1 day before the event so you don't miss a single punch. Get ready for an absolute thriller!
          </p>
          
          <div style="text-align:center;">
            <a href="${youtubeUrl}" style="display:inline-block;background:#c5203a;color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;box-shadow:0 4px 12px rgba(197,32,58,0.3);">
              GO TO STREAM
            </a>
          </div>
        </div>
        <div style="background:rgba(0,0,0,0.2);padding:20px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.05em;">
            &copy; 2026 NextUp Boxing League. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `

  return await sendResendEmail({
    apiKey,
    fromEmail,
    toEmail: email,
    subject: `Locked In: ${EVENT_CONFIG.name} is Approaching!`,
    html,
  })
}

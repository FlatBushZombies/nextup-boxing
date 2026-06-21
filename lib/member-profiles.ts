import "server-only"

import { getSupabaseAdmin } from "@/lib/supabase"

type MemberProfileInput = {
  clerkUserId: string
  email: string
  firstName?: string
  lastName?: string
  phone: string
  location: string
}

export async function upsertMemberProfile(input: MemberProfileInput) {
  const supabase = getSupabaseAdmin()
  const now = new Date().toISOString()

  const { error } = await supabase.from("member_profiles").upsert(
    {
      clerk_user_id: input.clerkUserId,
      email: input.email,
      first_name: input.firstName?.trim() || null,
      last_name: input.lastName?.trim() || null,
      phone: input.phone.trim(),
      location: input.location.trim(),
      data_policy_accepted_at: now,
      updated_at: now,
    },
    { onConflict: "clerk_user_id" }
  )

  if (error) {
    throw new Error(error.message)
  }
}

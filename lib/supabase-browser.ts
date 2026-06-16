import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

function getBrowser(): SupabaseClient {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  _client = createClient(url, key)
  return _client
}

export const supabaseBrowser = new Proxy({} as SupabaseClient, {
  get(_: SupabaseClient, prop: string | symbol) {
    return getBrowser()[prop as keyof SupabaseClient]
  },
})

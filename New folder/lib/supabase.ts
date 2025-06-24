import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Returns a Supabase client **or** `null` if the required environment
 * variables are not present.  This prevents `supabaseUrl is required`
 * crashes when someone previews the project without configuring keys.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Supabase] Environment variables are missing – DB calls will be skipped.\n" +
          "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable them.",
      )
    }
    return null
  }

  // one global instance per browser / server runtime
  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

export type Participant = {
  id: number
  serial_number: string
  name: string
  email: string
  phone: string | null
  kick_username: string | null
  comments: string | null
  created_at: string
  updated_at: string
}

export type { Database } from "./types" // if you generated types

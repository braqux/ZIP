"use server"

import { getSupabaseClient, type Participant } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_h2BqeRYb_7aNAYh4xrnxyYbSXymBjKxrm")

function generateSerial(): string {
  const partA = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0")
  const partB = Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, "0")
  return `GW-${partA}-${partB}`
}

async function saveToDB(serial: string, formData: FormData): Promise<{ ok: boolean }> {
  const supabase = getSupabaseClient()
  if (!supabase) return { ok: true } // preview mode – skip

  const { error } = await supabase.from("participants").insert({
    serial_number: serial,
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    kick_username: formData.get("kickUsername"),
    comments: formData.get("comments"),
  })

  if (error) {
    console.warn("[DB] insert failed (table missing in preview?):", error)
    return { ok: false }
  }
  return { ok: true }
}

export async function submitGiveawayForm(
  formData: FormData,
): Promise<{ success: boolean; serialNumber?: string; error?: string }> {
  // basic required-field check
  if (!formData.get("name") || !formData.get("email")) {
    return { success: false, error: "Name and Email are required." }
  }

  const serial = generateSerial()

  // send email to you + the entrant
  try {
    const { error: mailErr } = await resend.emails.send({
      from: "Giveaway Bot <onboarding@resend.dev>",
      to: ["braqux@gmail.com"],
      subject: `🎮 New Giveaway Entry – ${serial}`,
      html: `
        <h2>New participant!</h2>
        <p><strong>Name:</strong> ${formData.get("name")}</p>
        <p><strong>Email:</strong> ${formData.get("email")}</p>
        <p><strong>Phone:</strong> ${formData.get("phone") || "N/A"}</p>
        <p><strong>Kick:</strong> ${formData.get("kickUsername") || "N/A"}</p>
        <p><strong>Serial #:</strong> <code>${serial}</code></p>
      `,
    })

    if (mailErr) throw mailErr
  } catch (e) {
    console.error("[Email] failed:", e)
    return { success: false, error: "Email service error." }
  }

  // try DB save (non-fatal)
  await saveToDB(serial, formData)

  return { success: true, serialNumber: serial }
}

async function getAllParticipants(): Promise<{ success: boolean; data: Participant[] | null; error: string | null }> {
  const supabaseClient = getSupabaseClient()

  if (!supabaseClient) {
    return { success: false, data: null, error: "Supabase client not initialized." }
  }

  try {
    const { data, error } = await supabaseClient
      .from("participants")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch participants:", error)
      return { success: false, data: null, error: "Failed to fetch participants." }
    }

    return { success: true, data: data as Participant[], error: null }
  } catch (error: any) {
    console.error("Error fetching participants:", error)
    return { success: false, data: null, error: "Error fetching participants." }
  }
}

async function getParticipantBySerial(
  serialNumber: string,
): Promise<{ success: boolean; data: Participant | null; error: string | null }> {
  const supabaseClient = getSupabaseClient()

  if (!supabaseClient) {
    return { success: false, data: null, error: "Supabase client not initialized." }
  }

  try {
    const { data, error } = await supabaseClient
      .from("participants")
      .select("*")
      .eq("serial_number", serialNumber)
      .single()

    if (error) {
      console.error("Failed to fetch participant:", error)
      return { success: false, data: null, error: "Participant not found." }
    }

    return { success: true, data: data as Participant, error: null }
  } catch (error: any) {
    console.error("Error fetching participant:", error)
    return { success: false, data: null, error: "Error fetching participant." }
  }
}

export { getAllParticipants, getParticipantBySerial }

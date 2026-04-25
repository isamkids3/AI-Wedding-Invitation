"use server"

import { headers } from "next/headers"
import { appendRSVPRow } from "@/lib/sheets"

// Basic in-memory rate limiting map
// Maps IP to { count, lastSubmitTime }
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const MAX_SUBMISSIONS = 3
const TIME_WINDOW_MS = 60 * 60 * 1000 // 1 hour

export async function submitRSVP(formData: FormData) {
  try {
    const headerList = await headers()
    const ip = headerList.get("x-forwarded-for") || "unknown-ip"
    
    // Rate Limiting Logic
    const now = Date.now()
    const limitData = rateLimitMap.get(ip)
    
    if (limitData) {
      if (now - limitData.timestamp < TIME_WINDOW_MS) {
        if (limitData.count >= MAX_SUBMISSIONS) {
          return { success: false, error: "Too many submissions. Please try again later." }
        }
        limitData.count += 1
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now })
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now })
    }

    // Extraction & Validation
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const attending = formData.get("attending") as string // "yes" or "no"
    const guestCountStr = formData.get("guestCount") as string
    const dietary = formData.get("dietary") as string

    if (!name || name.trim() === "") {
      return { success: false, error: "Name is required." }
    }
    
    if (attending === "yes") {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return { success: false, error: "A valid email is required." }
      }
      const count = parseInt(guestCountStr, 10)
      if (isNaN(count) || count < 1 || count > 10) {
        return { success: false, error: "Guest count must be between 1 and 10." }
      }
    }

    // Appending to Sheet
    const result = await appendRSVPRow({
      name,
      email: attending === "yes" ? email : "N/A",
      attending,
      guestCount: attending === "yes" ? guestCountStr : 0,
      dietary: attending === "yes" ? dietary : "N/A",
    })

    if (!result.success) {
      return { success: false, error: result.error }
    }

    return { success: true }
  } catch (err) {
    console.error("Action error:", err)
    return { success: false, error: "An unexpected error occurred." }
  }
}

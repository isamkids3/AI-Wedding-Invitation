"server-only"

import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

export async function appendRSVPRow(data: {
  name: string
  email: string
  attending: string
  guestCount: string | number
  dietary: string
}) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    })

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID as string, serviceAccountAuth)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      Name: data.name,
      Email: data.email,
      Attending: data.attending,
      GuestCount: data.guestCount.toString(),
      Dietary: data.dietary || "None",
    })

    return { success: true }
  } catch (error) {
    console.error("Error appending RSVP row:", error)
    return { success: false, error: "Failed to submit RSVP. Please try again later." }
  }
}

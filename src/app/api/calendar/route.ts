import { NextResponse } from 'next/server'
import { generateICS } from '@/lib/ics'
import { WEDDING } from '@/lib/constants'

export async function GET() {
  const event = {
    title: WEDDING.fullTitle + " Wedding",
    description: "Join us in celebrating our wedding!",
    location: WEDDING.venue + ", " + WEDDING.venueAddress,
    startTime: new Date(WEDDING.dateISO),
    endTime: new Date(new Date(WEDDING.dateISO).getTime() + 6 * 60 * 60 * 1000)
  }
  
  const icsContent = generateICS(event)
  
  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar;charset=utf-8',
      'Content-Disposition': 'attachment; filename="wedding.ics"'
    }
  })
}

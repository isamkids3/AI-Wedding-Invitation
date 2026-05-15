import { NextResponse } from 'next/server'
import { generateICS } from '@/lib/ics'
import { WEDDING } from '@/lib/constants'

export async function GET() {
  const event = {
    title: WEDDING.fullTitle + " Wedding",
    description: `We are overjoyed to invite you to celebrate our wedding!\n\nVenue: ${WEDDING.venue}\nTime: ${WEDDING.ceremony}\n\nWe can't wait to share this special day with you!`,
    location: WEDDING.venue + ", " + WEDDING.venueAddress,
    startTime: new Date(WEDDING.dateISO),
    endTime: new Date(new Date(WEDDING.dateISO).getTime() + 4 * 60 * 60 * 1000)
  }
  
  const icsContent = generateICS(event)
  
  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar;charset=utf-8',
      'Content-Disposition': 'inline; filename="wedding.ics"'
    }
  })
}

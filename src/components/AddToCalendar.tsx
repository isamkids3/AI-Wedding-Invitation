"use client"

import { useState, useRef, useEffect } from "react"
import { CalendarPlus, Calendar, Mail } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import { generateICS } from "@/lib/ics"
import { Button } from "@/components/ui/button"
import SectionReveal from "./SectionReveal"

export default function AddToCalendar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAppleOrOutlook = () => {
    // Navigate to the API route which serves the .ics file directly.
    // This is the most bulletproof method for in-app browsers like Telegram.
    window.open('/api/calendar', '_blank')
    setIsOpen(false)
  }

  const handleGoogleCalendar = () => {
    // 20260815T080000Z
    const startTimeStr = new Date(WEDDING.dateISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
    const endTimeStr = new Date(new Date(WEDDING.dateISO).getTime() + 6 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "")
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(WEDDING.fullTitle + " Wedding")}&dates=${startTimeStr}/${endTimeStr}&details=Join%20us%21&location=${encodeURIComponent(WEDDING.venue + ", " + WEDDING.venueAddress)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  return (
    <SectionReveal className="flex justify-center my-12">
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full px-8 py-6 text-lg font-playfair hover:scale-105 transition-transform"
        >
          <CalendarPlus className="mr-2" /> Save the Date
        </Button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-56 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl overflow-hidden z-20 border border-(--color-champagne-light)">
            <button onClick={handleGoogleCalendar} className="w-full text-left px-4 py-3 hover:bg-(--color-cream) flex items-center transition-colors">
              <Mail className="w-4 h-4 mr-3 text-red-500" />
              <span className="font-montserrat text-sm text-(--color-deep)">Google Calendar</span>
            </button>
            <button onClick={handleAppleOrOutlook} className="w-full text-left px-4 py-3 hover:bg-(--color-cream) flex items-center transition-colors">
              <Calendar className="w-4 h-4 mr-3 text-blue-500" />
              <span className="font-montserrat text-sm text-(--color-deep)">Apple Calendar</span>
            </button>
            <button onClick={handleAppleOrOutlook} className="w-full text-left px-4 py-3 hover:bg-(--color-cream) flex items-center transition-colors">
              <Calendar className="w-4 h-4 mr-3 text-blue-700" />
              <span className="font-montserrat text-sm text-(--color-deep)">Outlook</span>
            </button>
          </div>
        )}
      </div>
    </SectionReveal>
  )
}

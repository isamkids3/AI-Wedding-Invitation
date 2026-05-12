"use client"

import { useState } from "react"
import Overlay from "@/components/Overlay"
import Hero from "@/components/Hero"
import VitalStats from "@/components/VitalStats"
import RSVPWizard from "@/components/RSVPWizard"
import AddToCalendar from "@/components/AddToCalendar"
import MapSection from "@/components/MapSection"
import MusicToggle from "@/components/MusicToggle"

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleOpen = () => {
    setIsRevealed(true)
  }

  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* Overlay covers everything initially */}
      <Overlay onOpen={handleOpen} />

      {/* Music toggle floating button */}
      <MusicToggle shouldPlay={isRevealed} />

      {/* Main Content Sections */}
      <div className="flex flex-col w-full" style={{ opacity: isRevealed ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}>
        <Hero isRevealed={isRevealed} />
        <VitalStats />
        <RSVPWizard />
        <MapSection />
        <AddToCalendar />

        <footer className="py-12 bg-(--color-deep) text-center text-(--color-muted) font-montserrat text-sm border-t border-(--color-champagne)/20 mt-12">
          <p>© {new Date().getFullYear()} — Made with ❤️ for Ilya & Alyaa</p>
        </footer>
      </div>
    </main>
  )
}

"use client"

import ThankYouHero from "@/components/ThankYouHero"
import VitalStats from "@/components/VitalStats"
import ParkingAndVenueMap from "@/components/ParkingAndVenueMap"
import MusicToggle from "@/components/MusicToggle"

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* Music toggle floating button */}
      <MusicToggle shouldPlay={true} />

      {/* Main Content Sections */}
      <div className="flex flex-col w-full">
        <ThankYouHero isRevealed={true} />
        <VitalStats showOnlyWhere={true} />
        <ParkingAndVenueMap />

        <footer className="py-12 bg-(--color-deep) text-center text-(--color-muted) font-montserrat text-sm border-t border-(--color-champagne)/20 mt-12">
          <p>© {new Date().getFullYear()} — Made with ❤️ for Ilya & Alyaa</p>
        </footer>
      </div>
    </main>
  )
}

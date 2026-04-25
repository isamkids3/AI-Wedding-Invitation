"use client"

import { Car, MapPinned } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import SectionReveal from "./SectionReveal"
import { Button } from "./ui/button"

export default function MapSection() {
  return (
    <section className="py-24 px-6 bg-(--color-ivory) w-full flex flex-col items-center">
      <SectionReveal className="w-full max-w-4xl flex flex-col items-center">
        <h2 className="font-playfair text-4xl md:text-5xl text-(--color-deep) mb-4">Find Us</h2>
        <hr className="w-16 border-(--color-champagne) opacity-50 mb-12" />
        
        <div className="w-full rounded-2xl overflow-hidden border-2 border-(--color-champagne-light) shadow-lg mb-8 relative bg-(--color-cream)">
          {/* Note: Replace src with real URL via maps.google.com -> Share -> Embed */}
          <iframe 
            src={WEDDING.mapsEmbedUrl} 
            className="w-full h-[300px] md:h-[420px] border-none grayscale-[0.2] contrast-[1.1] rounded-2xl"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
          />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 md:px-12">
          <Button 
            asChild 
            size="lg"
            className="w-full bg-[#12e2f6]/10 text-[#0e8f9c] hover:bg-[#12e2f6]/20 border border-[#12e2f6]/30 font-bold tracking-wide"
          >
            <a href={WEDDING.wazeUrl} target="_blank" rel="noopener noreferrer">
              <Car className="mr-2" /> Open in Waze
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg"
            className="w-full bg-[#ea4335]/10 text-[#ea4335] hover:bg-[#ea4335]/20 border border-[#ea4335]/30 font-bold tracking-wide"
          >
            <a href={WEDDING.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPinned className="mr-2" /> Open in Google Maps
            </a>
          </Button>
        </div>
      </SectionReveal>
    </section>
  )
}

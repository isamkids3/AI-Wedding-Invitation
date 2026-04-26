"use client"

import { Car, MapPinned } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import SectionReveal from "./SectionReveal"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export default function MapSection() {
  return (
    <section className="py-24 px-6 bg-(--color-ivory) w-full flex flex-col items-center relative overflow-hidden">
      


      <SectionReveal className="w-full max-w-4xl flex flex-col items-center relative z-10">
        <h2 className="font-playfair text-4xl md:text-5xl text-(--color-deep) mb-4">Find Us</h2>
        <hr className="w-16 border-(--color-champagne) opacity-50 mb-12" />
        
        {/* Geometric Map Container */}
        <div className="w-full relative p-2 md:p-4 mb-8">
          {/* Decorative Outer Border */}
          <div className="absolute inset-0 border border-(--color-champagne)/30 rounded-3xl pointer-events-none" />
          
          <div className="w-full h-full rounded-[20px] overflow-hidden border-[4px] border-white shadow-[0_15px_40px_-15px_rgba(201,169,110,0.3)] bg-(--color-cream) relative z-10">
            {/* Note: Replace src with real URL via maps.google.com -> Share -> Embed */}
            <iframe 
              src={WEDDING.mapsEmbedUrl} 
              className="w-full h-[350px] md:h-[450px] border-none grayscale-[0.2] contrast-[1.1]"
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 md:px-12 mt-4">
          <Button 
            asChild 
            size="lg"
            className="w-full bg-white text-(--color-deep) hover:bg-(--color-ivory) hover:text-(--color-champagne) border border-(--color-champagne)/40 font-montserrat tracking-widest text-xs uppercase rounded-full shadow-sm hover:shadow-md transition-all duration-300 group h-14"
          >
            <a href={WEDDING.wazeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Car className="mr-3 w-4 h-4 text-(--color-champagne) group-hover:scale-110 transition-transform" /> 
              Open in Waze
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg"
            className="w-full bg-white text-(--color-deep) hover:bg-(--color-ivory) hover:text-(--color-champagne) border border-(--color-champagne)/40 font-montserrat tracking-widest text-xs uppercase rounded-full shadow-sm hover:shadow-md transition-all duration-300 group h-14"
          >
            <a href={WEDDING.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <MapPinned className="mr-3 w-4 h-4 text-(--color-champagne) group-hover:scale-110 transition-transform" /> 
              Google Maps
            </a>
          </Button>
        </div>
      </SectionReveal>
    </section>
  )
}

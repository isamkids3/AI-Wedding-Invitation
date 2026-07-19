"use client"

import { useState } from "react"
import Image from "next/image"
import { Car, MapPinned, Maximize2, X, Info, Video, Map } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import SectionReveal from "./SectionReveal"
import { Button } from "./ui/button"

export default function ParkingAndVenueMap() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  return (
    <section id="map-section" className="pt-12 md:pt-16 pb-24 px-6 bg-(--color-ivory) w-full flex flex-col items-center relative overflow-hidden">
      <SectionReveal className="w-full max-w-4xl flex flex-col items-center relative z-10 space-y-20">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-(--color-deep) mb-4">Venue & Parking Guide</h2>
          <hr className="w-16 border-(--color-champagne) opacity-50 mb-4" />
          <p className="font-montserrat text-sm text-(--color-muted) tracking-wide max-w-lg">
            Everything you need to know about navigating to the venue, parking, and finding your way around the hall.
          </p>
        </div>

        {/* 1. Event Location Google Map & Navigation */}
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3 text-(--color-champagne) mb-2">
            <MapPinned className="w-6 h-6" />
            <h3 className="font-playfair text-2xl md:text-3xl text-(--color-deep)">Location & Directions</h3>
          </div>

          <div className="w-full relative p-2 md:p-4">
            <div className="absolute inset-0 border border-(--color-champagne)/30 rounded-3xl pointer-events-none" />

            <div className="w-full h-full rounded-[20px] overflow-hidden border-[4px] border-white shadow-[0_15px_40px_-15px_rgba(201,169,110,0.3)] bg-(--color-cream) relative z-10">
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

          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 md:px-12">
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
        </div>

        {/* 2. Parking Guide Video & Instructions */}
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3 text-(--color-champagne) mb-2">
            <Video className="w-6 h-6" />
            <h3 className="font-playfair text-2xl md:text-3xl text-(--color-deep)">Parking Video Guide</h3>
          </div>

          <div className="w-full relative p-2 md:p-4">
            <div className="absolute inset-0 border border-(--color-champagne)/30 rounded-3xl pointer-events-none" />
            <div className="w-full h-full rounded-[20px] overflow-hidden border-[4px] border-white shadow-[0_15px_40px_-15px_rgba(201,169,110,0.3)] bg-black relative z-10">
              <video
                src={WEDDING.parkingVideoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full max-h-[500px] object-contain rounded-xl"
              >
                Your browser does not support playing video.
              </video>
            </div>
          </div>

          {/* Polished Parking Information Card */}
          <div className="w-full bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-(--color-champagne)/30 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="p-4 bg-(--color-cream) rounded-full text-(--color-champagne) shrink-0">
              <Car className="w-7 h-7" />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-(--color-champagne)">Parking Zone</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-montserrat font-semibold text-base text-(--color-deep)">{WEDDING.parkingInfo.zone}</span>
              </div>
              <p className="font-montserrat text-sm text-(--color-muted) leading-relaxed">
                {WEDDING.parkingInfo.directions}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Hall Layout Map Section */}
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3 text-(--color-champagne) mb-2">
            <Map className="w-6 h-6" />
            <h3 className="font-playfair text-2xl md:text-3xl text-(--color-deep)">Hall Map</h3>
          </div>

          <div
            onClick={() => setIsMapModalOpen(true)}
            className="w-full relative p-2 md:p-4 group cursor-pointer"
          >
            <div className="absolute inset-0 border border-(--color-champagne)/30 rounded-3xl pointer-events-none" />

            <div className="w-full h-full rounded-[20px] overflow-hidden border-[4px] border-white shadow-[0_15px_40px_-15px_rgba(201,169,110,0.3)] bg-(--color-cream) relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
              <div className="relative w-full h-[320px] md:h-[480px]">
                <Image
                  src={WEDDING.hallMapImageUrl}
                  alt="Hall Layout Map"
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Hover overlay prompt */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white space-x-2">
                <Maximize2 className="w-5 h-5 text-(--color-champagne-light)" />
                <span className="font-montserrat text-sm tracking-wide">Click to view full map</span>
              </div>
            </div>
          </div>
        </div>

      </SectionReveal>

      {/* Hall Map Fullscreen Modal */}
      {isMapModalOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setIsMapModalOpen(false)}
        >
          <button
            onClick={() => setIsMapModalOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
          >
            <X className="w-7 h-7" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[85vh] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={WEDDING.hallMapImageUrl}
              alt="Hall Layout Map Full"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}

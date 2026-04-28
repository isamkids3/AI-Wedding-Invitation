"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import SectionReveal from "./SectionReveal"
import { motion } from "framer-motion"

export default function VitalStats() {
  const items = [
    {
      icon: <Calendar className="w-8 h-8 md:w-10 md:h-10 text-(--color-champagne)" strokeWidth={1} />,
      title: "When",
      value: WEDDING.date,
      subValue: undefined,
    },
    {
      icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-(--color-champagne)" strokeWidth={1} />,
      title: "Time",
      value: WEDDING.ceremony,
      subValue: "Promptly",
    },
    {
      icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-(--color-champagne)" strokeWidth={1} />,
      title: "Where",
      value: WEDDING.venue,
      subValue: WEDDING.venueAddress,
    },
  ]

  return (
    <section className="py-32 px-6 relative w-full flex justify-center bg-(--color-ivory) overflow-hidden">


      <SectionReveal className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                if (item.title === "Where") {
                  document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`bg-white p-10 md:p-14 flex flex-col items-center text-center rounded-t-full rounded-b-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-(--color-champagne)/20 group relative overflow-hidden ${item.title === "Where" ? "cursor-pointer" : ""}`}
            >
              {/* Subtle top decoration inside card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 border-b border-(--color-champagne)/20 rounded-full -translate-y-1/2" />
              
              <div className="relative bg-(--color-cream) w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-inner">
                {/* Spinning rings on hover */}
                <div className="absolute inset-0 border border-(--color-champagne)/50 rounded-full border-dashed scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_15s_linear_infinite] transition-opacity duration-700" />
                <div className="absolute inset-0 border border-(--color-champagne)/20 rounded-full scale-[1.3] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {item.icon}
              </div>
              <h3 className="font-playfair text-2xl font-semibold md:text-3xl mb-4 text-(--color-deep)">{item.title}</h3>
              <p className="font-montserrat text-sm md:text-base text-(--color-muted) mb-1 font-medium tracking-wide">{item.value}</p>
              {item.subValue && <p className="font-montserrat text-[10px] md:text-xs text-(--color-champagne) tracking-widest uppercase mt-4">{item.subValue}</p>}
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}

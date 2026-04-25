"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import SectionReveal from "./SectionReveal"

export default function VitalStats() {
  const items = [
    {
      icon: <Calendar className="w-8 h-8 md:w-10 md:h-10 text-(--color-champagne)" strokeWidth={1.5} />,
      title: "When",
      value: WEDDING.date,
      subValue: undefined,
    },
    {
      icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-(--color-champagne)" strokeWidth={1.5} />,
      title: "Time",
      value: WEDDING.ceremony,
      subValue: "Promptly",
    },
    {
      icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-(--color-champagne)" strokeWidth={1.5} />,
      title: "Where",
      value: WEDDING.venue,
      subValue: WEDDING.venueAddress,
    },
  ]

  return (
    <section className="py-24 px-6 relative w-full flex justify-center bg-(--color-ivory)">
      <SectionReveal className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-(--color-cream) p-10 md:p-14 flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-(--color-ivory) w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-playfair text-2xl font-semibold md:text-3xl mb-4 text-(--color-deep)">{item.title}</h3>
              <p className="font-montserrat text-sm md:text-base text-(--color-muted) mb-1 font-medium">{item.value}</p>
              {item.subValue && <p className="font-montserrat text-xs md:text-sm text-(--color-muted)/80">{item.subValue}</p>}
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}

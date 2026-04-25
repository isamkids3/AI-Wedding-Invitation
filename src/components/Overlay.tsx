"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WEDDING } from "@/lib/constants"

export default function Overlay({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    onOpen()
  }

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-(--color-deep) text-(--color-ivory)"
          // Grain texture pattern via inline SVG background
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-6 max-w-sm">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-(--color-champagne) opacity-80 mb-4">
              <path d="M12 2C8 2 4 6 4 10c0 4.5 4 7.5 8 10 4-2.5 8-5.5 8-10 0-4-4-8-8-8z" />
              <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            
            <p className="font-playfair italic text-xl text-(--color-champagne-light)">You&apos;re Invited</p>
            
            <h1 className="font-playfair text-5xl md:text-6xl text-white my-4 leading-tight tracking-wide">
              {WEDDING.groomName} <br />
              <span className="text-(--color-champagne) text-4xl">&amp;</span> <br />
              {WEDDING.brideName}
            </h1>
            
            <hr className="w-16 border-(--color-champagne) border-t opacity-50 my-2" />
            
            <p className="font-montserrat font-light tracking-widest text-sm text-(--color-cream) uppercase py-4">
              {WEDDING.date}
            </p>
            
            <button
              onClick={handleOpen}
              className="mt-8 px-8 py-3 rounded-full border border-(--color-champagne) text-(--color-champagne) hover:text-white hover:bg-(--color-champagne)/30 transition-all duration-500 flex items-center gap-2 group font-playfair italic text-lg"
            >
              Open Invitation 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-(--color-deep) text-(--color-ivory) overflow-hidden"
          // Grain texture pattern via inline SVG background
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Geometric Frames */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-4 md:inset-8 border border-(--color-champagne)/30 rounded-t-[200px] rounded-b-[200px] pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="absolute inset-8 md:inset-12 border border-(--color-champagne)/20 rounded-t-[180px] rounded-b-[180px] pointer-events-none"
          />

          {/* Elegant Floral/Leaf Emblems */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 text-(--color-champagne) opacity-50"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 22C12 22 20 16 20 10C20 6 16 2 12 2C8 2 4 6 4 10C4 16 12 22 12 22Z" />
              <path d="M12 22C12 22 16 16 16 10C16 7 14 4 12 2C10 4 8 7 8 10C8 16 12 22 12 22Z" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 text-(--color-champagne) opacity-50 rotate-180"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 22C12 22 20 16 20 10C20 6 16 2 12 2C8 2 4 6 4 10C4 16 12 22 12 22Z" />
              <path d="M12 22C12 22 16 16 16 10C16 7 14 4 12 2C10 4 8 7 8 10C8 16 12 22 12 22Z" />
            </svg>
          </motion.div>
          
          <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 md:space-y-6 max-w-sm">
            {/* Animated Icon Container - Pure CSS Animation */}
            <div className="relative mb-4 md:mb-8 flex items-center justify-center w-24 h-24">
              <div className="absolute w-20 h-20 border border-(--color-champagne)/40 rounded-full border-dashed animate-[spin_25s_linear_infinite]" />
              <div className="absolute w-24 h-24 border border-(--color-champagne)/20 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-(--color-champagne) opacity-90 relative z-10">
                <path d="M12 2C8 2 4 6 4 10c0 4.5 4 7.5 8 10 4-2.5 8-5.5 8-10 0-4-4-8-8-8z" />
                <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-playfair italic text-xl md:text-2xl text-(--color-champagne-light) tracking-wide"
            >
              You&apos;re Invited
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="font-cinzel text-5xl md:text-6xl text-white my-4 leading-tight tracking-wide"
            >
              {WEDDING.groomName} <br />
              <span className="text-(--color-champagne) text-4xl">&amp;</span> <br />
              {WEDDING.brideName}
            </motion.h1>
            
            <motion.hr 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-16 border-(--color-champagne) border-t opacity-50 my-2" 
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-montserrat font-light tracking-widest text-sm text-(--color-cream) uppercase py-4"
            >
              {WEDDING.date}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <button
                onClick={handleOpen}
                className="mt-1 sm:mt-3 md:mt-5 px-5 py-2.5 sm:px-6 sm:py-3 md:px-10 md:py-4 rounded-full border border-(--color-champagne) text-(--color-champagne) hover:text-white hover:bg-(--color-champagne)/30 transition-all duration-500 flex items-center gap-2 md:gap-3 group font-playfair italic text-base sm:text-lg md:text-xl shadow-[0_0_20px_rgba(201,169,110,0.1)] hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
              >
                Open Invitation 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

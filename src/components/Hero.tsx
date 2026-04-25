"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useCountdown } from "@/lib/countdown"
import { WEDDING } from "@/lib/constants"

export default function Hero({ isRevealed }: { isRevealed: boolean }) {
  const timeLeft = useCountdown(new Date(WEDDING.dateISO))

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2, // wait for overlay hide
      }
    }
  }

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background container, separated from the content wrapper */}
      <div className="absolute inset-0 w-full h-full"> 
        <Image
          src={WEDDING.couplePhotoUrl}
          alt={WEDDING.fullTitle}
          fill
          priority
          className="object-cover opacity-60 animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isRevealed ? "show" : "hidden"}
        className="relative z-10 flex flex-col items-center justify-center text-center p-6 mt-16"
      >
        <motion.p variants={item} className="font-montserrat font-light text-(--color-cream) uppercase tracking-[0.2em] text-xs md:text-sm mb-6">
          Together with their families
        </motion.p>
        
        <motion.h2 variants={item} className="font-playfair font-black text-5xl md:text-7xl lg:text-8xl text-white mb-2 tracking-tight">
          {WEDDING.groomName}
        </motion.h2>
        
        <motion.span variants={item} className="font-playfair italic text-4xl md:text-6xl text-(--color-champagne) my-2">
          &amp;
        </motion.span>
        
        <motion.h2 variants={item} className="font-playfair font-black text-5xl md:text-7xl lg:text-8xl text-white mt-2 tracking-tight">
          {WEDDING.brideName}
        </motion.h2>

        <motion.hr variants={item} className="w-24 border-(--color-champagne) opacity-50 my-8" />
        
        <motion.p variants={item} className="font-montserrat font-light text-(--color-cream) uppercase tracking-[0.1em] mb-12">
          {WEDDING.date}
        </motion.p>

        {/* Countdown */}
        <motion.div variants={item} className="flex space-x-4 md:space-x-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
          ].map((unit, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
              <div className="bg-black/40 backdrop-blur-sm border border-(--color-champagne)/30 rounded-lg p-3 w-full backdrop-filter shadow-lg">
                <span className="font-mono text-2xl md:text-4xl text-(--color-champagne) font-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {unit.value}
                </span>
              </div>
              <span className="font-montserrat text-xs md:text-sm text-(--color-cream) mt-3 uppercase tracking-wider">{unit.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator chevron down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 z-10 flex flex-col items-center text-(--color-champagne)"
      >
        <span className="font-montserrat text-[10px] uppercase tracking-widest mb-2 opacity-70">Scroll</span>
        <motion.svg 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
          className="opacity-80"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </motion.div>
    </section>
  )
}

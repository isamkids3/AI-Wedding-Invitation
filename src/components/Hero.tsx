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
        delayChildren: 0.5, // wait for overlay hide and arch animation
      }
    }
  }

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background container */}
      <div className="absolute inset-0 w-full h-full"> 
        <Image
          src={WEDDING.couplePhotoUrl}
          alt={WEDDING.fullTitle}
          fill
          priority
          className="object-cover opacity-60 animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      </div>

      {/* Decorative Arch Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute inset-4 md:inset-8 pointer-events-none flex items-center justify-center z-10"
      >
        <div className="w-full h-full border border-(--color-champagne)/30 rounded-t-[150px] md:rounded-t-3xl rounded-b-3xl relative overflow-hidden">
          {/* Subtle top decoration within the arch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 border-b border-(--color-champagne)/30 rounded-full -translate-y-1/2" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-(--color-champagne)/20 rotate-45" />
        </div>
      </motion.div>



      <motion.div
        variants={container}
        initial="hidden"
        animate={isRevealed ? "show" : "hidden"}
        className="relative z-20 flex flex-col items-center justify-center text-center p-6 mt-16 w-full max-w-4xl"
      >
        <motion.p variants={item} className="font-montserrat font-light text-(--color-cream) uppercase tracking-[0.2em] text-xs md:text-sm mb-6">
          Together with their families
        </motion.p>
        
        <motion.h2 variants={item} className="font-ballet font-normal text-5xl md:text-7xl lg:text-8xl text-white mb-2 tracking-normal">
          {WEDDING.groomName}
        </motion.h2>
        
        <motion.div variants={item} className="relative my-4 md:my-5 flex items-center justify-center">
          {/* Decorative geometric circle around the & - Pure CSS Animation */}
          <div className="absolute w-16 h-16 md:w-20 md:h-20 border border-(--color-champagne)/40 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-20 h-20 md:w-24 md:h-24 border border-(--color-champagne)/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          <span className="font-playfair italic text-4xl md:text-5xl text-(--color-champagne) relative z-10">
            &amp;
          </span>
        </motion.div>
        
        <motion.h2 variants={item} className="font-ballet font-normal text-5xl md:text-7xl lg:text-8xl text-white mt-2 tracking-normal">
          {WEDDING.brideName}
        </motion.h2>

        <motion.hr variants={item} className="w-24 border-(--color-champagne) opacity-50 my-10" />
        
        <motion.p variants={item} className="font-montserrat font-light text-(--color-cream) uppercase tracking-[0.1em] mb-12 md:mb-16">
          {WEDDING.date}
        </motion.p>

        {/* Countdown */}
        <motion.div variants={item} className="flex space-x-3 md:space-x-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
          ].map((unit, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[65px] md:min-w-[80px]">
              <div className="bg-black/40 backdrop-blur-md border border-(--color-champagne)/30 rounded-t-full rounded-b-xl p-3 pt-5 w-full backdrop-filter shadow-[0_0_15px_rgba(201,169,110,0.15)] transition-all flex justify-center items-center">
                <span className="font-mono text-xl md:text-4xl text-(--color-champagne) font-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {unit.value}
                </span>
              </div>
              <span className="font-montserrat text-[9px] md:text-xs text-(--color-cream) mt-3 uppercase tracking-[0.15em]">{unit.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator chevron down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 z-20 flex flex-col items-center text-(--color-champagne)"
      >
        <span className="font-montserrat text-[9px] uppercase tracking-widest mb-2 opacity-60">Scroll</span>
        <motion.svg 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
          className="opacity-80"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </motion.div>
    </section>
  )
}

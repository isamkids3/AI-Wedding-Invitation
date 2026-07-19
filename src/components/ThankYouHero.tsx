"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { WEDDING } from "@/lib/constants"

export default function ThankYouHero({ isRevealed }: { isRevealed: boolean }) {
  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
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
        className="relative z-20 flex flex-col items-center justify-center text-center p-6 mt-12 w-full max-w-4xl"
      >
        <motion.p variants={item} className="font-montserrat font-light text-(--color-cream) uppercase tracking-[0.2em] text-xs md:text-sm mb-4">
          Together with their families
        </motion.p>

        <motion.p variants={item} className="font-cinzel font-semibold tracking-wider text-xl md:text-2xl text-(--color-champagne) mb-4">
          {WEDDING.fullTitle}
        </motion.p>

        <motion.h1 variants={item} className="font-ballet font-normal text-6xl md:text-8xl lg:text-9xl text-white mb-4 tracking-normal leading-tight">
          Thank You For Coming!
        </motion.h1>

        <motion.hr variants={item} className="w-24 border-(--color-champagne) opacity-50 my-6" />

        <motion.p variants={item} className="font-montserrat font-light text-(--color-cream) uppercase tracking-[0.1em]">
          {WEDDING.date}
        </motion.p>
      </motion.div>

      {/* Scroll indicator chevron down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 z-20 flex flex-col items-center text-(--color-champagne)"
      >
        <span className="font-montserrat text-[9px] uppercase tracking-widest mb-2 opacity-60">Directions</span>
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

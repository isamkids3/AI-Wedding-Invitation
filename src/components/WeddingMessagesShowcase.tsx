"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Tv,
  Search,
  Heart,
  Quote
} from "lucide-react"

import type { MessageItem } from "@/app/ilya-alyaa-wedding-messages/page"

interface ShowcaseProps {
  initialMessages?: MessageItem[]
}

export default function WeddingMessagesShowcase({ initialMessages = [] }: ShowcaseProps) {
  // View & Presentation state
  const [viewMode, setViewMode] = useState<"presentation" | "grid">("presentation")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const messages = initialMessages

  // Next / Prev slide handlers
  const handleNext = useCallback(() => {
    if (messages.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % messages.length)
  }, [messages.length])

  const handlePrev = useCallback(() => {
    if (messages.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length)
  }, [messages.length])

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (viewMode !== "presentation") return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handlePrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [viewMode, handleNext, handlePrev])

  // Dynamic font sizing calculation based on text length to prevent scrolling
  const getMessageFontSize = (text: string) => {
    if (text.length > 300) return "text-base md:text-xl lg:text-2xl leading-relaxed"
    if (text.length > 180) return "text-lg md:text-2xl lg:text-3xl leading-relaxed"
    if (text.length > 90) return "text-xl md:text-3xl lg:text-4xl leading-relaxed"
    return "text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-normal"
  }

  // Filter messages for grid mode
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages
    const q = searchQuery.toLowerCase()
    return messages.filter(
      (m) => m.name.toLowerCase().includes(q) || m.msg.toLowerCase().includes(q)
    )
  }, [messages, searchQuery])

  const currentMsg = messages[currentIndex]

  return (
    <div className="min-h-screen bg-(--color-ivory) text-(--color-deep) flex flex-col relative overflow-hidden select-none">
      {/* Top Header Controls Bar */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b border-(--color-champagne)/20 px-6 py-4 flex items-center justify-between z-30 relative shadow-xs">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-(--color-champagne)/15 border border-(--color-champagne)/40 flex items-center justify-center text-(--color-champagne)">
            <Heart className="w-4 h-4 fill-(--color-champagne)" />
          </div>
          <div>
            <h1 className="font-cinzel text-base md:text-lg text-(--color-deep) font-semibold tracking-wide leading-none">
              Ilya &amp; Alyaa
            </h1>
            <span className="font-montserrat text-[11px] uppercase tracking-widest text-(--color-muted)">
              Wedding Messages
            </span>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mode Switcher */}
          <button
            onClick={() => setViewMode(viewMode === "presentation" ? "grid" : "presentation")}
            className="px-3.5 py-2 rounded-xl bg-(--color-cream) hover:bg-(--color-champagne-light)/40 border border-(--color-champagne-light) text-xs font-montserrat font-medium text-(--color-deep) flex items-center gap-2 transition-all cursor-pointer"
            title={viewMode === "presentation" ? "Switch to Grid View" : "Switch to Presentation View"}
          >
            {viewMode === "presentation" ? (
              <>
                <Grid className="w-4 h-4 text-(--color-champagne)" />
                <span className="hidden sm:inline">Grid View</span>
              </>
            ) : (
              <>
                <Tv className="w-4 h-4 text-(--color-champagne)" />
                <span className="hidden sm:inline">Presentation View</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content View */}
      {viewMode === "presentation" ? (
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative z-10 w-full max-w-[98vw] mx-auto">
          {/* Decorative Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-(--color-champagne-light)/20 via-(--color-blush)/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Slide Deck Stage Container */}
          {messages.length > 0 && currentMsg ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center relative z-20">
              {/* Animated Stage Box */}
              <div className="w-full flex-1 flex items-center justify-center py-2 md:py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -25, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full max-w-[96vw] lg:max-w-6xl xl:max-w-7xl bg-white/85 backdrop-blur-md border border-(--color-champagne)/35 rounded-[40px] md:rounded-[60px] px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-14 shadow-[0_20px_70px_-15px_rgba(201,169,110,0.22)] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] md:min-h-[520px]"
                  >
                    {/* Top Decorative Arch Arc & Lotus */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-(--color-champagne)/10 border border-(--color-champagne)/30 flex items-center justify-center mb-4 md:mb-6 text-(--color-champagne) shrink-0">
                      <Quote className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
                    </div>

                    {/* Message Text */}
                    <blockquote className={`font-playfair ${getMessageFontSize(currentMsg.msg)} text-(--color-deep) font-normal max-w-full whitespace-pre-line tracking-tight px-2 md:px-8`}>
                      &ldquo;{currentMsg.msg}&rdquo;
                    </blockquote>

                    {/* Guest Name Signature */}
                    <div className="mt-6 md:mt-8 flex flex-col items-center shrink-0">
                      <div className="w-16 h-[1px] bg-(--color-champagne) opacity-50 mb-3" />
                      <cite className="font-cinzel text-xl md:text-3xl text-(--color-champagne) font-bold not-italic tracking-wide">
                        {currentMsg.name}
                      </cite>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation Control Bar */}
              <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm border border-(--color-champagne)/30 rounded-full px-6 py-3.5 flex items-center justify-between shadow-sm relative mt-3 shrink-0">
                {/* Previous Slide */}
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full hover:bg-(--color-champagne)/15 text-(--color-deep) transition-all cursor-pointer"
                  title="Previous Message"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Counter */}
                <div className="font-montserrat text-sm text-(--color-muted)">
                  <span className="text-(--color-deep) font-semibold">{currentIndex + 1}</span> / {messages.length}
                </div>

                {/* Next Slide */}
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full hover:bg-(--color-champagne)/15 text-(--color-deep) transition-all cursor-pointer"
                  title="Next Message"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 font-montserrat text-(--color-muted)">
              No wedding messages found in configuration.
            </div>
          )}
        </main>
      ) : (
        /* Grid Gallery View */
        <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full z-10">
          {/* Search bar */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-(--color-muted)" />
              <input
                type="text"
                placeholder="Search messages or guest name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border border-(--color-champagne-light) font-montserrat text-sm text-(--color-deep) focus:outline-none focus:ring-2 focus:ring-(--color-champagne) shadow-xs"
              />
            </div>
            <div className="font-montserrat text-sm text-(--color-muted)">
              Showing <span className="font-semibold text-(--color-deep)">{filteredMessages.length}</span> of {messages.length} messages
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.map((item, idx) => {
              const originalIndex = messages.findIndex((m) => m === item)
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.3) }}
                  onClick={() => {
                    if (originalIndex !== -1) {
                      setCurrentIndex(originalIndex)
                      setViewMode("presentation")
                    }
                  }}
                  className="bg-white/80 hover:bg-white border border-(--color-champagne)/30 hover:border-(--color-champagne) rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <Quote className="w-5 h-5 text-(--color-champagne) opacity-50 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-playfair text-lg text-(--color-deep) leading-relaxed whitespace-pre-line mb-6">
                      {item.msg}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-(--color-champagne-light)/40 flex items-center justify-between">
                    <span className="font-cinzel text-base text-(--color-champagne) font-semibold">
                      {item.name}
                    </span>
                    <span className="text-xs font-montserrat text-(--color-muted) opacity-0 group-hover:opacity-100 transition-opacity">
                      View &rarr;
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </main>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  Unlock,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Grid,
  Tv,
  Search,
  Heart,
  Quote,
  Sparkles,
  Clock
} from "lucide-react"

import { verifyShowcasePassword } from "@/app/actions/showcase"
import type { MessageItem } from "@/app/ilya-alyaa-wedding-messages/page"

interface ShowcaseProps {
  initialMessages?: MessageItem[]
}

export default function WeddingMessagesShowcase({ initialMessages = [] }: ShowcaseProps) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false)

  // View & Presentation state
  const [viewMode, setViewMode] = useState<"presentation" | "grid">("presentation")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [slideDuration, setSlideDuration] = useState<number>(8) // Seconds per slide
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const messages = initialMessages

  // Check stored auth state on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("wedding_messages_auth")
    if (stored === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmittingAuth) return
    setIsSubmittingAuth(true)
    setAuthError(null)

    try {
      const res = await verifyShowcasePassword(passwordInput)
      if (res.success) {
        setIsAuthenticated(true)
        sessionStorage.setItem("wedding_messages_auth", "true")
      } else {
        setAuthError(res.error || "Incorrect password. Please try again.")
      }
    } catch {
      setAuthError("An error occurred. Please try again.")
    } finally {
      setIsSubmittingAuth(false)
    }
  }

  const handleLockOut = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("wedding_messages_auth")
    setPasswordInput("")
  }

  // Next / Prev slide handlers
  const handleNext = useCallback(() => {
    if (messages.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % messages.length)
  }, [messages.length])

  const handlePrev = useCallback(() => {
    if (messages.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length)
  }, [messages.length])

  // Auto-play timer for presentation mode
  useEffect(() => {
    if (!isAuthenticated || !isPlaying || viewMode !== "presentation" || messages.length === 0) {
      return
    }

    const timer = setInterval(() => {
      handleNext()
    }, slideDuration * 1000)

    return () => clearInterval(timer)
  }, [isAuthenticated, isPlaying, viewMode, messages.length, slideDuration, handleNext])

  // Keyboard navigation
  useEffect(() => {
    if (!isAuthenticated || viewMode !== "presentation") return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === " ") {
        e.preventDefault()
        setIsPlaying((p) => !p)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAuthenticated, viewMode, handleNext, handlePrev])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        })
      }
    }
  }

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFsChange)
    return () => document.removeEventListener("fullscreenchange", handleFsChange)
  }, [])

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

  // If not authenticated, render the Password Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-(--color-ivory) flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Soft Decorative Ambient Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--color-champagne-light)/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md rounded-[40px] p-8 md:p-12 border border-(--color-champagne)/40 shadow-[0_20px_60px_-15px_rgba(201,169,110,0.2)] text-center flex flex-col items-center"
        >
          {/* Top Lotus Emblem */}
          <div className="w-16 h-16 rounded-full bg-(--color-champagne)/10 border border-(--color-champagne)/30 flex items-center justify-center mb-6 text-(--color-champagne)">
            <Lock className="w-8 h-8 stroke-[1.5]" />
          </div>

          <h1 className="font-cinzel text-2xl md:text-3xl text-(--color-deep) tracking-wider mb-2 font-bold">
            Ilya &amp; Alyaa
          </h1>
          <p className="font-playfair italic text-lg text-(--color-champagne) mb-6">
            Wedding Messages Showcase
          </p>

          <p className="font-montserrat text-sm text-(--color-muted) mb-8">
            This display is password protected. Enter the access code to continue.
          </p>

          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full h-13 px-5 rounded-2xl bg-(--color-ivory) border border-(--color-champagne-light) font-montserrat text-center text-(--color-deep) tracking-widest placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-(--color-champagne) transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-montserrat text-xs text-red-600 bg-red-50 py-2 px-4 rounded-xl border border-red-100"
              >
                {authError}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full h-13 bg-(--color-champagne) hover:bg-[#b8975b] text-white font-montserrat uppercase tracking-widest text-xs font-semibold rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              Unlock Display
            </button>
          </form>

          <div className="mt-8 flex items-center gap-2 text-xs text-(--color-muted) font-montserrat">
            <Sparkles className="w-3.5 h-3.5 text-(--color-champagne)" />
            <span>Big Screen Presentation Ready</span>
          </div>
        </motion.div>
      </div>
    )
  }

  const currentMsg = messages[currentIndex]

  return (
    <div className="min-h-screen bg-(--color-ivory) text-(--color-deep) flex flex-col relative overflow-hidden select-none">
      {/* Top Header Controls Bar (Hidden in Fullscreen) */}
      {!isFullscreen && (
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
                Wedding Messages Showcase
              </span>
            </div>
          </div>

          {/* Center / Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Slide Duration Config Input */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-(--color-cream) border border-(--color-champagne-light) text-xs font-montserrat text-(--color-deep)">
              <Clock className="w-3.5 h-3.5 text-(--color-champagne)" />
              <span className="hidden sm:inline text-(--color-muted) text-[11px]">Speed:</span>
              <input
                type="number"
                min={1}
                max={300}
                value={slideDuration || ""}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value, 10) || 1)
                  setSlideDuration(val)
                }}
                className="w-12 bg-white/80 border border-(--color-champagne-light) rounded-lg text-center font-semibold text-xs py-0.5 px-1 focus:outline-none focus:ring-1 focus:ring-(--color-champagne)"
                title="Set slide duration in seconds"
              />
              <span className="text-(--color-muted) text-xs font-medium">s</span>
            </div>

            {/* Mode Switcher */}
            <button
              onClick={() => setViewMode(viewMode === "presentation" ? "grid" : "presentation")}
              className="px-3.5 py-2 rounded-xl bg-(--color-cream) hover:bg-(--color-champagne-light)/40 border border-(--color-champagne-light) text-xs font-montserrat font-medium text-(--color-deep) flex items-center gap-2 transition-all cursor-pointer"
              title={viewMode === "presentation" ? "Switch to Grid View" : "Switch to Big Screen Presentation"}
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

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-(--color-cream) hover:bg-(--color-champagne-light)/40 border border-(--color-champagne-light) text-(--color-deep) transition-all cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Lock Screen */}
            <button
              onClick={handleLockOut}
              className="p-2 rounded-xl bg-(--color-cream) hover:bg-red-50 border border-(--color-champagne-light) text-(--color-muted) hover:text-red-600 transition-all cursor-pointer"
              title="Lock Page"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Main Content View */}
      {viewMode === "presentation" ? (
        <main className={`flex-1 flex flex-col items-center justify-center ${isFullscreen ? "p-4 md:p-8" : "p-4 md:p-8 lg:p-12"} relative z-10 w-full max-w-[98vw] mx-auto`}>
          {/* Subtle floating overlay button in Fullscreen to allow exit */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/70 hover:text-white backdrop-blur-md transition-all cursor-pointer opacity-40 hover:opacity-100"
              title="Exit Fullscreen (Esc)"
            >
              <Minimize className="w-5 h-5" />
            </button>
          )}

          {/* Decorative Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-(--color-champagne-light)/20 via-(--color-blush)/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Slide Deck Stage Container */}
          {messages.length > 0 && currentMsg ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center relative z-20">
              {/* Animated Stage Box (Wider margins & dynamic auto font scaling) */}
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

                    {/* Big Screen Message Text */}
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

              {/* Bottom Showcase Control Bar & Progress Indicator (Hidden in Fullscreen) */}
              {!isFullscreen && (
                <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm border border-(--color-champagne)/30 rounded-full px-6 py-3.5 flex items-center justify-between shadow-sm relative mt-3 shrink-0">
                  {/* Previous Slide */}
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full hover:bg-(--color-champagne)/15 text-(--color-deep) transition-all cursor-pointer"
                    title="Previous Message (Left Arrow)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Center Slide Counter & Play/Pause */}
                  <div className="flex items-center gap-4 font-montserrat text-sm text-(--color-muted)">
                    <button
                      onClick={() => setIsPlaying((p) => !p)}
                      className="w-10 h-10 rounded-full bg-(--color-champagne) text-white flex items-center justify-center hover:bg-[#b8975b] transition-all shadow-sm cursor-pointer"
                      title={isPlaying ? "Pause Slideshow (Spacebar)" : "Play Slideshow (Spacebar)"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <span className="font-medium">
                      <span className="text-(--color-deep) font-semibold">{currentIndex + 1}</span> / {messages.length}
                    </span>
                  </div>

                  {/* Next Slide */}
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full hover:bg-(--color-champagne)/15 text-(--color-deep) transition-all cursor-pointer"
                    title="Next Message (Right Arrow)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
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
                      Present &rarr;
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


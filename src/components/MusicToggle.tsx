"use client"

import { useEffect, useRef, useState } from "react"
import { Music, Music2 } from "lucide-react"
import { WEDDING } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function MusicToggle({ shouldPlay }: { shouldPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Trigger from outside (via shouldPlay prop)
  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current.volume = 0
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        // Ramp up volume over 2 seconds
        let vol = 0
        const interval = setInterval(() => {
          vol += 0.05
          if (vol >= 0.6) {
            clearInterval(interval)
            if (audioRef.current) audioRef.current.volume = 0.6
          } else if (audioRef.current) {
            audioRef.current.volume = vol
          }
        }, 166) // Roughly 12 steps for 2 seconds
      }).catch(err => {
        console.error("Audio playback failed:", err)
      })
    }
  }, [shouldPlay])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      audioRef.current.volume = 0.6
      setIsPlaying(true)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={WEDDING.musicUrl}
        loop
        preload="none"
      />
      
      <button
        onClick={togglePlay}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
          "bg-(--color-champagne) text-white hover:bg-(--color-champagne-light)",
          isPlaying && "animate-pulse"
        )}
        title={isPlaying ? "Music Off" : "Music On"}
      >
        {isPlaying ? (
          <Music2 className="w-5 h-5 animate-pulse" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </button>
    </>
  )
}

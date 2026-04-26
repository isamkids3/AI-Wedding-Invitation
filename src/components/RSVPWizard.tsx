"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Check, X, Minus, Plus } from "lucide-react"
import { submitRSVP } from "@/app/actions/rsvp"
import SectionReveal from "./SectionReveal"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function RSVPWizard() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form State
  const [attending, setAttending] = useState<"yes" | "no" | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("") // Honeypot

  const nextStep = () => {
    setDirection(1)
    setStep((s) => s + 1)
  }

  const prevStep = () => {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const handleAttendanceSelect = (status: "yes" | "no") => {
    setAttending(status)
    setTimeout(() => {
      if (status === "yes") {
        nextStep()
      } else {
        // Jump direct to submit if not attending (we still need their name though)
        // Actually, let's just go to step 2 but only ask for name
        nextStep()
      }
    }, 300)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("attending", attending || "no")
    formData.append("guestCount", guestCount.toString())
    formData.append("message", message)
    formData.append("website_url", websiteUrl)

    const res = await submitRSVP(formData)
    setLoading(false)

    if (res.success) {
      setSuccess(true)
      triggerConfetti()
    } else {
      setError(res.error || "Something went wrong.")
    }
  }

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000
    const colors = ["#C9A96E", "#FAF7F2", "#E8C4B8"] // champagne, ivory, blush

      ; (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }())
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "50%" : "-50%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "50%" : "-50%",
      opacity: 0
    })
  }

  if (success) {
    return (
      <section className="py-24 px-4 bg-(--color-ivory) flex flex-col items-center min-h-[500px]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-(--color-champagne-light)"
        >
          <div className="w-24 h-24 rounded-full bg-(--color-champagne-light)/30 flex items-center justify-center mx-auto mb-8">
            <motion.svg
              className="w-12 h-12 text-(--color-champagne)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                d="M20 6L9 17l-5-5"
              />
            </motion.svg>
          </div>
          <h2 className="font-playfair text-3xl text-(--color-deep) mb-4">Thank you, {name}!</h2>
          <p className="font-montserrat text-(--color-muted)">
            {attending === "yes"
              ? "We can't wait to celebrate with you."
              : "We will miss you, but thank you for letting us know."}
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 bg-(--color-ivory) flex flex-col items-center overflow-hidden w-full relative">
      <SectionReveal className="w-full max-w-lg relative">
        <h2 className="font-playfair text-4xl text-center text-(--color-deep) mb-12 relative z-10">Will You Join Us?</h2>

        <div className="relative mt-8">
          {/* Top Lotus Emblem */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-(--color-champagne) opacity-100 z-20 bg-white px-3 py-1 rounded-full border border-(--color-champagne)/20 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 22C12 22 20 16 20 10C20 6 16 2 12 2C8 2 4 6 4 10C4 16 12 22 12 22Z" />
              <path d="M12 22C12 22 16 16 16 10C16 7 14 4 12 2C10 4 8 7 8 10C8 16 12 22 12 22Z" />
            </svg>
          </div>

          <div className="bg-white rounded-t-[80px] rounded-b-[40px] shadow-[0_15px_50px_-15px_rgba(201,169,110,0.2)] border border-(--color-champagne)/30 min-h-[440px] relative overflow-hidden p-6 md:p-10 pt-12 w-full">

            {error && (
              <div className="absolute top-12 left-4 right-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-montserrat flex items-center justify-center border border-red-100 z-50">
                <span className="flex-1 text-center">{error}</span>
                <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col h-full mt-4"
                >
                  <div className="flex flex-col gap-6 mt-4">
                    <button
                      onClick={() => handleAttendanceSelect("yes")}
                      className={`p-6 rounded-3xl border text-left flex items-center justify-between transition-all duration-300 ${attending === 'yes' ? 'border-(--color-champagne) bg-(--color-champagne)/5 shadow-md' : 'border-(--color-champagne)/20 hover:border-(--color-champagne) hover:shadow-sm hover:-translate-y-1'}`}
                    >
                      <div>
                        <h4 className="font-playfair text-2xl text-(--color-deep) mb-1">Joyfully Accept</h4>
                        <p className="font-montserrat text-sm text-(--color-muted)">I wouldn&apos;t miss it for the world</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${attending === 'yes' ? 'bg-(--color-champagne) border-(--color-champagne)' : 'border-gray-300'}`}>
                        {attending === 'yes' && <Check className="w-5 h-5 text-white" />}
                      </div>
                    </button>

                    <button
                      onClick={() => handleAttendanceSelect("no")}
                      className={`p-6 rounded-3xl border text-left flex items-center justify-between transition-all duration-300 ${attending === 'no' ? 'border-(--color-champagne) bg-(--color-champagne)/5 shadow-md' : 'border-(--color-champagne)/20 hover:border-(--color-champagne) hover:shadow-sm hover:-translate-y-1'}`}
                    >
                      <div>
                        <h4 className="font-playfair text-2xl text-(--color-deep) mb-1">Regretfully Decline</h4>
                        <p className="font-montserrat text-sm text-(--color-muted)">Will be celebrating from afar</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${attending === 'no' ? 'bg-(--color-champagne) border-(--color-champagne)' : 'border-gray-300'}`}>
                        {attending === 'no' && <Check className="w-5 h-5 text-white" />}
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col h-full mt-4"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block font-montserrat text-sm font-medium text-(--color-deep) mb-2">Full Name</label>
                      <Input
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-(--color-champagne-light) focus-visible:ring-(--color-champagne) rounded-xl h-12"
                      />
                    </div>

                    {/* Honeypot field - visually hidden, bots will fill it */}
                    <input 
                      type="text" 
                      name="website_url" 
                      value={websiteUrl} 
                      onChange={(e) => setWebsiteUrl(e.target.value)} 
                      className="opacity-0 absolute -z-10 h-0 w-0" 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />

                    {attending === "yes" && (
                      <>
                        <div>
                          <label className="block font-montserrat text-sm font-medium text-(--color-deep) mb-2">Email Address</label>
                          <Input
                            type="email"
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-(--color-champagne-light) focus-visible:ring-(--color-champagne) rounded-xl h-12"
                          />
                        </div>

                        <div>
                          <label className="block font-montserrat text-sm font-medium text-(--color-deep) mb-2">
                            How many seats shall we reserve?
                          </label>
                          <div className="flex items-center space-x-4 bg-(--color-ivory) w-fit rounded-full p-1 border border-(--color-champagne)/20">
                            <button
                              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                              className="w-10 h-10 rounded-full flex items-center justify-center text-(--color-champagne) hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-playfair text-xl w-8 text-center text-(--color-deep)">{guestCount}</span>
                            <button
                              onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                              className="w-10 h-10 rounded-full flex items-center justify-center text-(--color-champagne) hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-12 flex justify-between">
                    <Button variant="ghost" onClick={prevStep} className="text-(--color-muted) hover:bg-transparent hover:text-(--color-deep)">Back</Button>
                    <Button
                      onClick={attending === "yes" ? nextStep : handleSubmit}
                      disabled={!name.trim() || loading}
                      className="bg-(--color-champagne) hover:bg-(--color-champagne-light) text-white px-8 rounded-full shadow-[0_4px_14px_rgba(201,169,110,0.4)] transition-all"
                    >
                      {loading && attending === "no" ? "Submitting..." : attending === "yes" ? "Next" : "Send RSVP"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && attending === "yes" && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col h-full mt-4"
                >
                  <div className="flex-1">
                    <label className="block font-montserrat text-sm font-medium text-(--color-deep) mb-2">
                      Anything you want to say to the bride & groom?
                    </label>
                    <Textarea
                      placeholder="e.g. I can't wait to celebrate with you..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={300}
                      className="h-32 border-(--color-champagne-light) focus-visible:ring-(--color-champagne) resize-none rounded-2xl"
                    />
                    <p className="text-right text-xs text-(--color-muted) mt-2 font-montserrat">{message.length}/300</p>
                  </div>

                  <div className="mt-auto flex justify-between pt-8">
                    <Button variant="ghost" onClick={prevStep} className="text-(--color-muted) hover:bg-transparent hover:text-(--color-deep)">Back</Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="bg-(--color-champagne) hover:bg-(--color-champagne-light) text-white px-10 rounded-full shadow-[0_4px_20px_rgba(201,169,110,0.4)] hover:shadow-[0_6px_25px_rgba(201,169,110,0.6)] transition-all animate-[pulse_3s_ease-in-out_infinite]"
                    >
                      {loading ? (
                        <span className="flex items-center space-x-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>Sending...</span>
                        </span>
                      ) : "Send RSVP"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper dots */}
            {!success && attending === "yes" && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${step === s ? 'bg-(--color-champagne) w-6' : 'bg-(--color-champagne)/20'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}

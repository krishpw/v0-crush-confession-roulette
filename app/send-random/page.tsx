"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { subscribeToAuth, type AuthState } from "@/lib/auth"
import { api } from "@/lib/api"
import { Navbar } from "@/components/navbar"
import { HeartParticles } from "@/components/heart-particles"
import { GlassCard } from "@/components/glass-card"
import { PrimaryButton } from "@/components/primary-button"
import { GradientText } from "@/components/gradient-text"
import { FooterBrand } from "@/components/footer-brand"
import { TemplateCarousel } from "@/components/template-carousel"

export default function SendRandom() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const unsubscribe = subscribeToAuth((state) => {
      if (!state) {
        router.push("/login")
      } else {
        setAuthState(state)
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      unsubscribe()
    }
  }, [router])

  const handleSubmit = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      await api.sendRandomConfession(text)
      setSuccess(true)
      setText("")

      setTimeout(() => {
        router.push("/dashboard")
      }, 2500)
    } catch (error) {
      console.error("[v0] Failed to send confession:", error)
      alert("Failed to send confession. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!authState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509]">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles intensity={success ? "high" : "medium"} />
      <Navbar user={authState.user} />

      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF6489]/20 opacity-50" />
        <div className="absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF8FA3]/10 opacity-30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-3xl items-center px-6 py-32"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <GlassCard className="border-[#FF6489]/30 shadow-[0_0_40px_rgba(255,100,137,0.2)]">
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <h1 className="mb-3 text-4xl font-bold text-white">
                    <GradientText>🎲 Send a Random Confession</GradientText>
                  </h1>
                </motion.div>
                <p className="mb-8 text-lg text-white/70">
                  Spin the wheel. We'll pick someone on your campus and drop this in their inbox.
                </p>

                <TemplateCarousel onSelect={(template) => setText(template)} />

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your confession here... Keep it fun, flirty, or mysterious. 💫"
                  className="mb-6 h-56 w-full resize-none rounded-2xl border-2 border-white/20 bg-white/5 p-5 text-lg text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-[#FF6489]/60 focus:outline-none focus:ring-4 focus:ring-[#FF6489]/30 focus:shadow-[0_0_30px_rgba(255,100,137,0.3)]"
                  maxLength={500}
                />

                <div className="mb-8 flex justify-between text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-2 animate-pulse rounded-full bg-[#FF6489]" />
                    Anonymous. Always.
                  </span>
                  <span>{text.length}/500</span>
                </div>

                <PrimaryButton fullWidth onClick={handleSubmit} disabled={!text.trim() || loading}>
                  {loading ? "Sending..." : "🎲 Send Anonymously"}
                </PrimaryButton>

                <button
                  onClick={() => router.push("/dashboard")}
                  className="mt-6 w-full py-3 text-white/60 transition-colors hover:text-white"
                >
                  ← Back to Dashboard
                </button>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mb-8 text-9xl"
              >
                ✅
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold text-white">
                <GradientText>Done!</GradientText>
              </h2>
              <p className="text-xl text-white/70">Someone on campus is about to blush.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

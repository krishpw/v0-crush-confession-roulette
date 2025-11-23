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

export default function SendTargeted() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [targetEmail, setTargetEmail] = useState("")
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
    if (!text.trim() || !targetEmail.trim()) return

    setLoading(true)
    try {
      await api.sendTargetedConfession(text, targetEmail)
      setSuccess(true)
      setText("")
      setTargetEmail("")

      setTimeout(() => {
        router.push("/dashboard")
      }, 2500)
    } catch (error) {
      console.error("[v0] Failed to send targeted confession:", error)
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
          transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.03}px, ${(mousePos.y - window.innerHeight / 2) * 0.03}px)`,
        }}
      >
        <div className="absolute left-1/2 top-1/3 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF6489]/30 opacity-60" />
        <div className="absolute left-1/2 top-1/3 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF0055]/20 opacity-40" />
        <div className="absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6489]/10 opacity-30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-4xl items-center px-6 py-32"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <GlassCard className="border-[#FF0055]/40 shadow-[0_0_50px_rgba(255,0,85,0.25)]">
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <h1 className="mb-3 text-4xl font-bold text-white">
                    <GradientText>🎯 Send a Targeted Confession</GradientText>
                  </h1>
                </motion.div>
                <p className="mb-10 text-lg text-white/70">
                  Aim this at a specific .edu email. Cupid's arrow never misses.
                </p>

                <div className="space-y-8">
                  <div>
                    <label className="mb-3 block text-base font-medium text-white/90">🎯 Target Email</label>
                    <input
                      type="email"
                      value={targetEmail}
                      onChange={(e) => setTargetEmail(e.target.value)}
                      placeholder="someone@university.edu"
                      className="w-full rounded-2xl border-2 border-[#FF0055]/30 bg-white/5 px-5 py-4 text-lg text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-[#FF0055]/60 focus:outline-none focus:ring-4 focus:ring-[#FF0055]/30 focus:shadow-[0_0_30px_rgba(255,0,85,0.4)]"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-white/90">💘 Your Confession</label>
                    <TemplateCarousel onSelect={(template) => setText(template)} />
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type your confession here... Make it count. 💫"
                      className="h-60 w-full resize-none rounded-2xl border-2 border-[#FF0055]/30 bg-white/5 p-5 text-lg text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-[#FF0055]/60 focus:outline-none focus:ring-4 focus:ring-[#FF0055]/30 focus:shadow-[0_0_30px_rgba(255,0,85,0.4)]"
                      maxLength={500}
                    />
                    <div className="mt-3 text-right text-sm text-white/50">{text.length}/500</div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-[#FF6489]/30 bg-gradient-to-r from-[#FF0055]/10 to-[#FF6489]/10 p-4 text-center backdrop-blur-sm">
                  <p className="text-base text-white/70">
                    💘 Cupid's arrow is ready. This will arrive in their inbox anonymously.
                  </p>
                </div>

                <PrimaryButton
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!text.trim() || !targetEmail.trim() || loading}
                  className="mt-8"
                >
                  {loading ? "Sending..." : "🏹 Fire Confession"}
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mb-8 text-9xl"
              >
                🎯
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold text-white">
                <GradientText>Sent!</GradientText>
              </h2>
              <p className="text-xl text-white/70">If they join, it'll be waiting in their inbox.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

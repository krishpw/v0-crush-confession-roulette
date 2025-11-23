"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { subscribeToAuth, type AuthState } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { HeartParticles } from "@/components/heart-particles"
import { GlassCard } from "@/components/glass-card"
import { FooterBrand } from "@/components/footer-brand"
import { PrimaryButton } from "@/components/primary-button"
import { Sparkles, Lock } from "lucide-react"

export default function Premium() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(0)

  useEffect(() => {
    const unsubscribe = subscribeToAuth((state) => {
      if (!state) {
        router.push("/login")
      } else {
        setAuthState(state)
      }
    })

    return unsubscribe
  }, [router])

  if (!authState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509]">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  const themes = [
    { name: "Valentine Classic", colors: ["#FF6489", "#FF8FA3"], locked: false },
    { name: "Electric Purple", colors: ["#A855F7", "#C084FC"], locked: true },
    { name: "Ocean Blue", colors: ["#0EA5E9", "#38BDF8"], locked: true },
    { name: "Sunset Orange", colors: ["#F97316", "#FB923C"], locked: true },
    { name: "Emerald Green", colors: ["#10B981", "#34D399"], locked: true },
    { name: "Rose Gold", colors: ["#E879F9", "#F0ABFC"], locked: true },
  ]

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles />
      <Navbar user={authState.user} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E879F9]/10 via-transparent to-[#FFD700]/10 opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-32"
      >
        <motion.div
          className="mb-16 text-center"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="flex size-28 items-center justify-center rounded-full border-2 border-[#E879F9]/50 bg-gradient-to-br from-[#E879F9]/20 to-[#FFD700]/20 shadow-[0_0_60px_rgba(232,121,249,0.5)]">
              <Sparkles className="size-14 text-[#E879F9]" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-[#E879F9] via-[#FFD700] to-[#FF6489] bg-clip-text text-5xl font-bold text-transparent">
            Premium Themes
          </h1>
          <p className="text-xl text-white/70">Customize your confession experience with exclusive themes</p>
        </motion.div>

        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: theme.locked ? 1 : 1.05, y: theme.locked ? 0 : -8 }}
            >
              <button
                onClick={() => !theme.locked && setSelectedTheme(i)}
                className={`relative w-full rounded-2xl border-2 p-8 text-left transition-all ${
                  selectedTheme === i && !theme.locked
                    ? "border-[#E879F9]/60 shadow-[0_0_50px_rgba(232,121,249,0.5)]"
                    : theme.locked
                      ? "border-white/10 cursor-not-allowed opacity-50"
                      : "border-[#E879F9]/30 hover:border-[#E879F9]/50 hover:shadow-[0_0_30px_rgba(232,121,249,0.3)]"
                }`}
                style={{
                  background: theme.locked
                    ? "rgba(255, 255, 255, 0.03)"
                    : `linear-gradient(135deg, ${theme.colors[0]}25, ${theme.colors[1]}25)`,
                }}
              >
                {theme.locked && (
                  <div className="absolute right-4 top-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Lock className="size-5 text-white/50" />
                    </div>
                  </div>
                )}

                <div className="mb-6 flex gap-3">
                  {theme.colors.map((color, j) => (
                    <motion.div
                      key={j}
                      className="size-14 rounded-full shadow-lg"
                      style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>

                <h3 className="mb-2 text-xl font-bold text-white">{theme.name}</h3>
                <p className="text-sm text-white/60">{theme.locked ? "🔒 Unlock with invites" : "✅ Active"}</p>

                {selectedTheme === i && !theme.locked && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -right-3 -top-3 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-[#E879F9] to-[#FFD700] shadow-[0_0_20px_rgba(232,121,249,0.6)]"
                  >
                    <Sparkles className="size-6 text-white" />
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <GlassCard className="text-center border-[#E879F9]/40 shadow-[0_0_50px_rgba(232,121,249,0.3)]">
          <div className="p-10">
            <h3 className="mb-4 text-2xl font-bold text-white">Want to unlock all themes?</h3>
            <p className="mb-8 text-lg text-white/70">
              Invite 2 friends to unlock premium themes and exclusive features
            </p>
            <PrimaryButton onClick={() => router.push("/invite")}>Go to Invites</PrimaryButton>
          </div>
        </GlassCard>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

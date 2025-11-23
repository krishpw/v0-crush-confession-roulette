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
import { Flame, Zap, TrendingUp } from "lucide-react"

export default function ChaosHour() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [isChaosMode, setIsChaosMode] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToAuth((state) => {
      if (!state) {
        router.push("/login")
      } else {
        setAuthState(state)
      }
    })

    const checkChaosMode = () => {
      const now = new Date()
      setIsChaosMode(now.getHours() === 20) // 8 PM
    }

    checkChaosMode()
    const interval = setInterval(checkChaosMode, 60000)
    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [router])

  if (!authState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509]">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  const chaosPerks = [
    { icon: Flame, title: "2x Dopamine Badges", desc: "Get double the hype alerts" },
    { icon: Zap, title: "Instant Delivery", desc: "Confessions arrive faster" },
    { icon: TrendingUp, title: "Boosted Visibility", desc: "Higher chance of trending" },
  ]

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles intensity={isChaosMode ? "high" : "medium"} />
      <Navbar user={authState.user} />

      {isChaosMode && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF00FF]/10 via-[#FFFF00]/5 to-transparent opacity-70" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-32"
      >
        <motion.div className="mb-16 text-center">
          <motion.div
            animate={
              isChaosMode
                ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 60px rgba(255,0,255,0.6)",
                      "0 0 100px rgba(255,255,0,0.8)",
                      "0 0 60px rgba(255,0,255,0.6)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className={`mb-8 inline-flex items-center gap-4 rounded-full border-2 px-8 py-4 ${
              isChaosMode
                ? "border-[#FF00FF]/70 bg-gradient-to-r from-[#FF00FF]/40 to-[#FFFF00]/40 shadow-[0_0_80px_rgba(255,0,255,0.8)]"
                : "border-[#FF6489]/50 bg-gradient-to-r from-[#FF6489]/30 to-[#FF8FA3]/30 shadow-[0_0_40px_rgba(255,100,137,0.6)]"
            }`}
          >
            <Flame className={`size-8 ${isChaosMode ? "text-[#FFFF00]" : "text-[#FF6489]"}`} />
            <span className="text-2xl font-bold text-white">
              {isChaosMode ? "⚡ CHAOS MODE ACTIVE ⚡" : "Chaos Hour: 8 PM Daily"}
            </span>
          </motion.div>

          <h1 className="mb-4 bg-gradient-to-r from-[#FF00FF] via-[#FF6489] to-[#FFFF00] bg-clip-text text-5xl font-bold text-transparent">
            Chaos Hour
          </h1>
          <p className="text-xl text-white/70">
            {isChaosMode
              ? "The campus is on fire right now. Send confessions while the chaos lasts!"
              : "Every day at 8 PM, things get wild. Set your reminder."}
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {chaosPerks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isChaosMode ? [0, -2, 2, -1, 1, 0] : 0,
              }}
              transition={
                isChaosMode
                  ? { delay: i * 0.12, x: { duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 } }
                  : { delay: i * 0.12 }
              }
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <GlassCard
                className={`h-full ${
                  isChaosMode
                    ? "border-[#FF00FF]/50 shadow-[0_0_40px_rgba(255,0,255,0.3)]"
                    : "border-[#FF6489]/30 shadow-[0_0_20px_rgba(255,100,137,0.2)]"
                }`}
              >
                <div className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div
                      className={`flex size-20 items-center justify-center rounded-full border-2 ${
                        isChaosMode
                          ? "border-[#FF00FF]/50 bg-gradient-to-br from-[#FF00FF]/20 to-[#FFFF00]/20 shadow-[0_0_30px_rgba(255,0,255,0.4)]"
                          : "border-[#FF6489]/30 bg-gradient-to-br from-[#FF6489]/20 to-[#FF8FA3]/20"
                      }`}
                    >
                      <perk.icon className={`size-9 ${isChaosMode ? "text-[#FFFF00]" : "text-[#FF8FA3]"}`} />
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{perk.title}</h3>
                  <p className="text-base text-white/70">{perk.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className={`text-center ${isChaosMode ? "border-[#FF00FF]/50" : "border-[#FF6489]/30"}`}>
          <div className="p-10">
            <h3 className="mb-4 text-2xl font-bold text-white">
              {isChaosMode ? "Don't waste the chaos!" : "Ready for the next drop?"}
            </h3>
            <p className="mb-8 text-lg text-white/70">
              {isChaosMode
                ? "Send confessions now to maximize your impact and get featured in trending"
                : "Come back at 8 PM for maximum dopamine and double the rewards"}
            </p>
            <PrimaryButton onClick={() => router.push(isChaosMode ? "/send-random" : "/dashboard")}>
              {isChaosMode ? "⚡ Send Confession Now" : "Back to Dashboard"}
            </PrimaryButton>
          </div>
        </GlassCard>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

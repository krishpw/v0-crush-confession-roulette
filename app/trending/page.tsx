"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { subscribeToAuth, type AuthState } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { HeartParticles } from "@/components/heart-particles"
import { GlassCard } from "@/components/glass-card"
import { FooterBrand } from "@/components/footer-brand"
import { TrendingUp, Eye, Heart, Sparkles } from "lucide-react"

export default function Trending() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)

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

  const rankings = [
    { icon: Eye, title: "Most Mysterious", desc: "Someone with big secret admirer energy", badge: "🔮" },
    { icon: Heart, title: "Most Confessed-About", desc: "Crushing it in the confession game", badge: "💕" },
    { icon: Sparkles, title: "Most Blushed-About", desc: "Making people feel all the feels", badge: "😳" },
    { icon: TrendingUp, title: "Rising Star", desc: "New to campus, already turning heads", badge: "⭐" },
  ]

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles />
      <Navbar user={authState.user} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF6489]/10 via-transparent to-[#FFA500]/10 opacity-50" />
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
            <div className="flex size-24 items-center justify-center rounded-full border-2 border-[#FFA500]/50 bg-gradient-to-br from-[#FF6489]/20 to-[#FFA500]/20 shadow-[0_0_60px_rgba(255,165,0,0.4)]">
              <TrendingUp className="size-12 text-[#FFA500]" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-[#FF6489] via-[#FF8FA3] to-[#FFA500] bg-clip-text text-5xl font-bold text-transparent">
            Trending Now
          </h1>
          <p className="text-xl text-white/70">Top crush energy rankings (anonymous)</p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {rankings.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <GlassCard className="border-[#FFA500]/30 shadow-[0_0_30px_rgba(255,100,137,0.2)] h-full">
                <div className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex size-20 items-center justify-center rounded-full border-2 border-[#FF6489]/40 bg-gradient-to-br from-[#FF6489]/20 to-[#FFA500]/20 shadow-[0_0_20px_rgba(255,100,137,0.3)]">
                      <item.icon className="size-10 text-[#FF8FA3]" />
                    </div>
                  </div>
                  <div className="mb-4 text-5xl">{item.badge}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-base text-white/70">{item.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="text-center border-[#FF6489]/30 shadow-[0_0_40px_rgba(255,100,137,0.2)]">
          <div className="p-10">
            <h3 className="mb-4 text-2xl font-bold text-white">Want to see where you rank?</h3>
            <p className="mb-8 text-lg text-white/70">
              Get more confessions to unlock your anonymous ranking and see how you stack up on campus
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dashboard")}
              className="rounded-full bg-gradient-to-r from-[#FF6489] to-[#FFA500] px-10 py-4 text-lg font-medium text-white shadow-[0_0_30px_rgba(255,100,137,0.5)] transition-all hover:shadow-[0_0_50px_rgba(255,100,137,0.7)]"
            >
              Back to Dashboard
            </motion.button>
          </div>
        </GlassCard>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

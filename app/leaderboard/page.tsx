"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { subscribeToAuth, type AuthState } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { HeartParticles } from "@/components/heart-particles"
import { GlassCard } from "@/components/glass-card"
import { FooterBrand } from "@/components/footer-brand"
import { Trophy, Medal, Award } from "lucide-react"

export default function Leaderboard() {
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

  const campus = authState.user?.email?.split("@")[1]?.replace(".edu", "") || "Campus"
  const leaderboard = [
    { rank: 1, campus: `${campus}`, confessions: 2847, icon: Trophy, color: "#FFD700" },
    { rank: 2, campus: "Stanford", confessions: 2103, icon: Medal, color: "#C0C0C0" },
    { rank: 3, campus: "MIT", confessions: 1891, icon: Award, color: "#CD7F32" },
    { rank: 4, campus: "Harvard", confessions: 1654 },
    { rank: 5, campus: "Yale", confessions: 1432 },
    { rank: 6, campus: "Princeton", confessions: 1287 },
  ]

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles />
      <Navbar user={authState.user} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-5xl px-6 py-32"
      >
        <motion.div
          className="mb-16 text-center"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="flex size-28 items-center justify-center rounded-full border-2 border-[#FFD700]/50 bg-gradient-to-br from-[#FFD700]/20 to-[#FF6489]/20 shadow-[0_0_60px_rgba(255,215,0,0.5)]">
              <Trophy className="size-14 text-[#FFD700]" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-[#FFD700] via-[#FF8FA3] to-[#FF6489] bg-clip-text text-5xl font-bold text-transparent">
            Campus Leaderboard
          </h1>
          <p className="text-xl text-white/70">Top campuses by confession activity</p>
        </motion.div>

        <div className="space-y-8">
          {leaderboard.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, x: 8 }}
            >
              <GlassCard
                className={`flex items-center gap-6 p-6 ${
                  item.rank === 1
                    ? "border-2 border-[#FFD700]/50 shadow-[0_0_50px_rgba(255,215,0,0.4)]"
                    : item.rank === 2
                      ? "border-2 border-[#C0C0C0]/40 shadow-[0_0_40px_rgba(192,192,192,0.3)]"
                      : item.rank === 3
                        ? "border-2 border-[#CD7F32]/40 shadow-[0_0_40px_rgba(205,127,50,0.3)]"
                        : "border-[#A855F7]/20"
                }`}
              >
                <div className="flex size-16 items-center justify-center">
                  {item.icon ? (
                    <div
                      className={`flex size-16 items-center justify-center rounded-full ${
                        item.rank === 1
                          ? "bg-gradient-to-br from-[#FFD700]/30 to-[#FFA500]/30 shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                          : item.rank === 2
                            ? "bg-gradient-to-br from-[#C0C0C0]/30 to-[#E0E0E0]/30 shadow-[0_0_20px_rgba(192,192,192,0.5)]"
                            : "bg-gradient-to-br from-[#CD7F32]/30 to-[#8B4513]/30 shadow-[0_0_20px_rgba(205,127,50,0.5)]"
                      }`}
                    >
                      <item.icon className="size-10" style={{ color: item.color }} />
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-white/60">#{item.rank}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{item.campus}</h3>
                  <p className="text-base text-white/70">{item.confessions.toLocaleString()} confessions</p>
                </div>
                {item.rank === 1 && (
                  <span className="rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-5 py-2 text-sm font-bold text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                    👑 TOP CAMPUS
                  </span>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

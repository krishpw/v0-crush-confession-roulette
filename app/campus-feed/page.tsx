"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { subscribeToAuth, type AuthState } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { HeartParticles } from "@/components/heart-particles"
import { GlassCard } from "@/components/glass-card"
import { FooterBrand } from "@/components/footer-brand"
import { Flame, TrendingUp, MapPin } from "lucide-react"

export default function CampusFeed() {
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
  const feedItems = [
    { icon: Flame, text: `47 confessions sent at ${campus} today`, color: "#FF6489" },
    { icon: TrendingUp, text: "Top trending: Business Hall", color: "#FF8FA3" },
    { icon: MapPin, text: "Someone at North Dorm got a confession", color: "#FF6489" },
    { icon: Flame, text: "12 confessions in the last hour", color: "#FF8FA3" },
    { icon: TrendingUp, text: "Engineering building is heating up", color: "#FF6489" },
    { icon: MapPin, text: "West Campus activity +34%", color: "#FF8FA3" },
  ]

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles />
      <Navbar user={authState.user} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mx-auto max-w-4xl px-6 pb-12 pt-28"
      >
        <div className="mb-12 text-center">
          <h1 className="mb-3 bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] bg-clip-text text-4xl font-bold text-transparent">
            Campus Feed
          </h1>
          <p className="text-white/60">See what's happening at {campus}</p>
        </div>

        <div className="space-y-4">
          {feedItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="flex items-center gap-4">
                <div
                  className="flex size-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                  <item.icon className="size-5" style={{ color: item.color }} />
                </div>
                <p className="flex-1 text-white/90">{item.text}</p>
                <span className="text-xs text-white/40">{Math.floor(Math.random() * 60)}m ago</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

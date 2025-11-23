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
import { Users, Gift, Unlock, Share2 } from "lucide-react"

export default function Invite() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [copied, setCopied] = useState(false)

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

  const copyInviteLink = () => {
    const link = `https://crushconfession.app/signup?ref=${authState?.user?.uid}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!authState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509]">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  const unlockables = [
    { icon: Gift, title: "Premium Themes", desc: "Unlock exclusive confession backgrounds", requires: "2 friends" },
    { icon: Unlock, title: "Chaos Mode Badges", desc: "Special glow colors during chaos hour", requires: "2 friends" },
    {
      icon: Share2,
      title: "Priority Delivery",
      desc: "Your confessions get boosted visibility",
      requires: "3 confessions",
    },
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
            <div className="flex size-28 items-center justify-center rounded-full border-2 border-[#FF6489]/50 bg-gradient-to-br from-[#FF6489]/20 to-[#FF8FA3]/20 shadow-[0_0_60px_rgba(255,100,137,0.5)]">
              <Users className="size-14 text-[#FF8FA3]" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] bg-clip-text text-5xl font-bold text-transparent">
            Unlock Premium Features
          </h1>
          <p className="text-xl text-white/70">Invite friends or receive confessions to unlock exclusive perks</p>
        </motion.div>

        <GlassCard className="mb-12 border-[#FF6489]/30 shadow-[0_0_40px_rgba(255,100,137,0.2)]">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Your Progress</h3>
                <p className="text-base text-white/60">Track your unlocks</p>
              </div>
              <motion.div
                className="flex size-24 items-center justify-center rounded-full border-4 border-[#FF6489]/60 bg-gradient-to-br from-[#FF6489]/30 to-[#FF8FA3]/30 shadow-[0_0_40px_rgba(255,100,137,0.5)]"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(255,100,137,0.5)",
                    "0 0 60px rgba(255,100,137,0.7)",
                    "0 0 40px rgba(255,100,137,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-3xl font-bold text-white">0/2</span>
              </motion.div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="size-6 text-[#FF8FA3]" />
                    <span className="text-lg font-medium text-white">Friends invited</span>
                  </div>
                  <span className="text-base font-bold text-white">0/2</span>
                </div>
                {/* Progress bar */}
                <div className="h-3 w-full rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] shadow-[0_0_10px_rgba(255,100,137,0.6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "0%" }}
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift className="size-6 text-[#FF8FA3]" />
                    <span className="text-lg font-medium text-white">Confessions received</span>
                  </div>
                  <span className="text-base font-bold text-white">0/3</span>
                </div>
                {/* Progress bar */}
                <div className="h-3 w-full rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] shadow-[0_0_10px_rgba(255,100,137,0.6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <PrimaryButton fullWidth onClick={copyInviteLink}>
                {copied ? "✅ Link Copied!" : "📋 Copy Invite Link"}
              </PrimaryButton>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Unlockable Features</h3>
          {unlockables.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ scale: 1.02, x: 8 }}
            >
              <GlassCard className="flex items-center gap-6 border-[#FF6489]/20 p-6 shadow-[0_0_20px_rgba(255,100,137,0.15)]">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#FF6489]/40 bg-gradient-to-br from-[#FF6489]/20 to-[#FF8FA3]/20 shadow-[0_0_20px_rgba(255,100,137,0.3)]">
                  <item.icon className="size-8 text-[#FF8FA3]" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-2 text-xl font-bold text-white">{item.title}</h4>
                  <p className="text-base text-white/70">{item.desc}</p>
                </div>
                <span className="whitespace-nowrap rounded-full border-2 border-[#FF6489]/30 bg-gradient-to-r from-[#FF6489]/10 to-[#FF8FA3]/10 px-5 py-2 text-sm font-medium text-white/80 shadow-[0_0_15px_rgba(255,100,137,0.2)]">
                  🔒 {item.requires}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

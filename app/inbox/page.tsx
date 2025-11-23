"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { subscribeToAuth, type AuthState } from "@/lib/auth"
import { api } from "@/lib/api"
import { Navbar } from "@/components/navbar"
import { HeartParticles } from "@/components/heart-particles"
import { GlassCard } from "@/components/glass-card"
import { ConfessionCard } from "@/components/confession-card"
import { FooterBrand } from "@/components/footer-brand"
import { GradientText } from "@/components/gradient-text"

export default function Inbox() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [confessions, setConfessions] = useState<
    Array<{
      id: string
      text: string
      isTargeted: boolean
      createdAt: string
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuth((state) => {
      if (!state) {
        router.push("/login")
      } else {
        setAuthState(state)
        loadInbox()
      }
    })

    return unsubscribe
  }, [router])

  const loadInbox = async () => {
    try {
      const data = await api.getInbox()
      setConfessions(data)
    } catch (error) {
      console.error("[v0] Failed to load inbox:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyShareLink = () => {
    const url = window.location.origin
    navigator.clipboard.writeText(url)
    alert("Link copied! Share it with your campus.")
  }

  if (!authState || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509]">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050509]">
      <HeartParticles />
      <Navbar user={authState.user} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl px-6 py-32"
      >
        <motion.div
          className="mb-12 text-center"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-full border-2 border-[#60A5FA]/50 bg-gradient-to-br from-[#60A5FA]/20 to-[#FF6489]/20 shadow-[0_0_40px_rgba(96,165,250,0.4)]">
              <span className="text-4xl">📬</span>
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white">
            <GradientText>Your Confession Inbox</GradientText>
          </h1>
          <p className="text-lg text-white/70">Stuff people have been lowkey dying to say.</p>
        </motion.div>

        {confessions.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <GlassCard className="text-center border-[#60A5FA]/30 shadow-[0_0_40px_rgba(96,165,250,0.2)]">
                <div className="py-12 px-8">
                  <motion.div
                    className="mb-6 text-8xl"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    👻
                  </motion.div>
                  <h2 className="mb-4 text-3xl font-bold text-white">No confessions yet</h2>
                  <p className="mb-8 text-lg text-white/70">
                    Either you're mysterious… or your campus hasn't caught on yet.
                  </p>
                  <button
                    onClick={copyShareLink}
                    className="rounded-full border-2 border-[#60A5FA]/50 bg-gradient-to-r from-[#60A5FA]/20 to-[#FF6489]/20 px-8 py-3.5 font-medium text-white shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all hover:shadow-[0_0_30px_rgba(96,165,250,0.5)]"
                  >
                    📋 Copy Share Link
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {confessions.map((confession, index) => (
                <motion.div
                  key={confession.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <ConfessionCard
                    text={confession.text}
                    isTargeted={confession.isTargeted}
                    createdAt={confession.createdAt}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-white/60 transition-colors hover:text-white"
          >
            ← Back to Dashboard
          </button>
        </div>
      </motion.div>

      <FooterBrand />
    </div>
  )
}

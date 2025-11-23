"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { HeartParticles } from "@/components/heart-particles"
import { ShaderGhost } from "@/components/shader-ghost"
import { MiniGhosts } from "@/components/mini-ghosts"
import { ChaosWidget } from "@/components/chaos-widget"
import { GhostMist } from "@/components/ghost-mist"

export default function Landing() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen bg-[#050509] overflow-hidden">
      <HeartParticles intensity="low" />
      <GhostMist />

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-8xl font-bold tracking-tight text-white md:text-9xl">
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,105,180,0.6)]">
              Ghostline
            </span>
          </h1>
          <p className="text-2xl text-white/70 md:text-3xl font-light">Your campus crush network.</p>
        </motion.div>

        {/* Ghost + Mini Ghosts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-radial from-pink-500/50 via-purple-500/30 to-transparent" />
          <ShaderGhost size={400} />
          <MiniGhosts />
        </motion.div>

        {/* CTA Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center gap-8 mb-12 md:flex-row md:gap-12"
        >
          {/* Secondary CTA - KupidLive */}
          <motion.a
            href="https://www.kupid.live/video-calling"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-pink-500/30 shadow-[0_0_50px_rgba(255,105,180,0.4)] transition-all hover:shadow-[0_0_80px_rgba(255,105,180,0.7)]"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-600/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="text-4xl mb-2">🎥</div>
            <div className="text-sm font-semibold text-white/90">KupidLive</div>
          </motion.a>

          {/* Primary CTA - Start Confessing */}
          <motion.button
            onClick={() => router.push("/signup")}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 px-16 py-7 text-2xl font-bold text-white shadow-[0_0_60px_rgba(255,105,180,0.8)] transition-all hover:shadow-[0_0_100px_rgba(255,105,180,1)]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <span className="relative z-10">Start Confessing</span>
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute top-2 left-2 text-xl">💗</div>
            </motion.div>
          </motion.button>

          {/* Secondary CTA - Watch Reels */}
          <motion.a
            href="https://www.instagram.com/kupiddating/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-pink-500/30 shadow-[0_0_50px_rgba(255,105,180,0.4)] transition-all hover:shadow-[0_0_80px_rgba(255,105,180,0.7)]"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-600/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />
            <div className="text-4xl mb-2">📺</div>
            <div className="text-sm font-semibold text-white/90">Watch Reels</div>
          </motion.a>
        </motion.div>

        {/* Chaos Hour Widget */}
        <ChaosWidget />

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-32 mb-20 max-w-5xl mx-auto"
        >
          <h2 className="text-center text-4xl font-bold text-white mb-16">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              How Ghostline Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✍️", title: "Write it", desc: "Spark a confession" },
              { icon: "📬", title: "Send it", desc: "Random or targeted" },
              { icon: "👀", title: "See what lands", desc: "Inbox magic" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-3xl border border-pink-500/30 bg-[#0B0F17]/80 backdrop-blur-xl p-8 text-center hover:border-pink-500/50 transition-all">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why It Hits Different */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="relative mt-20 text-center max-w-3xl mx-auto"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-[200px]">👻</div>
          </div>
          <h2 className="relative text-4xl font-bold text-white mb-6">Why it hits different</h2>
          <p className="relative text-xl text-white/60 leading-relaxed">
            We keep it fun, anonymous, and just the right amount of chaotic. Campus approved, zero cringe.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

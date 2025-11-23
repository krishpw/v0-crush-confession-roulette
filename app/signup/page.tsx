"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { loginWithGoogle } from "@/lib/auth"
import { isFirebaseConfigured } from "@/lib/firebase-client"
import { HeartParticles } from "@/components/heart-particles"
import { ShaderGhost } from "@/components/shader-ghost"
import { ChaosWidget } from "@/components/chaos-widget"
import { GhostMist } from "@/components/ghost-mist"

export default function Signup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const firebaseConfigured = isFirebaseConfigured()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (typeof window !== "undefined") {
        const parallaxX = (e.clientX / window.innerWidth - 0.5) * 10
        const parallaxY = (e.clientY / window.innerHeight - 0.5) * 10
        setParallax({ x: parallaxX, y: parallaxY })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleGoogleSignup = async () => {
    if (!firebaseConfigured) {
      setError(
        "Firebase authentication is not configured. Please add your Firebase credentials to the environment variables in the Vars section.",
      )
      return
    }

    setLoading(true)
    setError("")

    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (err) {
      console.log("[v0] Signup error:", err)
      setError("Failed to sign up. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#050509] overflow-hidden flex items-center justify-center px-6 py-32">
      <HeartParticles intensity="low" />
      <GhostMist />

      {/* Chaos Widget - Top Right */}
      <div className="fixed top-8 right-8 z-20">
        <ChaosWidget />
      </div>

      {/* Floating Ghost Background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{
          transform: `translate(calc(-50% + ${parallax.x}px), calc(-50% + ${parallax.y}px))`,
        }}
      >
        <ShaderGhost size={600} />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 blur-3xl" />

        <div className="relative rounded-3xl border-2 border-pink-500/30 bg-[#0B0F17]/90 backdrop-blur-2xl p-10 shadow-[0_0_60px_rgba(255,105,180,0.4)]">
          {/* Header */}
          <div className="mb-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              Enter the Ghostline
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/60"
            >
              You're 5 seconds away from chaos.
            </motion.p>
          </div>

          {/* Firebase Warning */}
          {!firebaseConfigured && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 rounded-2xl border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-400"
            >
              Firebase is not configured. Please add your Firebase credentials in the Vars section.
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400"
            >
              {error}
            </motion.div>
          )}

          {/* Sign Up Button */}
          <motion.button
            onClick={handleGoogleSignup}
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 py-5 text-xl font-bold text-white shadow-[0_0_40px_rgba(255,105,180,0.6)] transition-all hover:shadow-[0_0_60px_rgba(255,105,180,0.9)] disabled:opacity-50"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{ x: loading ? ["-200%", "200%"] : "-200%" }}
              transition={{
                duration: 1.5,
                repeat: loading ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
            />
            <span className="relative z-10">{loading ? "Creating your ghost..." : "👻 Sign up with Google"}</span>
          </motion.button>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-white/40 italic"
          >
            By continuing, you agree not to be weird. Seriously.
          </motion.p>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-white/60 transition-colors hover:text-pink-400"
            >
              Already have an account? <span className="font-semibold">Sign in</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

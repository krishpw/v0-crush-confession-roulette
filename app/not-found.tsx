"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@/components/primary-button"
import { GradientText } from "@/components/gradient-text"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050509] px-6">
      {/* Floating ??? particles */}
      <div className="pointer-events-none fixed inset-0">
        {[...Array(8)].map((_, i) => {
          const randomX = Math.random() * 100
          const randomY = Math.random() * 100

          return (
            <motion.div
              key={i}
              className="absolute text-4xl text-white/10"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              ?
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        {/* Confused Ghost */}
        <motion.div
          className="mb-8 text-9xl"
          animate={{
            rotate: [-5, 5, -5],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          👻
        </motion.div>

        <h1 className="mb-4 text-6xl font-bold text-white">
          <GradientText>404</GradientText>
        </h1>

        <p className="mb-2 text-2xl font-medium text-white">Ghost Lost</p>
        <p className="mb-8 text-lg text-white/60">This page wandered off into the void...</p>

        {/* Portal button back */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <PrimaryButton onClick={() => router.push("/dashboard")}>🌀 Return to Dashboard</PrimaryButton>
        </motion.div>
      </motion.div>
    </div>
  )
}

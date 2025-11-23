"use client"

import { motion } from "framer-motion"

interface HeartParticlesProps {
  intensity?: "low" | "medium" | "high"
}

export function HeartParticles({ intensity = "medium" }: HeartParticlesProps) {
  const count = intensity === "high" ? 25 : intensity === "medium" ? 10 : 5
  const baseDuration = intensity === "high" ? 10 : intensity === "medium" ? 12 : 15

  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: baseDuration + Math.random() * 8,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-4xl opacity-30"
          style={{ left: heart.left, top: "100%" }}
          animate={{
            y: [0, -1200],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  )
}

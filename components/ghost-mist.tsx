"use client"

import { motion } from "framer-motion"

export function GhostMist() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-pink-900/5 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}

"use client"

import { motion } from "framer-motion"

export function MiniGhosts() {
  return (
    <>
      {/* Mini Ghost 1 - Orbiting clockwise */}
      <motion.div
        className="absolute"
        animate={{
          x: [100, 120, 100, 80, 100],
          y: [-80, -60, -40, -60, -80],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="text-6xl opacity-60 filter drop-shadow-[0_0_20px_rgba(255,105,180,0.5)]">👻</div>
      </motion.div>

      {/* Mini Ghost 2 - Orbiting counter-clockwise */}
      <motion.div
        className="absolute"
        animate={{
          x: [-100, -120, -100, -80, -100],
          y: [80, 60, 40, 60, 80],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="text-5xl opacity-50 filter drop-shadow-[0_0_20px_rgba(138,43,226,0.5)]">👻</div>
      </motion.div>
    </>
  )
}

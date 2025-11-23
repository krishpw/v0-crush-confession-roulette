"use client"

import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050509]">
      <div className="text-center">
        {/* Blinking and bobbing ghost */}
        <motion.div
          className="mb-6 text-8xl"
          animate={{
            y: [-10, 10, -10],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          👻
        </motion.div>

        {/* Neon pulse */}
        <motion.div
          className="mx-auto mb-4 h-2 w-32 rounded-full bg-gradient-to-r from-[#FF6489] to-[#FF8FA3]"
          animate={{
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              "0 0 10px rgba(255,100,137,0.5)",
              "0 0 30px rgba(255,100,137,0.8)",
              "0 0 10px rgba(255,100,137,0.5)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <p className="text-lg text-white/70">Summoning secrets...</p>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"

export function GhostHeadline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-16 text-center"
    >
      <motion.h1
        className="mb-3 bg-gradient-to-r from-[#FF6489] via-[#FF8FA3] to-[#FF6489] bg-clip-text text-5xl font-bold text-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        Shader Kupid Ghost Hub
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-white/60"
      >
        Your campus confession command center
      </motion.p>
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ChaosWidget() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 45, seconds: 32 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return { minutes: 60, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="flex items-center gap-3 rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 px-5 py-3 backdrop-blur-xl"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        className="text-2xl"
      >
        ⚡
      </motion.div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-yellow-400">Chaos in</span>
        <span className="text-sm font-bold text-white">
          {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px rgba(250,204,21,0.3)",
            "0 0 40px rgba(250,204,21,0.6)",
            "0 0 20px rgba(250,204,21,0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  )
}

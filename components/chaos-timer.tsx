"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ChaosTimer() {
  const [timeLeft, setTimeLeft] = useState("")
  const [isChaosMode, setIsChaosMode] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const chaosHour = 20 // 8 PM
      const targetTime = new Date()
      targetTime.setHours(chaosHour, 0, 0, 0)

      const inChaosMode = now.getHours() === chaosHour

      setIsChaosMode(inChaosMode)

      if (inChaosMode) {
        const endTime = new Date()
        endTime.setHours(chaosHour + 1, 0, 0, 0)
        const diff = endTime.getTime() - now.getTime()
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`)
      } else {
        if (now.getHours() >= chaosHour) {
          targetTime.setDate(targetTime.getDate() + 1)
        }
        const diff = targetTime.getTime() - now.getTime()
        const hours = Math.floor(diff / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        setTimeLeft(`${hours}h${minutes}m`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.button
      animate={isChaosMode ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      className={`group relative flex size-12 flex-col items-center justify-center rounded-full border backdrop-blur-sm transition-all hover:scale-110 ${
        isChaosMode
          ? "border-[#FF6489] bg-gradient-to-r from-[#FF6489]/30 to-[#FF8FA3]/30 shadow-[0_0_20px_rgba(255,100,137,0.6)]"
          : "border-[#FF6489]/30 bg-[#1a1f2e]/80 hover:border-[#FF6489]/60 hover:bg-[#FF6489]/20 hover:shadow-[0_0_20px_rgba(255,100,137,0.4)]"
      }`}
    >
      {/* Lightning icon with pulsing animation in chaos mode */}
      <motion.span
        animate={isChaosMode ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        className="text-base"
      >
        ⚡
      </motion.span>

      {/* Compact countdown text */}
      <span className="absolute -bottom-5 text-[9px] font-bold text-[#FF8FA3]">{timeLeft}</span>
    </motion.button>
  )
}

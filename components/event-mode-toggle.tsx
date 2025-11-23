"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function EventModeToggle() {
  const [isEventMode, setIsEventMode] = useState(false)

  const toggleEventMode = () => {
    setIsEventMode(!isEventMode)
    if (!isEventMode) {
      document.body.classList.add("event-mode")
    } else {
      document.body.classList.remove("event-mode")
    }
  }

  return (
    <button
      onClick={toggleEventMode}
      className={`group flex size-12 items-center justify-center rounded-full border backdrop-blur-sm transition-all hover:scale-110 ${
        isEventMode
          ? "border-[#FF6489] bg-gradient-to-r from-[#FF6489]/30 to-[#FF8FA3]/30 shadow-[0_0_20px_rgba(255,100,137,0.6)]"
          : "border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      }`}
    >
      <motion.span
        animate={isEventMode ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        className="text-lg"
      >
        🎟️
      </motion.span>
    </button>
  )
}

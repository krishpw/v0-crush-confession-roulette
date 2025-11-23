"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface DopamineBadgeProps {
  message: string
  icon?: string
  glow?: boolean
}

export function DopamineBadge({ message, icon = "💘", glow = true }: DopamineBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
      className={`relative inline-flex items-center gap-2 rounded-full border border-[#FF6489]/40 bg-gradient-to-r from-[#FF6489]/20 to-[#FF8FA3]/20 px-4 py-2 backdrop-blur-lg ${
        glow ? "shadow-[0_0_25px_rgba(255,100,137,0.6)]" : ""
      }`}
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        className="text-lg"
      >
        {icon}
      </motion.span>
      <span className="text-sm font-medium text-white">{message}</span>
      {glow && <Sparkles className="absolute -right-1 -top-1 size-4 text-[#FF8FA3]" />}
    </motion.div>
  )
}

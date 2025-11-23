"use client"

import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"

interface ConfessionCardProps {
  text: string
  isTargeted: boolean
  createdAt: string
}

export function ConfessionCard({ text, isTargeted, createdAt }: ConfessionCardProps) {
  const date = new Date(createdAt)
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <GlassCard className="relative border-[#FF6489]/20 transition-all group-hover:border-[#FF6489]/50 group-hover:shadow-[0_0_25px_rgba(255,100,137,0.3)]">
        <div className="flex items-start justify-between gap-4">
          <p className="flex-1 text-base leading-relaxed text-white/90">{text}</p>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#FF6489]/30 bg-[#FF6489]/10 px-3 py-1">
            <span className="text-sm">{isTargeted ? "🎯" : "🎲"}</span>
            <span className="text-xs font-medium text-[#FF8FA3]">{isTargeted ? "Targeted" : "Random"}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/40">{formattedDate}</p>
      </GlassCard>
    </motion.div>
  )
}

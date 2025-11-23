"use client"

import { motion } from "framer-motion"

interface StatItem {
  label: string
  value: string
  icon: string
}

const DEFAULT_STATS: StatItem[] = [
  { label: "Sent Today", value: "847", icon: "📨" },
  { label: "In Inbox", value: "12", icon: "📥" },
  { label: "Trending Now", value: "2.3K", icon: "🔥" },
  { label: "Live Right Now", value: "156", icon: "⚡️" },
]

interface GhostHubStatsStripProps {
  stats?: StatItem[]
}

export function GhostHubStatsStrip({ stats = DEFAULT_STATS }: GhostHubStatsStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mx-auto mt-10 w-full max-w-xl rounded-full border border-white/10 bg-[#111018]/90 px-4 py-3 shadow-[0_0_60px_rgba(255,120,180,0.35)] backdrop-blur-2xl"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <span className="text-base">{stat.icon}</span>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-white">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-wide text-white/60">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

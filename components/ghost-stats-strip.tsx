"use client"

import { motion } from "framer-motion"

interface StatItem {
  icon: string
  label: string
  value: string
}

const stats: StatItem[] = [
  { icon: "💌", label: "Sent Today", value: "847" },
  { icon: "📥", label: "In Inbox", value: "12" },
  { icon: "🔥", label: "Trending", value: "2.3K" },
  { icon: "⚡", label: "Live Now", value: "156" },
]

export function GhostStatsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mt-16 flex justify-center"
    >
      <div className="flex gap-6 rounded-full border border-[#FF6489]/30 bg-black/40 px-8 py-4 backdrop-blur-xl">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-3 px-4"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.3,
              }}
              className="text-2xl"
            >
              {stat.icon}
            </motion.div>
            <div className="text-left">
              <div className="text-sm text-white/50">{stat.label}</div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

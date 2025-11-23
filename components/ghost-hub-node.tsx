"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface GhostHubNodeProps {
  icon: string
  label: string
  sublabel?: string
  href: string
  delay?: number
}

export function GhostHubNode({ icon, label, sublabel, href, delay = 0 }: GhostHubNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link href={href} className="group relative block">
        <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-pink-300/40 bg-[#141018]/80 shadow-[0_0_50px_rgba(255,120,180,0.45)] group-hover:shadow-[0_0_60px_rgba(255,120,180,0.65)] transition-all duration-200 backdrop-blur-xl group-hover:-translate-y-1">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xl sm:text-2xl">{icon}</span>
            <span className="text-xs sm:text-sm font-semibold text-white">{label}</span>
            {sublabel ? <span className="text-[10px] text-white/50 hidden sm:block">{sublabel}</span> : null}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

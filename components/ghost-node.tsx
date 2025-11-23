"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GhostNodeProps {
  icon: ReactNode
  label: string
  href: string
  className?: string
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

export function GhostNode({ icon, label, href, className = "", onHoverStart, onHoverEnd }: GhostNodeProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.15 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      <Link href={href} className="relative block">
        <div className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-full border border-pink-500/30 bg-gradient-to-br from-[#1a0d1f]/80 to-[#0f0612]/90 shadow-[0_0_40px_rgba(255,105,180,0.6)] backdrop-blur-sm transition-shadow hover:shadow-[0_0_60px_rgba(255,105,180,0.9)] md:h-32 md:w-32">
          <div className="text-3xl md:text-4xl">{icon}</div>
          <div className="text-sm font-semibold tracking-wide text-white md:text-base">{label}</div>
        </div>
      </Link>
    </motion.div>
  )
}

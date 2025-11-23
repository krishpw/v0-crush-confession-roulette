"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface KupidReelsButtonProps {
  variant?: "default" | "inline" | "floating"
  className?: string
}

export function KupidReelsButton({ variant = "default", className = "" }: KupidReelsButtonProps) {
  if (variant === "inline") {
    return (
      <a
        href="https://www.instagram.com/kupiddating/reels/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-sm text-[#FF8FA3] transition-colors hover:text-[#FF6489] ${className}`}
      >
        Watch Reels →
      </a>
    )
  }

  if (variant === "floating") {
    return (
      <motion.a
        href="https://www.instagram.com/kupiddating/reels/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 z-40 flex size-16 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#FF6489]/20 shadow-[0_0_30px_rgba(255,100,137,0.5)] backdrop-blur-lg transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(255,100,137,0.7)] ${className}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Play className="size-6 fill-[#FF8FA3] text-[#FF8FA3]" />
      </motion.a>
    )
  }

  return (
    <motion.a
      href="https://www.instagram.com/kupiddating/reels/?hl=en"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-full border border-[#FF6489]/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(255,100,137,0.35)] backdrop-blur-lg transition-all hover:scale-[1.03] hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,100,137,0.5)] ${className}`}
      animate={{ opacity: [1, 0.75, 1] }}
      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <Play className="size-4 fill-[#FF8FA3] text-[#FF8FA3]" />
      Watch Kupid Reels
    </motion.a>
  )
}

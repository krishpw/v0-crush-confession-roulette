"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/12 bg-[#0B0F17]/85 p-8 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  )
}

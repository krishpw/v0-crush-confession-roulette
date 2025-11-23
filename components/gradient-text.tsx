"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={cn("bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] bg-clip-text text-transparent", className)}>
      {children}
    </span>
  )
}

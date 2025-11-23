"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  fullWidth?: boolean
  variant?: "primary" | "secondary" | "ghost"
  type?: "button" | "submit"
  disabled?: boolean
}

export function PrimaryButton({
  children,
  onClick,
  fullWidth = false,
  variant = "primary",
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  const baseStyles =
    "relative overflow-hidden rounded-full px-8 py-3.5 font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] shadow-[0_0_20px_rgba(255,100,137,0.4)] hover:shadow-[0_0_30px_rgba(255,100,137,0.6)]",
    secondary: "border border-[#FF6489]/50 bg-[#FF6489]/10 hover:bg-[#FF6489]/20",
    ghost: "border border-white/20 bg-white/5 hover:bg-white/10",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled}
      className={cn(baseStyles, variantStyles[variant], fullWidth && "w-full")}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

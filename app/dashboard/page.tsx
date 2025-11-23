"use client"

import { ShaderGhost } from "@/components/shader-ghost"
import { GhostNode } from "@/components/ghost-node"
import { HeartParticles } from "@/components/heart-particles"
import { useState } from "react"

export default function DashboardPage() {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null)

  const orbs = [
    { id: "invite", icon: "👥", label: "Invite", href: "/invite", angle: 270 }, // Top
    { id: "themes", icon: "🎨", label: "Themes", href: "/premium", angle: 225 }, // Top-left
    { id: "ranks", icon: "🏆", label: "Ranks", href: "/leaderboard", angle: 315 }, // Top-right
    { id: "random", icon: "🎲", label: "Random", href: "/send-random", angle: 180 }, // Left-middle
    { id: "trending", icon: "📈", label: "Trending", href: "/trending", angle: 0 }, // Right-middle
    { id: "targeted", icon: "🎯", label: "Targeted", href: "/send-targeted", angle: 135 }, // Bottom-left
    { id: "chaos", icon: "⚡", label: "Chaos", href: "/chaos-hour", angle: 45 }, // Bottom-right
    { id: "inbox", icon: "💌", label: "Inbox", href: "/inbox", angle: 90 }, // Bottom-center
  ]

  const orbitalRadius = 380

  return (
    <div className="relative min-h-screen bg-[#050509] text-white">
      <HeartParticles />

      <div className="flex w-full flex-col items-center justify-start px-4 pt-24 md:pt-32">
        {/* Header */}
        <header className="mb-16 text-center md:mb-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">The Ghostline</h1>
          <p className="mt-3 text-sm text-white/60 md:text-base">All your anonymous crush signals, in one place.</p>
        </header>

        <div className="relative mx-auto flex items-center justify-center" style={{ minHeight: "800px" }}>
          <div className="relative z-20">
            <ShaderGhost size={360} className="mx-auto" />
          </div>

          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width={orbitalRadius * 2 + 280}
            height={orbitalRadius * 2 + 280}
            style={{ zIndex: 10 }}
          >
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
            </defs>
            {orbs.map((orb) => {
              const angle = (orb.angle * Math.PI) / 180
              const x = Math.cos(angle) * orbitalRadius
              const y = Math.sin(angle) * orbitalRadius
              const centerX = orbitalRadius + 140
              const centerY = orbitalRadius + 140
              const isHovered = hoveredOrb === orb.id

              return (
                <line
                  key={orb.id}
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + x}
                  y2={centerY + y}
                  stroke="url(#beamGradient)"
                  strokeWidth={isHovered ? "14" : "12"}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 0 20px rgba(255,20,147,0.9)) drop-shadow(0 0 40px rgba(255,105,180,0.7))"
                      : "drop-shadow(0 0 10px rgba(255,20,147,0.6)) drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                  }}
                />
              )
            })}
          </svg>

          {orbs.map((orb) => {
            const angle = (orb.angle * Math.PI) / 180
            const x = Math.cos(angle) * orbitalRadius
            const y = Math.sin(angle) * orbitalRadius

            return (
              <div
                key={orb.id}
                className="absolute z-30"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <GhostNode
                  icon={orb.icon}
                  label={orb.label}
                  href={orb.href}
                  onHoverStart={() => setHoveredOrb(orb.id)}
                  onHoverEnd={() => setHoveredOrb(null)}
                />
              </div>
            )
          })}
        </div>

        <div className="relative z-20 mt-16 w-full max-w-4xl px-4 pb-12 md:mt-20">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 rounded-full border border-pink-500/20 bg-gradient-to-r from-[#150812]/90 via-[#0a060f]/95 to-[#150812]/90 px-4 py-3 shadow-[0_0_50px_rgba(255,105,180,0.4)] md:gap-6 md:px-8 md:py-4">
            <StatPill icon="📨" value="847" label="Sent Today" />
            <StatPill icon="📥" value="12" label="In Inbox" />
            <StatPill icon="🔥" value="2.3K" label="Trending Now" />
            <StatPill icon="⚡" value="156" label="Live Right Now" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatPillProps {
  label: string
  icon: string
  value: string
}

function StatPill({ label, icon, value }: StatPillProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs transition-all hover:bg-white/10 md:px-4 md:py-2 md:text-sm">
      <span className="text-base md:text-lg">{icon}</span>
      <span className="font-semibold text-white">{value}</span>
      <span className="whitespace-nowrap text-[10px] text-white/50 md:text-xs">{label}</span>
    </div>
  )
}

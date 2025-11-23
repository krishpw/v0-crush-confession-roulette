"use client"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User } from "firebase/auth"
import { ChaosTimer } from "@/components/chaos-timer"
import { EventModeToggle } from "@/components/event-mode-toggle"
import { useState, useEffect } from "react"

interface NavbarProps {
  user?: User | null
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const [campusFeedCount, setCampusFeedCount] = useState(0)

  useEffect(() => {
    setCampusFeedCount(Math.floor(Math.random() * 200) + 50)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#0B0F17]/80 via-[#0B0F17]/90 to-[#0B0F17]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">
        {/* Logo - Keep text for branding */}
        <button
          onClick={() => router.push(user ? "/dashboard" : "/")}
          className="bg-gradient-to-r from-[#FF6489] to-[#FF8FA3] bg-clip-text text-xl font-bold text-transparent transition-opacity hover:opacity-80"
        >
          Crush Confession Roulette
        </button>

        {/* Icon-only navigation */}
        <div className="flex items-center gap-3">
          {user && (
            <>
              {/* Today Count - Fire icon with count */}
              <button
                onClick={() => router.push("/campus-feed")}
                className="group relative flex size-12 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#1a1f2e]/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#FF6489]/60 hover:bg-[#FF6489]/20 hover:shadow-[0_0_20px_rgba(255,100,137,0.4)]"
              >
                <span className="text-lg">🔥</span>
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#FF6489] px-1 text-[10px] font-bold text-white">
                  {campusFeedCount}
                </span>
              </button>

              {/* Trending */}
              <button
                onClick={() => router.push("/trending")}
                className="group flex size-12 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#1a1f2e]/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#FF6489]/60 hover:bg-[#FF6489]/20 hover:shadow-[0_0_20px_rgba(255,100,137,0.4)]"
              >
                <span className="text-lg">📈</span>
              </button>

              {/* Leaderboard */}
              <button
                onClick={() => router.push("/leaderboard")}
                className="group flex size-12 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#1a1f2e]/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#FF6489]/60 hover:bg-[#FF6489]/20 hover:shadow-[0_0_20px_rgba(255,100,137,0.4)]"
              >
                <span className="text-lg">🏆</span>
              </button>

              {/* Invite */}
              <button
                onClick={() => router.push("/invite")}
                className="group flex size-12 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#1a1f2e]/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#FF6489]/60 hover:bg-[#FF6489]/20 hover:shadow-[0_0_20px_rgba(255,100,137,0.4)]"
              >
                <span className="text-lg">🎁</span>
              </button>

              {/* Premium */}
              <button
                onClick={() => router.push("/premium")}
                className="group flex size-12 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#1a1f2e]/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#FF6489]/60 hover:bg-[#FF6489]/20 hover:shadow-[0_0_20px_rgba(255,100,137,0.4)]"
              >
                <span className="text-lg">✨</span>
              </button>
            </>
          )}

          {/* Chaos Hour - Updated to icon-only */}
          <ChaosTimer />

          {/* Event Mode - Updated to icon-only */}
          {user && <EventModeToggle />}

          {/* Live indicator */}
          <div className="flex size-12 items-center justify-center rounded-full border border-[#FF6489]/30 bg-[#1a1f2e]/80 backdrop-blur-sm">
            <span className="text-lg">🔴</span>
          </div>

          {/* Profile Email - Keep text only */}
          {user && (
            <>
              <span className="text-sm text-white/70">{user.email}</span>

              {/* Logout - Icon only */}
              <button
                onClick={handleLogout}
                className="group flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="text-lg">🚪</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

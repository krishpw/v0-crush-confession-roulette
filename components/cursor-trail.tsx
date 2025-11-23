"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CursorTrail() {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return

    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ }
      setTrails((prev) => [...prev.slice(-5), newTrail])
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF6489]/40 to-[#FF8FA3]/40 blur-sm"
          style={{ left: trail.x, top: trail.y }}
        />
      ))}
    </div>
  )
}

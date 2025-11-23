"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function BackgroundGhostParticles() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const ghosts = [...Array(12)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ghosts.map((ghost) => (
        <motion.div
          key={ghost.id}
          className="absolute text-3xl opacity-5"
          initial={{
            left: `${ghost.x}%`,
            top: `${ghost.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [(mousePos.x - window.innerWidth / 2) * 0.01, -(mousePos.x - window.innerWidth / 2) * 0.01],
          }}
          transition={{
            y: {
              duration: ghost.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: ghost.delay,
              ease: "easeInOut",
            },
            x: {
              duration: 2,
            },
          }}
        >
          👻
        </motion.div>
      ))}
    </div>
  )
}

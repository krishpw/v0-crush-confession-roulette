"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ShaderGhostProps {
  className?: string
  size?: number
}

export function ShaderGhost({ className = "", size = 360 }: ShaderGhostProps) {
  const colors = ["#FFB3D9", "#87CEEB", "#4A90E2", "#2C3E50", "#1A1A2E"]

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const svg = document.getElementById("ghost-svg")
    if (!svg) return

    const rect = svg.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = (mousePosition.x - centerX) * 0.08
    const dy = (mousePosition.y - centerY) * 0.08
    const max = 8

    setEyeOffset({
      x: Math.max(-max, Math.min(max, dx)),
      y: Math.max(-max, Math.min(max, dy)),
    })
  }, [mousePosition])

  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      animate={{ y: [0, -10, 0], scaleY: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      style={{ width: size, height: (size * 289) / 231 }}
    >
      <svg
        id="ghost-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="231"
        height="289"
        viewBox="0 0 231 289"
        className="h-full w-full"
      >
        <defs>
          <clipPath id="ghost-shape">
            <path d="M230.809 115.385V249.411C230.809 269.923 214.985 287.282 194.495 288.411C184.544 288.949 175.364 285.718 168.26 280C159.746 273.154 147.769 273.461 139.178 280.23C132.638 285.384 124.381 288.462 115.379 288.462C106.377 288.462 98.1451 285.384 91.6055 280.23C82.912 273.385 70.9353 273.385 62.2415 280.23C55.7532 285.334 47.598 288.411 38.7246 288.462C17.4132 288.615 0 270.667 0 249.359V115.385C0 51.6667 51.6756 0 115.404 0C179.134 0 230.809 51.6667 230.809 115.385Z" />
          </clipPath>
        </defs>

        <foreignObject width="231" height="289" clipPath="url(#ghost-shape)">
          <div className="h-full w-full">
            <MeshGradient speed={1} colors={colors} className="h-full w-full" />
          </div>
        </foreignObject>

        {/* Eyes */}
        <motion.ellipse
          rx="20"
          ry="30"
          fill="black"
          animate={{ cx: 80 + eyeOffset.x, cy: 120 + eyeOffset.y }}
          transition={{ type: "spring", stiffness: 150, damping: 16 }}
          className="animate-blink"
        />
        <motion.ellipse
          rx="20"
          ry="30"
          fill="black"
          animate={{ cx: 150 + eyeOffset.x, cy: 120 + eyeOffset.y }}
          transition={{ type: "spring", stiffness: 150, damping: 16 }}
          className="animate-blink"
        />
      </svg>

      <style jsx>{`
        .animate-blink {
          animation: blink 3s infinite ease-in-out;
        }
        @keyframes blink {
          0%,
          90%,
          100% {
            ry: 30;
          }
          95% {
            ry: 3;
          }
        }
      `}</style>
    </motion.div>
  )
}

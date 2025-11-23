"use client"

import { motion } from "framer-motion"

interface Connection {
  angle: number
  radius: number
}

interface GhostConnectionsProps {
  connections: Connection[]
  hoveredIndex: number | null
}

export function GhostConnections({ connections, hoveredIndex }: GhostConnectionsProps) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0 h-full w-full" style={{ zIndex: 10 }}>
      <defs>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6489" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FF8FA3" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6489" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {connections.map((conn, index) => {
        const x = 50 + (Math.cos((conn.angle * Math.PI) / 180) * conn.radius) / 10
        const y = 50 + (Math.sin((conn.angle * Math.PI) / 180) * conn.radius) / 10
        const isHovered = hoveredIndex === index

        return (
          <motion.line
            key={index}
            x1="50%"
            y1="50%"
            x2={`${x}%`}
            y2={`${y}%`}
            stroke={isHovered ? "#FF6489" : "url(#line-gradient)"}
            strokeWidth={isHovered ? "3" : "2"}
            strokeDasharray={isHovered ? "0" : "5,5"}
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isHovered ? 1 : 0.6,
              strokeWidth: isHovered ? 3 : 2,
            }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
          />
        )
      })}
    </svg>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const templates = [
  "Say something flirty…",
  "Say something bold…",
  "If you were honest you'd say…",
  "Confession: I've been thinking about…",
  "You caught my eye because…",
  "I wish I could tell you that…",
  "Top secret: You're…",
  "Unpopular opinion about you…",
]

interface TemplateCarouselProps {
  onSelect: (template: string) => void
}

export function TemplateCarousel({ onSelect }: TemplateCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((i) => (i + 1) % templates.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + templates.length) % templates.length)

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium text-white/70">Quick Templates</h3>
      <div className="relative flex items-center gap-3">
        <button
          onClick={prev}
          className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.button
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect(templates[currentIndex])}
              className="w-full rounded-xl border border-[#FF6489]/30 bg-gradient-to-r from-[#FF6489]/10 to-[#FF8FA3]/10 px-4 py-3 text-left text-sm text-white/90 backdrop-blur-sm transition-all hover:from-[#FF6489]/20 hover:to-[#FF8FA3]/20"
            >
              {templates[currentIndex]}
            </motion.button>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

"use client"

import { KupidReelsButton } from "@/components/kupid-reels-button"

export function FooterBrand() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F17]/50 py-6 text-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-white/50">Powered by</span>
          <span className="font-semibold text-[#FF8FA3] drop-shadow-[0_0_8px_rgba(255,100,137,0.6)]">Kupid Dating</span>
          <span className="text-white/30">•</span>
          <span className="font-semibold text-[#FF8FA3]">KupidLive</span>
          <span className="text-lg">💗</span>
        </div>
        <KupidReelsButton variant="inline" />
      </div>
    </footer>
  )
}

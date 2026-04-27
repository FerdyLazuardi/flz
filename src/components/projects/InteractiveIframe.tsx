"use client"

import * as React from "react"
import { Maximize, Minimize } from "lucide-react"

interface InteractiveIframeProps {
  src: string
  title?: string
}

export function InteractiveIframe({ src, title = "Interactive Module" }: InteractiveIframeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="w-full relative group" ref={containerRef}>
      <div className={`w-full rounded-2xl overflow-hidden bg-black/5 ring-1 ring-border ${isFullscreen ? 'h-screen' : 'aspect-[4/3] sm:aspect-video'}`}>
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 shadow-lg border border-white/10"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}

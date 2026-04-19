"use client"

import * as React from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface ClickToPlayProps {
  embedUrl: string
  thumbnailUrl: string
  title: string
}

export function ClickToPlay({ embedUrl, thumbnailUrl, title }: ClickToPlayProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-black shadow-lg">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        ></iframe>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-bg-elevated cursor-pointer group shadow-md"
      onClick={() => setIsPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsPlaying(true)
        }
      }}
      aria-label={`Play interactive demo for ${title}`}
    >
      <Image
        src={thumbnailUrl || "https://placehold.co/1280x720/E5E7EB/A1A1AA?text=Preview"}
        alt={`Preview of ${title}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-active:scale-95">
          <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <span className="inline-block bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
          Click to load interactive demo
        </span>
      </div>
    </div>
  )
}

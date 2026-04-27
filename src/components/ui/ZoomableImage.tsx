"use client"

import { useState, useRef } from 'react'
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

interface ZoomableImageProps {
  src: string
  alt: string
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [open, setOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const zoomRef = useRef<any>(null)

  return (
    <>
      <style>{`
        .yarl__slide_image {
          cursor: ${isZoomed ? 'zoom-out' : 'zoom-in'} !important;
        }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={() => {
          setOpen(true)
          setIsZoomed(false)
        }}
        className="w-full h-auto object-cover rounded-xl cursor-zoom-in"
        loading="lazy"
      />
      
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        plugins={[Zoom]}
        zoom={{ 
          ref: zoomRef,
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        on={{
          click: () => {
            if (zoomRef.current) {
              if (zoomRef.current.zoom > 1) {
                zoomRef.current.zoomOut()
                setIsZoomed(false)
              } else {
                zoomRef.current.zoomIn()
                setIsZoomed(true)
              }
            }
          }
        }}
      />
    </>
  )
}

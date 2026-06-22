"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function LogoMarquee() {
  // Hanya perlu mengubah nilai `height` (tinggi) untuk membesarkan/mengecilkan logo.
  // Semakin besar angkanya, semakin besar logonya.
  const logos = [

    { src: "/logo_exp/skilvul.png", alt: "Skilvul", height: 30, originalWidth: 866, originalHeight: 250 },
    { src: "/logo_exp/qua.png", alt: "bptik", height: 50, originalWidth: 382, originalHeight: 400 },
    { src: "/logo_exp/qua-1.png", alt: "binar", height: 30, originalWidth: 866, originalHeight: 255 },
    { src: "/logo_exp/qua-2.png", alt: "amartha", height: 30, originalWidth: 866, originalHeight: 235 },
    { src: "/logo_exp/qua-3.png", alt: "unnes", height: 60, originalWidth: 414, originalHeight: 552 },
  ]

  // Duplicate to allow seamless scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

  return (
    <div className="w-full overflow-hidden pb-8">
      <div className="relative flex w-full">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40, // Adjust speed here
          }}
          className="flex flex-none items-center gap-10 sm:gap-16 pr-10 sm:pr-16"
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center transition-all duration-300 hover:scale-105 [--logo-scale:0.65] sm:[--logo-scale:1]" style={{ height: `calc(${logo.height}px * var(--logo-scale))` }}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.originalWidth}
                height={logo.originalHeight}
                style={{ height: '100%', width: 'auto' }}
                className="object-contain"
                loading="lazy"
                quality={40}
                sizes="(max-width: 768px) 40px, 80px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
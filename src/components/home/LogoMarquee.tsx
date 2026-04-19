"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function LogoMarquee() {
  // Hanya perlu mengubah nilai `height` (tinggi) untuk membesarkan/mengecilkan logo.
  // Semakin besar angkanya, semakin besar logonya.
  const logos = [

    { src: "/logo_exp/skilvul.png", alt: "Skilvul", height: 30 },
    { src: "/logo_exp/qua.png", alt: "bptik", height: 50 },
    { src: "/logo_exp/qua-1.png", alt: "binar", height: 30 },
    { src: "/logo_exp/qua-2.png", alt: "amartha", height: 30 },
    { src: "/logo_exp/qua-3.png", alt: "unnes", height: 60 },
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
          className="flex flex-none items-center gap-16 pr-16"
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ height: logo.height }}>
              <Image
                src={logo.src}
                alt={logo.alt}
                height={logo.height}
                width={logo.height * 3} // Assumption for aspect ratio
                className="h-full w-auto object-contain"
                priority={index < 6}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

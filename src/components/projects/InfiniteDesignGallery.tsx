"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export interface InfiniteGalleryImage {
  url: string;
  aspectRatio: number;
}

export function InfiniteDesignGallery({ customImages }: { customImages?: InfiniteGalleryImage[] }) {
  // Return null if no images are provided
  if (!customImages || customImages.length === 0) {
    return null;
  }

  const Row = ({ images, speed, direction = -1 }: { images: InfiniteGalleryImage[], speed: number, direction?: number }) => {
    return (
      <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-visible">
        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-8 pr-4 sm:pr-6 md:pr-8 min-w-max will-change-transform"
          animate={{
            x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"]
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...images, ...images].map((img, idx) => {
            // Using a fixed height and dynamic width controlled by aspectRatio guarantees no cropping!
            return (
              <div 
                key={idx} 
                className="relative rounded-md overflow-hidden flex-shrink-0 shadow-xl bg-bg-surface h-[120px] sm:h-[150px] md:h-[200px] lg:h-[250px]"
                style={{ aspectRatio: img.aspectRatio }}
              >
                <Image
                  src={img.url}
                  alt="Design Mockup"
                  fill
                  sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 400px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    )
  }

  // Fisher-Yates shuffle for true randomness
  const shuffle = (array: InfiniteGalleryImage[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Use state with lazy initialization so we only shuffle once per mount.
  // We duplicate the customImages a few times before shuffling to create a long, varied sequence.
  const [rows] = React.useState(() => {
    const getShuffledRow = () => shuffle([...customImages, ...customImages, ...customImages, ...customImages]);
    return [getShuffledRow(), getShuffledRow(), getShuffledRow(), getShuffledRow()];
  });

  const [row1, row2, row3, row4] = rows;
  
  return (
    <div 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center bg-transparent mt-10"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)"
      }}
    >
      
      {/* 3D Tilted Container (Netflix-Style) */}
      <div 
        className="absolute w-[300vw] left-[-100vw] flex flex-col gap-4 sm:gap-6 md:gap-8 transform-gpu"
        style={{
          transform: "perspective(1200px) rotateX(25deg) rotateZ(10deg) scale(1.3)",
          transformOrigin: "center center",
        }}
      >
        <Row images={row1} speed={1200} direction={-1} />
        <Row images={row2} speed={1400} direction={1} />
        <Row images={row3} speed={1280} direction={-1} />
        <Row images={row4} speed={1520} direction={1} />
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

const brutalistItems = [
  { type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", rot: -2, delay: 0.1, tag: "UI_EXPLORATION", size: "tall" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", rot: 3, delay: 0.2, tag: "MOTION_TEST", size: "wide" },
  { type: "image", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", rot: -1, delay: 0.3, tag: "ARCHIVE_01", size: "normal" },
  { type: "image", src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", rot: 4, delay: 0.4, tag: "SYSTEM_GRID", size: "tall" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", rot: -4, delay: 0.5, tag: "R&D_MEDIA", size: "normal" },
  { type: "image", src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop", rot: 1, delay: 0.6, tag: "COLOR_STUDY", size: "wide" },
  { type: "image", src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop", rot: -3, delay: 0.7, tag: "LAYOUT_DRAFT", size: "tall" },
  { type: "image", src: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop", rot: 2, delay: 0.8, tag: "POST_V1", size: "normal" },
]

const itemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 200,          // Deep vertical starting point for dramatic sweep
    scale: 0.9,      // Slightly pushed back
    rotate: brutalistItems[i].rot - 8, // Start with excessive tilt
    filter: "blur(20px) grayscale(100%) brightness(0.8)", // Start muted and dreamy
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: brutalistItems[i].rot, // Settle into final brutalist tilt
    filter: "blur(0px) grayscale(0%) brightness(1)",
    transition: {
      duration: 1.8,                  // Slow, luxurious cinematic duration
      ease: [0.16, 1, 0.3, 1],        // Ultra-premium Expo-Out bezier curve
      delay: i * 0.1 + 0.1,           // Gentle sequential sweep
    },
  }),
}

export function DesignShowcase() {
  const [mounted, setMounted] = React.useState(false)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <section className="mt-40 mb-32 relative min-h-[500px]" />
  }

  return (
    <section className="mt-40 mb-32 relative" ref={containerRef}>
      {/* Aesthetic Section Header */}
      <div className="mb-24 relative z-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border/40" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-40 px-4 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            System.Archive/Raw_Assets_v2.1
          </motion.div>
          <div className="h-px w-12 bg-border/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="relative group">
            <h2 className="font-heading text-7xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tighter text-text-primary leading-[0.8] mix-blend-difference relative z-10">
              RAW <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1px currentColor' }}
              >
                VISUALS.
              </span>
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-4 left-0 h-1 bg-primary/20"
            />
          </div>

          <div className="max-w-xs space-y-6">
            <p className="font-mono text-[11px] leading-relaxed text-slate-500 uppercase tracking-tight">
                   // DECONSTRUCTED INTERFACES, MOTION EXPERIMENTS, AND UNFILTERED CREATIVE OUTPUT. 
                   // EXECUTED WITH MATHEMATICAL PRECISION.
            </p>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0.1 }}
                  whileInView={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className="w-6 h-0.5 bg-primary" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Masonry Grid with Perspective */}
      <div 
        className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10 px-4 md:px-0"
        style={{ perspective: "2500px", transformStyle: "preserve-3d" }}
      >
        {brutalistItems.map((item, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={itemVariants}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
            }}
            className={`relative break-inside-avoid group cursor-pointer`}
          >
            <div className="relative overflow-hidden bg-bg-surface border border-border/30 backdrop-blur-sm transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:border-primary/50 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] group-hover:!rotate-0 group-hover:-translate-y-2 z-10">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />

              <div className="relative overflow-hidden w-full h-full">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt="Raw asset"
                    className="w-full h-auto block transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:scale-105 group-hover:brightness-110"
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto block transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:scale-105"
                  />
                )}



                <div className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-15 mix-blend-overlay transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 70%)`
                  }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat transition-opacity duration-700" />
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center px-1 opacity-0 group-hover:opacity-20 transition-opacity duration-700 transition-delay-300">
               <span className="font-mono text-[8px] tracking-widest uppercase">ID_{idx.toString().padStart(3, '0')}</span>
               <div className="h-px flex-1 mx-4 bg-text-primary/20" />
               <span className="font-mono text-[8px] tracking-widest uppercase">{item.size}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05] pointer-events-none h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
    </section>
  )
}

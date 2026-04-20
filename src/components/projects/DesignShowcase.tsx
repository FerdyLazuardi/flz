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
  hidden: (i: number) => {
    // Detect mobile for scaling offsets
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Deterministic "randomness" based on index
    const seed = i * 45;
    const initialX = Math.sin(seed) * (isMobile ? 150 : 400); 
    const initialY = 400 + (i * 50); // Start from BELOW the section to avoid bleeding up
    const initialZ = isMobile ? 300 : 800;
    const initialRotateX = (seed % 360) - 180;
    const initialRotateY = (seed % 200) - 100;
    const initialRotateZ = (seed % 120) - 60;

    return {
      opacity: 0,
      x: initialX,
      y: 0,            // Centered vertically to prevent bleed
      z: initialZ,
      rotateX: initialRotateX,
      rotateY: initialRotateY,
      rotate: initialRotateZ,
      scale: 0.1,      // Start much smaller for better focus
      filter: "blur(30px) brightness(0)",
    };
  },
  visible: (i: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotate: brutalistItems[i].rot,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      transition: {
        duration: isMobile ? 1.6 : 2.4, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: i * 0.06, 
        scale: { duration: isMobile ? 1.4 : 2 },
        filter: { duration: 2.2 },
      },
    };
  },
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
      <motion.div 
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "100% 0px 0px 0px", amount: 0.2 }} // Stay active when scrolled past DOWN
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-24 relative z-20 px-4 md:px-12"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border/40" />
          <div className="h-px w-12 bg-border/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="relative group">
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight text-text-primary leading-[1] whitespace-nowrap">
              <span className="relative inline-block z-10 after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">
                GALLERY
              </span> 
              {" "}PROJECT.
            </h2>

          </div>

          <div className="flex flex-col gap-6 text-left md:text-right">
            <p className="font-mono text-[11px] sm:text-[12px] leading-relaxed text-slate-500 uppercase tracking-tight max-w-sm md:ml-auto">
                   // COMPREHENSIVE ARCHIVE OF MULTIMEDIA WORK, INTERACTIVE EXPERIMENTS, AND DESIGN EXPLORATIONS.
                   // A DEEPER DIVE INTO THE CREATIVE PROCESS.
            </p>
            <div className="flex gap-3 md:justify-end">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0.1 }}
                  whileInView={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className="w-10 h-0.5 bg-primary/40" 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Masonry Grid with Perspective */}
      <div 
        className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10 px-4 md:px-12 lg:px-16"
        style={{ perspective: "2500px", transformStyle: "preserve-3d" }}
      >
        {brutalistItems.map((item, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "100% 0px 0px 0px", amount: 0.1 }}
            variants={itemVariants}
            style={{ 
              willChange: "transform, opacity, filter",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden" 
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
            }}
            className={`relative break-inside-avoid group cursor-pointer transform-gpu`}
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
            
            <div className="mt-4 flex justify-between items-center px-1 opacity-0 group-hover:opacity-20 transition-opacity duration-700 delay-300">
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

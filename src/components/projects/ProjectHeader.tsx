"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"

export function ProjectHeader() {
  return (
    <header className="mb-16 md:mb-24 flex flex-col items-start w-full relative">
      {/* Premium Magnetic Back Button */}
      <div className="mb-16 md:mb-24 mt-4">
        <Magnetic strength={0.2}>
          <Link href="/" className="group relative outline-none block">
            <motion.div 
              initial="initial"
              whileHover="hover"
              className="relative flex items-center bg-white/10 dark:bg-white/5 border border-white/20 rounded-full cursor-pointer overflow-hidden p-1.5 pr-8 shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all duration-500 backdrop-blur-xl group-hover:border-white/40"
            >
              {/* Liquid highlight background */}
              <motion.div 
                variants={{
                  initial: { x: "-100%", opacity: 0 },
                  hover: { x: "0%", opacity: 1 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute inset-0 bg-gradient-to-r from-slate-200/50 to-slate-100/30 dark:from-slate-500/20 dark:to-transparent z-0"
              />

              <div className="relative z-10 w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                <motion.div
                  variants={{
                    initial: { x: 0, rotate: 0 },
                    hover: { x: -3, rotate: -45 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.div>
                
                {/* Pulse effect */}
                <motion.div 
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  whileHover={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-full bg-current opacity-20"
                />
              </div>

              <div className="relative z-10 ml-5 h-12 flex items-center">
                <div className="relative">
                  {/* Initial centered 'BACK.' */}
                  <motion.div
                    variants={{
                      initial: { opacity: 1, y: 0 },
                      hover: { opacity: 0, y: -10 }
                    }}
                    transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] }}
                    className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">
                      BACK.
                    </span>
                  </motion.div>

                  {/* Hover stacked state */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 10 },
                      hover: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] }}
                    className="flex flex-col justify-center pointer-events-none"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-primary leading-none mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Back to
                    </span>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-text-primary dark:text-white leading-none whitespace-nowrap">
                      HOME.
                    </span>
                  </motion.div>
                </div>
              </div>
              
              {/* Interaction dots */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                <motion.div 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-1 h-1 rounded-full bg-current/30" 
                />
                <motion.div 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-1 h-1 rounded-full bg-current/30" 
                />
              </div>
            </motion.div>
          </Link>
        </Magnetic>
      </div>

      {/* Aesthetic Section Header Accent */}
      <div className="w-full mb-12 hidden md:block">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border/40" />
          <div className="h-px w-12 bg-border/40" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 w-full">
          <div className="relative group text-left">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight text-text-primary leading-[1] whitespace-nowrap">
              <span className="relative inline-block z-10 after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">
                SELECTED
              </span> 
              {" "}PROJECTS.
            </h1>
          </div>

          <div className="flex flex-col gap-6 text-left md:text-right">
            <p className="font-mono text-[11px] sm:text-[12px] leading-relaxed text-slate-500 uppercase tracking-tight max-w-sm md:ml-auto">
              // A CURATED GALLERY OF LEARNING EXPERIENCES WHERE INSTRUCTIONAL DESIGN MEETS CUTTING-EDGE TECHNOLOGY AND VISUAL STORYTELLING.
              // EXECUTED WITH CREATIVE PRECISION.
            </p>
            <div className="flex gap-3 md:justify-end">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className="w-10 h-0.5 bg-primary/40" 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative line removed to avoid clutter with the new grid layout */}
    </header>
  )
}

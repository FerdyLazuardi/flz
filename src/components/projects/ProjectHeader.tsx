"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"

export function ProjectHeader() {
  return (
    <header className="mb-16 md:mb-24 flex flex-col items-center w-full relative text-center">
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
                className="absolute inset-0 bg-gradient-to-r from-yellow-200/50 to-yellow-100/30 dark:from-yellow-500/20 dark:to-transparent z-0"
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

              <div className="relative z-10 ml-5 flex flex-col items-start">
                <div className="overflow-hidden h-5">
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -20 }
                    }}
                    transition={{ duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] }}
                    className="flex flex-col"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-primary h-5 flex items-center">
                      Back to
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-white h-5 flex items-center">
                      Return
                    </span>
                  </motion.div>
                </div>
                
                <div className="overflow-hidden h-6 mt-[-2px]">
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -24 }
                    }}
                    transition={{ duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.05 }}
                    className="flex flex-col"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-text-primary h-6 flex items-center">
                      HOME.
                    </span>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-[#ca8a04] dark:text-[#fef08a] h-6 flex items-center">
                      SHOWREEL.
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex flex-col items-center gap-8"
      >
        <div className="max-w-4xl">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tight text-text-primary mb-6 leading-[1.1]">
            <span className="relative inline-block z-10 whitespace-nowrap after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">
              SELECTED
            </span> 
            {" "}PROJECTS.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-slate-500 leading-relaxed mx-auto">
            A curated gallery of learning experiences where instructional design meets cutting-edge technology and visual storytelling.
          </p>
        </div>
      </motion.div>

      {/* Decorative center line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
        className="w-48 h-px bg-border/50 mt-16"
      />
    </header>
  )
}

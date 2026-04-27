"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"

interface ProjectDetailBackButtonProps {
  href: string
  label: string
}

export function ProjectDetailBackButton({ href, label }: ProjectDetailBackButtonProps) {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Use history back to preserve scroll position perfectly if there is history
    if (typeof window !== "undefined" && window.history.length > 2) {
      e.preventDefault()
      router.back()
    }
  }

  return (
    <div className="mb-12 mt-4 w-fit">
      <Magnetic strength={0.2}>
        <Link href={href} onClick={handleBack} className="group relative outline-none block">
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
                    {label}.
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
  )
}

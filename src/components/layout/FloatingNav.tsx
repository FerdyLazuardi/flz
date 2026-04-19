"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Info, Briefcase, Mail, Zap, ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { SolidGlowButton } from "@/components/ui/solid-glow-button"

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "value", label: "Skills", icon: Zap },
  { id: "about", label: "About", icon: Info },
  { id: "projects", label: "Works", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
]

export function FloatingNav() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isProjects = pathname === "/projects"
  const [activeSection, setActiveSection] = React.useState("hero")
  const [showLabels, setShowLabels] = React.useState(true)
  const idleTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  const resetIdleTimer = React.useCallback(() => {
    setShowLabels(true)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      setShowLabels(false)
    }, 3000) // Hide after 3 seconds of inactivity
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      // Detect active section
      const hero = document.getElementById("hero")
      
      if (!isHome) return

      resetIdleTimer()
      // 2. Detect active section
      let currentSection = "hero"
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section.id
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
        setShowLabels(true) // Always show on section change
      }
    }

    const handleMouseMove = () => isHome && resetIdleTimer()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [isHome, activeSection, resetIdleTimer])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Floating Header Actions */}
      <div className="fixed top-6 left-6 right-6 z-[60] flex justify-between items-center pointer-events-none">
        <div>
          {!isHome && !isProjects && (
            <Link href="/" className="pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-border p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
            </Link>
          )}
        </div>

        <div />
      </div>

      {/* Right Side Section Indicator (Only on Home) */}
      <AnimatePresence>
        {isHome && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-10 items-center py-10"
          >
            {/* Vertical Track Line */}
            <div className="absolute top-10 bottom-10 w-px bg-slate-200 dark:bg-slate-800 -z-10" />

            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  onMouseEnter={() => setShowLabels(true)}
                  className="group relative flex items-center justify-end"
                >
                  {/* Persistent Active Label or Hover Label */}
                  <AnimatePresence mode="wait">
                    {((isActive && showLabels) || activeSection === "") && (
                      <motion.span
                        key={`label-${section.id}-${isActive}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`absolute right-12 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] pointer-events-none shadow-xl border border-primary/10 flex`}
                      >
                        {section.label}
                      </motion.span>
                    )}
                    {/* Fallback for hover on non-active */}
                    {!isActive && (
                      <motion.span
                        className="absolute right-12 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] pointer-events-none shadow-xl border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"
                      >
                        {section.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <div className="relative flex items-center justify-center w-6 h-6">
                    {/* Inner Dot */}
                    <motion.div
                      animate={{ scale: isActive ? 1.5 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`w-1.5 h-1.5 rounded-full border transition-colors duration-500 relative z-10 ${
                        isActive 
                          ? "bg-primary border-primary" 
                          : "bg-transparent border-slate-400 dark:border-slate-600 group-hover:border-primary"
                      }`}
                    />
                    
                    {/* Active Outer Ring with smooth spring */}
                    {isActive && (
                      <motion.div
                        layoutId="active-ring"
                        className="absolute inset-0 border border-primary/80 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Cinematic Breathing Core Glow */}
                    {isActive && (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.1, 0.4, 0.1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-primary rounded-full blur-md pointer-events-none"
                      />
                    )}
                    
                    {/* Elegant Slow Wave Pulse (Lusion-style) */}
                    {isActive && (
                      <motion.div
                        animate={{ 
                          scale: [1, 2.5],
                          opacity: [0.5, 0]
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity, 
                          ease: [0.25, 1, 0.5, 1], // Cinematic gradual fade and spread
                        }}
                        className="absolute inset-0 border border-primary/40 rounded-full pointer-events-none"
                      />
                    )}
                  </div>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

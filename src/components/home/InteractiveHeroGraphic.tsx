"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Play, Pause, CheckCircle2, LayoutTemplate, MonitorPlay } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function InteractiveHeroGraphic() {
  const [isPlaying, setIsPlaying] = useState(true) // Autoplay enabled
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Perspective values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p + 0.2) % 100) // Master master clock (0-100)
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Compute values based on progress for smooth pause/resume
  const rotation = progress * 10.8 // 3 full rotations per progress cycle
  const borderRadius = `${35 + Math.sin((progress / 100) * Math.PI * 10) * 15}%`

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-[500px] mx-auto perspective-[1200px]"
    >
      {/* Background blobs for depth */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-br from-cat-instructional/20 to-cat-ai/20 rounded-full blur-[80px]"
      />
      
      {/* Main floating card with perspective follow */}
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          opacity: { duration: 0.8 }
        }}
        className="absolute inset-4 sm:inset-10 bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        <div style={{ transform: "translateZ(20px)" }} className="flex flex-col h-full">
          {/* Top bar */}
          <div className="h-12 border-b border-black/5 dark:border-white/10 flex items-center px-4 gap-2 bg-white/40 dark:bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="mx-auto text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MonitorPlay className="w-3.5 h-3.5" />
              <span>Interactive_Module.mp4</span>
            </div>
          </div>

          {/* Video Player Mockup */}
          <div className="flex-1 p-6 flex flex-col justify-center items-center relative overflow-hidden group">
            {/* Abstract graphic replacing video */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: isPlaying ? 1.1 : 1,
                  rotate: rotation,
                  borderRadius: borderRadius
                }} 
                transition={{ 
                  type: "tween", 
                  ease: "linear",
                  duration: 0.05
                }}
                className="w-40 h-40 border-[12px] border-accent opacity-20"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(!isPlaying)
              }}
              className="relative z-10 w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center shadow-xl shadow-accent/30"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </motion.button>
          </div>

          {/* Player Controls & Progress */}
          <div className="p-5 bg-white/50 dark:bg-black/30 border-t border-black/5 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Module Progress</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating element 1 */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]),
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 sm:-right-6 top-1/4 bg-white/90 dark:bg-bg-elevated/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/50 dark:border-border flex items-center gap-3 z-20"
      >
        <div style={{ transform: "translateZ(40px)" }} className="flex items-center gap-3">
          <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-xl shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="pr-2">
            <p className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200">SCORM Ready</p>
            <p className="text-[11px] font-medium text-slate-500">Exported successfully</p>
          </div>
        </div>
      </motion.div>

      {/* Floating element 2 */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]),
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-2 sm:-left-8 bottom-1/4 bg-white/90 dark:bg-bg-elevated/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/50 dark:border-border flex items-center gap-3 z-20"
      >
        <div style={{ transform: "translateZ(60px)" }} className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl shadow-sm">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div className="pr-2">
            <p className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200">Storyboarding</p>
            <p className="text-[11px] font-medium text-slate-500">In progress...</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

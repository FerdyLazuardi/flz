"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
        x: ["-50%", "-48%", "-52%", "-50%"],
        y: ["-50%", "-52%", "-48%", "-50%"],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
      className="fixed top-[10%] left-[40%] w-[1200px] h-[800px] pointer-events-none -z-10 transform-gpu will-change-transform"
    >
      <div className="absolute inset-0 rounded-[100%] bg-gradient-to-tr from-cat-instructional/20 via-purple-200/30 to-cat-ai/20 blur-[120px]" />
    </motion.div>
  )
}

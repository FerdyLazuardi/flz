"use client"

import * as React from "react"
import { Lightbulb, Code, Video, Sparkles, Workflow, Layers, MonitorPlay } from "lucide-react"
import { motion, useInView, Variants } from "framer-motion"

const capabilities = [
  {
    title: "Instructional Design",
    description: "Developing safe-to-fail learning environments using gamification, scenario-based learning, and interactive storytelling.",
    icon: Lightbulb,
    color: "var(--cat-instructional)",
    bgClass: "bg-[var(--cat-instructional)]/10",
    borderColor: "group-hover:border-[var(--cat-instructional)]/30",
    glowColor: "rgba(124, 58, 237, 0.15)",
    badge: "Strategic",
    subIcon: Workflow
  },
  {
    title: "Multimedia Production",
    description: "Creating high-retention video content, cinematic motion graphics, and interactive experiences that engage learners actively.",
    icon: Video,
    color: "var(--cat-multimedia)",
    bgClass: "bg-[var(--cat-multimedia)]/10",
    borderColor: "group-hover:border-[var(--cat-multimedia)]/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
    badge: "Creative",
    subIcon: Sparkles
  },
  {
    title: "AI-Enhanced Learning",
    description: "Architecting RAG knowledge bases, AI-driven content generation, and smart LMS integrations for adaptive learning.",
    icon: Code,
    color: "var(--cat-ai)",
    bgClass: "bg-[var(--cat-ai)]/10",
    borderColor: "group-hover:border-[var(--cat-ai)]/30",
    glowColor: "rgba(5, 150, 105, 0.15)",
    badge: "Technical",
    subIcon: Sparkles
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  },
}
export function ValueProp() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="value" ref={ref} className="py-32 relative overflow-visible">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black text-text-primary mb-6 tracking-tight leading-[1.05]">
            End-to-End <br />
            <span className="relative inline-block z-10 whitespace-nowrap after:absolute after:bottom-1.5 after:left-[-2%] after:-z-10 after:h-[35%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm mt-2 sm:mt-0">Learning Architecture</span>
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            I bring three distinct disciplines together to build learning experiences that are
            conceptually sound, visually striking, and technically advanced.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            const SubIcon = cap.subIcon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`group relative flex flex-col p-8 rounded-[2rem] border border-border bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl ${cap.borderColor} cursor-default overflow-hidden`}
              >
                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${cap.glowColor}, transparent 70%)`
                  }}
                />

                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${cap.bgClass} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                    <Icon className="w-8 h-8 transition-colors duration-500" style={{ color: cap.color }} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">
                      {cap.badge}
                    </span>
                    <SubIcon className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-black text-text-primary mb-4 leading-tight">
                  {cap.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                  {cap.description}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <div className="h-1 w-12 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                      className="h-full"
                      style={{ backgroundColor: cap.color }}
                    />
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

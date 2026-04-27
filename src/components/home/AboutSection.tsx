"use client"

import * as React from "react"
import { Download } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { SolidGlowButton } from "@/components/ui/solid-glow-button"
import { Magnetic } from "@/components/ui/magnetic"

const noteData = [
  // FigJam Palette: Yellow (#FFF38B), Orange (#FFC999), Green (#B6F5D0), Blue (#B2D9FF), Purple (#E2CCFF), Pink (#FFC2E2)
  {
    title: "ADDIE & TNA",
    content: "Applied research to identify challenges & design effective instructional solutions.",
    color: "#FFF38B", // Yellow
    rotate: -3,
    top: "5%",
    left: "10%",
  },
  {
    title: "Bloom's Taxonomy",
    content: "Crafting objective-driven curricula for cognitive learning outcomes.",
    color: "#FFC999", // Orange
    rotate: 2,
    top: "5%",
    left: "42%",
  },
  {
    title: "LMS Management",
    content: "Managing Moodle & SCORM for 10,000+ active employees.",
    color: "#B6F5D0", // Green
    rotate: -4,
    top: "32%",
    left: "8%",
  },
  {
    title: "Gamified Learning",
    content: "Developing interactive game mechanics to increase learner motivation and retention.",
    color: "#B2D9FF", // Blue
    rotate: 3,
    top: "55%",
    left: "9%",
  },
  {
    title: "Interactive Learning",
    content: "Developing immersive e-learning modules using Articulate Storyline.",
    color: "#E2CCFF", // Purple
    rotate: -2,
    top: "25%",
    left: "32%",
  },
  {
    title: "Multimedia Production",
    content: "Editing high-quality educational videos with Premiere Pro & Capcut.",
    color: "#FFC2E2", // Pink
    rotate: 4,
    top: "5%",
    left: "68%",
  },
  {
    title: "Visual Design",
    content: "Designing engaging learning materials using Adobe CC & Canva.",
    color: "#FFF38B",
    rotate: -3,
    top: "35%",
    left: "63%",
  },
  {
    title: "Motion Graphics",
    content: "Bringing abstract learning materials to life through dynamic animations.",
    color: "#B6F5D0",
    rotate: 2,
    top: "52%",
    left: "35%",
  },
  {
    title: "Information Design",
    content: "Simplifying complex concepts into clear, engaging educational visuals.",
    color: "#FFC999",
    rotate: -4,
    top: "78%",
    left: "60%",
  },
  {
    title: "Learning Campaigns",
    content: "Crafting visual identities to boost engagement in training programs.",
    color: "#B2D9FF",
    rotate: 3,
    top: "55%",
    left: "70%",
  },
  {
    title: "RAG & AI Chatbots",
    content: "Architecting knowledge bases for instant, smart info retrieval.",
    color: "#E2CCFF",
    rotate: -2,
    top: "82%",
    left: "35%",
  },
  {
    title: "Design for Impact",
    content: "Merging instructional design with advanced tech ecosystems.",
    color: "#FFC2E2",
    rotate: 2,
    top: "80%",
    left: "10%",
  }
]

export function AboutSection() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const foldStyles = [
    { // Bottom Right
      mainClip: "polygon(0% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%)",
      foldClass: "bottom-0 right-0",
      foldClip: "polygon(0% 0%, 100% 100%, 0% 100%)",
      foldShadow: "shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)]"
    },
    { // Bottom Left
      mainClip: "polygon(0% 0%, 100% 0%, 100% 100%, 18% 100%, 0% 82%)",
      foldClass: "bottom-0 left-0",
      foldClip: "polygon(100% 0%, 100% 100%, 0% 100%)",
      foldShadow: "shadow-[2px_-2px_4px_rgba(0,0,0,0.1)]"
    },
    { // Top Right
      mainClip: "polygon(0% 0%, 82% 0%, 100% 18%, 100% 100%, 0% 100%)",
      foldClass: "top-0 right-0",
      foldClip: "polygon(0% 0%, 100% 0%, 0% 100%)",
      foldShadow: "shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]"
    },
    { // Top Left
      mainClip: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 18%)",
      foldClass: "top-0 left-0",
      foldClip: "polygon(0% 0%, 100% 0%, 100% 100%)",
      foldShadow: "shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
    }
  ]

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative z-10 overflow-visible">
      {/* Ambient Left Background Glow to prevent plain white look */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-20%] w-[50%] h-[60%] rounded-full bg-cat-instructional/5 dark:bg-cat-instructional/10 blur-[120px]" />
      </div>

      {/* Shared Interactive Background Accent (Right Side) */}
      <motion.div
        animate={isInView ? {
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ["-50%", "-45%", "-55%", "-50%"],
          y: ["-50%", "-55%", "-45%", "-50%"],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 w-[1000px] h-[700px] pointer-events-none -z-10"
      >
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-br from-cat-multimedia/15 via-cat-instructional/10 to-cat-ai/15 blur-[60px]" />
      </motion.div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-14 mx-auto w-full max-w-[1800px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* LEFT: TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start lg:pr-10"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-8 leading-[1.1] tracking-tight">
              Bridging Pedagogy with <br className="hidden md:block" />
              <span className="relative inline-block z-10 after:absolute after:bottom-1.5 after:left-[-2%] after:-z-10 after:h-[35%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">Advanced Technology</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
              I am Ferdy Fadhil Lazuardi — an Educational Technology graduate and Learning Designer
              focused on creating engaging, objective-driven learning materials that empower employees and learners to grow.
            </p>
            <Magnetic strength={0.2}>
              <div className="w-full sm:w-auto">
                <SolidGlowButton
                  href="/CV - Ferdy Fadhil Lazuardi.pdf"
                  text="Download CV"
                  color="#0a0a0a"
                  size="md"
                  className="w-full sm:w-auto sm:px-8"
                  icon={<Download className="w-5 h-5 ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                />
              </div>
            </Magnetic>
          </motion.div>

          {/* RIGHT: INTERACTIVE FLOATING NOTES (No background box) */}
          <div className="relative min-h-[650px] lg:h-[800px] w-full mt-10 lg:mt-0">
            {/* Background "Drag me" text for Desktop */}
            <div className="hidden sm:block absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-handwriting text-slate-300/40 dark:text-slate-700/40 font-bold text-4xl lg:text-6xl pointer-events-none select-none tracking-[0.2em] uppercase z-0">
              Drag me
            </div>

            {/* Desktop & Tablet: Floating Draggable View */}
            <div className="hidden sm:block relative w-full h-full z-10">
              {noteData.map((note, index) => {
                const style = foldStyles[index % foldStyles.length]
                const textRotation = 0 // Flatten text as well

                return (
                  <motion.div
                    key={index}
                    drag
                    dragMomentum={false}
                    initial={{ opacity: 0, scale: 0.8, y: 20, rotate: note.rotate - 10 }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      rotate: note.rotate
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      zIndex: 100,
                      transition: { duration: 0.2 }
                    }}
                    whileDrag={{
                      scale: 1.15,
                      rotate: note.rotate - 6, // Twist slightly when peeling off
                      zIndex: 100,
                      boxShadow: "15px 25px 35px rgba(0,0,0,0.2)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250, // Increase stiffness for snappier return
                      damping: 20,
                      delay: index * 0.03
                    }}
                    className="absolute w-[160px] lg:w-[185px] aspect-square p-6 pt-8 flex flex-col items-start justify-start text-left cursor-grab active:cursor-grabbing transition-shadow group shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.15)]"
                    style={{
                      backgroundColor: note.color,
                      top: note.top,
                      left: note.left,
                      touchAction: "none",
                      clipPath: style.mainClip,
                      willChange: "transform",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* The Folded Corner Piece - Flipped over */}
                    <div
                      className={`absolute w-[18%] h-[18%] ${style.foldClass} z-20 pointer-events-none ${style.foldShadow}`}
                      style={{
                        backgroundColor: note.color,
                        filter: "brightness(0.92)",
                        clipPath: style.foldClip
                      }}
                    />

                    <div className="relative z-10 font-handwriting select-none w-full" style={{ rotate: `${textRotation}deg` }}>
                      <h3 className="font-black text-[16px] lg:text-[18px] text-slate-900 mb-2 leading-tight tracking-tight">
                        {note.title}
                      </h3>
                      <p className="text-[11px] lg:text-[12px] text-slate-800 leading-relaxed opacity-90">
                        {note.content}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile: Compact Grid View (Also no container background) */}
            <div className="sm:hidden grid grid-cols-2 gap-4 pt-4 pb-10 px-2">
              {noteData.map((note, index) => {
                const style = note.title === "Learning Campaigns" ? foldStyles[0] : foldStyles[index % foldStyles.length]
                const textRotation = 0

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className="relative aspect-square w-full p-5 pt-7 flex flex-col items-start justify-start text-left overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                    style={{
                      backgroundColor: note.color,
                      clipPath: style.mainClip,
                      rotate: note.rotate * 0.5,
                      willChange: "transform"
                    }}
                  >
                    <div
                      className={`absolute w-[18%] h-[18%] ${style.foldClass} z-20 pointer-events-none ${style.foldShadow}`}
                      style={{
                        backgroundColor: note.color,
                        filter: "brightness(0.92)",
                        clipPath: style.foldClip
                      }}
                    />
                    <div className="relative z-10 font-handwriting select-none w-full" style={{ rotate: `${textRotation}deg` }}>
                      <h3 className="font-black text-[13px] text-slate-900 mb-1.5 leading-tight">
                        {note.title}
                      </h3>
                      <p className="text-[9px] text-slate-800 leading-relaxed opacity-95">
                        {note.content}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

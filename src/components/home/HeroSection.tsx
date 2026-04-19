"use client"

import * as React from "react"
import { ArrowRight, Download } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform, animate, useMotionValueEvent, Variants } from "framer-motion"

import { AnimatedSwipeButton } from "@/components/ui/animated-swipe-button"
import { SolidGlowButton } from "@/components/ui/solid-glow-button"
import { Typewriter } from "@/components/ui/typewriter"
import { InteractiveHeroGraphic } from "@/components/home/InteractiveHeroGraphic"
import { Magnetic } from "@/components/ui/magnetic"

function Counter({ 
  value, 
  suffix = "", 
  duration = 2.5, 
  useSeparator = false 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number; 
  useSeparator?: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const formatted = useTransform(rounded, (latest) => {
    if (!useSeparator) return latest.toString();
    return latest.toLocaleString('de-DE');
  });

  const [displayValue, setDisplayValue] = React.useState("0");

  useMotionValueEvent(formatted, "change", (latest) => {
    setDisplayValue(latest);
  });

  React.useEffect(() => {
    const controls = animate(count, value, { 
      duration, 
      ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo
    });
    return controls.stop;
  }, [count, value, duration]);

  return (
    <span>{displayValue}{suffix}</span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
}

export function HeroSection({
  phrases = [
    "Hello, I'm Ferdy.",
    "Learning Designer.",
    "Video Learning Producer.",
    "Interactive Media Developer."
  ],
  headline = (
    <>
      <span className="relative inline-block z-10 whitespace-nowrap after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">Learning Designer</span> <br className="hidden lg:block" />
      who turns tools <br className="hidden lg:block" />
      into impact.
    </>
  ),
  subtitle = "I merge instructional design with interactive media, video production, and artificial intelligence to create digital learning experiences that are engaging, scalable, and objective-driven.",
}: {
  phrases?: string[]
  headline?: React.ReactNode
  subtitle?: string
}) {
  const [mounted, setMounted] = React.useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 100 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const textX = useTransform(springX, [0, 1000], [0, 15])
  const textY = useTransform(springY, [0, 1000], [0, 15])

  React.useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-32 pb-20">

      {/* Background Accent - Adjusted position for 2-col */}
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
        className="absolute top-1/3 left-1/4 w-[1200px] h-[800px] pointer-events-none -z-10"
      >
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-tr from-cat-instructional/20 via-purple-200/30 to-cat-ai/20 blur-[120px]" />
      </motion.div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-14 mx-auto w-full max-w-[1800px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

          {/* LEFT COLUMN: TEXT */}
          <motion.div
            variants={containerVariants}
            initial={mounted ? "hidden" : "visible"}
            animate={mounted ? "visible" : "visible"}
            style={{ x: textX, y: textY }}
            className="text-left flex flex-col items-start lg:pr-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center rounded-full border border-border bg-bg-surface/50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-text-secondary backdrop-blur-sm mb-6 sm:mb-8 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse" />
              <Typewriter phrases={phrases} />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tight text-text-primary mb-6 leading-[1.05] max-w-2xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed mb-10"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto"
            >
              <Magnetic strength={0.3}>
                <div className="w-full sm:w-auto">
                  <SolidGlowButton
                    href="/projects"
                    text="View Projects"
                    color="#0a0a0a"
                    size="md"
                    className="w-full sm:w-auto sm:px-8"
                    icon={<ArrowRight className="w-5 h-5 ml-1" />}
                  />
                </div>
              </Magnetic>
              <Magnetic strength={0.2}>
                <div className="w-full sm:w-auto">
                  <AnimatedSwipeButton
                    href="/CV - Ferdy Fadhil Lazuardi.pdf"
                    text="Download CV"
                    color="var(--primary)"
                    size="md"
                    textColorClass="text-text-primary border-border bg-transparent shadow-none"
                    className="w-full sm:w-auto sm:px-8"
                    noSwipe={true}
                    icon={<Download className="w-5 h-5 mr-1" />}
                  />
                </div>
              </Magnetic>
            </motion.div>

            {/* Stats Row (like reference) */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 sm:gap-10 mt-16 pt-8 border-t border-border/50 w-full max-w-lg"
            >
              <div className="flex flex-col items-center text-center">
                <p className="font-heading font-extrabold text-2xl text-text-primary">
                  <Counter value={10} suffix="+" duration={1.2} />
                </p>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.1em] mt-1.5 whitespace-nowrap">Modules Developed</p>
              </div>
              <div className="w-px h-10 bg-border/50 shrink-0" />
              <div className="flex flex-col items-center text-center">
                <p className="font-heading font-extrabold text-2xl text-text-primary">
                  <Counter value={2} suffix="+" duration={0.8} />
                </p>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.1em] mt-1.5 whitespace-nowrap">Yrs Exp.</p>
              </div>
              <div className="w-px h-10 bg-border/50 shrink-0" />
              <div className="flex flex-col items-center text-center">
                <p className="font-heading font-extrabold text-2xl text-text-primary text-accent">
                  <Counter value={10000} suffix="+" duration={3} useSeparator={true} />
                </p>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.1em] mt-1.5 whitespace-nowrap">Users Empowered</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: INTERACTIVE GRAPHIC */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-full flex items-center justify-center py-10 lg:py-0"
          >
            <InteractiveHeroGraphic />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

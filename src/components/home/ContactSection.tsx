"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedSwipeButton } from "@/components/ui/animated-swipe-button"
import { SolidGlowButton } from "@/components/ui/solid-glow-button"
import { Magnetic } from "@/components/ui/magnetic"

const GmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

function RollingCharacter({ char, iter }: { char: string, iter: number }) {
  return (
    <span className="relative inline-block overflow-hidden h-[1.1em] leading-none">
      <motion.span
        key={iter}
        initial={{ y: "0%" }}
        animate={iter > 0 ? { y: "-50%" } : { y: "0%" }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="flex flex-col"
      >
        <span className="flex items-center justify-center h-[1.1em] px-[0.02em]">{char === " " ? "\u00A0" : char}</span>
        <span className="flex items-center justify-center h-[1.1em] px-[0.02em]">{char === " " ? "\u00A0" : char}</span>
      </motion.span>
    </span>
  )
}

function RollingText({ text, iterations, offset = 0 }: { text: string, iterations: number[], offset?: number }) {
  return (
    <span className="flex items-center justify-center">
      {text.split("").map((char, i) => (
        <RollingCharacter 
          key={i} 
          char={char} 
          iter={iterations[i + offset]} 
        />
      ))}
    </span>
  )
}

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isVisible = useInView(containerRef, { margin: "200px" })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    let particles: Array<{ x: number, y: number, ox: number, oy: number, vx: number, vy: number, type: number, size: number, angle: number, vAngle: number }> = []
    
    // Pre-allocate spatial grid to avoid Garbage Collection stutters
    const cellSize = 45;
    let colsInGrid = Math.ceil(width / cellSize);
    let rowsInGrid = Math.ceil(height / cellSize);
    let grid: number[][] = Array(colsInGrid * rowsInGrid).fill(0).map(() => []);

    const initParticles = () => {
      particles = []
      const spacing = width < 768 ? 24 : 20
      const cols = Math.floor(width / spacing)
      const rows = Math.floor((height * 0.45) / spacing)
      
      colsInGrid = Math.ceil(width / cellSize);
      rowsInGrid = Math.ceil(height / cellSize);
      grid = Array(colsInGrid * rowsInGrid).fill(0).map(() => []);
      
      const homeYStart = height - (rows * spacing)
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.65) continue 

          const ox = (c * spacing) + (Math.random() * (spacing * 0.4)) + (spacing * 0.3)
          const oy = homeYStart + (r * spacing) + (Math.random() * (spacing * 0.4)) + (spacing * 0.3)
          
          if (ox > width - 15 || ox < 15) continue

          particles.push({
            x: ox + (Math.random() - 0.5) * 100,
            y: oy + (Math.random() - 0.5) * 100,
            ox: ox,
            oy: oy,
            vx: 0,
            vy: 0,
            type: Math.floor(Math.random() * 4),
            size: Math.random() * 2 + 1.2,
            angle: Math.random() * Math.PI,
            vAngle: (Math.random() - 0.5) * 0.03
          })
        }
      }
    }

    initParticles()

    let mouseX = -1000
    let mouseY = -1000
    let lastMouseX = -1000
    let lastMouseY = -1000
    let mouseVX = 0
    let mouseVY = 0
    let isMouseInContent = false

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

      if (lastMouseX !== -1000) {
        mouseVX = (currentX - lastMouseX) * 0.45
        mouseVY = (currentY - lastMouseY) * 0.45
      }

      lastMouseX = currentX
      lastMouseY = currentY
      mouseX = currentX
      mouseY = currentY
      isMouseInContent = true
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
      lastMouseX = -1000
      lastMouseY = -1000
      mouseVX = 0
      mouseVY = 0
      isMouseInContent = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseout", handleMouseLeave)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)

    let animationId: number
    let time = 0

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate)
        return
      }

      time += 0.003
      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")
      const colorBase = isDark ? "255, 255, 255" : "0, 0, 0"

      // 1. Clear spatial grid without garbage collection (reusing arrays)
      for (let i = 0; i < grid.length; i++) {
        grid[i].length = 0;
      }

      // 2. Populate grid
      particles.forEach((p, idx) => {
        const gx = Math.floor(p.x / cellSize);
        const gy = Math.floor(p.y / cellSize);
        const key = gy * colsInGrid + gx;
        if (key >= 0 && key < grid.length) {
          grid[key].push(idx);
        }
      });

      // 3. Process physics
      particles.forEach((p, i) => {
        const driftX = Math.sin(time + p.oy * 0.01) * 20 + Math.cos(time * 0.7 + p.ox * 0.01) * 10
        const driftY = Math.cos(time + p.ox * 0.01) * 15 + Math.sin(time * 0.7 + p.oy * 0.01) * 10
        const targetX = p.ox + driftX
        const targetY = p.oy + driftY

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distSq = dx * dx + dy * dy
        const maxDistSq = 4900 // 70 * 70

        // Mouse Repulsion
        if (distSq < maxDistSq && isMouseInContent) {
          const dist = Math.sqrt(distSq)
          const force = Math.pow((70 - dist) / 70, 2)
          
          p.vx -= (dx / dist) * force * 2.0
          p.vy -= (dy / dist) * force * 2.0
          p.vx += (dy / dist) * force * 4.0
          p.vy -= (dx / dist) * force * 4.0
          p.vx += mouseVX * force * 12.0 // Boost throw power so they act as projectiles
          p.vy += mouseVY * force * 12.0
        }

        // Zero-GC Particle-Particle Anti-Overlap & Momentum Transfer
        const gx = Math.floor(p.x / cellSize);
        const gy = Math.floor(p.y / cellSize);
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const key = (gy + oy) * colsInGrid + (gx + ox);
            if (key >= 0 && key < grid.length) {
              const neighbors = grid[key];
              for (let ni = 0; ni < neighbors.length; ni++) {
                const neighborIdx = neighbors[ni];
                if (neighborIdx === i) continue;
                
                const other = particles[neighborIdx];
                const pdx = p.x - other.x;
                const pdy = p.y - other.y;
                const pd2 = pdx * pdx + pdy * pdy;
                const minDist = (p.size + other.size) * 3.5; // Larger hitbox for collisions
                
                if (pd2 > 0 && pd2 < minDist * minDist) {
                  const d = Math.sqrt(pd2);
                  const overlapForce = (minDist - d) / minDist;
                  
                  // Transfer kinetic energy: moving particles push stationary ones
                  const pushX = (pdx / d) * overlapForce * 0.9;
                  const pushY = (pdy / d) * overlapForce * 0.9;
                  
                  p.vx += pushX;
                  p.vy += pushY;
                  
                  // Push the other particle away (Momentum Transfer)
                  other.vx -= pushX;
                  other.vy -= pushY;
                }
              }
            }
          }
        }

        // Fluid Natural Return (Organic, Non-Magnetic)
        const distToTargetX = targetX - p.x;
        const distToTargetY = targetY - p.y;
        const distToTarget = Math.sqrt(distToTargetX * distToTargetX + distToTargetY * distToTargetY) || 1;
        
        // A force that scales with distance but softly caps out, ensuring they steadily return
        // without snapping back violently like a stretched rubber band.
        const returnForce = Math.min(distToTarget * 0.0015, 0.4);
        
        p.vx += (distToTargetX / distToTarget) * returnForce;
        p.vy += (distToTargetY / distToTarget) * returnForce;
        
        // Slight gravity to give them a natural falling weight in the fluid
        p.vy += 0.03;

        // High fluid friction (0.86) to make them "swim" through a dense medium
        // This stops them from bouncing or vibrating rapidly around their target
        p.vx *= 0.86;
        p.vy *= 0.86;
        
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx *= -0.15; }
        else if (p.x > width) { p.x = width; p.vx *= -0.15; }
        if (p.y < 0) { p.y = 0; p.vy *= -0.15; }
        else if (p.y > height) { p.y = height; p.vy *= -0.1; }

        p.angle += p.vAngle + (Math.abs(p.vx) + Math.abs(p.vy)) * 0.01

        const depthFactor = (p.oy / height) 
        const size = p.size * (0.6 + depthFactor * 1.2)
        const alpha = (0.1 + depthFactor * 0.6) * (0.6 + Math.abs(driftX/35) * 0.4)
        
        // Fast transform without ctx.save() and ctx.restore()
        ctx.setTransform(Math.cos(p.angle), Math.sin(p.angle), -Math.sin(p.angle), Math.cos(p.angle), p.x, p.y)
        
        ctx.fillStyle = `rgba(${colorBase}, ${alpha})`
        ctx.strokeStyle = `rgba(${colorBase}, ${alpha})`
        ctx.lineWidth = size / 2

        if (p.type === 0) {
          ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
        } else if (p.type === 1) {
          ctx.beginPath(); ctx.moveTo(-size * 1.5, 0); ctx.lineTo(size * 1.5, 0); ctx.moveTo(0, -size * 1.5); ctx.lineTo(0, size * 1.5); ctx.stroke();
        } else if (p.type === 2) {
          ctx.strokeRect(-size, -size, size * 2, size * 2);
        } else {
          ctx.beginPath(); ctx.moveTo(0, -size * 1.5); ctx.lineTo(size * 1.5, size * 1.5); ctx.lineTo(-size * 1.5, size * 1.5); ctx.closePath(); ctx.stroke();
        }
      })
      
      ctx.resetTransform() // Reset the transformation matrix for the next frame

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseout", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [isVisible])

  const text1 = "CONNECT "
  const text2 = "WITH ME."
  const totalLen = text1.length + text2.length
  const [iterations, setIterations] = useState<number[]>(new Array(totalLen).fill(0))

  useEffect(() => {
    const pickRandom = () => {
      setIterations(prev => {
        const next = [...prev]
        const indices: number[] = []
        while (indices.length < 4) {
          const r = Math.floor(Math.random() * totalLen)
          if (!indices.includes(r)) {
            indices.push(r)
            next[r] = next[r] + 1
          }
        }
        return next
      })
    }

    const interval = setInterval(pickRandom, 2500)
    return () => clearInterval(interval)
  }, [totalLen])

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full h-[85vh] md:h-screen min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center overflow-visible mt-40 sm:mt-0"
    >
      {/* Cinematic Ambient Glow to unify with previous sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] rounded-full bg-cat-instructional/5 dark:bg-cat-instructional/10 blur-[150px]" />
      </div>
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 -mt-16 sm:-mt-32 md:-mt-64">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.65rem] sm:text-sm md:text-base font-black tracking-[0.25em] text-text-secondary uppercase mb-8 sm:mb-12 max-w-2xl text-center"
        >
          READY FOR A NEW LEARNING <br className="sm:hidden" /> MEDIA EXPERIENCE?
        </motion.p>

        <div
          className="flex flex-col md:flex-row items-center cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative inline-block">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               className="relative z-10"
            >
              <h1 className="font-heading font-bold text-[3rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.9] tracking-normal md:tracking-wide text-text-primary uppercase whitespace-nowrap">
                <RollingText text={text1} iterations={iterations} />
              </h1>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isHovered ? 0 : 0.4 }}
              className="absolute bottom-[2%] left-[-2.5%] z-0 w-[105%] h-[35%] bg-[#fef08a] dark:bg-[#ca8a04]/80 rounded-sm origin-left overflow-hidden pointer-events-none"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: "200%" } : { x: "-100%" }}
                transition={{ duration: 1, ease: "easeInOut", delay: isHovered ? 0.1 : 0 }}
                className="absolute inset-0 w-1/2 bg-white/40 blur-md skew-x-12 mix-blend-overlay"
              />
            </motion.div>
          </div>

          <div className="relative inline-block mt-4 md:mt-0">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               className="relative z-10"
            >
              <h1 className="font-heading font-bold text-[3rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.9] tracking-tight text-text-primary uppercase flex items-center justify-center whitespace-nowrap">
                <RollingText text={text2} iterations={iterations} offset={text1.length} />
              </h1>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isHovered ? 0.5 : 0 }}
              className="absolute bottom-[2%] left-[-2.5%] z-0 w-[105%] h-[35%] bg-[#fef08a] dark:bg-[#ca8a04]/80 rounded-sm origin-left overflow-hidden pointer-events-none"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: "200%" } : { x: "-100%" }}
                transition={{ duration: 1, ease: "easeInOut", delay: isHovered ? 0.6 : 0 }}
                className="absolute inset-0 w-1/2 bg-white/40 blur-md skew-x-12 mix-blend-overlay"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative md:absolute bottom-0 md:bottom-60 left-0 w-full flex justify-center z-20 px-6 pointer-events-auto mt-16 md:mt-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.6, 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-6 w-full max-w-4xl p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] bg-white/5 dark:bg-white/[0.03] overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          <Magnetic strength={0.15}>
            <div className="w-full sm:w-auto relative z-10 flex">
              <AnimatedSwipeButton
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ferdy.lazuardi05@gmail.com"
                color="#EA4335"
                size="md"
                icon={<GmailIcon className="w-5 h-5 relative z-10" />}
                text="Gmail"
                className="w-full sm:w-auto sm:px-8 flex-1"
              />
            </div>
          </Magnetic>

          <Magnetic strength={0.15}>
            <div className="w-full sm:w-auto relative z-10 flex">
              <SolidGlowButton
                href="https://wa.me/+628987863920"
                color="#25D366"
                size="md"
                icon={<WhatsAppIcon className="w-5 h-5 relative z-10" />}
                text="WhatsApp"
                className="w-full sm:w-auto sm:px-8 flex-1"
              />
            </div>
          </Magnetic>

          <Magnetic strength={0.15}>
            <div className="w-full sm:w-auto relative z-10 flex">
              <AnimatedSwipeButton
                href="https://www.linkedin.com/in/ferdy10/"
                color="#0A66C2"
                size="md"
                icon={<LinkedInIcon className="w-5 h-5 relative z-10" />}
                text="LinkedIn"
                className="w-full sm:w-auto sm:px-8 flex-1"
              />
            </div>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}

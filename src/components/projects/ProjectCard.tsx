"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BrainCircuit, MonitorPlay, BookOpen } from "lucide-react"

export interface ProjectData {
  _id: string
  title: string
  slug: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any
  category: string
  excerpt?: string
  imageUrl?: string // if already resolved
  youtubeUrl?: string
}

export function ProjectCard({ project, priority = false }: { project: ProjectData, priority?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  // Hover Intent Logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isHovered && project.youtubeUrl) {
      timeoutId = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 600); // 600ms delay
    } else if (shouldLoadVideo) {
      timeoutId = setTimeout(() => setShouldLoadVideo(false), 0);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isHovered, project.youtubeUrl, shouldLoadVideo]);

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : url.split('/').pop();
  }

  let imageSrc = project.imageUrl;

  if (!imageSrc && project.youtubeUrl) {
    const vidId = getYoutubeId(project.youtubeUrl);
    if (vidId) {
      imageSrc = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
    }
  }

  if (!imageSrc) {
    imageSrc = "https://placehold.co/600x400/E5E7EB/A1A1AA?text=No+Image"
  }

  // Consistent static tilt for each card
  const tilt = "" // Removed rotation to keep everything straight

  return (
    <>
      {/* SVG Filter for Rough Edge Component */}
      <svg className="absolute w-0 h-0 pointer-events-none -z-50" aria-hidden="true">
        <filter id="card-rough-edge" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </svg>

      <Link href={`/projects/${project.slug}`} className="group block h-full select-none outline-none mt-6">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative h-full ${tilt} transition-all duration-300 p-1 lg:max-w-md mx-auto w-full`}
        >
          {/* Small Soft Shadow Box (Bottom Right) */}
          <div
            className="absolute -bottom-3 -right-3 w-28 h-24 bg-slate-200/80 dark:bg-slate-800/80 rounded-sm blur-[2px] transition-all duration-300 group-hover:blur-[4px] -z-10"
          />

          {/* Main Quest Card Wrapper */}
          <div className="relative h-full flex flex-col pt-6 pb-4 text-slate-800 dark:text-slate-100 drop-shadow-[0_15px_20px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)]">

            {/* Rough Edge Solid Background - ONLY this element gets the SVG turbulence mapping */}
            <div
              className={`absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-border pointer-events-none z-0 transition-all duration-500 group-hover:shadow-2xl ${
                project.category === 'ai-learning'
                  ? 'group-hover:border-[#059669]/30'
                  : project.category === 'multimedia'
                  ? 'group-hover:border-[#3B82F6]/30'
                  : 'group-hover:border-[#7C3AED]/30'
              }`}
              style={{ filter: "url(#card-rough-edge)" }}
            />
            {/* Hover Glow Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-lg overflow-hidden"
              style={{ 
                background: `radial-gradient(circle at 50% 0%, ${
                  project.category === 'ai-learning' 
                    ? 'rgba(5, 150, 105, 0.15)' 
                    : project.category === 'multimedia'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(124, 58, 237, 0.15)'
                }, transparent 70%)` 
              }}
            />

            {/* Top Circular Seal */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center drop-shadow-sm">
              <motion.div
                className="w-14 h-14 rounded-full border-[3px] border-white dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden backdrop-blur-sm group/seal"
                animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
              >
                <div className="w-full h-full p-2 flex items-center justify-center opacity-90 drop-shadow-sm transition-transform duration-300 group-hover/seal:scale-110">
                  {project.category === 'ai-learning' ? (
                    <BrainCircuit className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                  ) : project.category === 'multimedia' ? (
                    <MonitorPlay className="w-6 h-6 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                  ) : (
                    <BookOpen className="w-6 h-6 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Inner Content Wrapper */}
            <div className="px-3 flex flex-col h-full z-10 relative">

              {/* Image Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 border-2 border-slate-100 dark:border-slate-800 shadow-sm z-10">
                <motion.div
                  layoutId={`image-${project._id}`}
                  className="h-full w-full relative"
                >
                  <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${shouldLoadVideo ? 'opacity-0' : 'opacity-100'}`}
                    priority={priority}
                  />
                  {/* Subtle vignette/watercolor edge overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-slate-900/60 z-10 mix-blend-overlay" />
                </motion.div>

                <AnimatePresence>
                  {project.youtubeUrl && shouldLoadVideo && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black z-20 pointer-events-none"
                    >
                      <iframe
                        src={`${project.youtubeUrl}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&playlist=${getYoutubeId(project.youtubeUrl)}`}
                        title="Preview"
                        className="w-[120%] h-[120%] -ml-[10%] -mt-[10%] object-cover pointer-events-none opacity-80"
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Title & Desc */}
              <h3 className="font-heading text-lg font-black text-slate-800 dark:text-slate-100 mb-1.5 leading-tight tracking-tight px-1 z-10">
                {project.title}
              </h3>
              <p className="text-slate-600/80 dark:text-slate-400 text-[11px] line-clamp-3 leading-relaxed mb-6 px-1 z-10 border-l-[1.5px] border-slate-200 dark:border-slate-700 pl-2">
                {project.excerpt || "Lorem ipsum dolor sit amet consectetur. Blandit sed quam aliquet convallis vivamus pretium lectus cras."}
              </p>

              {/* Bottom Action Row (Only Detail Button, right-aligned) */}
              <div className="mt-auto flex items-center justify-end px-1 z-10">
                {/* The Detail Button (Beveled Ticket Style) */}
                <div className="relative group/btn cursor-pointer inline-block ml-auto drop-shadow-sm">
                  {/* Outer Frame (Creates the border effect) */}
                  <div
                    className="relative p-[2px] bg-slate-300 dark:bg-slate-700 transition-all duration-200 group-hover/btn:scale-105 group-active/btn:scale-95 group-hover/btn:bg-slate-400 dark:group-hover/btn:bg-slate-600"
                    style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
                  >
                    {/* Inner Button Body */}
                    <div
                      className="relative flex items-center gap-3 px-4 py-1.5 bg-slate-900 dark:bg-primary text-white"
                      style={{ clipPath: "polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px)" }}
                    >
                      {/* Left Diamond */}
                      <div className="relative w-1.5 h-1.5 rotate-45 bg-white/80 transition-transform group-hover/btn:rotate-90 duration-300">
                        {/* Inner cutout for diamond to look like a star (optional, could just be a solid diamond) */}
                        <div className="absolute inset-[2px] bg-slate-900 dark:bg-primary rounded-full" />
                      </div>

                      <span className="font-heading font-bold tracking-wider uppercase text-sm">Detail</span>

                      {/* Right Diamond */}
                      <div className="relative w-1.5 h-1.5 rotate-45 bg-white/80 transition-transform group-hover/btn:rotate-90 duration-300">
                        <div className="absolute inset-[2px] bg-slate-900 dark:bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </Link>
    </>
  )
}


"use client"

import * as React from "react"
import { useState, useRef, MouseEvent, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import type { ProjectData } from "@/components/projects/ProjectCard"

export function getProjectImage(project: ProjectData) {
  let imageSrc = project.imageUrl;
  if (!imageSrc && project.youtubeUrl) {
    const match = project.youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    const vidId = match ? match[1] : project.youtubeUrl.split('/').pop();
    if (vidId) {
      imageSrc = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
    }
  }
  return imageSrc || "https://placehold.co/1200x800/E5E7EB/A1A1AA?text=No+Image"
}

export function LusionCard({ project, onClick }: { project: ProjectData, onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  }

  const imageSrc = getProjectImage(project);
  const cursorOffset = mounted && window.innerWidth < 768 ? 32 : 48;

  return (
    <motion.div 
      layoutId={`card-container-${project._id}`}
      className="flex flex-col group cursor-pointer w-full h-full"
      onClick={() => { setIsHovered(false); onClick(); }}
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
        }}
      >
        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          layoutId={`card-image-${project._id}`}
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-[2rem] mb-4 cursor-none"
        >
          <motion.div
            variants={{
              hidden: { scale: 1.15 },
              visible: { scale: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="w-full h-full relative"
          >
            <Image 
              src={imageSrc} 
              fill 
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
              alt={project.title} 
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700 ease-out" />
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute z-50 pointer-events-none flex items-center justify-center rounded-full bg-slate-900 text-white font-bold tracking-widest text-[10px] md:text-xs w-16 h-16 md:w-24 md:h-24 shadow-2xl backdrop-blur-md"
                style={{ 
                  left: mousePos.x - cursorOffset, 
                  top: mousePos.y - cursorOffset 
                }}
              >
                VIEW
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
        }}
      >
        <motion.div 
          layoutId={`card-content-${project._id}`}
          className="flex flex-col"
        >
          <p className="font-sans text-slate-500 dark:text-slate-400 font-medium text-xs md:text-sm tracking-[0.15em] uppercase mb-1.5">
            {project.category.replace('-', ' • ')}
          </p>
          <div className="relative flex items-center w-full">
            <ArrowRight className="absolute left-0 w-6 h-6 md:w-8 md:h-8 text-slate-900 dark:text-white opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out shrink-0" />
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-8 md:group-hover:translate-x-10 whitespace-nowrap truncate w-full pr-4 md:pr-10">
              {project.title}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function ExpandedView({ project, onClose }: { project: ProjectData, onClose: () => void }) {
  const imageSrc = getProjectImage(project);
  let vidId = null;
  if (project.youtubeUrl) {
    const match = project.youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    vidId = match ? match[1] : project.youtubeUrl.split('/').pop();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
      <motion.div
         initial={{ opacity: 0}} 
         animate={{ opacity: 1}} 
         exit={{ opacity: 0}} 
         transition={{ duration: 0.6 }}
         className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl"
         onClick={onClose}
      />
      
      <motion.div 
         layoutId={`card-container-${project._id}`}
         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
         className="relative w-full h-full md:rounded-[2rem] overflow-hidden bg-[#141414] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col z-10 mx-auto"
      >
         <motion.button 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
            onClick={onClose} 
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 bg-[#181818]/60 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all group border border-white/10 shadow-lg"
         >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
         </motion.button>

         <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden relative">
           <motion.div 
              layoutId={`card-image-${project._id}`}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-0 bg-[#141414] overflow-hidden min-h-full"
           >
              <Image src={imageSrc} fill className="object-cover object-top md:object-center" alt={project.title} priority />
              
              {vidId && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="absolute inset-0 pointer-events-none bg-[#141414] overflow-hidden"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&playlist=${vidId}&rel=0`}
                    title="Video Preview"
                    allow="autoplay; encrypted-media"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[67.5vw] min-h-[120vh] min-w-[213.33vh] max-w-none opacity-100 pointer-events-none mix-blend-screen scale-110"
                  />
                </motion.div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-transparent pointer-events-none z-10 w-full md:w-[70%]" />
           </motion.div>

           <div className="relative z-20 flex-1 flex flex-col justify-end w-full mt-auto p-6 pb-10 pl-8 md:p-12 md:pb-16 md:pl-16 lg:pb-20 lg:pl-20 min-h-fit pt-48">
             <motion.div 
               layoutId={`card-content-${project._id}`}
               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               className="max-w-full w-full"
             >
               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-[1.1] mb-2 tracking-tight whitespace-nowrap truncate pr-8 md:pr-12">
                 {project.title}
               </h2>
             </motion.div>

             <motion.div 
                initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ delay: 0.4 }}
                className="mt-4 md:mt-5 flex flex-wrap items-center gap-3"
             >
                <Link href={`/projects/${project.slug}`}>
                   <button className="group flex items-center gap-2 px-5 md:px-6 py-2 md:py-2.5 bg-white hover:bg-[#e6e6e6] active:scale-95 transition-all duration-300 ease-out text-black font-bold rounded shadow-lg hover:shadow-xl text-sm md:text-base">
                     <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                     View Project
                   </button>
                </Link>
             </motion.div>

             <motion.div 
               initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.6, delay: 0.5 }}
               className="w-full flex flex-col gap-4 mt-8 lg:mt-10"
             >
               <div className="flex flex-wrap justify-start items-center gap-2 md:gap-4 font-sans font-bold text-sm md:text-base">
                 <span className="text-[#fef08a] drop-shadow-md">2024</span>
                 <span className="text-white hidden sm:inline-block drop-shadow-md">{project.category.replace('-', ' • ')}</span>
               </div>

               <p className="font-sans text-white/90 text-base md:text-lg leading-relaxed max-w-3xl drop-shadow-lg">
                 {project.excerpt || "Dive into this interactive learning experience combining modern technology, striking visuals, and engaging content design meant to inspire and teach effectively."}
               </p>
             </motion.div>
           </div>
         </div>
      </motion.div>
    </div>
  )
}

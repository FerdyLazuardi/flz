"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ProjectData } from "@/components/projects/ProjectCard"
import { SolidGlowButton } from "@/components/ui/solid-glow-button"
import { Magnetic } from "@/components/ui/magnetic"
import { LusionCard, ExpandedView } from "@/components/projects/SharedProjectCard"

export function FeaturedProjects({ projects }: { projects: ProjectData[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!projects || projects.length === 0) {
    return null
  }

  const boardProjects = projects.slice(0, 4);
  const activeProject = projects.find(p => p._id === selectedId);

  return (
    <section id="projects" className={`py-16 md:py-24 relative overflow-visible ${activeProject ? 'z-[100]' : 'z-10'}`}>
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-15%] w-[40%] h-[50%] rounded-full bg-cat-multimedia/5 dark:bg-cat-multimedia/10 blur-[120px]" />
        <div className="absolute top-[60%] right-[-15%] w-[40%] h-[50%] rounded-full bg-cat-ai/5 dark:bg-cat-ai/10 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-14 mx-auto w-full max-w-[1800px]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black text-text-primary mb-6 tracking-tight">
              <span className="relative inline-block z-10 after:absolute after:bottom-1 after:left-[-2%] after:-z-10 after:h-[30%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">
                Featured Projects
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              A curated collection of digital experiences where instructional design, interactive media, and AI converge to drive real impact.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-12 lg:gap-y-20">
           {boardProjects.map((project, idx) => (
              <motion.div
                key={project._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: idx * 0.1,
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="w-full"
              >
                <LusionCard project={project} onClick={() => setSelectedId(project._id)} />
              </motion.div>
           ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 lg:mt-24 flex justify-center"
        >
          <Magnetic strength={0.2}>
            <div className="w-full sm:w-auto">
              <SolidGlowButton
                href="/projects"
                text="View All Projects"
                color="#0a0a0a"
                size="lg"
                className="w-full sm:w-auto sm:px-10 scale-90 sm:scale-100"
                icon={<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />}
              />
            </div>
          </Magnetic>
        </motion.div>
      </div>

      <AnimatePresence>
         {activeProject && (
            <ExpandedView project={activeProject} onClose={() => setSelectedId(null)} />
         )}
      </AnimatePresence>
    </section>
  )
}

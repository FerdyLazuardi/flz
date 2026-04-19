"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import type { ProjectData } from "@/components/projects/ProjectCard"
import { LusionCard, ExpandedView } from "@/components/projects/SharedProjectCard"

export function ProjectGallery({ projects }: { projects: ProjectData[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeProject = projects.find(p => p._id === selectedId);

  return (
    <div className="flex flex-col relative z-20">
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-12 lg:gap-y-20"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div
              layout
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: index * 0.1,
                    staggerChildren: 0.15
                  }
                }
              }}
              key={project._id}
              className="w-full"
            >
              <LusionCard project={project} onClick={() => setSelectedId(project._id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <AnimatePresence>
         {activeProject && (
            <ExpandedView project={activeProject} onClose={() => setSelectedId(null)} />
         )}
      </AnimatePresence>

      {projects.length === 0 && (
        <div className="text-center py-20 text-text-secondary font-medium">
          No projects available at the moment.
        </div>
      )}
    </div>
  )
}

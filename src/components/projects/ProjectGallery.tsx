"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { ProjectGalleryCard } from "@/components/projects/ProjectGalleryCard"
import type { ProjectData } from "@/components/projects/ProjectGalleryCard"

export function ProjectGallery({ projects }: { projects: ProjectData[] }) {
  // Category tabs are removed per user request, displaying all projects immediately

  return (
    <div className="flex flex-col relative z-20">
      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1, // Stagger effect
                ease: [0.22, 1, 0.36, 1]
              }}
              key={project._id}
              className="h-full"
            >
              <ProjectGalleryCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {projects.length === 0 && (
        <div className="text-center py-20 text-text-secondary font-medium">
          No projects available at the moment.
        </div>
      )}
    </div>
  )
}

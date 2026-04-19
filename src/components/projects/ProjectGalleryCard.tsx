"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

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

export function ProjectGalleryCard({ project }: { project: ProjectData }) {
  const [isHovered, setIsHovered] = useState(false)

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
    imageSrc = "https://placehold.co/800x600/E5E7EB/A1A1AA?text=No+Image"
  }

  const categoryLabel = 
    project.category === 'ai-learning' ? 'AI LEARNING' : 
    project.category === 'multimedia' ? 'MULTIMEDIA' : 
    'INSTRUCTIONAL DESIGN';

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full group outline-none">
      <motion.div 
        className="relative w-full aspect-[4/3] sm:aspect-[1.25] rounded-[2rem] overflow-hidden drop-shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background Image (Full Bleed) */}
        <motion.div
           layoutId={`gallery-image-${project._id}`}
           className="absolute inset-0 w-full h-full"
           animate={{ scale: isHovered ? 1.05 : 1 }}
           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Subtle Dark Overlay so the glass panel is always legible */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Bottom-Left Glassmorphic Text Panel */}
        <div className="absolute inset-0 flex items-end justify-start p-4 sm:p-6 lg:p-8 pointer-events-none">
          <motion.div 
            className="flex flex-col items-start justify-end text-left px-6 py-6 sm:px-8 sm:py-8 rounded-2xl sm:rounded-3xl backdrop-blur-md bg-black/30 dark:bg-black/50 border border-white/20 dark:border-white/10 shadow-2xl max-w-[90%] sm:max-w-[80%]"
            animate={{ 
              y: isHovered ? -5 : 0,
              backgroundColor: isHovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)"
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {project.title}
            </h3>
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {categoryLabel}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

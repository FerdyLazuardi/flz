"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"
import { InfiniteDesignGallery } from "./InfiniteDesignGallery"

export interface DesignShowcaseItem {
  _id: string
  title: string
  mediaType: "image" | "video" | "youtube"
  imageUrl?: string   // resolved from Sanity image
  videoUrl?: string
  youtubeUrl?: string
  tag?: string
  size?: "normal" | "tall" | "wide" | "auto"
  rotation?: number
  aspectRatio?: number
}

const fallbackItems = [
  { type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", rot: -2, delay: 0.1, tag: "UI_EXPLORATION", size: "tall" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", rot: 3, delay: 0.2, tag: "MOTION_TEST", size: "wide" },
  { type: "image", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", rot: -1, delay: 0.3, tag: "ARCHIVE_01", size: "normal" },
  { type: "image", src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", rot: 4, delay: 0.4, tag: "SYSTEM_GRID", size: "tall" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", rot: -4, delay: 0.5, tag: "R&D_MEDIA", size: "normal" },
  { type: "image", src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop", rot: 1, delay: 0.6, tag: "COLOR_STUDY", size: "wide" },
  { type: "image", src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop", rot: -3, delay: 0.7, tag: "LAYOUT_DRAFT", size: "tall" },
  { type: "image", src: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop", rot: 2, delay: 0.8, tag: "POST_V1", size: "normal" },
]

function getItemVariants(totalItems: { rot: number }[]) {
  return {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -10,
      scale: 0.9,
      filter: "blur(15px) brightness(0.8)",
    },
    visible: (i: number) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const rot = totalItems[i]?.rot ?? 0;
      return {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotate: rot,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: i * 0.08,
        },
      };
    },
  }
}

interface NormalizedItem {
  type: "image" | "video" | "youtube"
  src: string
  rot: number
  tag: string
  size: string
  title?: string
  aspectRatio?: number
}

// ─── YouTube Thumbnail Component ────────────────────────────────────
// Uses IntersectionObserver to load and autoplay only when in view,
// saving hardware resources.
function YouTubeFacade({
  videoId,
  title,
  isShort,
  fillContainer,
}: {
  videoId: string
  title: string
  isShort: boolean
  fillContainer: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Load iframe slightly before it enters the viewport and keep it loaded
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50%' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Use hqdefault as fallback thumbnail
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black group/yt">
      {/* Thumbnail visible until iframe loads and covers it */}
      <Image
        src={thumbnailUrl}
        alt={title || "YouTube thumbnail"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        loading="lazy"
      />

      {isVisible && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&playlist=${videoId}&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`}
          title={title || "YouTube Preview"}
          allow="autoplay; encrypted-media"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ border: 'none' }}
        />
      )}
    </div>
  )
}

// ─── Lazy Video Component ───────────────────────────────────────────
// Only loads video when it enters the viewport
function LazyVideo({ src, tag, fillContainer }: { src: string; tag: string; fillContainer: boolean }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50%' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      {isVisible ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full block transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:scale-105 ${fillContainer ? 'h-full object-cover' : 'h-auto'}`}
        />
      ) : (
        <div className={`w-full bg-bg-surface animate-pulse ${fillContainer ? 'h-full' : 'aspect-video'}`} />
      )}
    </div>
  )
}


export function DesignShowcase({ items, infiniteGalleryItems }: { items?: DesignShowcaseItem[], infiniteGalleryItems?: any[] }) {
  const [mounted, setMounted] = React.useState(false)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Normalize: use Sanity items when available, otherwise fallback
  const normalizedItems: NormalizedItem[] = React.useMemo(() => {
    if (items && items.length > 0) {
      const mapped = items.map((item) => ({
        type: item.mediaType || "image",
        src: item.mediaType === "youtube" ? (item.youtubeUrl || "") : (item.mediaType === "video" ? (item.videoUrl || "") : (item.imageUrl || "")),
        rot: item.rotation ?? 0,
        tag: item.tag || "",
        size: (item.size as 'normal' | 'wide' | 'tall' | 'auto') || "normal",
        title: item.title || "",
        aspectRatio: item.aspectRatio,
      }))
      return mapped;
    }
    return fallbackItems.map((item) => ({
      type: item.type as "image" | "video" | "youtube",
      src: item.src,
      rot: item.rot,
      tag: item.tag,
      size: item.size,
    }))
  }, [items])

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const cleanUrl = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    const id = match && match[2] ? match[2].trim() : null;
    return id && id.length >= 10 ? id : null;
  }

  const isYoutubeShort = (url: string) => {
    return url.includes('/shorts/');
  }

  const itemVariants = React.useMemo(
    () => getItemVariants(normalizedItems),
    [normalizedItems]
  )

  if (!mounted) {
    return <section className="mt-40 mb-32 relative min-h-[500px]" />
  }

  console.log(`[DesignShowcase] Rendering ${normalizedItems.length} items on client. Missing:`,
    normalizedItems.filter(i => ['porastep', 'bumper', 'fiinal round'].includes(i.tag || i.src))
  );

  return (
    <section className="mt-40 relative" ref={containerRef}>
      <div className="px-6 sm:px-10 lg:px-14 mx-auto w-full max-w-[1800px]">
        {/* Aesthetic Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "100% 0px 0px 0px", amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 relative z-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border/40" />
            <div className="h-px w-12 bg-border/40" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="relative group">
              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight text-text-primary leading-[1] whitespace-nowrap">
                <span className="relative inline-block z-10 after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">
                  GALLERY
                </span>
                {" "}PROJECTS.
              </h2>

            </div>

            <div className="flex flex-col gap-6 text-left md:text-right">
              <p className="font-mono text-[11px] sm:text-[12px] leading-relaxed text-slate-500 uppercase tracking-tight max-w-sm md:ml-auto">
                   // TRANSLATING COMPLEX IDEAS INTO ACCESSIBLE DIGITAL EXPERIENCE.
              // AN ARCHIVE OF INSTRUCTIONAL DESIGN, AND VISUAL STORYTELLING.
              </p>
              <div className="flex gap-3 md:justify-end">
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    whileInView={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="w-10 h-0.5 bg-primary/40"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Masonry Grid with Perspective */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-10"
          style={{ perspective: "2500px", transformStyle: "preserve-3d" }}
        >
          {normalizedItems.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "100px", amount: 0.1 }}
              variants={itemVariants}
              style={{
                willChange: "transform, opacity, filter",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
              className={`relative break-inside-avoid group cursor-pointer transform-gpu mb-10 w-full inline-block`}
            >
              <div className="relative overflow-hidden bg-bg-surface border border-border/30 backdrop-blur-sm transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:border-primary/50 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] group-hover:!rotate-0 group-hover:-translate-y-2 z-10">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/0 group-hover:border-primary/60 transition-all duration-500 z-30" />

                <div
                  className={`relative overflow-hidden w-full ${item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[16/9]' : item.size === 'auto' ? '' : 'aspect-square sm:aspect-[4/3]'}`}
                  style={item.size === 'auto' && item.aspectRatio ? { aspectRatio: item.aspectRatio } : {}}
                >
                  {item.type === "image" ? (
                    item.size === 'auto' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt={item.tag || "Raw asset"}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:scale-105 group-hover:brightness-110"
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.tag || "Raw asset"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                        className="object-cover block transition-all duration-1000 ease-[0.23,1,0.32,1] group-hover:scale-105 group-hover:brightness-110"
                      />
                    )
                  ) : item.type === "youtube" ? (
                    <div className={`relative w-full ${item.size === 'auto' ? (isYoutubeShort(item.src) ? 'aspect-[9/16]' : 'aspect-[16/9]') : 'h-full'} overflow-hidden`}>
                      <YouTubeFacade
                        videoId={getYoutubeId(item.src) || ''}
                        title={item.title || item.tag || "YouTube Preview"}
                        isShort={isYoutubeShort(item.src)}
                        fillContainer={item.size !== 'auto'}
                      />
                    </div>
                  ) : (
                    <LazyVideo
                      src={item.src}
                      tag={item.tag}
                      fillContainer={item.size !== 'auto'}
                    />
                  )}



                  <div className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-15 mix-blend-overlay transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 70%)`
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] bg-repeat transition-opacity duration-700" />
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center px-1 opacity-0 group-hover:opacity-20 transition-opacity duration-700 delay-300">
                <span className="font-mono text-[8px] tracking-widest uppercase">ID_{idx.toString().padStart(3, '0')}</span>
                <div className="h-px flex-1 mx-4 bg-text-primary/20" />
                <span className="font-mono text-[8px] tracking-widest uppercase">{item.size}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05] pointer-events-none h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* And Many More Conclusion */}
      {infiniteGalleryItems && infiniteGalleryItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-32 pt-20 border-t border-border/50 flex flex-col justify-center items-center text-center relative z-20"
      >
        <h3 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight text-text-primary leading-[1] mb-10 px-6">
          THE{" "}
          <span className="relative inline-block z-10 after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">
            ARCHIVE.
          </span>
        </h3>

        {/* Infinite Scroll Netflix-Style Gallery */}
        <div className="w-full overflow-hidden relative">
          <InfiniteDesignGallery customImages={infiniteGalleryItems} />

          {/* Back to Top Button Overlay */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
            <Magnetic strength={0.2}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group relative outline-none block cursor-pointer"
              >
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  className="relative flex items-center bg-white dark:bg-neutral-900 border border-border/50 rounded-full cursor-pointer overflow-hidden p-1.5 pr-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.16)] transition-all duration-500 group-hover:border-border"
                >
                  {/* Liquid highlight background */}
                  <motion.div
                    variants={{
                      initial: { x: "-100%", opacity: 0 },
                      hover: { x: "0%", opacity: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-0 bg-gradient-to-r from-slate-200/50 to-slate-100/30 dark:from-slate-500/20 dark:to-transparent z-0"
                  />

                  <div className="relative z-10 w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                    <motion.div
                      variants={{
                        initial: { x: 0, y: 0 },
                        hover: { x: 0, y: -3 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowUp className="w-6 h-6" />
                    </motion.div>

                    {/* Pulse effect */}
                    <motion.div
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      whileHover={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full bg-current opacity-20"
                    />
                  </div>

                  <div className="relative z-10 ml-5 h-12 flex items-center min-w-[60px]">
                    <div className="relative w-full h-full flex items-center">
                      {/* Initial centered 'TOP.' */}
                      <motion.div
                        variants={{
                          initial: { opacity: 1, y: 0 },
                          hover: { opacity: 0, y: -10 }
                        }}
                        transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] }}
                        className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap"
                      >
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">
                          TOP.
                        </span>
                      </motion.div>

                      {/* Hover stacked state */}
                      <motion.div
                        variants={{
                          initial: { opacity: 0, y: 10 },
                          hover: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] }}
                        className="flex flex-col justify-center pointer-events-none"
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-primary leading-none mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Back to
                        </span>
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-text-primary dark:text-white leading-none whitespace-nowrap">
                          TOP.
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Interaction dots */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      className="w-1 h-1 rounded-full bg-current/30"
                    />
                    <motion.div
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1 h-1 rounded-full bg-current/30"
                    />
                  </div>
                </motion.div>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.div>
      )}
    </section>
  )
}

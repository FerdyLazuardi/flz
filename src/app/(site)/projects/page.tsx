import { client, freshClient } from "@/sanity/lib/client"
import { ALL_PROJECTS_QUERY, DESIGN_SHOWCASE_QUERY, INFINITE_GALLERY_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

import { ProjectGallery } from "@/components/projects/ProjectGallery"
import { ProjectHeader } from "@/components/projects/ProjectHeader"
import { DesignShowcase } from "@/components/projects/DesignShowcase"
import { AnimatedBackground } from "@/components/ui/animated-background"

export const revalidate = 0
export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Ferdy Lazuardi',
  description: 'A showcase of my recent multimedia and design projects.',
}

export default async function ProjectsPage() {
  let projects = []
  let showcaseItems = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let infiniteGalleryItems: any[] = []

  try {
    projects = await client.fetch(ALL_PROJECTS_QUERY) || []
  } catch (error) {
    console.error("Failed to fetch all projects:", error)
  }

  try {
    // Use freshClient (no CDN) to always get latest showcase data
    const rawShowcase = await freshClient.fetch(DESIGN_SHOWCASE_QUERY, {}, { next: { revalidate: 0 } }) || []
    console.log(`[DesignShowcase] Fetched ${rawShowcase.length} items from Sanity`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showcaseItems = rawShowcase.map((item: any) => ({
      ...item,
      imageUrl: item.image?.asset?.url 
        ? `${item.image.asset.url}?w=800&q=75&fm=webp` 
        : undefined,
      aspectRatio: item.image?.asset?.metadata?.dimensions?.aspectRatio,
    }))
  } catch (error) {
    console.error("Failed to fetch design showcase:", error)
  }

  try {
    const rawInfiniteGallery = await freshClient.fetch(INFINITE_GALLERY_QUERY, {}, { next: { revalidate: 0 } })
    if (rawInfiniteGallery?.images) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      infiniteGalleryItems = rawInfiniteGallery.images.map((img: any) => {
        const url = img.asset?.url ? `${img.asset.url}?w=800&q=75&fm=webp` : null;
        if (!url) return null;
        return {
          url,
          aspectRatio: img.asset?.metadata?.dimensions?.aspectRatio || 1
        };
      }).filter(Boolean)
    }
  } catch (error) {
    console.error("Failed to fetch infinite gallery:", error)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectsWithUrls = projects.map((project: any) => ({
    ...project,
    imageUrl: project.coverImage ? urlForImage(project.coverImage).width(800).height(500).url() : undefined,
    clientLogoUrl: project.clientLogo ? urlForImage(project.clientLogo).width(200).url() : undefined,
    softwareLogosUrls: project.softwareLogos?.map((logo: any) => urlForImage(logo).width(100).height(100).url()) || [],
  }))

  return (
    <div className="min-h-screen pt-32 relative overflow-hidden">
      
      {/* Background Accent 1 (Middle Right) */}
      <div className="absolute top-[30%] right-[-10%] w-[1000px] h-[800px] pointer-events-none -z-10">
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-tr from-cat-instructional/15 via-purple-200/20 to-cat-ai/15 blur-[120px]" />
      </div>

      {/* Background Accent 2 (Bottom Left) */}
      <div className="absolute top-[60%] left-[-20%] w-[1200px] h-[800px] pointer-events-none -z-10">
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-br from-cat-multimedia/15 via-cat-instructional/10 to-cat-ai/15 blur-[120px]" />
      </div>

      {/* Background Accent 3 (Bottom Right) */}
      <div className="absolute bottom-[5%] right-[-10%] w-[900px] h-[800px] pointer-events-none -z-10">
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-tl from-cat-ai/15 via-blue-200/20 to-cat-multimedia/15 blur-[120px]" />
      </div>

      {/* Background Accent 4 (Bottom Center) */}
      <div className="absolute bottom-[-5%] left-[20%] w-[1000px] h-[600px] pointer-events-none -z-10">
        <div className="absolute inset-0 rounded-[100%] bg-gradient-to-t from-cat-instructional/10 via-purple-200/15 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-14 mx-auto w-full max-w-[1800px]">
        <ProjectHeader />
        <ProjectGallery projects={projectsWithUrls} />
      </div>

      {/* Brutalist Design Showcase Section */}
      <div className="relative z-10 w-full">
        <DesignShowcase items={showcaseItems} infiniteGalleryItems={infiniteGalleryItems} />
      </div>
    </div>
  )
}

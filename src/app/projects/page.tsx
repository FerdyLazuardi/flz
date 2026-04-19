import { client } from "@/sanity/lib/client"
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

import { ProjectGallery } from "@/components/projects/ProjectGallery"
import { ProjectHeader } from "@/components/projects/ProjectHeader"
import { DesignShowcase } from "@/components/projects/DesignShowcase"

export const revalidate = 60

export const metadata = {
  title: 'Projects | Learning Designer × AI',
  description: 'Explore my projects across instructional design, multimedia production, and AI-enabled learning.',
}

export default async function ProjectsPage() {
  let projects = []
  try {
    projects = await client.fetch(ALL_PROJECTS_QUERY) || []
  } catch (error) {
    console.error("Failed to fetch all projects:", error)
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectsWithUrls = projects.map((project: any) => ({
    ...project,
    imageUrl: project.coverImage ? urlForImage(project.coverImage).width(800).height(500).url() : undefined
  }))

  const dummyProjectFeatured = {
    _id: "dummy-id",
    title: "AI-Powered Learning Platform",
    slug: "dummy-project",
    category: "ai-learning",
    excerpt: "A comprehensive showcase of interactive media and video learning.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  }

  projectsWithUrls.unshift(dummyProjectFeatured)

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 mx-auto w-full max-w-[1800px]">
        <ProjectHeader />
        <ProjectGallery projects={projectsWithUrls} />
        
        {/* Brutalist Design Showcase Section */}
        <DesignShowcase />
      </div>
    </div>
  )
}

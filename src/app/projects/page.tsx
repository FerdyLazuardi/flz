import { client } from "@/sanity/lib/client"
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

import { ProjectGallery } from "@/components/projects/ProjectGallery"

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
    <div className="min-h-screen bg-bg-primary pt-24 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <header className="mb-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-bg-surface/50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-text-secondary backdrop-blur-sm mb-6 sm:mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse" />
            <span>Showcase</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tight text-text-primary mb-6 leading-[1.05] max-w-3xl align-center mx-auto">
            <span className="relative inline-block z-10 whitespace-nowrap after:absolute after:bottom-2 after:left-[-2%] after:-z-10 after:h-[40%] after:w-[104%] after:bg-[#fef08a] dark:after:bg-[#ca8a04]/80 after:rounded-sm">Project Gallery</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed mx-auto">
            A diverse portfolio demonstrating the intersection of instructional design, media, and targeted learning tools.
          </p>
        </header>

        <ProjectGallery projects={projectsWithUrls} />
      </div>
    </div>
  )
}

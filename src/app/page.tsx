import { client } from "@/sanity/lib/client"
import { FEATURED_PROJECTS_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

import { HeroSection } from "@/components/home/HeroSection"
import { LogoMarquee } from "@/components/home/LogoMarquee"
import { ValueProp } from "@/components/home/ValueProp"
import { AboutSection } from "@/components/home/AboutSection"
import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { ContactSection } from "@/components/home/ContactSection"

export const revalidate = 60

export default async function Home() {
  let featuredProjects = []
  try {
    featuredProjects = await client.fetch(FEATURED_PROJECTS_QUERY) || []
  } catch (error) {
    console.error("Failed to fetch featured projects:", error)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let projectsWithUrls = featuredProjects.map((project: any) => ({
    ...project,
    imageUrl: project.coverImage ? urlForImage(project.coverImage).width(1200).height(800).url() : undefined,
    youtubeUrl: project.youtubeUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }))

  const dummyProjects = [
    {
      _id: "demo-feat-1",
      title: "Interactive E-Learning: Mastering Conflict Resolution",
      slug: "interactive-conflict-resolution",
      category: "instructional-design",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      excerpt: "An immersive, scenario-based learning module that teaches conflict resolution strategies.",
      publishedAt: new Date().toISOString()
    },
    {
      _id: "demo-feat-2",
      title: "Gamified Compliance Training",
      slug: "gamified-compliance",
      category: "multimedia",
      youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
      excerpt: "A gamified approach to corporate compliance training.",
      publishedAt: new Date().toISOString()
    },
    {
      _id: "demo-feat-3",
      title: "AI-Powered Tutoring Assistant",
      slug: "ai-tutoring-assistant",
      category: "ai-learning",
      youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      excerpt: "An intelligent chatbot designed to help students with their homework.",
      publishedAt: new Date().toISOString()
    },
    {
      _id: "demo-feat-4",
      title: "Immersive VR Onboarding",
      slug: "vr-onboarding",
      category: "multimedia",
      youtubeUrl: "https://www.youtube.com/watch?v=tpiyEe_CqB4",
      excerpt: "Virtual reality simulation for new employee onboarding and facility tours.",
      publishedAt: new Date().toISOString()
    },
    {
      _id: "demo-feat-5",
      title: "Advanced Scorm Analytics",
      slug: "advanced-scorm",
      category: "instructional-design",
      youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      excerpt: "Deep dive into LMS reporting and advanced SCORM analytics.",
      publishedAt: new Date().toISOString()
    }
  ]

  if (projectsWithUrls.length < 4) {
    projectsWithUrls = [...projectsWithUrls, ...dummyProjects.slice(0, 4 - projectsWithUrls.length)]
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <LogoMarquee />
      <ValueProp />
      <AboutSection />
      <FeaturedProjects projects={projectsWithUrls} />
      <ContactSection />
    </div>
  )
}

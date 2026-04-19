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
  const projectsWithUrls = featuredProjects.map((project: any) => ({
    ...project,
    imageUrl: project.coverImage ? urlForImage(project.coverImage).width(1200).height(800).url() : undefined
  }))

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

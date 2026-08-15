import { client } from "@/sanity/lib/client"
import { FEATURED_PROJECTS_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

import { HeroSection } from "@/components/home/HeroSection"
import { LogoMarquee } from "@/components/home/LogoMarquee"
import dynamic from "next/dynamic"

const ValueProp = dynamic(() => import("@/components/home/ValueProp").then(mod => mod.ValueProp))
const AboutSection = dynamic(() => import("@/components/home/AboutSection").then(mod => mod.AboutSection))
const FeaturedProjects = dynamic(() => import("@/components/home/FeaturedProjects").then(mod => mod.FeaturedProjects))
import { ContactSectionClient } from "@/components/home/ContactSectionClient"

export const revalidate = 60

export default async function Home() {
  let featuredProjects = []
  try {
    featuredProjects = await client.fetch(FEATURED_PROJECTS_QUERY) || []
  } catch (error) {
    console.error("Failed to fetch featured projects:", error)
  }

  interface SanityProjectRaw {
    coverImage?: Parameters<typeof urlForImage>[0];
    clientLogo?: Parameters<typeof urlForImage>[0];
    softwareLogos?: Array<Parameters<typeof urlForImage>[0]>;
    [key: string]: unknown;
  }

  const projectsWithUrls = featuredProjects.map((project: SanityProjectRaw) => ({
    ...project,
    imageUrl: project.coverImage ? urlForImage(project.coverImage).width(1200).height(800).url() : undefined,
    clientLogoUrl: project.clientLogo ? urlForImage(project.clientLogo).width(200).url() : undefined,
    softwareLogosUrls: project.softwareLogos?.map((logo) => urlForImage(logo).width(100).height(100).url()) || [],
  }))

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <LogoMarquee />
      <ValueProp />
      <AboutSection />
      <FeaturedProjects projects={projectsWithUrls} />
      <ContactSectionClient />
    </div>
  )
}

import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, PlaySquare, MonitorPlay } from "lucide-react"

import { client } from "@/sanity/lib/client"
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"
import { categoryLabels } from "@/components/projects/SharedProjectCard"
import { ProjectDetailBackButton } from "@/components/projects/ProjectDetailBackButton"
import Image from "next/image"
import { ZoomableImage } from "@/components/ui/ZoomableImage"
import { InteractiveIframe } from "@/components/projects/InteractiveIframe"
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params
  
  if (slug === 'dummy-project') {
    return {
      title: 'AI-Powered Learning Platform | Ferdy Fadhil Lazuardi',
      description: 'A comprehensive showcase of multimedia production and instructional design.',
    }
  }
  
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) return {}
  
  return {
    title: `${project.title} | Ferdy Fadhil Lazuardi — Learning Designer & Instructional Designer`,
    description: project.excerpt || `Read about the ${project.title} project by Ferdy Fadhil Lazuardi (Ferdy Lazuardi).`,
    keywords: [project.title, 'Ferdy Fadhil Lazuardi', 'Ferdy Lazuardi', 'Learning Designer', 'Instructional Designer', ...(project.techStack || [])],
  }
}

// Dummy block for preview
const dummyProject = {
  title: "AI-Powered Learning Platform",
  category: "AI-Enhanced Learning",
  techStack: ["React", "FastAPI", "Articulate Storyline", "Adobe CC", "GDevelop"],
  publishedAt: new Date().toISOString(),
  excerpt: "A comprehensive showcase of multimedia production and instructional design.",
  demoEmbed: "https://storyline-showcase.vercel.app/", // Could be any demo URL
  youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video
  content: [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "Training Needs Analysis (TNA)", marks: ["strong"] }]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Before development began, we conducted in-depth TNA across the field offices. The goal was to identify the core competency gaps within the first 90 days of onboarding. It was clear that a standard PDF approach wasn't going to be agile enough."
        }
      ]
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "Design Strategy", marks: ["strong"] }]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "I pivoted to a mixed-media approach. The foundational concepts were delivered via "
        },
        {
          _type: "span",
          text: "high-retention micro-videos",
          marks: ["em"]
        },
        {
          _type: "span",
          text: ", while the technical simulations were built directly inside Articulate Storyline to allow 'safe-to-fail' environments."
        }
      ]
    }
  ]
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let project: any = null

  if (slug === 'dummy-project') {
    project = dummyProject
  } else {
    project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  }

  if (!project) return notFound()

  return (
    <article className="min-h-screen bg-bg-primary pt-24 pb-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">

        <ProjectDetailBackButton href={`/projects#${project?.slug || slug}`} label="PROJECTS" />

        {/* Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 leading-snug pb-2">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            {project.category && (
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                {categoryLabels[project.category] || project.category}
              </span>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <>
                {project.category && <span className="text-text-secondary mx-1">|</span>}
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="bg-bg-elevated text-text-primary border border-border px-3 py-1 rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </>
            )}
          </div>

          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:underline font-semibold">
              Visit Live Demo <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          )}
        </header>

        {/* Media Showcase */}
        {(project.youtubeUrl || project.demoEmbed) && (
          <section className="mb-6">
            <div className="bg-bg-surface border border-border p-2 sm:p-4 rounded-3xl shadow-lg">

              {/* YouTube Embed */}
              {project.youtubeUrl && (
                <div className="mb-8 last:mb-0">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <h3 className="font-heading font-bold flex items-center gap-2 text-text-primary">
                      <PlaySquare className="w-5 h-5 text-red-500" /> Video Highlight
                    </h3>
                  </div>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/5 ring-1 ring-border">
                    <iframe
                      src={project.youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i) ? `https://www.youtube.com/embed/${project.youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)[1]}` : project.youtubeUrl}
                      title="YouTube Showcase"
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* HTML5 / Storyline Embed */}
              {project.demoEmbed && (
                <div className="mb-8 last:mb-0">
                  <h3 className="font-heading font-bold flex items-center gap-2 mb-4 px-2 text-text-primary">
                    <MonitorPlay className="w-5 h-5 text-blue-500" /> Interactive Web Module
                  </h3>
                  {/* Using aspect-[4/3] usually better for storyline, but 16:9 works too */}
                  <InteractiveIframe src={project.demoEmbed} />
                  <p className="text-xs text-text-secondary mt-3 px-2 text-center">
                    Pro tip: Click the expand icon on the bottom right for full screen.
                  </p>
                </div>
              )}

            </div>
          </section>
        )}

        {/* Design Thinking Content */}
        {project.content && (
          <section className="border-t border-border">
            <div className="article-body">
              <PortableText
                value={project.content}
                components={{
                  types: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    image: ({ value }: any) => {
                      if (!value?.asset?._ref) {
                        return null
                      }
                      return (
                        <figure className="my-12">
                          <div className="relative w-full overflow-hidden bg-black/5 ring-1 ring-border rounded-xl">
                            <ZoomableImage
                              src={urlForImage(value).width(1200).url()}
                              alt={value.alt || "Project Image"}
                            />
                          </div>
                          {value.caption && (
                            <figcaption className="text-center font-sans text-sm text-text-secondary mt-3">
                              {value.caption}
                            </figcaption>
                          )}
                        </figure>
                      )
                    }
                  }
                }}
              />
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

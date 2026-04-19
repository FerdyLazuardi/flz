import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, PlaySquare, MonitorPlay } from "lucide-react"

import { client } from "@/sanity/lib/client"
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries"
// import { urlForImage } from "@/sanity/lib/image"

// Dummy block for preview
const dummyProject = {
  title: "AI-Powered Learning Platform",
  category: "ai-learning",
  techStack: ["React", "FastAPI", "Articulate Storyline", "Adobe CC", "GDevelop"],
  publishedAt: new Date().toISOString(),
  excerpt: "A comprehensive showcase of interactive media and video learning.",
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
        
        <Link href="/projects" className="inline-flex items-center text-text-secondary hover:text-accent font-medium mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
              {project.category}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-text-secondary leading-relaxed mb-6">
            {project.excerpt}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech: string) => (
                <span key={tech} className="bg-bg-elevated text-text-primary border border-border px-3 py-1 rounded-md text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:underline font-semibold">
              Visit Live Demo <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          )}
        </header>

        {/* Media Showcase */}
        {(project.youtubeUrl || project.demoEmbed) && (
          <section className="mb-16">
            <div className="bg-bg-surface border border-border p-2 sm:p-4 rounded-3xl shadow-lg">
              
              {/* YouTube Embed */}
              {project.youtubeUrl && (
                <div className="mb-8 last:mb-0">
                  <h3 className="font-heading font-bold flex items-center gap-2 mb-4 px-2 text-text-primary">
                    <PlaySquare className="w-5 h-5 text-red-500" /> Video Showreel
                  </h3>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/5 ring-1 ring-border">
                    <iframe 
                      src={project.youtubeUrl} 
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
                  <div className="aspect-[4/3] sm:aspect-video w-full rounded-2xl overflow-hidden bg-black/5 ring-1 ring-border">
                    <iframe 
                      src={project.demoEmbed} 
                      title="Interactive Module"
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-3 px-2 text-center">
                    Pro tip: Use the fullscreen icon inside the interactive module for the best experience.
                  </p>
                </div>
              )}

            </div>
          </section>
        )}

        {/* Design Thinking Content */}
        {project.content && (
          <section className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-a:text-accent max-w-none text-text-secondary">
            <div className="border-t border-border pt-12">
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-8">Design Thinking & Case Study</h2>
              <PortableText value={project.content} />
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

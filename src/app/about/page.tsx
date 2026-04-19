import { Mail, ArrowRight, Link as LinkIcon, Code, UserCircle, Award, BookOpen, Briefcase } from "lucide-react"
import { PortableText } from "@portabletext/react"

import { client } from "@/sanity/lib/client"
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

import { buttonVariants } from "@/components/ui/button"

export const revalidate = 60

export const metadata = {
  title: 'About | Ferdy Fadhil Lazuardi — Learning Designer',
  description: 'Educational Technology graduate and Learning Designer focused on creating engaging, objective-driven learning materials that empower employees and learners to grow.',
}

const experiences = [
  {
    company: "Amartha Financial",
    role: "Learning Designer",
    type: "Intern",
    period: "Oct 2025 – Present",
    highlights: [
      "Managed LMS (Moodle) content for 10,000+ employees across head office and field offices.",
      "Developed and digitized 10+ learning modules aligned with organizational goals.",
      "Conducted Training Needs Analysis (TNA) to identify skill gaps across head office and field employees.",
      "Architected an LMS Knowledge Base Chatbot using FastAPI, LangGraph & Qdrant to help users brainstorm and instantly recall information about courses, products, and culture.",
    ],
  },
  {
    company: "Universitas Negeri Semarang",
    role: "Learning Designer",
    type: "Contract",
    period: "Jun 2024 – Jan 2025",
    highlights: [
      "Applied the ADDIE model to design effective instructional solutions from classroom research.",
      "Developed 5+ interactive learning media projects (mathematics & science) using Articulate Storyline.",
      "Collaborated with lecturers and teachers in needs analysis, content validation, and classroom trials.",
    ],
  },
  {
    company: "BPTIK Dikbud Jateng",
    role: "Learning Designer",
    type: "Intern",
    period: "Sep 2023 – Nov 2023",
    highlights: [
      "Designed and developed an educational game for elementary science using GDevelop.",
      "Created animated instructional videos on the human skeletal system using Adobe After Effects.",
    ],
  },
]

const skillGroups = [
  {
    label: "Instructional Design",
    colorClass: "text-cat-instructional",
    bgClass: "bg-cat-instructional/10",
    skills: ["ADDIE Model", "Training Needs Analysis (TNA)", "Bloom's Taxonomy", "Learning Evaluation", "LMS Moodle"],
  },
  {
    label: "Digital Tools",
    colorClass: "text-cat-multimedia",
    bgClass: "bg-cat-multimedia/10",
    skills: ["Articulate Storyline", "Adobe After Effects", "Canva", "CorelDraw"],
  },
  {
    label: "AI-Assisted Tools",
    colorClass: "text-cat-ai",
    bgClass: "bg-cat-ai/10",
    skills: ["Knowledge Base Chatbots", "Python", "FastAPI", "LangGraph", "RAG (Vector Databases)"],
  },
]

const achievements = [
  { label: "1st Winner Poster Design Competition", sub: "UIN Surabaya, 2021" },
  { label: "Junior Design Operator", sub: "BNSP Certified, 2024" },
  { label: "Fullstack Web Development", sub: "BTPN Syariah, 2023" },
  { label: "UI/UX Design Mastery", sub: "Skilvul, 2022" },
]

export default async function AboutPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = {}
  try {
    settings = await client.fetch(SITE_SETTINGS_QUERY) || {}
  } catch (error) {
    console.error("Failed to fetch site settings:", error)
  }
  
  const aboutImageUrl = settings?.aboutImage 
    ? urlForImage(settings.aboutImage).width(800).height(1000).url() 
    : undefined

  // Icon mapping helper
  const getSocialIcon = (platform: string) => {
    const pt = platform.toLowerCase()
    if (pt.includes('github')) return <Code className="w-5 h-5 mr-3" />
    if (pt.includes('linkedin')) return <UserCircle className="w-5 h-5 mr-3" />
    if (pt.includes('twitter') || pt.includes('x')) return <LinkIcon className="w-5 h-5 mr-3" />
    return <ArrowRight className="w-5 h-5 mr-3" />
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Image & Contact */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="rounded-3xl overflow-hidden border border-border bg-bg-surface aspect-[4/5] relative shadow-xl">
              {aboutImageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={aboutImageUrl} 
                  alt="Ferdy Fadhil Lazuardi" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-bg-elevated text-text-secondary gap-3">
                  <UserCircle className="w-16 h-16 opacity-30" />
                  <span className="font-heading text-sm opacity-50">Ferdy Fadhil Lazuardi</span>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-bg-surface border border-border rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading font-bold text-xl text-text-primary mb-6">Let&apos;s Connect</h3>
              
              <div className="flex flex-col gap-3">
                {/* Always show email */}
                <a 
                  href="mailto:ferdy.lazuardi05@gmail.com" 
                  className={buttonVariants({ variant: "outline", className: "w-full justify-start h-12 bg-bg-elevated hover:bg-border text-text-primary border-0 rounded-xl" })}
                >
                  <Mail className="w-5 h-5 mr-3 text-accent" />
                  Email Me
                </a>

                {/* Always show LinkedIn */}
                <a 
                  href="https://linkedin.com/in/ferdy10/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", className: "w-full justify-start h-12 bg-bg-elevated hover:bg-border text-text-primary border-0 rounded-xl" })}
                >
                  <UserCircle className="w-5 h-5 mr-3 text-blue-500" />
                  LinkedIn
                </a>

                {/* Always show Behance */}
                <a 
                  href="https://www.behance.net/ferdylazuardi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", className: "w-full justify-start h-12 bg-bg-elevated hover:bg-border text-text-primary border-0 rounded-xl" })}
                >
                  <LinkIcon className="w-5 h-5 mr-3 text-blue-400" />
                  Behance
                </a>

                {/* Dynamic social links from Sanity */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {settings?.socialLinks?.map((social: any) => (
                  <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "w-full justify-start h-12 bg-bg-elevated hover:bg-border text-text-primary border-0 rounded-xl" })}>
                    {getSocialIcon(social.platform)}
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-bg-surface border border-border rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading font-bold text-xl text-text-primary mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Achievements &amp; Certifications
              </h3>
              <ul className="flex flex-col gap-4">
                {achievements.map((a) => (
                  <li key={a.label} className="flex flex-col">
                    <span className="font-medium text-text-primary text-sm">{a.label}</span>
                    <span className="text-xs text-text-secondary mt-0.5">{a.sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Bio, Experience & Skills */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-3">
              Hi, I&apos;m Ferdy.
            </h1>
            <p className="text-lg text-text-secondary mb-10">Jakarta, Indonesia &bull; Educational Technology Graduate</p>
            
            <div className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-a:text-accent max-w-none text-text-secondary mb-16">
              {settings?.aboutContent ? (
                <PortableText value={settings.aboutContent} />
              ) : (
                <>
                  <p className="text-xl leading-relaxed text-text-primary font-medium mb-6">
                    I am a Learning Designer focused on creating engaging, objective-driven learning materials that empower employees and learners to grow.
                  </p>
                  <p>
                    My journey spans instructional design, multimedia production, and interactive learning development. I graduated from Universitas Negeri Semarang with a thesis on interactive mathematics learning media — and have since worked across fintech, academia, and government institutions.
                  </p>
                  <p>
                    Today at Amartha Financial, I manage learning content for 10,000+ employees. My work includes instructional design, multimedia production, and building targeted learning tools — such as an LMS Knowledge Base Chatbot that helps users brainstorm and instantly recall information about our courses, products, and culture.
                  </p>
                </>
              )}
            </div>

            {/* Experience */}
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent" />
              Professional Experience
            </h2>
            <div className="flex flex-col gap-6 mb-16">
              {experiences.map((exp) => (
                <div key={exp.company} className="bg-bg-surface border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-text-primary">{exp.company}</h3>
                      <p className="text-accent font-medium text-sm">{exp.role} &bull; <span className="text-text-secondary">{exp.type}</span></p>
                    </div>
                    <span className="text-sm text-text-secondary bg-bg-elevated px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">{exp.period}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-accent mt-1 shrink-0">•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills */}
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {skillGroups.map((group) => (
                <div key={group.label} className="bg-bg-surface border border-border rounded-2xl p-6">
                  <h3 className={`font-bold text-base mb-4 ${group.colorClass}`}>{group.label}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className={`text-xs px-2.5 py-1 rounded-full ${group.bgClass} ${group.colorClass} font-medium`}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

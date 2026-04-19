import { groq } from 'next-sanity'

export const FEATURED_PROJECTS_QUERY = groq`*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  category,
  excerpt
}`

export const ALL_PROJECTS_QUERY = groq`*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  category,
  excerpt
}`

export const PROJECT_BY_SLUG_QUERY = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  category,
  excerpt,
  content,
  techStack,
  demoUrl,
  demoEmbed,
  youtubeUrl,
  gallery,
  publishedAt
}`

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  title,
  description,
  heroGreeting,
  heroHeadline,
  heroSubtitle,
  aboutImage,
  aboutContent,
  socialLinks,
  contactEmail
}`

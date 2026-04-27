import { groq } from 'next-sanity'

export const FEATURED_PROJECTS_QUERY = groq`*[_type == "project" && (featured == true || visibility == "featured")] | order(order asc, publishedAt desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  clientLogo,
  year,
  category,
  excerpt,
  youtubeUrl,
  softwareLogos
}`

export const ALL_PROJECTS_QUERY = groq`*[_type == "project"] | order(order asc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  clientLogo,
  year,
  category,
  excerpt,
  youtubeUrl,
  softwareLogos
}`

export const PROJECT_BY_SLUG_QUERY = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  clientLogo,
  year,
  category,
  excerpt,
  content,
  techStack,
  demoUrl,
  demoEmbed,
  youtubeUrl,
  softwareLogos,
  gallery,
  publishedAt
}`

export const DESIGN_SHOWCASE_QUERY = groq`*[_type == "designShowcase"] | order(_createdAt desc)[0...100] {
  _id,
  title,
  mediaType,
  image {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          aspectRatio
        }
      }
    }
  },
  videoUrl,
  youtubeUrl,
  tag,
  size,
  rotation
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

export const INFINITE_GALLERY_QUERY = groq`*[_type == "infiniteGallery"][0] {
  images[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          aspectRatio
        }
      }
    },
    alt
  }
}`

import { MetadataRoute } from 'next'

const BASE_URL = 'https://ferdy-fadhil-lazuardi.my.id'

const PROJECT_SLUGS = [
  'amartha-lms-chatbot',
  'agent-network',
  'training-client-protection',
  'amarthafin-mockup',
  'dunia-geometri',
  'anti-harassment',
  'modal',
  'asa',
  'bts',
  'botani-quest',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-24')

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const projectEntries: MetadataRoute.Sitemap = PROJECT_SLUGS.map(slug => ({
    url: `${BASE_URL}/projects/${slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticEntries, ...projectEntries]
}

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ferdy-fadhil-lazuardi.my.id'

  const slugs = [
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

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
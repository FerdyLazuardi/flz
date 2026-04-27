import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Non-CDN client for server-side fetches that need fresh data
export const freshClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

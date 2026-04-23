import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false to get live data — CDN caches stale content for minutes after Studio saves
})

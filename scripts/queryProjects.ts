import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Use token if available for drafts
})

async function main() {
  console.log('Fetching all projects...')
  const result = await client.fetch(`*[_type == "project"] { _id, title, "slug": slug.current, language }`)
  console.log(JSON.stringify(result, null, 2))
}
main()

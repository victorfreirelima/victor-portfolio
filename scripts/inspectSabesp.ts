import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-04-08',
  useCdn: false,
})

async function main() {
  const slug = 'sabesp'
  const lang = 'en'
  const result = await client.fetch(`*[_type == "project" && slug.current == $slug && language == $lang][0]`, { slug, lang })
  console.log('Project:', JSON.stringify(result, null, 2))
}
main()

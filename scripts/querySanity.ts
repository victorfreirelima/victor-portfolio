import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function main() {
  const result = await client.fetch(`*[_type == "project" && slug.current == "sabesp" && language == "en"][0]`)
  console.log(JSON.stringify(result, null, 2))
}
main()

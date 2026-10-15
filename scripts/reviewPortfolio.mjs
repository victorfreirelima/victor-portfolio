import { createClient } from '@sanity/client'
import { mkdir, writeFile } from 'node:fs/promises'
import { buildReviewedDocuments } from '../lib/portfolio-review.mjs'

const writeDrafts = process.argv.includes('--drafts')
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (writeDrafts && !token) throw new Error('Set a Sanity editor token in the environment to save drafts. Published documents are never changed by this script.')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hnwjteam',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-04-08', useCdn: false, token,
})
const documents = await client.fetch('*[_type in ["siteSettings", "project", "philosophy", "contact", "timeline"] && !(_id in path("drafts.**"))]')
const reviewed = buildReviewedDocuments(documents)
await mkdir('.portfolio-review', { recursive: true })
await writeFile('.portfolio-review/published-backup.json', JSON.stringify(documents, null, 2))
await writeFile('.portfolio-review/reviewed-documents.json', JSON.stringify(reviewed, null, 2))
console.log(`Prepared ${reviewed.length} documents; backup and proposed content are in .portfolio-review/.`)

if (writeDrafts) {
  const ids = reviewed.map(document => `drafts.${document._id}`)
  const existingDrafts = await client.fetch('*[_id in $ids]._id', { ids })
  if (existingDrafts.length) throw new Error(`Found ${existingDrafts.length} existing drafts. Refusing to overwrite editorial work.`)
  let transaction = client.transaction()
  for (const document of reviewed) {
    // System properties belong to the original published revision, not the new draft.
    const draft = Object.fromEntries(Object.entries(document).filter(([key]) => !['_rev', '_createdAt', '_updatedAt'].includes(key)))
    transaction = transaction.create({ ...draft, _id: `drafts.${document._id}` })
  }
  await transaction.commit()
  console.log('Drafts saved. Review and publish them individually in Sanity Studio. No published document was modified.')
} else {
  console.log('Dry run only. Use --drafts with an editor token to stage the reviewed content in Studio.')
}

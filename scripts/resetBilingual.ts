import { getCliClient } from 'sanity/cli'
const client = getCliClient()

async function resetBilingual() {
  console.log('Starting bilingual reset...')
  
  // 1. Delete all translation metadata
  const metadata = await client.fetch(`*[_type == "translation.metadata"]._id`)
  if (metadata.length > 0) {
    console.log(`Deleting ${metadata.length} metadata documents...`)
    const tx = client.transaction()
    metadata.forEach((id: string) => tx.delete(id))
    await tx.commit()
  }

  // 2. Delete all EN documents and their drafts
  const enDocs = await client.fetch(`*[_id match "*-en*" || _id match "drafts.*-en*"]._id`)
  if (enDocs.length > 0) {
    console.log(`Deleting ${enDocs.length} EN documents...`)
    const tx = client.transaction()
    enDocs.forEach((id: string) => tx.delete(id))
    await tx.commit()
  }

  // 3. Re-tag all base documents as pt-br
  const baseDocs = await client.fetch(`*[_type in ["project", "siteSettings", "philosophy", "contact", "timeline"]]`)
  console.log(`Re-tagging ${baseDocs.length} documents as pt-br...`)
  for (const doc of baseDocs) {
    await client.patch(doc._id).set({ language: 'pt-br' }).commit()
    // Also publish if it was a draft
    if (doc._id.startsWith('drafts.')) {
        const pubId = doc._id.replace('drafts.', '')
        await client.createOrReplace({ ...doc, _id: pubId })
    }
  }

  console.log('Bilingual reset complete. Base documents are now clean and tagged as pt-br.')
}

resetBilingual()

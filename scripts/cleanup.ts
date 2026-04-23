import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function cleanup() {
  const all = await client.fetch(`*[_type in ["project", "siteSettings", "philosophy", "contact", "timeline"]]`)
  
  const toDelete = []
  const updates = []

  for (const doc of all) {
    if (doc._id.endsWith('-en-en')) {
      toDelete.push(doc._id)
    }
  }

  if (toDelete.length > 0) {
    console.log(`Deleting duplicates: ${toDelete.join(', ')}`)
    const transaction = client.transaction()
    toDelete.forEach(id => transaction.delete(id))
    await transaction.commit()
  }

  // Ensure EN settings is published
  const drafts = await client.fetch(`*[_id in path('drafts.**')]`)
  for (const draft of drafts) {
     const publishedId = draft._id.replace('drafts.', '')
     if (publishedId.endsWith('-en') || publishedId === 'siteSettings') {
        console.log(`Publishing ${publishedId}...`)
        await client.createOrReplace({
          ...draft,
          _id: publishedId
        })
     }
  }

  console.log('Cleanup and publishing done.')
}
cleanup()

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function wipeOrphans() {
  console.log('--- Wiping translation.metadata Orphans ---')
  
  // Fetch all translation.metadata documents
  const metadataDocs = await client.fetch(`*[_type == "translation.metadata"]{_id}`)
  
  console.log(`Found ${metadataDocs.length} metadata documents.`);

  for (const doc of metadataDocs) {
    if (!doc._id) continue;
    
    console.log(`Deleting: ${doc._id}...`)
    try {
      await client.delete(doc._id)
      console.log(`✅ successfully deleted: ${doc._id}`)
    } catch (e: any) {
      console.error(`❌ failed to delete: ${doc._id}`, e.message)
    }
  }

  console.log('--- Wipe Finished ---')
}

wipeOrphans()

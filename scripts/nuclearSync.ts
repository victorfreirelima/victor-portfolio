import { getCliClient } from 'sanity/cli'
const client = getCliClient()

async function nuclearSync() {
  console.log('--- Nuclear Bilingual Sync Starting ---')
  
  // 1. Delete ALL existing metadata documents to start clean
  const metadata = await client.fetch(`*[_type == "translation.metadata"]._id`)
  if (metadata.length > 0) {
    console.log(`Deleting ${metadata.length} metadata documents...`)
    const tx = client.transaction()
    metadata.forEach((id: string) => tx.delete(id))
    await tx.commit()
  }

  // 2. Fetch all valid base docs (published versions to avoid draft complexity)
  const baseDocs = await client.fetch(`*[_type in ["siteSettings", "project", "philosophy", "timeline", "contact"] && !(_id match "*-en*") && !(_id in path('drafts.**'))]`)
  console.log(`Found ${baseDocs.length} clean base documents.`)

  for (const doc of baseDocs) {
    const enId = `${doc._id}-en`
    
    // Ensure PT doc has the correct language tag
    if (doc.language !== 'pt-br') {
        console.log(`Tagging ${doc._id} as pt-br...`)
        await client.patch(doc._id).set({ language: 'pt-br' }).commit()
    }

    // Create EN doc (published version)
    console.log(`Creating EN version for ${doc._id}...`)
    const enData = { 
        ...doc, 
        _id: enId, 
        language: 'en',
        ...(doc._type === 'project' && doc.slug ? { slug: { current: `en/${doc.slug.current}` } } : {})
    }
    delete enData._createdAt
    delete enData._updatedAt
    await client.createOrReplace(enData)

    // Create Metadata
    console.log(`Linking ${doc._id} <-> ${enId}...`)
    await client.createOrReplace({
      _id: `translation.metadata.${doc._id}`,
      _type: 'translation.metadata',
      translations: [
        { _key: 'pt-br', value: { _type: 'reference', _ref: doc._id } },
        { _key: 'en', value: { _type: 'reference', _ref: enId } }
      ]
    })
  }

  console.log('✅ Nuclear Sync Complete!')
}

nuclearSync()

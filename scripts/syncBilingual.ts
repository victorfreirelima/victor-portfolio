import { getCliClient } from 'sanity/cli'
const client = getCliClient()

async function comprehensiveSync() {
  console.log('--- Comprehensive Bilingual Sync Starting ---')
  
  // 1. Fetch all documents of bilingual types (published and drafts)
  const allDocs = await client.fetch(`*[_type in ["siteSettings", "project", "philosophy", "timeline", "contact"]]`)
  console.log(`Found ${allDocs.length} total docs in these categories.`)

  // Separate EN clones from base docs
  const baseDocs = allDocs.filter((d: any) => !d._id.includes('-en') && !d._id.includes('translation.metadata'))
  
  for (const doc of baseDocs) {
    const isDraft = doc._id.startsWith('drafts.')
    const baseId = isDraft ? doc._id.replace('drafts.', '') : doc._id
    const enId = `${baseId}-en`
    const draftEnId = `drafts.${enId}`

    console.log(`Processing ${doc._type}: ${baseId}...`)

    // Ensure base doc has language: 'pt-br'
    if (doc.language !== 'pt-br') {
       await client.patch(doc._id).set({ language: 'pt-br' }).commit()
    }

    // Check if EN version exists (published or draft)
    const enExists = allDocs.some((d: any) => d._id === enId || d._id === draftEnId)
    
    if (!enExists) {
        console.log(`Creating missing EN clone: ${enId}`)
        const enData = { 
            ...doc, 
            _id: enId, 
            language: 'en',
            // Update slug for projects to avoid collision
            ...(doc._type === 'project' && doc.slug ? { slug: { current: `en/${doc.slug.current}` } } : {})
        }
        delete enData._createdAt
        delete enData._updatedAt
        await client.createOrReplace(enData)
    }

    // Ensure metadata document exists and is correct
    const metadataId = `translation.metadata.${baseId}`
    console.log(`Linking metadata for ${baseId}...`)
    await client.createOrReplace({
      _id: metadataId,
      _type: 'translation.metadata',
      translations: [
        { _key: 'pt-br', value: { _type: 'reference', _ref: baseId } },
        { _key: 'en', value: { _type: 'reference', _ref: enId } }
      ]
    })
  }

  console.log('✅ Synchronized everything.')
}

comprehensiveSync()

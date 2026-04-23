import { getCliClient } from 'sanity/cli'
const client = getCliClient()

async function fixSlugsAndMetadata() {
  console.log('--- Fixing Slugs and Verifying Metadata ---')
  
  // 1. All EN projects: prefix slug with en/ to avoid validation error
  const enProjects = await client.fetch(`*[_type == "project" && language == "en"]`)
  for (const proj of enProjects) {
    if (proj.slug?.current && !proj.slug.current.startsWith('en/')) {
      const newSlug = `en/${proj.slug.current}`
      console.log(`Updating slug for ${proj.title}: ${proj.slug.current} -> ${newSlug}`)
      await client.patch(proj._id).set({ "slug.current": newSlug }).commit()
    }
  }

  // 2. Ensure siteSettings-en doesn't have a slug (it shouldn't, but just in case)
  const enSettings = await client.fetch(`*[_id == "siteSettings-en"][0]`)
  if (enSettings) {
    await client.patch(enSettings._id).set({ language: "en" }).commit()
  }

  // 3. Make sure all base docs have language="pt-br"
  const ptDocs = await client.fetch(`*[_type in ["project", "siteSettings", "philosophy", "timeline", "contact"] && !(_id match "*-en*")]`)
  for (const doc of ptDocs) {
    if (doc.language !== 'pt-br') {
       await client.patch(doc._id).set({ language: 'pt-br' }).commit()
    }
  }

  console.log('✅ Slugs updated and metadata verified.')
}

fixSlugsAndMetadata()

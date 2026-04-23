import { getCliClient } from 'sanity/cli'
import { translations } from '../lib/i18n/translations'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = getCliClient()

async function patchLabels() {
  const settingsDocs = await client.fetch(`*[_type == "siteSettings"]`)
  
  for (const doc of settingsDocs) {
    const lang = doc.language === 'en' ? 'en' : 'pt-br'
    const t = translations[lang]

    console.log(`Patching ${doc._id} (${lang})...`)

    const updatedDoc = {
      ...doc,
      // Navigation
      navigationItems: [
        { _key: 'systems', label: t.nav.systems, link: `/${lang}#systems` },
        { _key: 'strategy', label: t.nav.strategy, link: `/${lang}#strategy` },
        { _key: 'path', label: t.nav.path, link: `/${lang}#path` },
        { _key: 'contact', label: t.nav.contact, link: `/${lang}#contact` }
      ],
      
      // Global UI
      projectsEyebrow: t.projectsGrid.sectionLabel,
      timelineEyebrow: t.timeline.eyebrow,
      contactEyebrow: t.contact.eyebrow,
      philosophyEyebrow: t.philosophy.eyebrow,
      footerStatus: t.footer.status,
      footerCopyright: t.footer.copyright,

      // Case Study Global UI
      caseStudyBackLabel: t.caseStudy.backLabel,
      caseStudyEyebrowLabel: t.caseStudy.eyebrowLabel,
      caseStudyMetaLabels: t.caseStudy.metaLabels,
      caseStudySections: t.caseStudy.sections
    }
    delete updatedDoc._createdAt
    delete updatedDoc._updatedAt
    delete updatedDoc._rev

    try {
      await client.createOrReplace(updatedDoc)
      console.log(`Successfully replaced ${doc._id}`)
    } catch (e) {
      console.error(`Failed to replace ${doc._id}`, e)
    }
  }

  console.log("Global Labels patched into siteSettings!")
  
  // also need to ensure timeline eyebrow and philosophy eyebrow are there.
  // Actually, philosophy document has the eyebrow on the document natively.
  // We can just rely on `timeline.eyebrow` on siteSettings if we want, or add it.
  
  // Wait, let's also patch the English Timeline just to be sure it has the proper eyebrow?
  // Timeline is an array of entries. The eyebrow was hardcoded in page.js! Let's add it to siteSettings.
}

patchLabels()

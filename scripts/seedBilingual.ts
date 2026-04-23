import { getCliClient } from 'sanity/cli'
import { caseStudyContent } from '../lib/i18n/caseStudyContent'
import { translations } from '../lib/i18n/translations'

const client = getCliClient()
const langEn = 'en'
const tEn = translations[langEn]

async function linkTranslations(baseId: string, enId: string) {
  await client.createOrReplace({
    _id: `translation.metadata.${baseId}`,
    _type: 'translation.metadata',
    translations: [
      { _key: 'pt-br', value: { _type: 'reference', _ref: baseId } },
      { _key: 'en', value: { _type: 'reference', _ref: enId } }
    ]
  })
}

async function seedBilingual() {
  try {
    console.log('--- Fetching clean PT-BR base docs ---')
    // Filter out EN clones and drafts
    const docs = await client.fetch(`*[_type in ["siteSettings", "philosophy", "contact", "timeline", "project"] && !(_id match "*-en*") && !(_id in path('drafts.**'))]`)
    
    console.log(`Found ${docs.length} base documents to translate.`)

    for (const ptDoc of docs) {
      const enId = `${ptDoc._id}-en`
      let enData: any = { ...ptDoc, _id: enId, language: 'en' }
      delete enData._createdAt
      delete enData._updatedAt

      // Apply translations based on type
      if (ptDoc._type === 'siteSettings') {
        enData.heroEyebrow = tEn.hero.eyebrow
        enData.heroHeadline = tEn.hero.headline
        enData.heroSupportingText = tEn.hero.supportingText
      } else if (ptDoc._type === 'philosophy') {
        enData.eyebrow = tEn.philosophy.eyebrow
        enData.title = tEn.philosophy.title
        enData.body = tEn.philosophy.body
      } else if (ptDoc._type === 'contact') {
        enData.eyebrow = tEn.contact.eyebrow
        enData.title = tEn.contact.title
      } else if (ptDoc._type === 'timeline') {
        // Find corresponding entry in translations
        const entryEn = tEn.timeline.entries.find(e => e.company === ptDoc.company)
        if (entryEn) {
          enData.role = entryEn.role
          enData.startYear = entryEn.startYear
          enData.endYear = (entryEn as any).endYear || undefined
        }
      } else if (ptDoc._type === 'project') {
        const slug = ptDoc.slug?.current
        const translatedProj = tEn.projectsGrid.projects.find(p => p.title.toLowerCase().includes(slug?.replace('sabesp', 'siga') || ''))
        
        if (translatedProj) {
          enData.shortDescription = translatedProj.shortDescription
        }

        const csc = (caseStudyContent as any)[slug || '']?.['en']
        if (csc && enData.caseStudy) {
          enData.caseStudy.subtitle = csc.subtitle
          enData.caseStudy.overview = csc.overview?.join('\n\n')
          enData.caseStudy.problem = csc.problem?.join('\n\n')
          enData.caseStudy.approach = csc.approach?.join('\n\n')
          enData.caseStudy.solution = csc.solution?.join('\n\n')
          enData.caseStudy.finalReflection = csc.finalReflection?.join('\n\n')
          
          enData.caseStudy.uxDecisions = (csc.uxDecisions || []).map((dec: any) => ({
            _key: Math.random().toString(36).substring(7),
            title: dec.title,
            body: dec.body
          }))

          enData.caseStudy.impact = (csc.impact || []).map((imp: any) => ({
            _key: Math.random().toString(36).substring(7),
            stat: imp.stat,
            label: imp.label
          }))
        }
      }

      console.log(`Creating EN clone for ${ptDoc._type}: ${enId}`)
      await client.createOrReplace(enData)
      await linkTranslations(ptDoc._id, enId)
    }

    console.log('✅ Clean Bilingual Sync Complete!')
  } catch (error) {
    console.error('Bilingual Sync failed:', error)
  }
}

seedBilingual()

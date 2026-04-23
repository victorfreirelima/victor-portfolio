import { getCliClient } from 'sanity/cli'
import { translations } from '../lib/i18n/translations'
import { caseStudyContent } from '../lib/i18n/caseStudyContent'

const client = getCliClient()

async function fullPopulate() {
  console.log('--- Full Bilingual Population Starting ---')

  const tEn = translations.en
  const projectsEn = tEn.projectsGrid.projects
  const slugs = ['slicecom', 'sabesp', 'sigaf', 'metro', 'myphone', 'castforme']

  // 1. Sync Site Settings
  console.log('Syncing Site Settings EN...')
  await client.patch('siteSettings-en').set({
    heroEyebrow: tEn.hero.eyebrow,
    heroHeadline: tEn.hero.headline,
    heroSupportingText: tEn.hero.supportingText,
    language: 'en'
  }).commit()

  // 2. Sync Philosophy
  console.log('Syncing Philosophy EN...')
  await client.patch('philosophy-en').set({
    eyebrow: tEn.philosophy.eyebrow,
    title: tEn.philosophy.title,
    body: tEn.philosophy.body,
    language: 'en'
  }).commit()

  // 3. Sync Projects and Case Studies
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    const projectData = projectsEn[i]
    const content = caseStudyContent[slug]?.en

    // Find the EN project document by its ID (baseId-en)
    // First find the base ID
    const ptDoc = await client.fetch(`*[_type == "project" && slug.current == $slug && language == "pt-br"][0]`, { slug })
    if (!ptDoc) {
      console.log(`Skipping slug ${slug}: PT doc not found`)
      continue
    }

    const enId = `${ptDoc._id}-en`
    console.log(`Syncing Project EN: ${slug} (${enId})...`)

    const patches: any = {
      title: projectData.title,
      shortDescription: projectData.shortDescription,
      tag: tEn.projectsGrid.tags[i],
      "slug.current": slug, // REVERTING the en/ prefix here!
      language: 'en'
    }

    if (content) {
      patches.caseStudy = {
        subtitle: content.subtitle,
        role: tEn.projectsGrid.roles[i],
        context: ['Enterprise SaaS', 'Government / Utilities', 'Government / Public Finance', 'Public Transit', 'Fintech / Telecom', 'Corporate ERP'][i],
        year: ['2022-2024', '2023-2024', '2024', '2023-2024', '2023', '2024'][i],
        overview: content.overview.join('\n\n'),
        problem: content.problem.join('\n\n'),
        approach: content.approach.join('\n\n'),
        solution: content.solution.join('\n\n'),
        finalReflection: content.finalReflection.join('\n\n'),
        uxDecisions: content.uxDecisions.map(d => ({ _type: 'object', title: d.title, body: d.body })),
        impact: content.impact.map(m => ({ _type: 'object', stat: m.stat, label: m.label }))
      }
    }

    await client.patch(enId).set(patches).commit()
  }

  console.log('✅ Full Population Complete!')
}

fullPopulate().catch(console.error)

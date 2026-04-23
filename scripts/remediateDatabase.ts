import { getCliClient } from 'sanity/cli'
import { translations } from '../lib/i18n/translations'
import { caseStudyContent } from '../lib/i18n/caseStudyContent'

const client = getCliClient()

async function remediate() {
  console.log('--- Phase 1: Content Population (Sync Mode) ---')

  const langs = ['pt-br', 'en'] as const
  const slugs = ['slicecom', 'sabesp', 'sigaf', 'metro', 'myphone', 'castforme', 'soficom-cloud', 'invoicecon', 'cartao-sim']

  for (const lang of langs) {
    const isEn = lang === 'en'
    const suffix = isEn ? '-en' : ''
    const t = translations[lang] as any

    console.log(`Populating Global Sections (${lang})...`)
    
    await client.createOrReplace({
      _id: `siteSettings${suffix}`,
      _type: 'siteSettings',
      language: lang,
      siteTitle: 'Victor Freire | UI/UX Designer',
      personName: 'Victor Freire',
      roleTitle: t.hero.eyebrow,
      heroEyebrow: t.hero.eyebrow,
      heroHeadline: t.hero.headline,
      heroSupportingText: t.hero.supportingText,
      heroHighlightWord: t.hero.highlightWord,
      logoStripTitle: t.logoStrip.title,
      footerText: t.footer.copyright,
      metaTitle: `Victor Freire — ${t.hero.eyebrow}`,
      metaDescription: t.hero.supportingText,
      navigationItems: [
        { _key: '1', label: t.nav.systems, link: `/${lang}#systems` },
        { _key: '2', label: t.nav.strategy, link: `/${lang}#strategy` },
        { _key: '3', label: t.nav.path, link: `/${lang}#path` },
        { _key: '4', label: t.nav.contact, link: `/${lang}#contact` }
      ]
    })

    await client.createOrReplace({
      _id: `philosophy${suffix}`,
      _type: 'philosophy',
      language: lang,
      eyebrow: t.philosophy.eyebrow,
      title: t.philosophy.title,
      body: t.philosophy.body
    })

    await client.createOrReplace({
      _id: `contact${suffix}`,
      _type: 'contact',
      language: lang,
      title: t.contact.title,
      eyebrow: t.contact.eyebrow,
      email: 'contact@victorfreire.com',
      linkedin: 'https://linkedin.com/in/victorfreire'
    })

    console.log(`Populating Projects (${lang})...`)
    for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i]
        const pData = t.projectsGrid.projects[i]
        const csData = caseStudyContent[slug]?.[lang]
        const baseId = `project-${slug}`
        const pId = `${baseId}${suffix}`

        const projectDoc: any = {
            _id: pId,
            _type: 'project',
            language: lang,
            title: pData.title,
            slug: { _type: 'slug', current: slug },
            shortDescription: pData.shortDescription,
            tag: t.projectsGrid.tags[i],
            order: i,
            featured: true,
            projectType: [
                'Enterprise SaaS', 'Government / Utilities', 'Government / Public Finance', 
                'Public Transit', 'Fintech / Telecom', 'Corporate ERP', 
                'Managed Cloud', 'Fintech / B2B', 'Healthcare'
            ][i],
            coverBackgroundColor: [
                '#F8FAFC', '#0070B5', '#E2E8F0', 
                '#1E293B', '#4F46E5', '#10B981',
                '#0F172A', '#334155', '#2563EB'
            ][i],
            ctaLabel: t.projectsGrid.ctaLabel,
            ctaLink: `/${lang}/projects/${slug}`
        }

        if (csData) {
            projectDoc.caseStudy = {
                subtitle: csData.subtitle,
                role: t.projectsGrid.roles[i],
                context: projectDoc.projectType,
                year: [
                    '2022-2024', '2023-2024', '2024', 
                    '2023-2024', '2023', '2024',
                    '2023', '2022-2024', '2019-2021'
                ][i],
                overview: csData.overview.join('\n\n'),
                problem: csData.problem.join('\n\n'),
                approach: csData.approach.join('\n\n'),
                solution: csData.solution.join('\n\n'),
                finalReflection: csData.finalReflection.join('\n\n'),
                uxDecisions: csData.uxDecisions.map((d: any, j: number) => ({ _type: 'object', _key: `ux-${j}`, title: d.title, body: d.body })),
                impact: csData.impact.map((m: any, j: number) => ({ _type: 'object', _key: `im-${j}`, stat: m.stat, label: m.label }))
            }
        }

        await client.createOrReplace(projectDoc)

        if (isEn) {
            const metadataId = `translation.metadata.${baseId}`
            await client.createOrReplace({
                _id: metadataId,
                _type: 'translation.metadata',
                translations: [
                    { _key: 'pt-br', value: { _type: 'reference', _ref: baseId } },
                    { _key: 'en', value: { _type: 'reference', _ref: pId } }
                ]
            })
        }
    }

    console.log(`Populating Timeline (${lang})...`)
    for (let i = 0; i < t.timeline.entries.length; i++) {
        const entry = t.timeline.entries[i] as any
        const baseId = `timeline-${i}`
        const tId = `${baseId}${suffix}`
        
        await client.createOrReplace({
            _id: tId,
            _type: 'timeline',
            language: lang,
            company: entry.company,
            role: entry.role,
            isCurrent: entry.isCurrent || false,
            startYear: entry.startYear,
            endYear: entry.endYear || '',
            order: i
        })

        if (isEn) {
            const metadataId = `translation.metadata.timeline-${i}`
            await client.createOrReplace({
                _id: metadataId,
                _type: 'translation.metadata',
                translations: [
                    { _key: 'pt-br', value: { _type: 'reference', _ref: baseId } },
                    { _key: 'en', value: { _type: 'reference', _ref: tId } }
                ]
            })
        }
    }
  }

  const singletons = ['siteSettings', 'philosophy', 'contact']
  for (const s of singletons) {
    const metadataId = `translation.metadata.${s}`
    await client.createOrReplace({
      _id: metadataId,
      _type: 'translation.metadata',
      translations: [
        { _key: 'pt-br', value: { _type: 'reference', _ref: s } },
        { _key: 'en', value: { _type: 'reference', _ref: `${s}-en` } }
      ]
    })
  }

  console.log('✅ NUCLEAR REMEDIATION COMPLETE!')
}

remediate().catch(console.error)

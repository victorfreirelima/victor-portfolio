import review from '../content/portfolio-review.json' with { type: 'json' }

// Preview the editorial release without writing to the published Sanity dataset.
// Set PORTFOLIO_CONTENT_REVIEW=0 to inspect the unmodified CMS content in a preview.
export function isContentReview() {
  return process.env.PORTFOLIO_CONTENT_REVIEW === '1'
    || (process.env.VERCEL_ENV === 'preview' && process.env.PORTFOLIO_CONTENT_REVIEW !== '0')
}

export function reviewProject(project, lang) {
  const slug = project?.slug?.current
  const patch = review[lang]?.projects?.[slug]
  if (!patch) return project
  return {
    ...project,
    ...patch,
    ctaLink: `/${lang}/projects/${slug}`,
    caseStudy: {
      ...project.caseStudy,
      ...patch.caseStudy,
      keyScreens: patch.caseStudy.keyScreens ?? project.caseStudy?.keyScreens ?? [],
    },
  }
}

export function reviewHome(data, lang) {
  const content = review[lang]
  if (!content) return data
  const projects = (data?.projects ?? []).map(project => reviewProject(project, lang))
  for (const [slug, patch] of Object.entries(content.projects)) {
    if (!projects.some(project => project.slug?.current === slug)) {
      projects.push(reviewProject({ _id: `portfolio-review-${slug}-${lang}`, _type: 'project', language: lang, slug: { _type: 'slug', current: slug }, ...patch }, lang))
    }
  }
  return {
    ...data,
    settings: { ...data?.settings, ...content.settings },
    philosophy: { ...data?.philosophy, ...content.philosophy },
    contact: { ...data?.contact, ...content.contact },
    timeline: content.timeline,
    projects: projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
  }
}

export function buildReviewedDocuments(documents) {
  const output = []
  for (const lang of ['pt-br', 'en']) {
    const current = documents.filter(document => document.language === lang)
    for (const type of ['siteSettings', 'philosophy', 'contact']) {
      const existing = current.find(document => document._type === type)
      if (!existing) throw new Error(`Missing ${type} document for ${lang}; refusing to create a replacement.`)
      const field = type === 'siteSettings' ? 'settings' : type
      output.push({ ...existing, ...review[lang][field] })
    }
    const home = reviewHome({ projects: current.filter(document => document._type === 'project') }, lang)
    output.push(...home.projects)
    for (const entry of review[lang].timeline) {
      const existing = current.find(document => document._type === 'timeline' && document.company === entry.company)
      output.push({ ...existing, _id: existing?._id ?? `portfolio-review-timeline-${entry.order}-${lang}`, _type: 'timeline', language: lang, ...entry })
    }
  }
  return output
}

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function auditDocs() {
  const data = await client.fetch(`*[_type in ["siteSettings", "project", "philosophy", "timeline", "contact"]]{
    _id,
    _type,
    title,
    language,
    slug,
    "hasHeroHeadline": defined(heroHeadline),
    "hasOverview": defined(caseStudy.overview),
    "hasProblem": defined(caseStudy.problem)
  }`)
  console.log(JSON.stringify(data, null, 2))
}

auditDocs().catch(console.error)

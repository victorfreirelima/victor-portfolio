import test from 'node:test'
import assert from 'node:assert/strict'
import { buildReviewedDocuments, reviewHome } from '../lib/portfolio-review.mjs'

const fixture = ['pt-br', 'en'].flatMap(language => [
  ...['siteSettings', 'philosophy', 'contact'].map(type => ({ _id: `${type}-${language}`, _type: type, language })),
  { _id: `original-sabesp-${language}`, _type: 'project', language, slug: { current: 'sabesp' },
    coverImage: { asset: { _ref: 'original-cover' } },
    caseStudy: { keyScreens: [{ _key: 'screen', image: { asset: { _ref: 'original-screen' } }, caption: 'Original caption' }], impact: [{ stat: '85%', label: 'Unverified' }] } },
  { _id: `original-index-${language}`, _type: 'timeline', language, company: 'Index Digital', startYear: '2008' },
])

test('editorial migration preserves document identity and original screenshots', () => {
  const original = structuredClone(fixture)
  const documents = buildReviewedDocuments(fixture)
  const sabesp = documents.find(document => document._id === 'original-sabesp-pt-br')
  assert.equal(sabesp.coverImage.asset._ref, 'original-cover')
  assert.equal(sabesp.caseStudy.keyScreens[0].image.asset._ref, 'original-screen')
  assert.deepEqual(sabesp.caseStudy.impact, [])
  assert.equal(sabesp.caseStudy.role, 'UX/UI Designer')
  assert.equal(documents.find(document => document._id === 'original-index-pt-br').startYear, 'fev/2011')
  assert.deepEqual(fixture, original)
})

test('new Soficom case uses an explanatory diagram and no unrelated screenshots', () => {
  for (const language of ['pt-br', 'en']) {
    const home = reviewHome({ projects: [] }, language)
    assert.equal(home.projects.length, 7)
    assert.equal(home.projects[0].slug.current, 'soficom-cloud')
    assert.match(home.projects[0].staticImageUrl, /soficom-flow-/)
    assert.deepEqual(home.projects[0].caseStudy.keyScreens, [])
    assert.equal(home.timeline.length, 6)
    assert.equal(home.timeline[0].isCurrent, false)
    for (const project of home.projects) {
      assert.ok(project.ctaLink.startsWith(`/${language}/projects/`))
      assert.equal(project.caseStudy.role, 'UX/UI Designer')
    }
  }
})

test('migration stops when required CMS documents cannot be resolved', () => {
  assert.throws(() => buildReviewedDocuments([]), /Missing siteSettings/)
})

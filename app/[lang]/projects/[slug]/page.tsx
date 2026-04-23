import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudyNav } from '@/components/ui/CaseStudyNav'
import { CaseStudyHero } from '@/components/sections/case-study/CaseStudyHero'
import { CaseStudySection } from '@/components/sections/case-study/CaseStudySection'
import { KeyScreensSection } from '@/components/sections/case-study/KeyScreensSection'
import { UXDecisionsSection } from '@/components/sections/case-study/UXDecisionsSection'
import { ImpactSection } from '@/components/sections/case-study/ImpactSection'
import { FadeIn } from '@/components/ui/FadeIn'
import { type Lang } from '@/lib/i18n/translations'

export const revalidate = 60

const SUPPORTED_LANGS: Lang[] = ['en', 'pt-br']
const DEFAULT_SLUGS = ['slicecom', 'sabesp', 'sigaf', 'metro', 'myphone', 'castforme', 'soficom-cloud', 'invoicecon', 'cartao-sim']

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  let sanitySlugs: string[] = []
  try {
    sanitySlugs = await client.fetch(projectSlugsQuery)
  } catch {}

  const slugs = Array.from(new Set([...DEFAULT_SLUGS, ...sanitySlugs]))

  return SUPPORTED_LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}


// ─── Shared Fetch Logic ───────────────────────────────────────────────────────

async function getProjectBySlug(slug: string, lang: string) {
  try {
    // Query 1: Exact match on slug and lang
    let project = await client.fetch(projectBySlugQuery, { slug, lang })
    if (project) return project
    
    // Query 2: Fallback for pt-br -> pt mismatch
    if (lang === 'pt-br') {
      project = await client.fetch(projectBySlugQuery, { slug, lang: 'pt' })
      if (project) return project
    }
    
    // Query 3: Total fallback — any project with this slug (last resort)
    project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
    return project
  } catch (err: any) {
    console.error(`[getProjectBySlug] Error for slug=${slug}:`, err.message || err)
    return null
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params
  const lang = (SUPPORTED_LANGS.includes(rawLang as Lang) ? rawLang : 'en') as Lang

  const sanityProject = await getProjectBySlug(slug, lang)

  const title = sanityProject?.title || 'Project'
  const eyebrowLabel = lang === 'pt-br' ? 'ESTUDO DE CASO' : 'CASE STUDY'

  return {
    title: `${title} — ${eyebrowLabel} | Victor Freire`,
    description: sanityProject?.caseStudy?.subtitle || '',
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LangCaseStudyPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params
  const lang = (SUPPORTED_LANGS.includes(rawLang as Lang) ? rawLang : 'en') as Lang

  let sanityProject: any = null
  let settings: any = null

  try {
    sanityProject = await getProjectBySlug(slug, lang)
    settings = await client.fetch(`*[_type == "siteSettings" && language == $lang][0]`, { lang })
  } catch (err) {
    console.error('CaseStudyPage Fetch Error:', err)
  }

  if (!sanityProject) {
    notFound()
  }

  const cs = sanityProject?.caseStudy ?? {}

  // ── Derived values ───────────────────────────────────────────────────────
  const projectTitle = sanityProject?.title
    || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')

  const bgColor = sanityProject?.coverBackgroundColor || '#E5E7EB'

  let heroImageSrc: string | null = null
  if (cs?.heroImage) heroImageSrc = urlForImage(cs.heroImage)?.url() ?? null
  else if (sanityProject?.coverImage) heroImageSrc = urlForImage(sanityProject.coverImage)?.url() ?? null
  else if (cs?.staticHeroImageFallback) heroImageSrc = cs.staticHeroImageFallback
  else if (sanityProject?.staticImageUrl) heroImageSrc = sanityProject.staticImageUrl

  const overview   = cs?.overview       ? cs.overview.split('\n\n')       : []
  const problem    = cs?.problem        ? cs.problem.split('\n\n')        : []
  const approach   = cs?.approach       ? cs.approach.split('\n\n')       : []
  const solution   = cs?.solution       ? cs.solution.split('\n\n')       : []
  const finalReflection = cs?.finalReflection ? cs.finalReflection.split('\n\n') : []

  const keyScreens = cs?.keyScreens?.length
    ? cs.keyScreens.map((s: any) => ({ src: urlForImage(s.image)?.url() || '', caption: s.caption || '' }))
    : []

  const uxDecisions = cs?.uxDecisions ?? []
  const impact      = cs?.impact       ?? []

  // ── UI labels — always read from siteSettings in Sanity ──────────────────
  const defaultSections = lang === 'pt-br'
    ? { overview: 'Visão Geral', problem: 'Problema & Contexto', approach: 'Abordagem / Raciocínio', solution: 'Solução', keyScreens: 'Telas Principais', screensUnit: 'TELAS', uxDecisions: 'Decisões de UX', impact: 'Impacto & Resultados', reflection: 'Reflexão Final' }
    : { overview: 'Overview', problem: 'Problem & Context', approach: 'Approach / Thinking', solution: 'Solution', keyScreens: 'Key Screens', screensUnit: 'SCREENS', uxDecisions: 'UX Decisions', impact: 'Impact & Outcomes', reflection: 'Final Reflection' }

  const sl = settings?.caseStudySections || defaultSections

  const defaultMetaLabels = lang === 'pt-br'
    ? { role: 'Cargo', context: 'Contexto', year: 'Período' }
    : { role: 'Role', context: 'Context', year: 'Year' }

  const navItems = settings?.navigationItems?.length ? settings.navigationItems : []

  const backLabel    = settings?.caseStudyBackLabel   || (lang === 'pt-br' ? 'Voltar ao Portfólio' : 'Back to Portfolio')
  const eyebrowLabel = settings?.caseStudyEyebrowLabel || (lang === 'pt-br' ? 'ESTUDO DE CASO'      : 'CASE STUDY')
  const metaLabels   = settings?.caseStudyMetaLabels  || defaultMetaLabels

  return (
    <>
      <Header data={settings || {}} lang={lang} navItems={navItems} />
      <CaseStudyNav projectTitle={projectTitle} lang={lang} backLabel={backLabel} />
      <main className="flex-1 w-full flex flex-col">
        <FadeIn className="w-full" delay={0.1}>
          <CaseStudyHero
            title={projectTitle}
            subtitle={cs?.subtitle || ''}
            role={cs?.role || ''}
            context={cs?.context || ''}
            year={cs?.year || ''}
            bgColor={bgColor}
            heroImageSrc={heroImageSrc}
            eyebrowLabel={eyebrowLabel}
            metaLabels={metaLabels}
          />
        </FadeIn>

        <FadeIn className="w-full" delay={0.15}>
          <CaseStudySection eyebrow={sl.overview} body={overview} first />
        </FadeIn>

        <FadeIn className="w-full" delay={0.1}>
          <CaseStudySection eyebrow={sl.problem} body={problem} />
        </FadeIn>

        <FadeIn className="w-full" delay={0.1}>
          <CaseStudySection eyebrow={sl.approach} body={approach} />
        </FadeIn>

        <FadeIn className="w-full" delay={0.1}>
          <CaseStudySection eyebrow={sl.solution} body={solution} />
        </FadeIn>

        {keyScreens.length > 0 && (
          <FadeIn className="w-full" delay={0.1}>
            <KeyScreensSection
              screens={keyScreens}
              sectionLabel={sl.keyScreens}
              screensUnit={sl.screensUnit}
            />
          </FadeIn>
        )}

        {uxDecisions.length > 0 && (
          <FadeIn className="w-full" delay={0.1}>
            <UXDecisionsSection decisions={uxDecisions} sectionLabel={sl.uxDecisions} />
          </FadeIn>
        )}

        {impact.length > 0 && (
          <FadeIn className="w-full" delay={0.1}>
            <ImpactSection items={impact} sectionLabel={sl.impact} />
          </FadeIn>
        )}

        <FadeIn className="w-full" delay={0.1}>
          <CaseStudySection eyebrow={sl.reflection} body={finalReflection} />
        </FadeIn>
      </main>
      <Footer
        data={settings || {}}
        copyright={settings?.footerText || settings?.footerCopyright || ''}
      />
    </>
  )
}

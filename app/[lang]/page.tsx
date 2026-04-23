import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FadeIn } from '@/components/ui/FadeIn'
import { client } from '@/sanity/lib/client'
import { homePageQuery } from '@/sanity/lib/queries'
import { type Lang } from '@/lib/i18n/translations'

export const revalidate = 60

const SUPPORTED_LANGS: Lang[] = ['en', 'pt-br']

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function LangHome({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  if (!SUPPORTED_LANGS.includes(rawLang as Lang)) notFound()
  const lang = rawLang as Lang

  // Fetch all content from Sanity — the single source of truth
  let data: any = null
  try {
    data = await client.fetch(homePageQuery, { lang })
  } catch {
    data = { settings: {}, projects: [], philosophy: {}, timeline: [], contact: {} }
  }

  const settings = data?.settings || {}
  const navItems = settings.navigationItems?.length ? settings.navigationItems : []

  const heroData = { ...settings }

  const logoData = { ...settings }

  const projectsData = {
    projects: data?.projects ?? [],
  }

  const philosophyData = {
    eyebrow: data?.philosophy?.eyebrow || '',
    title: data?.philosophy?.title || '',
    body: data?.philosophy?.body ? data.philosophy.body.split('\n\n') : [],
  }

  const timelineData = {
    timeline: data?.timeline ?? [],
    eyebrow: settings.timelineEyebrow || '',
  }

  const contactData = {
    ...(data?.contact || {}),
  }

  return (
    <>
      <Header data={settings} lang={lang} navItems={navItems} />
      <main className="flex-1 w-full flex flex-col items-center">
        <FadeIn delay={0.1}>
          <HeroSection data={heroData} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <LogoStrip data={logoData} />
        </FadeIn>

        <FadeIn delay={0.3}>
          <ProjectsGrid
            data={projectsData}
            lang={lang}
            sectionLabel={settings.projectsEyebrow || ''}
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <PhilosophySection data={philosophyData} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <TimelineSection data={timelineData} />
        </FadeIn>

        <FadeIn delay={0.3}>
          <ContactSection data={contactData} />
        </FadeIn>
      </main>
      <Footer
        data={settings}
        copyright={settings.footerText || settings.footerCopyright || ''}
      />
    </>
  )
}

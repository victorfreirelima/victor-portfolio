import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { isContentReview, reviewHome } from '@/lib/portfolio-review.mjs'

const SUPPORTED_LANGS = ['en', 'pt-br']

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!SUPPORTED_LANGS.includes(lang)) notFound()
  let settings = await client.fetch('*[_type == "siteSettings" && language == $lang][0]', { lang }).catch(() => ({}))
  if (isContentReview()) settings = reviewHome({ settings }, lang).settings
  const title = settings?.metaTitle || 'Victor Freire | UX/UI Designer'
  const description = settings?.metaDescription || ''
  return {
    title, description,
    alternates: { canonical: `/${lang}`, languages: { 'pt-BR': '/pt-br', en: '/en' } },
    openGraph: { title, description, locale: lang === 'pt-br' ? 'pt_BR' : 'en_US' },
    twitter: { title, description },
    ...(isContentReview() ? { robots: { index: false, follow: false } } : {}),
  }
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!SUPPORTED_LANGS.includes(lang)) notFound()
  return <div lang={lang === 'pt-br' ? 'pt-BR' : 'en'} className="contents">{children}</div>
}

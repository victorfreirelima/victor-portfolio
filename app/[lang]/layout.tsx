import { notFound } from 'next/navigation'

const SUPPORTED_LANGS = ['en', 'pt-br']

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
  return <>{children}</>
}

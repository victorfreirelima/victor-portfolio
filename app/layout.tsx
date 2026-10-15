import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { urlForImage } from '@/sanity/lib/image'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

interface SiteSettings {
  siteTitle?: string
  personName?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: any
}

export async function generateMetadata(): Promise<Metadata> {
  let settings: SiteSettings | null = null
  try {
    settings = await client.fetch(groq`*[_type == "siteSettings"][0]`)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Metadata fetch: Sanity connection failed or ID missing. Using fallback data.')
    }
  }
  
  const title = settings?.metaTitle || settings?.siteTitle || 'Victor Freire | Personal Portfolio'
  const description = settings?.metaDescription || 'Victor Freire — UX/UI Designer. Enterprise systems, SaaS, web and mobile interfaces.'
  const ogImage = settings?.ogImage ? urlForImage(settings.ogImage).width(1200).height(630).url() : '/perfil.png'

  return {
    metadataBase: new URL('https://victorfreire.com'),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  )
}

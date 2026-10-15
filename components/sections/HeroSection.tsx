import Image from 'next/image'
import { Container } from '../layout/Container'
import { urlForImage } from '@/sanity/lib/image'
import { ArrowDown, Download, Mail } from 'lucide-react'

export function HeroSection({ data, lang = 'pt-br' }: { data: any; lang?: string }) {
  const pt = lang === 'pt-br'
  const eyebrow = data?.heroEyebrow
  const headline = data?.heroHeadline || 'UX/UI Designer'
  const supportingText = data?.heroSupportingText
  const highlightWord = data?.heroHighlightWord || ''
  
  const renderHeadline = (text: string) => {
    return text.split(' ').map((word: string, i: number) => {
      const clean = word.toLowerCase().replace(/[^a-zà-ÿ]/g, '')
      const isHighlighted = clean === highlightWord.toLowerCase()
      return (
        <span key={i} className={isHighlighted ? 'text-brand-muted/70 font-normal underline decoration-hairline underline-offset-8' : ''}>
          {word}{' '}
        </span>
      )
    })
  }

  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 w-full overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-7 flex flex-col gap-10 md:gap-14">
          <div className="flex items-center gap-5">
            <div className="hairline w-12" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-muted uppercase">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-[38px] leading-[1.1] md:text-5xl lg:text-[60px] lg:leading-[1.08] tracking-[-0.045em] font-bold text-brand-dark max-w-[20ch]">
            {renderHeadline(headline)}
          </h1>
          <p className="text-base md:text-lg text-brand-gray max-w-[560px] leading-[1.75]">
            {supportingText}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#systems" className="inline-flex items-center gap-2 rounded-md bg-brand-dark px-5 py-3 text-sm font-semibold text-white">
              {data?.heroProjectsLabel || (pt ? 'Ver projetos' : 'View projects')} <ArrowDown size={16} aria-hidden />
            </a>
            {data?.resumeUrl && <a href={data.resumeUrl} download className="inline-flex items-center gap-2 rounded-md border border-brand-dark/25 px-5 py-3 text-sm font-semibold">
              <Download size={16} aria-hidden /> {data.heroResumeLabel || (pt ? 'Baixar currículo' : 'Download résumé')}
            </a>}
            <a href="#contact" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold">
              <Mail size={16} aria-hidden /> {data?.heroContactLabel || (pt ? 'Contato' : 'Contact')}
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 w-full aspect-[4/5] md:aspect-[4/5] bg-border-subtle rounded-xl overflow-hidden relative shadow-2xl ring-1 ring-border-subtle group">
          {data?.heroImage ? (
            <Image 
              src={urlForImage(data.heroImage)?.url() as string} 
              alt={data?.personName || 'Portrait'}
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              priority
              quality={90}
            />
          ) : (
             <div className="w-full h-full bg-gradient-to-b from-[#EAEAEA] to-[#D1D1D1] flex items-center justify-center text-brand-gray font-medium text-sm">
                Portrait Placeholder
             </div>
          )}
        </div>
      </Container>
    </section>
  )
}

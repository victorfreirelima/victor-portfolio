import Image from 'next/image'
import { Container } from '../layout/Container'
import { urlForImage } from '@/sanity/lib/image'

export function HeroSection({ data }: { data: any }) {
  const eyebrow = data?.heroEyebrow
  const headline = data?.heroHeadline
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
    <section className="pt-8 md:pt-12 pb-24 md:pb-40 w-full overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-7 flex flex-col gap-10 md:gap-14">
          <div className="flex items-center gap-5">
            <div className="hairline w-12" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-muted uppercase">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-[38px] leading-[1.1] md:text-6xl lg:text-[76px] lg:leading-[1.02] tracking-[-0.05em] font-bold text-brand-dark max-w-[14ch]">
            {renderHeadline(headline)}
          </h1>
          <p className="text-[10px] tracking-[0.15em] text-brand-gray uppercase font-bold max-w-[280px] leading-[2] mt-2">
            {supportingText}
          </p>
        </div>
        <div className="lg:col-span-5 w-full aspect-[4/5] md:aspect-[4/5] bg-border-subtle rounded-xl overflow-hidden relative shadow-2xl ring-1 ring-border-subtle group">
          {data?.heroImage ? (
            <Image 
              src={urlForImage(data.heroImage)?.url() as string} 
              alt={data?.personName || 'Portrait'}
              fill
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

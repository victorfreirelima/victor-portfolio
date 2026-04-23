import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export function LogoStrip({ data }: { data: any }) {
  const logos = data?.logoStripItems || []
  const title = data?.logoStripTitle || 'TRUSTED BY INDUSTRY LEADERS'

  if (!logos.length) return null

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 lg:py-28 bg-brand-dark overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 text-[10px] uppercase tracking-[0.25em] font-bold text-white/95">
        <div className="shrink-0 text-white/40 md:text-white/95">
          {title}
        </div>
        <div className="flex items-center gap-10 md:gap-24 opacity-80 grayscale overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
          {logos.map((logo: any, i: number) => (
            logo.image ? (
              <div key={i} className="relative h-8 md:h-10 w-24 shrink-0">
                <Image 
                  src={urlForImage(logo.image)?.url() as string} 
                  alt={logo.name} 
                  fill
                  className="object-contain brightness-0 invert" 
                />
              </div>
            ) : (
              <span key={i} className="tracking-[0.25em] whitespace-nowrap shrink-0">{logo.name}</span>
            )
          ))}
        </div>
      </div>
    </section>
  )
}

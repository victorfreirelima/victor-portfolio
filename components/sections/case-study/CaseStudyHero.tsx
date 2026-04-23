import Image from 'next/image'
import { Container } from '../../layout/Container'

interface CaseStudyHeroProps {
  title: string
  subtitle: string
  role: string
  context: string
  year: string
  bgColor: string
  heroImageSrc?: string | null
  eyebrowLabel?: string
  metaLabels?: { role: string; context: string; year: string }
}

export function CaseStudyHero({
  title,
  subtitle,
  role,
  context,
  year,
  bgColor,
  heroImageSrc,
  eyebrowLabel = 'CASE STUDY',
  metaLabels = { role: 'Role', context: 'Context', year: 'Year' },
}: CaseStudyHeroProps) {
  return (
    <section className="pt-8 md:pt-12 pb-24 md:pb-40 w-full overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center">

        {/* Left — Text Content */}
        <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">

          <div className="flex items-center gap-5">
            <div className="hairline w-12" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-muted uppercase">
              {eyebrowLabel}
            </span>
          </div>

          <h1 className="text-[38px] leading-[1.1] md:text-6xl lg:text-[76px] lg:leading-[1.02] tracking-[-0.05em] font-bold text-brand-dark max-w-[14ch]">
            {title}
          </h1>

          <p className="text-[10px] tracking-[0.15em] text-brand-gray uppercase font-bold max-w-[280px] mt-2">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-8">
            {[
              { label: metaLabels.role, value: role },
              { label: metaLabels.context, value: context },
              { label: metaLabels.year, value: year },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.25em] font-black text-brand-muted">
                  {item.label}
                </span>
                <span className="text-[13px] font-bold text-brand-dark tracking-tight">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual panel */}
        <div
          className="lg:col-span-7 w-full aspect-[16/10] rounded-xl overflow-hidden relative shadow-2xl ring-1 ring-border-subtle group"
          style={{ backgroundColor: bgColor }}
        >
          {heroImageSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={heroImageSrc}
              alt={`${title} preview`}
              className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-end p-10">
              <div className="flex flex-col gap-2 w-full">
                <div className="h-2 w-3/4 bg-white/30 rounded-full" />
                <div className="h-2 w-1/2 bg-white/20 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

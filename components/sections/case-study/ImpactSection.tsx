import { Container } from '../../layout/Container'

interface ImpactItem {
  stat: string
  label: string
}

interface ImpactSectionProps {
  items: ImpactItem[]
  sectionLabel?: string
}

/**
 * Impact & Outcomes section.
 */
export function ImpactSection({ items, sectionLabel = 'Impact & Outcomes' }: ImpactSectionProps) {
  return (
    <section className="w-full py-40 bg-brand-dark">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

        {/* Left — Label — same eyebrow style, on dark background */}
        <div className="md:col-span-3">
          <h2 className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase pt-2">
            {sectionLabel}
          </h2>
        </div>

        {/* Right — Stats grid */}
        <div className="md:col-span-9 lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-16">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-4 border-b border-white/10 pb-12">
                {/* Large stat number */}
                <span className="text-[52px] md:text-[68px] font-bold tracking-[-0.05em] leading-none text-white tabular-nums">
                  {item.stat}
                </span>
                {/* Label below — same eyebrow scale as section labels */}
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 leading-[1.6]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

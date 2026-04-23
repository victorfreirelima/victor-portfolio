import { Container } from '../layout/Container'

export function PhilosophySection({ data }: { data: any }) {
  const eyebrow = data?.eyebrow || 'LEADERSHIP ETHOS'
  const title = data?.title || 'Systematic precision over trend-driven design. Scalability over aesthetics.'
  const body = data?.body || 'With 17+ years in the industry, I have transitioned from visual craftsmanship to technical architecture and product leadership. My focus is on the underlying structures that allow digital products to evolve, scale, and provide measurable value at the enterprise level.'

  return (
    <section id="strategy" className="w-full py-40 bg-background border-t border-border-subtle/50">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
        <div className="md:col-span-3">
          <h2 className="text-[10px] tracking-[0.2em] font-bold text-brand-muted uppercase pt-2">
            {eyebrow}
          </h2>
        </div>
        <div className="md:col-span-9 lg:col-span-8 flex flex-col gap-12 lg:gap-14">
          <h3 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08] text-brand-dark">
            {title}
          </h3>
          <p className="text-sm md:text-[15px] leading-[1.8] text-brand-gray max-w-[580px] font-medium">
            {body}
          </p>
        </div>
      </Container>
    </section>
  )
}

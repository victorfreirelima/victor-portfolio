import { Container } from '../layout/Container'

export function PhilosophySection({ data }: { data: any }) {
  const eyebrow = data?.eyebrow || 'Como trabalho'
  const title = data?.title || 'UX/UI Design'
  const body: string[] = Array.isArray(data?.body) ? data.body : [data?.body || '']

  return (
    <section id="strategy" className="w-full py-16 md:py-24 bg-background border-t border-border-subtle/50">
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
          {body.map((paragraph, i) => <p key={i} className="text-base leading-[1.8] text-brand-gray max-w-[680px]">{paragraph}</p>)}
        </div>
      </Container>
    </section>
  )
}

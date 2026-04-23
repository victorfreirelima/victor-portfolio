import { Container } from '../../layout/Container'

interface CaseStudySectionProps {
  eyebrow: string
  title?: string
  body: string | string[]
  /** Set to true on the first section directly after the hero so the top border
   *  is omitted — mirrors how PhilosophySection flows from the projects grid. */
  first?: boolean
}

/**
 * Generic two-column text section.
 * Mirrors PhilosophySection exactly:
 *  — py-40 vertical padding (was py-24 — now corrected)
 *  — 3-col eyebrow / 9–8-col content (12-col grid)
 *  — gap-12 lg:gap-14 inside content column (was gap-8 lg:gap-10)
 *  — border-t border-border-subtle/50
 */
export function CaseStudySection({ eyebrow, title, body, first = false }: CaseStudySectionProps) {
  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <section className={`w-full py-40 bg-background ${first ? '' : 'border-t border-border-subtle/50'}`}>
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

        {/* Left — Section Label — same as PhilosophySection */}
        <div className="md:col-span-3">
          <h2 className="text-[10px] tracking-[0.2em] font-bold text-brand-muted uppercase pt-2">
            {eyebrow}
          </h2>
        </div>

        {/* Right — Content — same as PhilosophySection right column */}
        <div className="md:col-span-9 lg:col-span-8 flex flex-col gap-12 lg:gap-14">
          {title && (
            <h3 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08] text-brand-dark">
              {title}
            </h3>
          )}
          <div className="flex flex-col gap-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm md:text-[15px] leading-[1.8] text-brand-gray max-w-[580px] font-medium"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

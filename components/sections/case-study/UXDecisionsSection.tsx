import { Container } from '../../layout/Container'

interface UXDecision {
  title: string
  body: string
}

interface UXDecisionsSectionProps {
  decisions: UXDecision[]
  sectionLabel?: string
}

/**
 * UX Decisions section.
 * Mirrors TimelineSection exactly.
 */
export function UXDecisionsSection({ decisions, sectionLabel = 'UX Decisions' }: UXDecisionsSectionProps) {
  return (
    <section className="w-full py-32 bg-background border-t border-border-subtle/50 overflow-hidden">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

        {/* Left — Section Label — matches TimelineSection label block exactly */}
        <div className="md:col-span-3 pb-8 md:pb-0">
          <h2 className="text-[10px] tracking-[0.2em] font-bold text-brand-muted uppercase relative inline-block">
            <span className="absolute -top-3 left-0 w-8 h-[2px] bg-[#2E3C65]" />
            {sectionLabel}
          </h2>
        </div>

        {/* Right — Decision blocks */}
        <div className="md:col-span-9 lg:col-span-8 pb-8">
          <div className="flex flex-col relative w-full">
            {/* Vertical line — exact same position as TimelineSection */}
            <div className="absolute left-[80px] md:left-[120px] top-0 bottom-0 w-[0.5px] bg-border-subtle/50 z-0" />

            {decisions.map((decision, i) => (
              <div
                key={i}
                className="flex w-full items-start relative z-10 py-10 lg:py-12"
              >
                {/* Left — index number: same width as Timeline date column */}
                <div className="w-[80px] md:w-[120px] pr-8 text-right shrink-0 pt-1">
                  <span className="block text-[9px] uppercase tracking-widest text-brand-muted font-bold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Marker — exact same size/style as TimelineSection */}
                <div className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] -ml-[16px] md:-ml-[20px] bg-white ring-[1.5px] ring-border-subtle/40 rounded-md flex items-center justify-center shadow-sm shrink-0 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-dark opacity-70" />
                </div>

                {/* Content — same padding as Timeline right column */}
                <div className="flex-1 pl-10 md:pl-14">
                  <h4 className="text-lg md:text-xl font-bold tracking-tight text-brand-dark mb-2">
                    {decision.title}
                  </h4>
                  <p className="text-sm md:text-[15px] leading-[1.8] text-brand-gray font-medium max-w-[520px]">
                    {decision.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

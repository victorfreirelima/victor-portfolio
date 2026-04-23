import { Container } from '../layout/Container'
import { Hexagon, Circle, Square } from 'lucide-react'

export function TimelineSection({ data }: { data: any }) {
  const eyebrow = data?.eyebrow || 'STRUCTURED CAREER PATH'
  const timeline = data?.timeline?.length ? data.timeline : [
     { company: 'Cast Group', role: 'HEAD OF PRODUCT', isCurrent: true, startYear: 'Current' },
     { company: 'Clínica SiM', role: 'UX LEAD', startYear: '2019', endYear: '2021' },
     { company: 'Prolins', role: 'SENIOR PRODUCT DESIGNER', startYear: '2018', endYear: '2019' },
     { company: 'Sintaxe Digital', role: 'LEAD UX', startYear: '2012', endYear: '2018' },
     { company: 'Index Digital', role: 'SYSTEMS DESIGNER', startYear: '2008', endYear: '2012' },
  ]

  return (
    <section id="path" className="w-full py-32 bg-background border-t border-border-subtle/50 overflow-hidden">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        <div className="md:col-span-3 pb-8 md:pb-0">
           <h2 className="text-[10px] tracking-[0.2em] font-bold text-brand-muted uppercase relative inline-block">
             <span className="absolute -top-3 left-0 w-8 h-[2px] bg-[#2E3C65]" />
             {eyebrow}
           </h2>
        </div>
        
        <div className="md:col-span-9 lg:col-span-8 pb-20">
          <div className="flex flex-col relative w-full">
            {/* The vertical line - positioned at specific point */}
            <div className="absolute left-[80px] md:left-[120px] top-0 bottom-0 w-[0.5px] bg-border-subtle/50 z-0" />

            {timeline.map((entry: any, i: number) => {
              return (
                <div key={i} className="flex w-full items-start relative z-10 py-10 lg:py-12">
                  {/* Left Column - Dates (approx 80-120px) */}
                  <div className="w-[80px] md:w-[120px] pr-8 text-right shrink-0 pt-1">
                    {entry.isCurrent ? (
                       <span className="block text-[9px] uppercase tracking-widest text-[#2E3C65] font-black">{entry.startYear}</span>
                    ) : (
                       <span className="block text-[9px] uppercase tracking-widest text-brand-muted font-bold">{entry.startYear} — {entry.endYear}</span>
                    )}
                  </div>

                  {/* Marker symbol - Center Pillar */}
                  <div className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] -ml-[16px] md:-ml-[20px] bg-white ring-[1.5px] ring-border-subtle/40 rounded-md flex items-center justify-center shadow-sm shrink-0 z-20">
                    <div className="w-3.5 h-3.5 text-brand-dark opacity-90 flex items-center justify-center">
                       {i === 0 ? <Hexagon className="w-full h-full stroke-[2.5]" /> : i % 2 === 0 ? <Square className="w-full h-full stroke-[2.5]" /> : <Circle className="w-full h-full stroke-[2.5]" />}
                    </div>
                  </div>

                  {/* Right Column - Role/Company context */}
                  <div className="flex-1 pl-10 md:pl-14 pt-0">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-1">
                       <h4 className="text-lg md:text-xl font-bold tracking-tight text-brand-dark">
                        {entry.company}
                      </h4>
                      {entry.isCurrent && (
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse hidden md:block" />
                      )}
                    </div>
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-brand-muted uppercase">
                      {entry.role}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '../layout/Container'
import { ProjectCard } from '../ui/ProjectCard'

export function ProjectsGrid({ data, lang, sectionLabel }: { data: any; lang?: string; sectionLabel?: string }) {
  const projects = data?.projects || []

  return (
    <section id="systems" className="w-full py-24 bg-background">
      <Container>
        <div className="flex justify-between items-center mb-12 uppercase tracking-widest text-[10px] font-bold text-brand-muted">
          <h2>{sectionLabel}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project: any, i: number) => (
            <ProjectCard key={project._id || i} project={project} lang={lang} />
          ))}
        </div>
      </Container>
    </section>
  )
}

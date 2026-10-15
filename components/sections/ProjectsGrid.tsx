import { Container } from '../layout/Container'
import { ProjectCard } from '../ui/ProjectCard'

export function ProjectsGrid({ data, lang, sectionLabel, featuredLabel, otherLabel }: { data: any; lang?: string; sectionLabel?: string; featuredLabel?: string; otherLabel?: string }) {
  const projects = data?.projects || []
  const featured = projects.filter((project: { featured?: boolean }) => project.featured)
  const others = projects.filter((project: { featured?: boolean }) => !project.featured)
  const groups = featuredLabel && featured.length
    ? [{ label: featuredLabel, projects: featured }, { label: otherLabel, projects: others }]
    : [{ label: '', projects }]

  return (
    <section id="systems" className="w-full py-24 bg-background">
      <Container>
        <div className="flex justify-between items-center mb-12 uppercase tracking-widest text-[10px] font-bold text-brand-muted">
          <h2>{sectionLabel}</h2>
        </div>
        {groups.filter(group => group.projects.length).map(group => <div key={group.label} className="mb-14">
          {group.label && <h3 className="mb-6 text-lg font-semibold text-brand-dark">{group.label}</h3>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {group.projects.map((project: any, i: number) => (
            <ProjectCard key={project._id || i} project={project} lang={lang} />
          ))}
          </div>
        </div>)}
      </Container>
    </section>
  )
}

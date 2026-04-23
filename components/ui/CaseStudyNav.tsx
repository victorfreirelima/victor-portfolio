import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '../layout/Container'

interface CaseStudyNavProps {
  projectTitle: string
  lang?: string
  backLabel?: string
}

export function CaseStudyNav({ projectTitle, lang, backLabel = 'Back to Portfolio' }: CaseStudyNavProps) {
  const backHref = lang ? `/${lang}#systems` : '/#systems'

  return (
    <div className="w-full border-b border-border-subtle/50 bg-background">
      <Container className="flex items-center justify-between py-4">
        <Link
          href={backHref}
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted hover:text-brand-dark transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 transform transition-transform group-hover:-translate-x-1" />
          {backLabel}
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted/50 hidden md:block">
          {projectTitle}
        </span>
      </Container>
    </div>
  )
}

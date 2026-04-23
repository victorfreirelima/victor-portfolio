import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { ArrowRight } from 'lucide-react'

export function ProjectCard({ project, lang }: { project: any; lang?: string }) {
  const bgColor = project?.coverBackgroundColor || '#E5E7EB'
  const slug = project?.slug?.current || (project?.title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const href = project?.ctaLink || (lang ? `/${lang}/projects/${slug}` : `/projects/${slug}`)

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-border-subtle/50 transition-all duration-300 hover:shadow-md h-full"
    >
      {/* Top Image Area */}
      <div
        className="w-full h-[280px] md:h-[320px] relative transition-transform duration-500 overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {project?.coverImage || project?.staticImageUrl ? (
          <div className="relative w-full h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
            <Image
              src={(project?.coverImage ? urlForImage(project.coverImage)?.url() as string : null) || project?.staticImageUrl}
              alt={project?.title || 'Project mock'}
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full p-10">
            <div className="w-[140px] h-[200px] bg-white rounded-3xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2" />
          </div>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col flex-1 p-10 lg:p-14 gap-8">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-2xl tracking-tight text-brand-dark">
            {project?.title || 'Project Name'}
          </h3>
          {project?.tag && (
            <span className="text-[7.5px] uppercase tracking-[0.25em] font-black text-brand-muted border border-border-subtle/60 px-2 py-1.5 rounded-sm mt-1 whitespace-nowrap">
              {project.tag}
            </span>
          )}
        </div>

        <p className="text-[14px] leading-[1.7] text-brand-gray border-b border-border-subtle/30 pb-10 flex-1">
          {project?.shortDescription || 'Project description goes here.'}
        </p>

        {/* CTA row — presentational only, the whole card is the link */}
        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.15em] text-brand-dark group-hover:text-brand-gray transition-colors">
          <span>{project?.ctaLabel || 'TECHNICAL REVIEW'}</span>
          <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1 -translate-y-[0.5px]" />
        </div>
      </div>
    </Link>
  )
}


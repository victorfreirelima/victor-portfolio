import { Container } from '../layout/Container'
import { ArrowUpRight, Mail, Linkedin } from 'lucide-react'

export function ContactSection({ data }: { data: any }) {
  const eyebrow = data?.eyebrow || 'EXECUTIVE OUTREACH'
  const title = data?.title || 'Consulting on technical architecture and product strategy.'
  const email = data?.email || 'contact@victorfreire.com'
  const linkedin = data?.linkedin || 'https://linkedin.com/in/victorfreire'
  const additionalLinks = data?.additionalLinks || []
  
  return (
    <section id="contact" className="w-full py-32 bg-background border-t border-border-subtle/50">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-end">
        <div className="lg:col-span-12 flex flex-col gap-12 lg:gap-14">
          <div className="flex items-center gap-5">
            <div className="hairline w-12" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-muted uppercase">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[76px] leading-[1.02] tracking-[-0.05em] font-bold text-brand-dark max-w-[15ch]">
            {title}
          </h2>
        </div>
        
        <div className="lg:col-span-12 flex flex-wrap gap-x-12 gap-y-8 w-full mt-8">
          <a 
            href={`mailto:${email}`} 
            className="group flex justify-between items-center w-full md:max-w-xs border-b border-brand-dark/10 pb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark hover:border-brand-dark transition-all"
          >
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              Email
            </span>
            <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <a 
            href={linkedin} 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex justify-between items-center w-full md:max-w-xs border-b border-brand-dark/10 pb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark hover:border-brand-dark transition-all"
          >
            <span className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              LinkedIn
            </span>
            <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {additionalLinks.map((link: any, i: number) => (
             <a 
              key={i}
              href={link.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-between items-center w-full md:max-w-xs border-b border-brand-dark/10 pb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark hover:border-brand-dark transition-all"
            >
              <span>{link.platform}</span>
              <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

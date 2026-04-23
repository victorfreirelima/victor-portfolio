import Link from 'next/link'
import { Container } from './Container'
import { LangSwitcher } from '../ui/LangSwitcher'

interface HeaderProps {
  data: any
  lang?: string
  navItems?: { label: string; link: string }[]
}

export function Header({ data, lang, navItems }: HeaderProps) {
  const navigation = navItems || data?.navigationItems || [
    { label: 'Systems', link: '#systems' },
    { label: 'Strategy', link: '#strategy' },
    { label: 'Path', link: '#path' },
    { label: 'Contact', link: '#contact' },
  ]

  const homeHref = lang ? `/${lang}` : '/'

  return (
    <header className="w-full py-10 md:py-14 bg-background relative z-10">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-10">
        <Link href={homeHref} className="flex items-center gap-4 decoration-transparent group translate-y-[1px]">
          <div className="bg-brand-dark w-7 h-7 flex items-center justify-center text-background text-[11px] font-black tracking-tighter shrink-0 transition-transform group-hover:scale-105">
            VF
          </div>
          <span className="font-bold tracking-tight text-brand-dark text-base -translate-y-[1px]">
            {data?.personName || 'Victor Freire'}
          </span>
        </Link>

        <div className="flex items-center gap-8 md:gap-12">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.1em] text-brand-muted">
            {navigation.map((item: any, i: number) => (
              <Link
                key={i}
                href={item.link}
                className="hover:text-foreground transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher — only shown when inside a lang route */}
          {lang && (
            <div className="hidden md:flex items-center">
              <div className="w-px h-4 bg-border-subtle mr-8" />
              <LangSwitcher />
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}

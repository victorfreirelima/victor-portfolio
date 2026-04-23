'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LangSwitcher() {
  const pathname = usePathname()

  const isEN = pathname.startsWith('/en')

  // Swap the language prefix while preserving the rest of the path
  const enPath = isEN ? pathname : pathname.replace(/^\/pt-br/, '/en')
  const ptPath = isEN ? pathname.replace(/^\/en/, '/pt-br') : pathname

  return (
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em]">
      <Link
        href={enPath}
        className={
          isEN
            ? 'text-brand-dark'
            : 'text-brand-muted hover:text-brand-dark transition-colors duration-200'
        }
      >
        EN
      </Link>
      <span className="text-brand-muted opacity-30 select-none">|</span>
      <Link
        href={ptPath}
        className={
          !isEN
            ? 'text-brand-dark'
            : 'text-brand-muted hover:text-brand-dark transition-colors duration-200'
        }
      >
        PT
      </Link>
    </div>
  )
}

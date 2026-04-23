import { Container } from './Container'

interface FooterProps {
  data: any
  copyright?: string
}

export function Footer({ data, copyright }: FooterProps) {
  const copyrightText = copyright || data?.footerText || `© ${new Date().getFullYear()} VICTOR FREIRE. ALL SYSTEM RIGHTS RESERVED.`

  return (
    <footer className="w-full py-14 bg-brand-dark text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="opacity-80 text-center md:text-left">{copyrightText}</p>
      </Container>
    </footer>
  )
}

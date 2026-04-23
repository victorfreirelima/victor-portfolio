export type Lang = 'en' | 'pt-br'

export const translations = {
  en: {
    nav: {
      systems: 'Systems',
      strategy: 'Strategy',
      path: 'Path',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'HEAD OF PRODUCT & CTO',
      headline: 'Architecting robust digital infrastructures and product systems.',
      highlightWord: 'robust',
      supportingText: 'Specializing in high-scale SaaS, enterprise logic, and systematic design precision.',
    },
    logoStrip: {
      title: 'TRUSTED BY INDUSTRY LEADERS',
    },
    projectsGrid: {
      sectionLabel: 'SELECTED SYSTEMS',
      ctaLabel: 'TECHNICAL REVIEW',
      tags: ['LEAD DEVELOPER', 'UX / UI DESIGNER & DEVELOPER', 'PRODUCT DESIGNER & UX LEAD', 'PRODUCT DESIGNER / UX LEAD', 'LEAD PRODUCT DESIGNER', 'HEAD OF PRODUCT & DESIGN', 'HEAD OF PRODUCT & DESIGN', 'CTO & CO-FOUNDER', 'HEAD OF PRODUCT'],
      roles: ['Lead Developer', 'UX / UI Designer & Developer', 'Product Designer & UX Lead', 'Product Designer / UX Lead', 'Lead Product Designer', 'Head of Product & Design', 'Head of Product & Design', 'CTO & Co-founder', 'Head of Product'],
      projects: [
        {
          title: 'Slicecom',
          shortDescription: 'Enterprise-grade commission engine optimizing complex financial logic and multi-tier payout structures.',
        },
        {
          title: 'SIGA – Sabesp',
          shortDescription: 'Integrated access management system for the largest sanitation company in the Americas.',
        },
        {
          title: 'SIGAF',
          shortDescription: 'Integrated administrative and financial management system streamlining accounting and payment workflows.',
        },
        {
          title: 'Sistema Metrô',
          shortDescription: 'Internal attendance and user management portal for transit infrastructure.',
        },
        {
          title: 'MyPhone Finance',
          shortDescription: 'Digital wallet and financial hub integrated into a telecom ecosystem, featuring Open Finance capabilities.',
        },
        {
          title: 'CastForMe',
          shortDescription: 'Holistic corporate ERP streamlining contract management, user access profiles, and system settings.',
        },
        {
          title: 'Soficom Cloud',
          shortDescription: 'Managed infrastructure platform providing real-time health visibility for mid-market cloud operations.',
        },
        {
          title: 'Invoicecon',
          shortDescription: 'B2B invoicing and payment platform optimized for high-volume transaction reconciliation.',
        },
        {
          title: 'Cartão SiM',
          shortDescription: 'Healthcare benefits ecosystem managing complex eligibility and provider networks at scale.',
        },
      ],
    },
    philosophy: {
      eyebrow: 'LEADERSHIP ETHOS',
      title: 'Systematic precision over trend-driven design. Scalability over aesthetics.',
      body: 'With 17+ years in the industry, I have transitioned from visual craftsmanship to technical architecture and product leadership. My focus is on the underlying structures that allow digital products to evolve, scale, and provide measurable value at the enterprise level.',
    },
    timeline: {
      eyebrow: 'STRUCTURED CAREER PATH',
      entries: [
        { company: 'Cast Group', role: 'HEAD OF PRODUCT', isCurrent: true, startYear: 'Current' },
        { company: 'Clínica SiM', role: 'UX LEAD', startYear: '2019', endYear: '2021' },
        { company: 'Prolins', role: 'SENIOR PRODUCT DESIGNER', startYear: '2018', endYear: '2019' },
        { company: 'Sintaxe Digital', role: 'LEAD UX', startYear: '2012', endYear: '2018' },
        { company: 'Index Digital', role: 'SYSTEMS DESIGNER', startYear: '2008', endYear: '2012' },
      ],
    },
    contact: {
      eyebrow: 'EXECUTIVE OUTREACH',
      title: 'Consulting on technical architecture and product strategy.',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} VICTOR FREIRE. ALL SYSTEM RIGHTS RESERVED.`,
      status: 'SYSTEMS OPERATIONAL',
    },
    caseStudy: {
      eyebrowLabel: 'CASE STUDY',
      backLabel: 'Back to Portfolio',
      sections: {
        overview: 'Overview',
        problem: 'Problem & Context',
        approach: 'Approach / Thinking',
        solution: 'Solution',
        keyScreens: 'Key Screens',
        screensUnit: 'SCREENS',
        uxDecisions: 'UX Decisions',
        impact: 'Impact & Outcomes',
        reflection: 'Final Reflection',
      },
      metaLabels: {
        role: 'Role',
        context: 'Context',
        year: 'Year',
      },
    },
  },

  'pt-br': {
    nav: {
      systems: 'Sistemas',
      strategy: 'Estratégia',
      path: 'Trajetória',
      contact: 'Contato',
    },
    hero: {
      eyebrow: 'HEAD DE PRODUTO & CTO',
      headline: 'Arquitetando infraestruturas digitais robustas e sistemas de produto.',
      highlightWord: 'robustas',
      supportingText: 'Especialista em SaaS de alta escala, lógica empresarial e precisão sistemática de design.',
    },
    logoStrip: {
      title: 'REFERÊNCIAS DO MERCADO',
    },
    projectsGrid: {
      sectionLabel: 'SISTEMAS SELECIONADOS',
      ctaLabel: 'ANÁLISE TÉCNICA',
      tags: ['DESENVOLVEDOR LÍDER', 'UX / UI DESIGNER & DEVELOPER', 'PRODUCT DESIGNER & UX LEAD', 'PRODUCT DESIGNER / UX LEAD', 'LEAD PRODUCT DESIGNER', 'HEAD DE PRODUTO & DESIGN', 'HEAD DE PRODUTO & DESIGN', 'CTO & CO-FOUNDER', 'HEAD DE PRODUTO'],
      roles: ['Desenvolvedor Líder', 'UX / UI Designer & Developer', 'Product Designer & UX Lead', 'Product Designer / UX Lead', 'Lead Product Designer', 'Head de Produto & Design', 'Head de Produto & Design', 'CTO & Co-fundador', 'Head de Produto'],
      projects: [
        {
          title: 'Slicecom',
          shortDescription: 'Motor de comissões corporativo otimizando lógica financeira complexa e estruturas de pagamento em múltiplos níveis.',
        },
        {
          title: 'SIGA – Sabesp',
          shortDescription: 'Sistema integrado de gestão de acessos para a maior companhia de saneamento das Américas.',
        },
        {
          title: 'SIGAF',
          shortDescription: 'Sistema integrado de gestão administrativa e financeira simplificando fluxos contábeis e de pagamento.',
        },
        {
          title: 'Sistema Metrô',
          shortDescription: 'Portal interno de atendimento e gestão de usuários para infraestrutura de trânsito.',
        },
        {
          title: 'MyPhone Finance',
          shortDescription: 'Carteira digital e hub financeiro integrado a um ecossistema de telecom, com recursos de Open Finance.',
        },
        {
          title: 'CastForMe',
          shortDescription: 'ERP corporativo holístico otimizando a gestão de contratos, perfis de acesso de usuários e configurações do sistema.',
        },
        {
          title: 'Soficom Cloud',
          shortDescription: 'Plataforma de infraestrutura gerenciada fornecendo visibilidade de saúde em tempo real para operações em nuvem.',
        },
        {
          title: 'Invoicecon',
          shortDescription: 'Plataforma de faturamento e pagamentos B2B otimizada para reconciliação de transações de alto volume.',
        },
        {
          title: 'Cartão SiM',
          shortDescription: 'Ecossistema de benefícios de saúde gerenciando elegibilidade complexa e redes de prestadores em escala.',
        },
      ],
    },
    philosophy: {
      eyebrow: 'FILOSOFIA DE LIDERANÇA',
      title: 'Precisão sistemática acima do design por tendências. Escalabilidade acima da estética.',
      body: 'Com mais de 17 anos de indústria, migrei do artesanato visual para a arquitetura técnica e liderança de produto. Meu foco está nas estruturas subjacentes que permitem que produtos digitais evoluam, escalem e gerem valor mensurável no nível corporativo.',
    },
    timeline: {
      eyebrow: 'TRAJETÓRIA ESTRUTURADA',
      entries: [
        { company: 'Cast Group', role: 'HEAD DE PRODUTO', isCurrent: true, startYear: 'Atual' },
        { company: 'Clínica SiM', role: 'UX LEAD', startYear: '2019', endYear: '2021' },
        { company: 'Prolins', role: 'DESIGNER DE PRODUTO SÊNIOR', startYear: '2018', endYear: '2019' },
        { company: 'Sintaxe Digital', role: 'LEAD UX', startYear: '2012', endYear: '2018' },
        { company: 'Index Digital', role: 'DESIGNER DE SISTEMAS', startYear: '2008', endYear: '2012' },
      ],
    },
    contact: {
      eyebrow: 'CONTATO EXECUTIVO',
      title: 'Consultoria em arquitetura técnica e estratégia de produto.',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} VICTOR FREIRE. TODOS OS DIREITOS RESERVADOS.`,
      status: 'SISTEMAS OPERACIONAIS',
    },
    caseStudy: {
      eyebrowLabel: 'ESTUDO DE CASO',
      backLabel: 'Voltar ao Portfólio',
      sections: {
        overview: 'Visão Geral',
        problem: 'Problema & Contexto',
        approach: 'Abordagem / Raciocínio',
        solution: 'Solução',
        keyScreens: 'Telas Principais',
        screensUnit: 'TELAS',
        uxDecisions: 'Decisões de UX',
        impact: 'Impacto & Resultados',
        reflection: 'Reflexão Final',
      },
      metaLabels: {
        role: 'Cargo',
        context: 'Contexto',
        year: 'Período',
      },
    },
  },
} as const

export type TranslationDict = typeof translations.en

export function getT(lang: Lang) {
  return translations[lang] ?? translations.en
}

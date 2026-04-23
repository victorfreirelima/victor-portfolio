import { getCliClient } from 'sanity/cli'
import { createReadStream, existsSync } from 'fs'
import { basename, resolve } from 'path'
import { caseStudyContent } from '../lib/i18n/caseStudyContent'
import { translations } from '../lib/i18n/translations'

const client = getCliClient()
const lang = 'pt-br'
const t = translations[lang]

const KEY_SCREENS: Record<string, { src: string; caption: string }[]> = {
  slicecom: [
    { src: '/cs-slicecom-hero.png', caption: 'Dashboard principal: totais de comissão por agente, detalhamento de materiais, saldo a pagar e gráfico de barras mensal — tudo em um relance.' },
    { src: '/cs-slicecom-editor.png', caption: 'Editor de plano de comissão: nome do plano, período, periodicidade, modo de pagamento e tabelas de condições vinculadas.' },
    { src: '/cs-slicecom-agents.png', caption: 'Lista de agentes comissionados: tabela pesquisável com nome, telefone, e-mail, status ativo/inativo e menu de ações rápidas.' },
    { src: '/configuracoes.png', caption: 'Configurações do sistema: gerencie níveis de acesso de usuários, definições de critérios e configurações de fechamento em uma interface centralizada.' },
  ],
  sabesp: [
    { src: '/sabesp/home-do-usuario.png', caption: 'Dashboard principal do usuário: hub centralizado para solicitações de acesso, acompanhamento de status e navegação rápida entre módulos.' },
    { src: '/sabesp/gestao-de-modulos.png', caption: 'Interface de gestão de módulos: controle granular sobre sistemas corporativos, com indicadores de status e definições de nível de permissão.' },
    { src: '/sabesp/gestao-de-bloqueio.png', caption: 'Gestão de bloqueio periódico: módulo de segurança automatizado para auditoria e revogação de permissões secundárias.' },
    { src: '/sabesp/solicitacao-acesso.png', caption: 'Formulário de solicitação de acesso (Visão Gerente): fluxo de aprovação simplificado com seleção de permissões baseada em cargo.' },
    { src: '/sabesp/termos-confidencialidade.png', caption: 'Termos de confidencialidade integrados: reconhecimento digital obrigatório de responsabilidades e conformidade com a LGPD.' },
  ],
  sigaf: [
    { src: '/sigaf/inicio-cgesc.png', caption: 'Dashboard CGESC: Hub de coordenação administrativa com resumo de pendências, alertas e saúde do sistema.' },
    { src: '/sigaf/inicio-copag.png', caption: 'Dashboard COPAG: Visão de coordenação de pagamentos mostrando fluxos acionáveis e KPIs financeiros.' },
    { src: '/sigaf/visualizar-arquivo-ctb.png', caption: 'Visualizador CTB: Renderização inline de documentos contábeis permitindo verificação imediata sem downloads.' },
  ],
  metro: [
    { src: '/metro/login.png', caption: 'Login Seguro: Tema escuro desassociado desenhado especificamente para enfatizar a segurança do acesso corporativo.' },
    { src: '/metro/cadastrar-profissional.png', caption: 'Cadastro de Profissional: Formulário minimalista garantindo inserção de dados rápida e precisa.' },
    { src: '/metro/consultar-usuario-externo.png', caption: 'Consulta de Usuário Externo: Datagrid de alta densidade para busca rápida de perfis externos e parceiros.' },
    { src: '/metro/iniciar-atendimento.png', caption: 'Iniciar Atendimento: Visão operacional que provê o contexto completo do usuário antes do início do suporte.' },
    { src: '/metro/historico-de-alteracoes.png', caption: 'Histórico de Alterações: Trilha de auditoria cronológica imutável garantindo conformidade e transparência total.' },
  ],
  myphone: [
    { src: '/myphone/home.png', caption: 'Hub da Carteira: Dashboard principal exibindo limites de cartão, transações recentes e acesso rápido a serviços financeiros.' },
    { src: '/myphone/openfinance.png', caption: 'Integração Open Finance: Fluxo seguro e transparente para conectar contas bancárias externas ao ecossistema de telecom.' },
    { src: '/myphone/limites-cartoes.png', caption: 'Limites de Cartões: Visualização clara de crédito utilizado versus disponível, com estilo de feedback imediato.' },
    { src: '/myphone/editar-compra-eletronica.png', caption: 'Editor de Compras Eletrônicas: Modal inferios (bottom sheet) passo a passo auxiliando usuários a categorizar pagamentos recorrentes.' },
    { src: '/myphone/informe-de-rendimentos.png', caption: 'Informes de Rendimentos: Exibição automatizada e otimizada para mobile de documentos fiscais anuais direto no perfil.' },
  ],
  castforme: [
    { src: '/castforme/dashboard.png', caption: 'Dashboard Global: Visão geral macro dos módulos administrativos e pontos de acesso rápido.' },
    { src: '/castforme/editar-contratos.png', caption: 'Editor de Contratos: Interface tabular inline para modificações rápidas e múltiplas sem perder o contexto da lista.' },
    { src: '/castforme/perfis-de-acesso.png', caption: 'Perfis de Acesso: Matriz densa de gerenciamento de permissões projetada especificamente para monitores widescreen.' },
    { src: '/castforme/configuracoes.png', caption: 'Configurações do Sistema: Macro-controles centralizados para toda a infraestrutura do ERP.' },
  ]
}

const PROJECT_META: Record<string, any> = {
  slicecom: { role: 'Lead Developer', context: 'SaaS Corporativo', year: '2022 – 2024' },
  sabesp: { role: 'UX / UI Designer & Developer', context: 'Governo / Utilidade Pública', year: '2023 – 2024' },
  sigaf: { role: 'Product Designer & UX Lead', context: 'Governo / Finanças Públicas', year: '2024' },
  metro: { role: 'Product Designer / UX Lead', context: 'Trânsito Público / Sistemas Internos', year: '2023 – 2024' },
  myphone: { role: 'Lead Product Designer', context: 'Fintech / Telecomunicações', year: '2023' },
  castforme: { role: 'Head de Produto & Design', context: 'Corporativo / Plataformas Internas', year: '2024' },
}

async function uploadImageIfExists(relativePath: string) {
  // Try checking common locations since paths in KEY_SCREENS might have leading slashes
  const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath
  const fullPath = resolve(process.cwd(), 'public', cleanPath)
  
  if (!existsSync(fullPath)) {
    console.warn(`[WARN] Image not found locally: ${fullPath}`)
    return null
  }
  
  console.log(`Uploading ${basename(fullPath)}...`)
  const stream = createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, {
    filename: basename(fullPath)
  })
  return asset._id
}

async function seedDeep() {
  try {
    console.log('--- Seeding Philosophy, Contact and Timeline ---')
    await client.createOrReplace({
      _id: 'philosophy',
      _type: 'philosophy',
      eyebrow: t.philosophy.eyebrow,
      title: t.philosophy.title,
      body: t.philosophy.body
    })
    
    await client.createOrReplace({
      _id: 'contact',
      _type: 'contact',
      eyebrow: t.contact.eyebrow,
      title: t.contact.title,
      email: 'victor.freire.11@gmail.com',
      linkedin: 'https://linkedin.com/in/victor-freire',
    })

    // Delete existing timeline entries to avoid duplicates if re-run
    const existingTimelines = await client.fetch(`*[_type == "timeline"]._id`)
    for (const id of existingTimelines) {
      await client.delete(id)
    }

    let order = 1
    for (const entry of t.timeline.entries) {
      await client.create({
        _type: 'timeline',
        company: entry.company,
        role: entry.role,
        startYear: entry.startYear,
        endYear: (entry as any).endYear || undefined,
        isCurrent: !!(entry as any).isCurrent,
        label: entry.company.substring(0,2).toUpperCase(),
        order: order++
      })
    }
    console.log('Homepage text sections seeded!')

    console.log('--- Deep Seeding Projects (Case Studies) ---')
    // Get existing projects to patch them
    const existingProjects = await client.fetch(`*[_type == "project"]{_id, "slug": slug.current}`)
    
    for (const proj of existingProjects) {
      const slug = proj.slug
      const csc = (caseStudyContent as any)[slug]?.[lang]
      if (!csc) continue;

      const meta = PROJECT_META[slug] || {}
      
      console.log(`Patching Project: ${slug}`)
      
      // Upload Key Screens for this Project
      const uploadedScreens = []
      const screens = KEY_SCREENS[slug] || []
      
      for (const screen of screens) {
        const _id = await uploadImageIfExists(screen.src)
        if (_id) {
          uploadedScreens.push({
            _key: Math.random().toString(36).substring(7),
            image: { _type: 'image', asset: { _type: 'reference', _ref: _id } },
            caption: screen.caption
          })
        }
      }

      const uxDecisions = (csc.uxDecisions || []).map((dec: any) => ({
        _key: Math.random().toString(36).substring(7),
        title: dec.title,
        body: dec.body
      }))

      const impact = (csc.impact || []).map((imp: any) => ({
        _key: Math.random().toString(36).substring(7),
        stat: imp.stat,
        label: imp.label
      }))

      await client.patch(proj._id).set({
        caseStudy: {
          subtitle: csc.subtitle,
          role: meta.role,
          context: meta.context,
          year: meta.year,
          overview: csc.overview?.join('\n\n') || '',
          problem: csc.problem?.join('\n\n') || '',
          approach: csc.approach?.join('\n\n') || '',
          solution: csc.solution?.join('\n\n') || '',
          finalReflection: csc.finalReflection?.join('\n\n') || '',
          keyScreens: uploadedScreens,
          uxDecisions: uxDecisions,
          impact: impact
        }
      }).commit()

      console.log(`✓ successfully patched ${slug} case study.`)
    }

    console.log('✅ Deep Seed Complete!')
  } catch (error) {
    console.error('Deep Seed failed:', error)
  }
}

seedDeep()

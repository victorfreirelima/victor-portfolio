import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { basename, resolve } from 'path'

const client = getCliClient()

async function uploadImage(relativePath: string) {
  const fullPath = resolve(process.cwd(), relativePath)
  console.log(`Uploading ${basename(fullPath)}...`)
  const stream = createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, {
    filename: basename(fullPath)
  })
  return asset._id
}

async function seed() {
  try {
    console.log('Starting Sanity Seed Migration...')

    // 1. Upload Images
    console.log('--- Uploading Assets ---')
    const perfilId = await uploadImage('./public/perfil.png')
    
    const logoSabesp = await uploadImage('./public/logos/sabesp.svg')
    const logoBanco = await uploadImage('./public/logos/banco-amazonia.svg')
    const logoMetro = await uploadImage('./public/logos/metro2.png')

    const capaSlicecom = await uploadImage('./public/capas/capa-slicecom.png')
    const capaSabesp = await uploadImage('./public/capas/capa-sabesp.png')
    const capaBanco = await uploadImage('./public/capas/capa-bancoamazonia.png')
    const capaMetro = await uploadImage('./public/capas/capa-metro.png')
    const capaCastforme = await uploadImage('./public/capas/capa-castforme.png')

    // 2. Create Site Settings
    console.log('--- Creating Site Settings ---')
    const siteSettings = {
      _type: 'siteSettings',
      siteTitle: 'Victor Freire | Portfolio',
      personName: 'Victor Freire',
      heroEyebrow: 'HEAD DE PRODUTO & CTO',
      heroHeadline: 'Arquitetando infraestruturas digitais robustas e sistemas de produto.',
      heroSupportingText: 'Especialista em SaaS de alta escala, lógica empresarial e precisão sistemática de design.',
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: perfilId }
      },
      logoStripItems: [
        { _key: '1', name: 'Sabesp', image: { _type: 'image', asset: { _type: 'reference', _ref: logoSabesp } } },
        { _key: '2', name: 'Banco da Amazônia', image: { _type: 'image', asset: { _type: 'reference', _ref: logoBanco } } },
        { _key: '3', name: 'Metrô SP', image: { _type: 'image', asset: { _type: 'reference', _ref: logoMetro } } }
      ]
    }
    
    await client.createOrReplace({ _id: 'siteSettings', ...siteSettings })
    console.log('Site settings created successfully!')

    // 3. Create Projects
    console.log('--- Creating Projects ---')
    const projects = [
      {
        _type: 'project',
        title: 'Slicecom',
        slug: { _type: 'slug', current: 'slicecom' },
        tag: 'DESENVOLVEDOR LÍDER',
        shortDescription: 'Motor de comissões corporativo otimizando lógica financeira complexa e estruturas de pagamento em múltiplos níveis.',
        coverBackgroundColor: '#D1E5E0',
        ctaLabel: 'ANÁLISE TÉCNICA',
        order: 1,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: capaSlicecom } }
      },
      {
        _type: 'project',
        title: 'SIGA',
        slug: { _type: 'slug', current: 'sabesp' },
        tag: 'UX / UI DESIGNER & DEVELOPER',
        shortDescription: 'Sistema integrado de gestão de acessos para a maior companhia de saneamento das Américas.',
        coverBackgroundColor: '#0070B5',
        ctaLabel: 'ANÁLISE TÉCNICA',
        order: 2,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: capaSabesp } }
      },
      {
        _type: 'project',
        title: 'SIGAF',
        slug: { _type: 'slug', current: 'sigaf' },
        tag: 'PRODUCT DESIGNER & UX LEAD',
        shortDescription: 'Sistema integrado de gestão administrativa e financeira simplificando fluxos contábeis e de pagamento.',
        coverBackgroundColor: '#E2E8F0',
        ctaLabel: 'ANÁLISE TÉCNICA',
        order: 3,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: capaBanco } }
      },
      {
        _type: 'project',
        title: 'SMI',
        slug: { _type: 'slug', current: 'metro' },
        tag: 'PRODUCT DESIGNER / UX LEAD',
        shortDescription: 'Portal interno de atendimento e gestão de usuários para infraestrutura de trânsito.',
        coverBackgroundColor: '#1E293B',
        ctaLabel: 'ANÁLISE TÉCNICA',
        order: 4,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: capaMetro } }
      },
      {
        _type: 'project',
        title: 'MyPhone',
        slug: { _type: 'slug', current: 'myphone' },
        tag: 'LEAD PRODUCT DESIGNER',
        shortDescription: 'Carteira digital e hub financeiro integrado a um ecossistema de telecom, com recursos de Open Finance.',
        coverBackgroundColor: '#4F46E5',
        ctaLabel: 'ANÁLISE TÉCNICA',
        order: 5,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: capaBanco } }
      },
      {
        _type: 'project',
        title: 'CastForMe',
        slug: { _type: 'slug', current: 'castforme' },
        tag: 'HEAD DE PRODUTO & DESIGN',
        shortDescription: 'ERP corporativo holístico otimizando a gestão de contratos, perfis de acesso de usuários e configurações do sistema.',
        coverBackgroundColor: '#10B981',
        ctaLabel: 'ANÁLISE TÉCNICA',
        order: 6,
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: capaCastforme } }
      }
    ]

    for (const p of projects) {
      // Create new documents (Sanity Auto-generates IDs when _id is not explicitly set)
      await client.create(p)
      console.log(`✓ Created project: ${p.title}`)
    }

    console.log('====================================')
    console.log('✅ Seed migration completed successfully!')
    console.log('====================================')
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

seed()

import { getCliClient } from 'sanity/cli'
import { translations } from '../lib/i18n/translations'

const client = getCliClient()

async function finalPolish() {
  console.log('--- Final Polish Starting ---')
  const tEn = translations.en

  // 1. Full Settings Sync
  console.log('Final sync for siteSettings-en...')
  await client.patch('siteSettings-en').set({
    language: 'en',
    heroEyebrow: tEn.hero.eyebrow,
    heroHeadline: tEn.hero.headline,
    heroSupportingText: tEn.hero.supportingText,
    logoStripTitle: tEn.logoStrip.title,
    siteTitle: 'Victor Freire | UI/UX Designer',
    personName: 'Victor Freire',
    roleTitle: tEn.hero.eyebrow
  }).commit()

  // 2. Full Philosophy Sync
  console.log('Final sync for philosophy-en...')
  await client.patch('philosophy-en').set({
    language: 'en',
    eyebrow: tEn.philosophy.eyebrow,
    title: tEn.philosophy.title,
    body: tEn.philosophy.body
  }).commit()

  // 3. Full Contact Sync
  console.log('Final sync for contact-en...')
  await client.patch('contact-en').set({
    language: 'en',
    eyebrow: tEn.contact.eyebrow,
    title: tEn.contact.title
  }).commit()

  console.log('✅ Final Polish Complete!')
}

finalPolish().catch(console.error)

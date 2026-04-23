import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: false,
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
    }),
    defineField({
      name: 'roleTitle',
      title: 'Role Title',
      type: 'string',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSupportingText',
      title: 'Hero Supporting Text',
      type: 'text',
    }),
    defineField({
      name: 'heroHighlightWord',
      title: 'Hero Highlight Word',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'link', type: 'string', title: 'Link (#id or url)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'logoStripTitle',
      title: 'Logo Strip Title',
      type: 'string',
    }),
    defineField({
      name: 'logoStripItems',
      title: 'Logo Strip Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Company Name' },
            { name: 'image', type: 'image', title: 'Logo Image', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string',
      description: 'Full copyright line shown in the footer (e.g. © 2026 VICTOR FREIRE. ALL SYSTEM RIGHTS RESERVED.)',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'SEO Image (Open Graph)',
      type: 'image',
      options: { hotspot: true },
    }),
    
    // --- BILINGUAL UI LABELS TO REPLACE translations.ts ---

    defineField({ name: 'projectsEyebrow', title: 'Projects Section Eyebrow', type: 'string' }),
    defineField({ name: 'timelineEyebrow', title: 'Timeline Section Eyebrow', type: 'string' }),
    defineField({ name: 'contactEyebrow', title: 'Contact Section Eyebrow', type: 'string' }),
    defineField({ name: 'philosophyEyebrow', title: 'Philosophy Section Eyebrow', type: 'string' }),
    defineField({ name: 'footerStatus', title: 'Footer Status Label', type: 'string' }),
    
    // Case Study Global Labels
    defineField({ name: 'caseStudyBackLabel', title: 'Case Study Back Label', type: 'string' }),
    defineField({ name: 'caseStudyEyebrowLabel', title: 'Case Study Eyebrow', type: 'string' }),
    defineField({
      name: 'caseStudyMetaLabels',
      title: 'Case Study Meta Labels',
      type: 'object',
      fields: [
        { name: 'role', type: 'string', title: 'Role Label' },
        { name: 'context', type: 'string', title: 'Context Label' },
        { name: 'year', type: 'string', title: 'Year Label' }
      ]
    }),
    defineField({
      name: 'caseStudySections',
      title: 'Case Study Section Titles',
      type: 'object',
      fields: [
        { name: 'overview', type: 'string', title: 'Overview' },
        { name: 'problem', type: 'string', title: 'Problem' },
        { name: 'approach', type: 'string', title: 'Approach' },
        { name: 'solution', type: 'string', title: 'Solution' },
        { name: 'keyScreens', type: 'string', title: 'Key Screens' },
        { name: 'uxDecisions', type: 'string', title: 'UX Decisions' },
        { name: 'impact', type: 'string', title: 'Impact' },
        { name: 'reflection', type: 'string', title: 'Reflection' },
        { name: 'screensUnit', type: 'string', title: 'Screens Unit (e.g. screens)' }
      ]
    })
  ],
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.custom((slug, context) => {
        return true // Disabling strict unique validation to allow same-slug-different-lang
      }).warning('Same slug may be used in other languages')
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'staticImageFallback',
      title: 'Static Image Fallback (URL)',
      type: 'string',
      description: 'Used as a fallback if no coverImage is set. E.g., /cs-slicecom-hero.png',
    }),
    defineField({
      name: 'coverBackgroundColor',
      title: 'Cover Background Color (Hex)',
      type: 'string',
      description: 'E.g., #F0F4F8',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'TECHNICAL REVIEW',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
    }),
    // ─── Case Study Fields ───────────────────────────────────────────────────
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      fields: [
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'context', title: 'Context (e.g. SaaS, B2B)', type: 'string' }),
        defineField({ name: 'year', title: 'Year / Timeline', type: 'string' }),
        defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'staticHeroImageFallback', title: 'Static Hero Image Fallback (URL)', type: 'string' }),
        defineField({ name: 'overview', title: 'Overview', type: 'text' }),
        defineField({ name: 'problem', title: 'Problem & Context', type: 'text' }),
        defineField({ name: 'approach', title: 'Approach / Thinking', type: 'text' }),
        defineField({ name: 'solution', title: 'Solution', type: 'text' }),
        defineField({
          name: 'keyScreens',
          title: 'Key Screens',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screen Image', type: 'image', options: { hotspot: true } }),
              defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            ],
          }],
        }),
        defineField({
          name: 'uxDecisions',
          title: 'UX Decisions',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Body', type: 'text' }),
            ],
          }],
        }),
        defineField({
          name: 'impact',
          title: 'Impact / Outcomes',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'stat', title: 'Stat / Metric', type: 'string' }),
              defineField({ name: 'label', title: 'Label', type: 'string' }),
            ],
          }],
        }),
        defineField({ name: 'finalReflection', title: 'Final Reflection', type: 'text' }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order, Asc',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

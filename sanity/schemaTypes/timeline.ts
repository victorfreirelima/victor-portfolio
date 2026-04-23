import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'timeline',
  title: 'Timeline Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: false,
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'label',
      title: 'Icon/Marker Label',
      type: 'string',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'string',
      description: 'Leave blank if current',
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is Current Role?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
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

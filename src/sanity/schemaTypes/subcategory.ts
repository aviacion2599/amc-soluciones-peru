import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}] }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
})

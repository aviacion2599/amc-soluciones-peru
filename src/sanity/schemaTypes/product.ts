import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}] }),
    defineField({ name: 'subcategory', title: 'Subcategory', type: 'reference', to: [{type: 'subcategory'}] }),
    defineField({ name: 'brand', title: 'Brand', type: 'reference', to: [{type: 'brand'}] }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ name: 'currency', title: 'Currency', type: 'string', initialValue: 'PEN' }),
    defineField({ name: 'isFeatured', title: 'Is Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'isNew', title: 'Is New', type: 'boolean', initialValue: false }),
    defineField({ name: 'isBestSeller', title: 'Is Best Seller', type: 'boolean', initialValue: false }),
    defineField({ name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
    
    // Arrays for related entities
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          {name: 'alt', type: 'string', title: 'Alternative text'},
          {name: 'isPrimary', type: 'boolean', title: 'Is Primary'}
        ]
      }]
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'url', type: 'string', title: 'URL or ID'},
          {name: 'provider', type: 'string', title: 'Provider', initialValue: 'local'},
          {name: 'title', type: 'string', title: 'Title'}
        ]
      }]
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Title'},
          {name: 'description', type: 'text', title: 'Description'},
          {name: 'icon', type: 'string', title: 'Icon (Lucide)'}
        ]
      }]
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'group', type: 'string', title: 'Group', initialValue: 'General'},
          {name: 'key', type: 'string', title: 'Key'},
          {name: 'value', type: 'string', title: 'Value'}
        ]
      }]
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Name'},
          {name: 'description', type: 'text', title: 'Description'}
        ]
      }]
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [{
        type: 'file',
        fields: [
          {name: 'title', type: 'string', title: 'Title'},
          {name: 'type', type: 'string', title: 'Type'}
        ]
      }]
    }),
    
    // SEO
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'seoKeywords', title: 'SEO Keywords', type: 'string' }),
  ],
})

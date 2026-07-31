import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Amigable (Slug)', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'sku', title: 'SKU (Código)', type: 'string' }),
    defineField({ name: 'summary', title: 'Resumen Corto', type: 'text' }),
    defineField({ name: 'description', title: 'Descripción Detallada', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'category', title: 'Categoría', type: 'reference', to: [{type: 'category'}] }),
    defineField({ name: 'subcategory', title: 'Subcategoría', type: 'reference', to: [{type: 'subcategory'}] }),
    defineField({ name: 'brand', title: 'Marca', type: 'reference', to: [{type: 'brand'}] }),
    defineField({ name: 'price', title: 'Precio referencial', type: 'number' }),
    defineField({ name: 'currency', title: 'Moneda', type: 'string', initialValue: 'PEN' }),
    defineField({ name: 'isFeatured', title: '¿Es Destacado?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isNew', title: '¿Es Nuevo?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isBestSeller', title: '¿Es Más Vendido?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isActive', title: '¿Está Activo?', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Orden de aparición', type: 'number', initialValue: 0 }),
    
    // Arrays for related entities
    defineField({
      name: 'images',
      title: 'Imágenes (Fotos)',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          {name: 'alt', type: 'string', title: 'Texto alternativo (Para SEO)'},
          {name: 'isPrimary', type: 'boolean', title: '¿Es la imagen principal?'}
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
          {name: 'url', type: 'string', title: 'URL o ID del video'},
          {name: 'provider', type: 'string', title: 'Proveedor (youtube, vimeo, local)', initialValue: 'local'},
          {name: 'title', type: 'string', title: 'Título del video'}
        ]
      }]
    }),
    defineField({
      name: 'features',
      title: 'Características Rápidas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Título'},
          {name: 'description', type: 'text', title: 'Descripción'},
          {name: 'icon', type: 'string', title: 'Icono (Ej. CheckCircle2)'}
        ]
      }]
    }),
    defineField({
      name: 'specifications',
      title: 'Especificaciones Técnicas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'group', type: 'string', title: 'Grupo (Ej. General, Físicas)', initialValue: 'General'},
          {name: 'key', type: 'string', title: 'Característica (Ej. Peso)'},
          {name: 'value', type: 'string', title: 'Valor (Ej. 5 kg)'}
        ]
      }]
    }),
    defineField({
      name: 'applications',
      title: 'Aplicaciones (Usos)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Nombre del uso'},
          {name: 'description', type: 'text', title: 'Descripción'}
        ]
      }]
    }),
    defineField({
      name: 'documents',
      title: 'Documentos Descargables (PDFs)',
      type: 'array',
      of: [{
        type: 'file',
        fields: [
          {name: 'title', type: 'string', title: 'Título del documento'},
          {name: 'type', type: 'string', title: 'Tipo (ficha, manual, etc)'}
        ]
      }]
    }),
    
    // SEO
    defineField({ name: 'seoTitle', title: 'Título SEO', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'Descripción SEO', type: 'text' }),
    defineField({ name: 'seoKeywords', title: 'Palabras clave SEO', type: 'string' }),
  ],
})

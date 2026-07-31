import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', description: 'e.g., whatsapp, phone, email, address, hours, social' }),
    defineField({ name: 'value', title: 'Value', type: 'text', description: 'JSON string' }),
  ],
})

import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import subcategory from './subcategory'
import brand from './brand'
import post from './post'
import faq from './faq'
import testimonial from './testimonial'
import siteConfig from './siteConfig'

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  category,
  subcategory,
  brand,
  post,
  faq,
  testimonial,
  siteConfig,
]

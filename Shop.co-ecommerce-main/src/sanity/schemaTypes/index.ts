import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../schemas/product'
import payment from '../schemas/payment'
import tracking from '../schemas/tracking'
import order from '../schemas/order'
import { category } from '../schemas/category'
import { review } from '../schemas/review'
import { style } from '../schemas/style'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product, order, payment, tracking, category, review, style
  
  ],
}

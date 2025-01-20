// schemas/product.ts
import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the product.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: 'The date and time the product was created.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A URL-friendly identifier generated from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'The regular price of the product.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'The rating of the product (0 to 5).',
      validation: (Rule) => Rule.required().min(0).max(5),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      description: 'The original price (before any discount) if applicable.',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A detailed description of the product.',
      validation: (Rule) => Rule.required(),
    }),
    // HYBRID IMAGES FIELD: either an uploaded image (asset) or an external URL
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              title: 'Upload Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'url',
              title: 'External Image URL',
              type: 'url',
              description: 'Provide a URL for an external image if not uploading.',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Short description for accessibility (optional).',
            },
          ],
          preview: {
            select: {
              media: 'asset',
              title: 'alt',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      description: 'Available colors for the product.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      description: 'Available sizes for the product.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Product tags for search/filtering.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isNewArrival',
      title: 'Is New Arrival',
      type: 'boolean',
      description: 'Mark as a new arrival product.',
      initialValue: false,
    }),
    defineField({
      name: 'isTopSelling',
      title: 'Is Top Selling',
      type: 'boolean',
      description: 'Mark as a top-selling product.',
      initialValue: false,
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
      description: 'Inventory count for this product.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'productDetails',
      title: 'Product Details',
      type: 'array',
      description: 'List of details or features of the product.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      description: 'Select a category for the product.',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

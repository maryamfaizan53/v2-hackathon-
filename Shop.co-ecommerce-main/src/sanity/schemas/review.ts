// schemas/review.ts
import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the reviewer.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Review rating (0 to 5).',
      validation: (Rule) => Rule.required().min(0).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      description: 'Review comment.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Date when the review was posted.',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});

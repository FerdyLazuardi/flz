import { defineField, defineType, defineArrayMember } from 'sanity'

export const infiniteGalleryType = defineType({
  name: 'infiniteGallery',
  title: 'Infinite Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title (e.g., "Main Infinite Gallery")',
      initialValue: 'Main Infinite Gallery',
    }),
    defineField({
      name: 'images',
      title: 'Batch Gallery Images',
      type: 'array',
      description: 'You can drag and drop multiple images here to batch upload!',
      of: [
        defineArrayMember({
          name: 'galleryImage',
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Optional alternative text for screen readers.',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})
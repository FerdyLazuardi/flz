import { defineField, defineType } from 'sanity';

export const designShowcaseType = defineType({
  name: 'designShowcase',
  title: 'Design Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this showcase item',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video (Direct Link)', value: 'video' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Direct link to an mp4 or webm file',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Link to a YouTube video',
      hidden: ({ document }) => document?.mediaType !== 'youtube',
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Label',
      type: 'string',
      description: 'e.g., UI_EXPLORATION, MOTION_TEST',
    }),
    defineField({
      name: 'size',
      title: 'Size / Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Auto (Original Size)', value: 'auto' },
          { title: 'Normal', value: 'normal' },
          { title: 'Tall', value: 'tall' },
          { title: 'Wide', value: 'wide' },
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'rotation',
      title: 'Base Rotation (degrees)',
      type: 'number',
      description: 'e.g., -2, 3, 0. Keep it small.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'image',
    },
  },
});

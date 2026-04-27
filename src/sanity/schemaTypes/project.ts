import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Title',
      type: 'string', 
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'slug', 
      title: 'Slug',
      type: 'slug', 
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: 'coverImage', 
      title: 'Cover Image',
      type: 'image', 
      options: { hotspot: true },
      fields: [
        { 
          name: 'alt', 
          type: 'string',
          title: 'Alternative Text'
        }
      ]
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      description: 'Optional logo of the client (e.g. Amartha)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2024',
    }),
    defineField({ 
      name: 'order', 
      title: 'Order', 
      type: 'number',
      description: 'Used for manual sorting (smaller numbers appear first).',
      initialValue: 0
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video Learning', value: 'Video Learning' },
          { title: 'Media Interactive', value: 'Media Interactive' },
          { title: 'Education Game', value: 'Education Game' },
          { title: 'AI-Enhanced Learning', value: 'AI-Enhanced Learning' },
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: 'excerpt', 
      title: 'Excerpt',
      type: 'text', 
      rows: 3,
      description: 'A short summary of the project for the gallery.'
    }),
    defineField({ 
      name: 'content', 
      title: 'Content',
      type: 'array', 
      of: [
        { type: 'block' }, 
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.',
            }
          ]
        }
      ] 
    }),
    defineField({ 
      name: 'techStack', 
      title: 'Tech Stack',
      type: 'array', 
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({ 
      name: 'demoUrl', 
      title: 'Demo / Live URL',
      type: 'url' 
    }),
    defineField({ 
      name: 'youtubeUrl', 
      title: 'YouTube Embed URL',
      type: 'url', 
      description: 'URL for YouTube/Vimeo Showreel (e.g., https://www.youtube.com/embed/...)' 
    }),
    defineField({ 
      name: 'demoEmbed', 
      title: 'Interactive Embed URL',
      type: 'url', 
      description: 'Articulate/HTML5 URL for Click-to-Play iframe' 
    }),
    defineField({
      name: 'gallery',
      title: 'Media Gallery',
      type: 'array',
      of: [
        { type: 'image', options: { hotspot: true } },
        { 
          type: 'file', 
          title: 'Video',
          options: { accept: 'video/*' }
        }
      ],
      description: 'Additional screenshots or process videos'
    }),
    defineField({ 
      name: 'featured', 
      title: 'Legacy Featured (Deprecated)',
      type: 'boolean', 
      initialValue: false,
      description: 'Use the Visibility option below instead. (Kept for backward compatibility)'
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility / Tampilan Project',
      type: 'string',
      options: {
        list: [
          { title: 'Featured Project (Tampil di Home & halaman Projects)', value: 'featured' },
          { title: 'Selected Project (Tampil di halaman Projects aja)', value: 'selected' }
        ],
        layout: 'radio'
      },
      initialValue: 'selected',
      description: 'Pilih di mana project ini akan ditampilkan.'
    }),
    defineField({
      name: 'softwareLogos',
      title: 'Software/Tool Logos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload logos of software used (e.g., Premiere, After Effects). They will appear on the right side of the expanded view.'
    }),
    defineField({ 
      name: 'publishedAt', 
      title: 'Published at',
      type: 'datetime' 
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'category',
      order: 'order',
    },
    prepare({ title, media, subtitle, order }) {
      return {
        title: `${order !== undefined ? `[${order}] ` : ''}${title}`,
        media,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    { 
      title: 'Manual Order (Asc)', 
      name: 'manualOrder', 
      by: [{ field: 'order', direction: 'asc' }] 
    },
    { 
      title: 'Published (Newest)', 
      name: 'publishedDesc', 
      by: [{ field: 'publishedAt', direction: 'desc' }] 
    }
  ],
});

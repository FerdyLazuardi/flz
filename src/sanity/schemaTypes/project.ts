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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Instructional Design', value: 'instructional-design' },
          { title: 'Multimedia Production', value: 'multimedia' },
          { title: 'AI-Enhanced Learning', value: 'ai-learning' },
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
      of: [{ type: 'block' }, { type: 'image' }] 
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
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional screenshots or process images'
    }),
    defineField({ 
      name: 'featured', 
      title: 'Featured',
      type: 'boolean', 
      initialValue: false,
      description: 'Show this project on the homepage'
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
    },
  },
  orderings: [
    { 
      title: 'Published (Newest)', 
      name: 'publishedDesc', 
      by: [{ field: 'publishedAt', direction: 'desc' }] 
    }
  ],
});

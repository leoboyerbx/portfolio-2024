import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    homepage: defineCollection({
      type: 'page',
      source: 'homepage/*.md',
      schema: z.object({
        locale: z.string(),
        title: z.string(),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
          locale: z.string(),
          status: z.enum(['draft', 'published']),
          name: z.string(),
        slug: z.string(),
        baseline: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        links: z.array(z.object({
            name: z.string(),
            url: z.string(),
        })),
        thumbnail: z.string().editor({ input: 'media' }),
        skillsTitle: z.string(),
        skills: z.array(z.string()),
        video: z.object({
          id: z.number(),
          title: z.string(),
          embed: z.string(),
          description: z.string(),
        }),
      }),
    }),
  },
})

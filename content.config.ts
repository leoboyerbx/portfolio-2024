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
  },
})

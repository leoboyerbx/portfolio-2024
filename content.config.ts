import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    homepage: defineCollection({
      type: 'page',
      source: 'homepage/*.yml',
      schema: z.object({
        hero: z.object({
          beforeName: z.string(),
          name: z.string(),
          afterName: z.string(),
          beforeAdj: z.string(),
          vowelPrefix: z.string(),
          afterAdj: z.string(),
          adjectives: z.array(
            z.object({
              text: z.string(),
              color1: z.string(),
              color2: z.string(),
              effect: z.string(),
            }),
          ),
        }),
        intro: z.string(),
      }),
    }),
  },
})

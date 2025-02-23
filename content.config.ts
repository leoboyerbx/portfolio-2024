import { defineCollection, defineContentConfig, z } from '@nuxt/content'

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
                createdAt: z.date(),
                updatedAt: z.date(),
                name: z.string(),
                slug: z.string(),
                baseline: z.string(),
                links: z.array(z.object({
                    title: z.string(),
                    url: z.string(),
                    newTab: z.boolean(),
                })),
                thumbnail: z.string().editor({ input: 'media' }),
                images: z.array(z.string()).editor({ input: 'media' }),
                // video: z.object({
                //     id: z.number(),
                //     title: z.string(),
                //     embed: z.string(),
                //     description: z.string(),
                // }),
            }),
        }),
    },
})

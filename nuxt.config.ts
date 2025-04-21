// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: true },
    ssr: true,
    modules: [
        '@nuxtjs/seo',
        '@nuxt/content',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
        '@nuxt/image',
        '@nuxthub/core',
        '@nuxtjs/plausible',
        '@layoutaid/nuxt',
        '@nuxt/icon',
    ],
    css: ['@unocss/reset/tailwind.css', '~/assets/global.scss'],
    unocss: {
        content: {
            pipeline: {
                include: [
                    /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
                    'content/**/*.{yml,md}',
                ],
            },
        },
    },
    plausible: {
        domain: 'leoboyer.dev',
        apiHost: 'https://stats.pnk.studio',
        proxy: true,
    },
    hub: {},
    content: {
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    image: {
        // provider: 'cloudflare',
        // cloudflare: {
        //     baseURL: 'https://leoboyer.dev',
        // },
        // domains: ['api.leoboyer.dev'],
    },
    icon: {
        serverBundle: {
            collections: ['uil'],
        },
    },
    i18n: {
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        lazy: true,
        locales: [
            {
                code: 'en',
                language: 'en-US',
                name: 'English',
                file: 'en.json',
            },
            {
                code: 'fr',
                language: 'fr-FR',
                name: 'Français',
                file: 'fr.json',
            },
        ],
        baseUrl: 'https://www.leoboyer.dev',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            fallbackLocale: 'en',
        },
        bundle: {
            optimizeTranslationDirective: false,
        },
    },
    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        },
        // pageTransition: { name: 'page', mode: 'out-in' },
    },

    // nitro: {
    //     prerender: {
    //         routes: [
    //             '/api/resume',
    //             '/api/resume.pdf',
    //             '/api/fr/resume.pdf',
    //             '/api/en/resume.pdf',
    //         ],
    //         autoSubfolderIndex: false,
    //     },
    // },
})

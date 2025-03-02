// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

import { presetColumns } from 'unocss-preset-columns'

export default defineConfig({
    shortcuts: {
        'pnk-grid': 'grid grid-cols-14',
    },
    rules: [
        ['clip-base', { 'clip-path': ' polygon(0 0, 100% 0, 100% 100%, 0 100%)' }],
        ['clip-left', { 'clip-path': ' polygon(0 0, 0 0, 0 100%, 0 100%)' }],
        [
            'clip-right',
            { 'clip-path': ' polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        ],
        ['clip-top', { 'clip-path': ' polygon(0 0, 100% 0, 100% 0, 0 0)' }],
        [
            'clip-bottom',
            { 'clip-path': ' polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        ],
    ],
    theme: {
        colors: {
            theme: '#fce14b',
        },
        fontFamily: {
            sans: ['Satoshi', 'sans-serif'],
            serif: ['Fragen', 'serif'],
        },

        easing: {
            // Duplicates are for gsap-style easings
            'sine-in': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
            'sine-out': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
            'sine-in-out': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

            'power2-in': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
            'power2-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            'power2-in-out': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',

            'power3-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            'power3-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            'power3-in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',

            'power4-in': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
            'power4-out': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            'power4-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',

            'power5-in': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            'power5-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
            'power5-in-out': 'cubic-bezier(0.86, 0, 0.07, 1)',

            'expo-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
            'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
            'expo-in-out': 'cubic-bezier(1, 0, 0, 1)',

            'circ-in': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
            'circ-out': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            'circ-in-out': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',

            'back-in': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
            'back-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            'back-in-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetColumns(14),
        presetIcons(),
        presetWebFonts({
            fonts: {},
        }),
        presetTypography({
            cssExtend: {
                h1: {
                    'font-weight': 100,
                },
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
})

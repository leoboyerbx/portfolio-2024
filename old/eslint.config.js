import antfu from '@antfu/eslint-config'

export default antfu({
    typescript: true,
    vue: true,
    unocss: true,
    rules: {
        'node/prefer-global/process': 'off',
        'style/indent': ['error', 4],
        'vue/attributes-order': ['error', {
            alphabetical: false,
        }],
        'vue/html-self-closing': ['warn', {
            html: {
                void: 'never',
                normal: 'any',
                component: 'always',
            },
            svg: 'always',
            math: 'always',
        }],
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 3,
            },
            multiline: {
                max: 1,
            },
        }],
        // 'json/indent': ['error', 4],
    },
})

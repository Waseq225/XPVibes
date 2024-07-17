import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
    {
        languageOptions: { globals: globals.browser },
        env: {
            browser: true,
            node: true,
            es6: true,
        },
    },
    pluginJs.configs.recommended,
]

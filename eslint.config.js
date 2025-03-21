const eslint = require('@eslint/js')
const globals = require('globals')

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.es2015,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  eslint.configs.recommended,
  {
    rules: {
      'arrow-parens': [
        'warn',
        'as-needed',
      ],
      'arrow-spacing': 'error',
      'block-spacing': 'error',
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'comma-style': [
        'error',
        'last',
      ],
      'eqeqeq': [
        'error',
        'always',
      ],
      'generator-star-spacing': [
        'error',
        {
          'after': true,
          'before': false,
        },
      ],
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1,
        },
      ],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'no-class-assign': 'error',
      'no-console': 'off',
      'no-extra-parens': [
        'warn',
        'all',
        {
          'nestedBinaryExpressions': false,
        },
      ],
      'no-implicit-coercion': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1,
          'maxEOF': 1,
        },
      ],
      'no-spaced-func': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'quotes': [
        'error',
        'single',
      ],
      'semi': [
        'error',
        'never',
      ],
      'space-before-blocks': 'error',
    },
  },
]

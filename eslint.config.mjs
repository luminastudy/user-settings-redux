import agentConfig from 'eslint-config-agent'
import publishablePackageJson from 'eslint-config-publishable-package-json'
import tsParser from '@typescript-eslint/parser'

export default [
  ...agentConfig,
  publishablePackageJson,
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Disable overly strict rules for library packages
      'single-export/single-export': 'off',
      'ddd/require-spec-file': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'no-optional-chaining/no-optional-chaining': 'off',
      'import/no-namespace': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]

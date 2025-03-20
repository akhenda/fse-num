import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const ignores = [
  'dist',
  '**/*.md',
  'codegen.ts',
  '**/__generated__/**/*.{ts,tsx}',
  '**/components/ui/*.{ts,tsx}', // ignore to maintain compat with shadcn
];

export default tseslint.config(
  { ignores: [...ignores] },

  /**
   * eslint-plugin-prettier
   */
  { extends: [eslintPluginPrettierRecommended] },

  /**
   * Original Vite Rules
   */
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  /**
   * eslint-plugin-react
   */
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: { react },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    rules: {
      // ... any rules you want
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    // ... others are omitted for brevity
  },

  /**
   * elsint-plugin-import
   */
  // {
  //   files: ['**/*.{js,mjs,cjs}'],
  //   extends: [importPlugin.flatConfigs.recommended],
  //   languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  //   rules: {
  //     'no-unused-vars': 'off',
  //     'import/no-dynamic-require': 'warn',
  //     'import/no-nodejs-modules': 'warn',
  //   },
  // },

  /**
   * eslint-plugin-sonarjs
   */
  { extends: [sonarjs.configs.recommended], rules: {} },

  /**
   * eslint-plugin-unused-imports
   */
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
    },
  },

  /**
   * eslint-plugin-simple-import-sort
   */
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'import/order': 'off', // this rules needs to be turned off for simple sort to work
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js builtins. You could also generate this regex if you use a `.js` config.
            // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            ],
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],
            // Side effect imports.
            ['^\\u0000'],
            // Internal packages.
            [
              '^(~|@|@root|@src|@types|@assets|@config|@components|@hooks|@screens|@pages|@services|@store|@state|@utils|@theme|@navigation|@redux|@helpers|@api|@models|@controllers|@middleware|@workers|@HOCs|@containers|@models|@providers)(/.*|$)',
            ],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },

  /**
   * Our custom rules
   */
  {
    rules: {
      'no-console': 'error',
    },
  },
);

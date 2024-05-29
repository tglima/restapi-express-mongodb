module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:security/recommended-legacy',
    'plugin:node/recommended',
  ],
  plugins: ['prettier', 'security', 'import', 'node'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'security/detect-bidi-characters': 'warn',
    'security/detect-buffer-noassert': 'warn',
    'node/no-unsupported-features/es-syntax': 'off',
  },
};

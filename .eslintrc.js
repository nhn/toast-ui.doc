module.exports = {
  extends: [
    'tui/es6',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'jest-enzyme'
  ],
  plugins: ['prettier', 'react', 'jest'],
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    jsx: true
  },
  rules: {
    indent: ['error', 2],
    'no-console': 0,
    'no-process-env': 0,
    'no-sync': 0,

    /* jest */
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  globals: {
    graphql: true,
    tui: true,
    webpackManifest: true,
    'jest/globals': true
  }
};

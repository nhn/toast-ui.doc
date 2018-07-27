module.exports = {
  'extends': ['plugin:react/recommended', 'tui'],
  'plugins': ["react"],
  'env': {
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'jsx': true
  },
  'rules': {
    'indent': ['error', 2],
    'no-console': 0,
    'no-process-env': 0,
    'no-sync': 0
  },
  'globals': {
    'graphql': true,
    'tui': true,
    'webpackManifest': true
  }
};

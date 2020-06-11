module.exports = {
  transform: {
    '.(js|jsx)': '<rootDir>/__tests__/jest-preprocess.js'
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^(?!.*\\.module\\.scss$).*\\.scss$': '<rootDir>/__mocks__/styleMock.js'
  },
  testRegex: '(\\.(test|spec))\\.(jsx|js)$',
  testPathIgnorePatterns: ['/node_modules/', '/.cache/'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/__tests__/jest-setup.js']
};

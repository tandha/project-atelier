module.exports = {
  // verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node']
};
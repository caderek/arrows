module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  preset: 'ts-jest',
  setupFiles: ['core-js'],
}

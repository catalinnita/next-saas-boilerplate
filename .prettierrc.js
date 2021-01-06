const { prettierConfig } = require('poetic')

module.exports = {
  ...prettierConfig,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  // Add custom rules here
  // printWidth: 100,
}

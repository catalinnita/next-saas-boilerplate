module.exports = {
  extends: ["./node_modules/poetic/config/eslint/eslint-config.js", "plugin:jsx-a11y/recommended"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "import/no-extraneous-dependencies": "off",
    quotes: [2, "singlequote"],
  },
  plugins: ["jsx-a11y"],
}

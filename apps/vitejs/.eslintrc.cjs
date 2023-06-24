/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "no-unused-vars": "off",
    "react-refresh/only-export-components": "warn",
  },
};

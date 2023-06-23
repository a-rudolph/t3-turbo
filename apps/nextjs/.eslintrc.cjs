/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["next"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@next/next/no-html-link-for-pages": "warn",
  },
};

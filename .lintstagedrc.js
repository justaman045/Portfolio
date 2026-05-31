const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{ts,tsx,md,mdx,js,jsx,json,mjs}": "prettier --ignore-unknown --write",
};

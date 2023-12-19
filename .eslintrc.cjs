/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["*.cjs", "*.js", "dist", "node_modules", "examples", "scripts"],
  rules: {
    eqeqeq: "error",
    quotes: "off",
    "prefer-arrow-callback": "error",
    "no-var": "error",
    "no-eval": "error",
    "no-alert": "warn",
    "no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
    "no-extra-semi": "error",
    "no-return-await": "error",
    "no-new-wrappers": "error",
    "no-await-in-loop": "error",
    "no-useless-catch": "error",
    "no-useless-return": "warn",
    "no-param-reassign": "error",
    "no-unneeded-ternary": "error",

    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/__generated__/**/*"],
      rules: {
        "@typescript-eslint/ban-types": "off",
      },
    },
  ],
};

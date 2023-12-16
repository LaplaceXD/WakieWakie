/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: { browser: true, es2020: true },
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: ["./../.eslintrc.cjs", "plugin:react-hooks/recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["*.config.*"],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};

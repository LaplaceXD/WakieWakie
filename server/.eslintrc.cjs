/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: { node: true },
  extends: ["./../.eslintrc.cjs", "plugin:drizzle/recommended", "plugin:prettier/recommended"],
  plugins: ["drizzle"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};

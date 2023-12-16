/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: { node: true },
  extends: ["./../.eslintrc.cjs"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};

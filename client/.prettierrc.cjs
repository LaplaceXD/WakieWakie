/**
 * @type {import('prettier').Config}
 */
module.exports = {
  ...require("../.prettierrc.cjs"),
  plugins: ["prettier-plugin-tailwindcss"],
};

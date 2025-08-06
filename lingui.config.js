/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "km"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["app", "components"],
      exclude: ["**/node_modules/**"],
    },
  ],
  format: "po",
};
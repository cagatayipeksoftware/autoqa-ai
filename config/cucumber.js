module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "hooks/**/*.ts",
      "step-definitions/**/*.ts"
    ],
    paths: [
      "features/**/*.feature"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ]
  }
};
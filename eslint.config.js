"use strict";

const globals = require("globals");
const { config, map } = require("@susisu/eslint-config");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  ...map({ files: ["src/**/*.ts"] }, [
    config.tsTypeChecked(),
    {
      languageOptions: {
        sourceType: "module",
        parserOptions: {
          project: "./tsconfig.json",
        },
        globals: {
          ...globals.es2021,
        },
      },
    },
  ]),
  ...map({ files: ["*.js"] }, [
    config.js(),
    {
      languageOptions: {
        sourceType: "commonjs",
        globals: {
          ...globals.es2021,
          ...globals.node,
        },
      },
    },
  ]),
  prettierConfig,
];

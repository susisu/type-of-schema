import globals from "globals";
import { config, map } from "@susisu/eslint-config";
import prettierConfig from "eslint-config-prettier";

export default [
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
        sourceType: "module",
        globals: {
          ...globals.es2021,
          ...globals.node,
        },
      },
    },
  ]),
  prettierConfig,
];

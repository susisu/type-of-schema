"use strict";

module.exports = {
  plugins: ["prettier"],
  overrides: [
    {
      files: ["*.{ts,tsx}"],
      extends: [
        "@susisu/eslint-config/preset/ts-types",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:eslint-comments/recommended",
      ],
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      env: {
        es6: true,
      },
      rules: {
        "prettier/prettier": "error",
        "eslint-comments/no-unused-disable": "error",
      },
    },
    {
      files: ["*.js"],
      extends: [
        "@susisu/eslint-config/preset/es",
        "prettier",
        "plugin:eslint-comments/recommended",
      ],
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: "script",
      },
      env: {
        es6: true,
        node: true,
      },
      rules: {
        "prettier/prettier": "error",
        "eslint-comments/no-unused-disable": "error",
      },
    },
  ],
};

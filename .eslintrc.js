"use strict";

module.exports = {
  "overrides": [
    {
      "files"        : ["*.{ts,tsx}"],
      "extends"      : ["@susisu/eslint-config/preset/ts-types"],
      "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType" : "module",
        "project"    : "./tsconfig.json",
      },
      "env": {
        "es6": true,
      },
    },
    {
      "files"        : ["*.js"],
      "extends"      : ["@susisu/eslint-config/preset/es"],
      "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType" : "script",
      },
      "env": {
        "es6" : true,
        "node": true,
      },
    },
  ],
};

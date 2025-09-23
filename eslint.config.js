import globals from "globals";
import { config } from "@susisu/eslint-config";

export default config(
  {
    tsconfigRootDir: import.meta.dirname,
  },
  [
    {
      files: ["src/**/*.ts"],
      languageOptions: {
        globals: {
          ...globals.es2024,
        },
      },
    },
    {
      files: ["*.js"],
      languageOptions: {
        globals: {
          ...globals.es2024,
          ...globals.node,
        },
      },
    },
  ],
);

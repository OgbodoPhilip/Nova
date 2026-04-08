import { defineConfig, globalIgnores } from "eslint/config";
import nextnova from "eslint-config-next/core-web-nova";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextnova,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

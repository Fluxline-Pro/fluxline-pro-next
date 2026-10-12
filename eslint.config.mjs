// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local Claude Code worktrees carry a full copy of the repo.
    ".claude/**",
    // Vendored Claude Design DSM template bundles (reference material, not shipped code).
    "docs/dsm_v1_0/**",
  ]),
  // The Azure Functions API is CommonJS by design (Functions v4 classic model, `module.exports`), as are
  // the Node tooling scripts and the jest config, so `require()` is the correct import form there.
  {
    files: ["api/**/*.js", "scripts/**/*.js", "jest.config.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;

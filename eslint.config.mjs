import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Enhanced accessibility rules (jsx-a11y already included in Next.js config)
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/alt-text": "error",
      // Allow simple mount/initialization effects that call setState
      "react-hooks/set-state-in-effect": "off",
      // Allow require() usage in Node scripts like scripts/create-blog-post.js
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettierConfig,
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

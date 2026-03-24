import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

const appFiles = ["**/*.{js,jsx,ts,tsx}"];
const ignoredFiles = [
  ".next/**",
  "out/**",
  "build/**",
  "coverage/**",
  "node_modules/**",
  "next-env.d.ts",
  "app/blog/BlogPostAnalytics.tsx",
  "app/components/KeyboardShortcuts.tsx",
  "app/components/Skills/TechGraph.tsx",
  "components/BentoFeaturedProjects.tsx",
  "components/BentoMetric.tsx",
  "components/ContactForm.tsx",
  "components/ContactSection.tsx",
  "components/Footer.tsx",
  "components/Hero.tsx",
  "components/KineticHeadline.tsx",
  "components/LiquidGlassCard.tsx",
  "components/LiquidGlassSkillsMap.tsx",
  "components/LiveActivity.tsx",
  "components/Navbar.tsx",
  "components/PageWrapper.tsx",
  "components/Testimonials.tsx",
  "components/github/**",
  "components/hero/**",
  "components/layout/**",
  "components/nav/**",
  "components/projects/**",
  "components/reusable/**",
  "components/sections/**",
  "components/shared/**",
  "components/skills/**",
];

export default [
  {
    ignores: ignoredFiles,
  },
  js.configs.recommended,
  {
    files: appFiles,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: true,
      },
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsEslintPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "import/no-unresolved": "off",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/alt-text": "error",
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettierConfig,
];

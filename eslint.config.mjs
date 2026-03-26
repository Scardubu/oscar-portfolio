import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const maintainedFiles = [
  'app/**/*.{js,jsx,ts,tsx}',
  'components/AboutSection.tsx',
  'components/ContactSection.tsx',
  'components/Footer.tsx',
  'components/GlassCard.tsx',
  'components/HeroSection.tsx',
  'components/MetricCard.tsx',
  'components/NavBar.tsx',
  'components/ProjectCard.tsx',
  'components/ProjectsSection.tsx',
  'data/**/*.ts',
  'hooks/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',
  'next.config.ts',
  'playwright.config.ts',
  'tests/e2e/**/*.ts',
];

const nextConfigs = compat
  .config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  })
  .map((config) => ({
    ...config,
    files: maintainedFiles,
  }));

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**', 'dist/**', 'docs/deployment-history/**', 'app/components/**', 'tests/portfolio.spec.ts'],
  },
  ...nextConfigs,
  {
    files: maintainedFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];

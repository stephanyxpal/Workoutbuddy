import js from "@eslint/js";
import { fileURLToPath } from "url";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  // ...compat.extends(js.configs.recommended),
  // ...compat.extends(tseslint.configs.recommended),

  {
    files: ["**/*.ts", "**/*.tsx"], // Apply to all TypeScript & JSX files
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        // project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/react-in-jsx-scope": "off", // No need to import React in Next.js
      "react/jsx-uses-react": "off", // Prevents false React import errors
    },
  },
];

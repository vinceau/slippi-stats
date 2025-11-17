import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/", "**/*.test.{js,jsx,ts,tsx}", "build/**", "stats-old/**"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // TypeScript rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/interface-name-prefix": "off",

      // React rules
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Import sorting
      "simple-import-sort/sort": "warn",

      // General rules
      "no-console": "off",
      "sort-keys": "off",
      "sort-imports": "off",
    },
  },
  {
    extends: [js.configs.recommended],
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  }
);

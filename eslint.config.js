import js from "@eslint/js";
import eslint from "eslint-plugin-eslint-plugin";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  { files: ["**/*.{js,ts}"] },
  { ignores: ["**/lib/", "**/tmp/", "**/sandbox/"] },
  js.configs["recommended"],
  ...ts.configs["recommended"],
  eslint.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true, ignoreProperties: true }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "eslint-plugin/require-meta-docs-description": "error",
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];

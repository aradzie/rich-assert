import { type ESLint, type Linter } from "eslint";
import { noDeepEqualWithPrimitives } from "./rules/no-deep-equal-with-primitives.js";
import { preferRichAssert } from "./rules/prefer-rich-assert.js";
import { preferShorthand } from "./rules/prefer-shorthand.js";

const plugin = {
  meta: {
    name: "eslint-plugin-rich-assert",
    version: "0.0.0",
  },
  configs: {},
  rules: {
    "prefer-rich-assert": preferRichAssert,
    "prefer-shorthand": preferShorthand,
    "no-deep-equal-with-primitives": noDeepEqualWithPrimitives,
  },
} satisfies ESLint.Plugin;

Object.assign(plugin.configs!, {
  recommended: {
    files: [
      "*.test.js",
      "*.test.mjs",
      "*.test.cjs",
      "*.test.jsx",
      "*.test.ts",
      "*.test.mts",
      "*.test.cts",
      "*.test.tsx",
    ],
    plugins: {
      richAssert: plugin,
    },
    rules: {
      "rich-assert/prefer-rich-assert": "error",
      "rich-assert/prefer-shorthand": "error",
      "rich-assert/no-deep-equal-with-primitives": "error",
    },
  } satisfies Linter.Config,
});

export default plugin;

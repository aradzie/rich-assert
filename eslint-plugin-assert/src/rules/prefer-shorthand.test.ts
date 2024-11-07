import { RuleTester } from "eslint";
import { test } from "node:test";
import { preferShorthand } from "./prefer-shorthand.js";

test("prefer-shorthand", () => {
  const tester = new RuleTester({
    languageOptions: { ecmaVersion: "latest" },
  });

  tester.run("prefer-shorthand", preferShorthand, {
    valid: [{ code: "const foo = 'bar';" }],
    invalid: [],
  });
});

import { RuleTester } from "eslint";
import { test } from "node:test";
import { preferRichAssert } from "./prefer-rich-assert.js";

test("prefer-rich-assert", () => {
  const tester = new RuleTester({
    languageOptions: { ecmaVersion: "latest" },
  });

  tester.run("prefer-rich-assert", preferRichAssert, {
    valid: [{ code: "const foo = 'bar';" }],
    invalid: [{ code: "const foo = 'baz';", output: 'const foo = "bar";', errors: 1 }],
  });
});

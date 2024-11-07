import { RuleTester } from "eslint";
import { test } from "node:test";
import { noDeepEqualWithPrimitives } from "./no-deep-equal-with-primitives.js";

test("no-deep-equals-with-primitives", () => {
  const tester = new RuleTester({
    languageOptions: { ecmaVersion: "latest" },
  });

  tester.run("no-deep-equals-with-primitives", noDeepEqualWithPrimitives, {
    valid: [{ code: "const foo = 'bar';" }],
    invalid: [],
  });
});

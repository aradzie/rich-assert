import { type Rule } from "eslint";

export const noDeepEqualWithPrimitives = {
  meta: {
    type: "problem",
    docs: {
      description: "Do not use primitive values with `deepEqual`.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.type === "CallExpression") {
          const { callee } = node;
          if (callee.type === "Identifier") {
            if (
              callee.name === "deepEqual" ||
              callee.name === "deepStrictEqual" ||
              callee.name === "notDeepEqual" ||
              callee.name === "notDeepStrictEqual"
            ) {
              if (node.arguments.length === 2) {
                const [actual, expected] = node.arguments;
                if (actual.type === "Literal" && actual.value === "null") {
                  //
                }
                if (expected.type === "Literal" && expected.value === "null") {
                  //
                }
              }
              context.report({
                node,
                message: `Replace method ${callee.name}`,
                fix: (fixer) => {
                  return fixer.replaceText(node, "is");
                },
              });
            }
          }
        }
      },
    } satisfies Rule.NodeListener;
  },
} satisfies Rule.RuleModule;

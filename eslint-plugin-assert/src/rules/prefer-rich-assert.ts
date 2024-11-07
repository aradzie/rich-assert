import { type Rule } from "eslint";
import { type VariableDeclaration } from "estree";

export const preferRichAssert = {
  meta: {
    type: "problem",
    docs: {
      description: "Prefer rich assert to node.js assert.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        const { parent, id, init } = node;
        if ((parent as VariableDeclaration).kind === "const") {
          if (id.type === "Identifier" && id.name === "foo") {
            if (init && init.type === "Literal" && init.value !== "bar") {
              context.report({
                node,
                message: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
                data: {
                  notBar: String(init.value),
                },
                fix(fixer) {
                  return fixer.replaceText(init, '"bar"');
                },
              });
            }
          }
        }
      },
      CallExpression(node) {
        if (node.type === "CallExpression") {
          const { callee } = node;
          if (callee.type === "Identifier") {
            if (
              callee.name === "strictEqual" ||
              callee.name === "deepStrictEqual" ||
              callee.name === "notStrictEqual" ||
              callee.name === "notDeepStrictEqual"
            ) {
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

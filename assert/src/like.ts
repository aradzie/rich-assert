import { AssertionError } from "node:assert";

export const like = (actual: unknown, expected: unknown, message?: string) => {
  const where: Where = { path: [], expected: undefined, actual: undefined };
  if (!checkLike(actual, expected, where)) {
    throw new AssertionError({
      message: message || "Objects are not like at " + formatWhere(where),
      actual: where.actual,
      expected: where.expected,
      operator: "like",
      stackStartFn: like,
    });
  }
};

type Where = {
  path: Breadcrumb[];
  expected: any;
  actual: any;
};

type Breadcrumb =
  | Readonly<{ type: "property"; name: string }>
  | Readonly<{ type: "index"; index: number }>
  | Readonly<{ type: "key"; key: any }>;

function checkLike(actual: any, expected: any, where: Where): boolean {
  where.actual = actual;
  where.expected = expected;

  if (actual == null || expected == null) {
    return actual == expected;
  }

  if (typeof actual !== "object" || typeof expected !== "object") {
    return Object.is(actual, expected);
  }

  if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  }

  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (actual.length !== expected.length) {
      where.path.push({ type: "property", name: "length" });
      where.actual = actual.length;
      where.expected = expected.length;
      return false;
    }
    for (let index = 0; index < expected.length; index++) {
      where.path.push({ type: "index", index });
      if (!checkLike(actual[index], expected[index], where)) {
        return false;
      }
      where.path.pop();
    }
    return true;
  }

  if (expected instanceof Set && actual instanceof Set) {
    if (actual.size !== expected.size) {
      where.path.push({ type: "property", name: "size" });
      where.actual = actual.size;
      where.expected = expected.size;
      return false;
    }
    for (const value of expected.values()) {
      if (!actual.has(value)) {
        where.actual = undefined;
        where.expected = value;
        return false;
      }
    }
    return true;
  }

  if (expected instanceof Map && actual instanceof Map) {
    if (actual.size !== expected.size) {
      where.path.push({ type: "property", name: "size" });
      where.actual = actual.size;
      where.expected = expected.size;
      return false;
    }
    for (const key of expected.keys()) {
      where.path.push({ type: "key", key });
      if (!actual.has(key)) {
        where.actual = undefined;
        where.expected = expected.get(key);
        return false;
      }
      if (!checkLike(actual.get(key), expected.get(key), where)) {
        return false;
      }
      where.path.pop();
    }
    return true;
  }

  for (const name of Object.keys(expected)) {
    where.path.push({ type: "property", name });
    if (!(name in actual)) {
      where.actual = undefined;
      where.expected = expected[name];
      return false;
    }
    if (!checkLike(actual[name], expected[name], where)) {
      return false;
    }
    where.path.pop();
  }
  return true;
}

function formatWhere(where: Where): string {
  let result = "<root>";
  for (const breadcrumb of where.path) {
    switch (breadcrumb.type) {
      case "property":
        result = result + `.${breadcrumb.name}`;
        break;
      case "index":
        result = result + `[${breadcrumb.index}]`;
        break;
      case "key":
        result = result + `['${breadcrumb.key}']`;
        break;
    }
  }
  return result;
}

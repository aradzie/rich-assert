import { AssertionError } from "node:assert";

export const isTrue = (actual: unknown, message?: string): asserts actual is true => {
  if (actual !== true) {
    throw new AssertionError({
      message,
      actual,
      expected: true,
      operator: "===",
      stackStartFn: isTrue,
    });
  }
};

export const isNotTrue = (actual: unknown, message?: string) => {
  if (actual === true) {
    throw new AssertionError({
      message,
      actual,
      expected: true,
      operator: "!==",
      stackStartFn: isNotTrue,
    });
  }
};

export const isFalse = (actual: unknown, message?: string): asserts actual is false => {
  if (actual !== false) {
    throw new AssertionError({
      message,
      actual,
      expected: false,
      operator: "===",
      stackStartFn: isFalse,
    });
  }
};

export const isNotFalse = (actual: unknown, message?: string) => {
  if (actual === false) {
    throw new AssertionError({
      message,
      actual,
      expected: false,
      operator: "!==",
      stackStartFn: isNotFalse,
    });
  }
};

export const isNull = (actual: unknown, message?: string): asserts actual is null => {
  if (actual !== null) {
    throw new AssertionError({
      message,
      actual,
      expected: null,
      operator: "===",
      stackStartFn: isNull,
    });
  }
};

export const isNotNull = (actual: unknown, message?: string) => {
  if (actual === null) {
    throw new AssertionError({
      message,
      actual,
      expected: null,
      operator: "!==",
      stackStartFn: isNotNull,
    });
  }
};

export const isUndefined = (actual: unknown, message?: string): asserts actual is undefined => {
  if (actual !== undefined) {
    throw new AssertionError({
      message,
      actual,
      expected: undefined,
      operator: "===",
      stackStartFn: isUndefined,
    });
  }
};

export const isNotUndefined = (actual: unknown, message?: string) => {
  if (actual === undefined) {
    throw new AssertionError({
      message,
      actual,
      expected: undefined,
      operator: "!==",
      stackStartFn: isNotUndefined,
    });
  }
};

export const isNullish = (actual: unknown, message?: string): asserts actual is null | undefined => {
  if (actual != null) {
    throw new AssertionError({
      message,
      actual,
      expected: null,
      operator: "==",
      stackStartFn: isNullish,
    });
  }
};

export const isNotNullish = (actual: unknown, message?: string) => {
  if (actual == null) {
    throw new AssertionError({
      message,
      actual,
      expected: null,
      operator: "!=",
      stackStartFn: isNotNullish,
    });
  }
};

export type WithIncludes = { includes(needle: unknown): boolean };
export type WithHas = { has(needle: unknown): boolean };

export const includes = (haystack: string | WithIncludes | WithHas, needle: unknown, message?: string) => {
  if (typeof haystack === "string") {
    if (typeof needle !== "string") {
      throw new TypeError("Expected both arguments to be of the string type");
    }
    if (!haystack.includes(needle)) {
      throw new AssertionError({
        message: message || "Expected to include",
        actual: haystack,
        operator: "includes",
        stackStartFn: includes,
      });
    }
    return;
  }
  if (haystack != null && "includes" in haystack && typeof haystack.includes === "function") {
    if (!haystack.includes(needle)) {
      throw new AssertionError({
        message: message || "Expected to include",
        actual: haystack,
        operator: "includes",
        stackStartFn: includes,
      });
    }
    return;
  }
  if (haystack != null && "has" in haystack && typeof haystack.has === "function") {
    if (!haystack.has(needle)) {
      throw new AssertionError({
        message: message || "Expected to include",
        actual: haystack,
        operator: "includes",
        stackStartFn: includes,
      });
    }
    return;
  }
  throw new TypeError("Expected an object that has method 'includes' or 'has'");
};

export const doesNotInclude = (haystack: string | WithIncludes | WithHas, needle: unknown, message?: string) => {
  if (typeof haystack === "string") {
    if (typeof needle !== "string") {
      throw new TypeError("Expected both arguments to be of the string type");
    }
    if (haystack.includes(needle)) {
      throw new AssertionError({
        message: message || "Expected to not include",
        actual: haystack,
        operator: "doesNotInclude",
        stackStartFn: doesNotInclude,
      });
    }
    return;
  }
  if (haystack != null && "includes" in haystack && typeof haystack.includes === "function") {
    if (haystack.includes(needle)) {
      throw new AssertionError({
        message: message || "Expected to not include",
        actual: haystack,
        operator: "doesNotInclude",
        stackStartFn: doesNotInclude,
      });
    }
    return;
  }
  if (haystack != null && "has" in haystack && typeof haystack.has === "function") {
    if (haystack.has(needle)) {
      throw new AssertionError({
        message: message || "Expected to not include",
        actual: haystack,
        operator: "doesNotInclude",
        stackStartFn: doesNotInclude,
      });
    }
    return;
  }
  throw new TypeError("Expected an object that has method 'includes' or 'has'");
};

export type WithLength = { readonly length: number };
export type WithSize = { readonly size: number };

export const isEmpty = (actual: string | WithLength | WithSize, message?: string) => {
  if (typeof actual === "string") {
    if (actual !== "") {
      throw new AssertionError({
        message: message || "Expected to be empty",
        actual,
        operator: "isEmpty",
        stackStartFn: isEmpty,
      });
    }
    return;
  }
  if (actual != null && "length" in actual && typeof actual.length === "number") {
    if (actual.length !== 0) {
      throw new AssertionError({
        message: message || "Expected to be empty",
        actual,
        operator: "isEmpty",
        stackStartFn: isEmpty,
      });
    }
    return;
  }
  if (actual != null && "size" in actual && typeof actual.size === "number") {
    if (actual.size !== 0) {
      throw new AssertionError({
        message: message || "Expected to be empty",
        actual,
        operator: "isEmpty",
        stackStartFn: isEmpty,
      });
    }
    return;
  }
  throw new TypeError("Expected an object that has property 'length' or 'size'");
};

export const isNotEmpty = (actual: string | WithLength | WithSize, message?: string) => {
  if (typeof actual === "string") {
    if (actual === "") {
      throw new AssertionError({
        message: message || "Expected to be not empty",
        actual,
        operator: "isNotEmpty",
        stackStartFn: isNotEmpty,
      });
    }
    return;
  }
  if (actual != null && "length" in actual && typeof actual.length === "number") {
    if (actual.length === 0) {
      throw new AssertionError({
        message: message || "Expected to be not empty",
        actual,
        operator: "isNotEmpty",
        stackStartFn: isNotEmpty,
      });
    }
    return;
  }
  if (actual != null && "size" in actual && typeof actual.size === "number") {
    if (actual.size === 0) {
      throw new AssertionError({
        message: message || "Expected to be not empty",
        actual,
        operator: "isNotEmpty",
        stackStartFn: isNotEmpty,
      });
    }
    return;
  }
  throw new TypeError("Expected an object that has property 'length' or 'size'");
};

import { AssertionError } from "node:assert";
import { format } from "./format.js";

export type WithIncludes = { includes(needle: unknown): boolean };
export type WithHas = { has(needle: unknown): boolean };

export const includes = (haystack: string | WithIncludes | WithHas, needle: unknown, message?: string) => {
  if (typeof haystack === "string") {
    if (typeof needle !== "string") {
      throw new TypeError("Expected both arguments to be of the string type");
    }
    if (!haystack.includes(needle)) {
      throw new AssertionError({
        message: message || `Expected ${format(haystack)} to include ${format(needle)}`,
        stackStartFn: includes,
      });
    }
    return;
  }
  if (haystack != null && "includes" in haystack && typeof haystack.includes === "function") {
    if (!haystack.includes(needle)) {
      throw new AssertionError({
        message: message || `Expected ${format(haystack)} to include ${format(needle)}`,
        stackStartFn: includes,
      });
    }
    return;
  }
  if (haystack != null && "has" in haystack && typeof haystack.has === "function") {
    if (!haystack.has(needle)) {
      throw new AssertionError({
        message: message || `Expected ${format(haystack)} to include ${format(needle)}`,
        stackStartFn: includes,
      });
    }
    return;
  }
  throw new TypeError(`Expected ${format(haystack)} to be an object that has method 'includes' or 'has'`);
};

export const doesNotInclude = (haystack: string | WithIncludes | WithHas, needle: unknown, message?: string) => {
  if (typeof haystack === "string") {
    if (typeof needle !== "string") {
      throw new TypeError("Expected both arguments to be of the string type");
    }
    if (haystack.includes(needle)) {
      throw new AssertionError({
        message: message || `Expected ${format(haystack)} to not include ${format(needle)}`,
        stackStartFn: doesNotInclude,
      });
    }
    return;
  }
  if (haystack != null && "includes" in haystack && typeof haystack.includes === "function") {
    if (haystack.includes(needle)) {
      throw new AssertionError({
        message: message || `Expected ${format(haystack)} to not include ${format(needle)}`,
        stackStartFn: doesNotInclude,
      });
    }
    return;
  }
  if (haystack != null && "has" in haystack && typeof haystack.has === "function") {
    if (haystack.has(needle)) {
      throw new AssertionError({
        message: message || `Expected ${format(haystack)} to not include ${format(needle)}`,
        stackStartFn: doesNotInclude,
      });
    }
    return;
  }
  throw new TypeError(`Expected ${format(haystack)} to be an object that has method 'includes' or 'has'`);
};

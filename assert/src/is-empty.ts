import { AssertionError } from "node:assert";
import { format } from "./format.js";

export type WithLength = { readonly length: number };
export type WithSize = { readonly size: number };

export const isEmpty = (actual: string | WithLength | WithSize, message?: string) => {
  if (typeof actual === "string") {
    if (actual !== "") {
      throw new AssertionError({
        message: message || `Expected ${format(actual)} to be empty`,
        stackStartFn: isEmpty,
      });
    }
    return;
  }
  if (actual != null && "length" in actual && typeof actual.length === "number") {
    if (actual.length !== 0) {
      throw new AssertionError({
        message: message || `Expected ${format(actual)} to be empty`,
        stackStartFn: isEmpty,
      });
    }
    return;
  }
  if (actual != null && "size" in actual && typeof actual.size === "number") {
    if (actual.size !== 0) {
      throw new AssertionError({
        message: message || `Expected ${format(actual)} to be empty`,
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
        message: message || `Expected ${format(actual)} to be not empty`,
        stackStartFn: isNotEmpty,
      });
    }
    return;
  }
  if (actual != null && "length" in actual && typeof actual.length === "number") {
    if (actual.length === 0) {
      throw new AssertionError({
        message: message || `Expected ${format(actual)} to be not empty`,
        stackStartFn: isNotEmpty,
      });
    }
    return;
  }
  if (actual != null && "size" in actual && typeof actual.size === "number") {
    if (actual.size === 0) {
      throw new AssertionError({
        message: message || `Expected ${format(actual)} to be not empty`,
        stackStartFn: isNotEmpty,
      });
    }
    return;
  }
  throw new TypeError("Expected an object that has property 'length' or 'size'");
};

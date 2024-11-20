import { AssertionError } from "node:assert";
import { format } from "./format.js";

export const isTrue = (actual: unknown, message?: string): asserts actual is true => {
  if (actual !== true) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} to be true`,
      actual,
      expected: true,
      operator: "===",
      stackStartFn: isTrue,
    });
  }
};

export const isNotTrue = <T>(actual: T, message?: string): asserts actual is Exclude<T, true> => {
  if (actual === true) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be true`,
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
      message: message || `Expected ${format(actual)} to be false`,
      actual,
      expected: false,
      operator: "===",
      stackStartFn: isFalse,
    });
  }
};

export const isNotFalse = <T>(actual: T, message?: string): asserts actual is Exclude<T, false> => {
  if (actual === false) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be false`,
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
      message: message || `Expected ${format(actual)} to be null`,
      actual,
      expected: null,
      operator: "===",
      stackStartFn: isNull,
    });
  }
};

export const isNotNull = <T>(actual: T, message?: string): asserts actual is Exclude<T, null> => {
  if (actual === null) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be null`,
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
      message: message || `Expected ${format(actual)} to be undefined`,
      actual,
      expected: undefined,
      operator: "===",
      stackStartFn: isUndefined,
    });
  }
};

export const isNotUndefined = <T>(actual: T, message?: string): asserts actual is Exclude<T, undefined> => {
  if (actual === undefined) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be undefined`,
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
      message: message || `Expected ${format(actual)} to be nullish`,
      actual,
      expected: null,
      operator: "==",
      stackStartFn: isNullish,
    });
  }
};

export const isNotNullish = <T>(actual: T, message?: string): asserts actual is Exclude<T, null | undefined> => {
  if (actual == null) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be nullish`,
      actual,
      expected: null,
      operator: "!=",
      stackStartFn: isNotNullish,
    });
  }
};

export const isNaN = (actual: number, message?: string): asserts actual is number => {
  if (typeof actual !== "number") {
    throw new TypeError(`Expected ${format(actual)} to be a number`);
  }
  if (!Number.isNaN(actual)) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} to be NaN`,
      stackStartFn: isNaN,
    });
  }
};

export const isNotNaN = (actual: number, message?: string): asserts actual is number => {
  if (typeof actual !== "number") {
    throw new TypeError(`Expected ${format(actual)} to be a number`);
  }
  if (Number.isNaN(actual)) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be NaN`,
      stackStartFn: isNotNaN,
    });
  }
};

export const isFinite = (actual: number, message?: string): asserts actual is number => {
  if (typeof actual !== "number") {
    throw new TypeError(`Expected ${format(actual)} to be a number`);
  }
  if (!Number.isFinite(actual)) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} to be a finite number`,
      stackStartFn: isFinite,
    });
  }
};

export const isNotFinite = (actual: number, message?: string): asserts actual is number => {
  if (typeof actual !== "number") {
    throw new TypeError(`Expected ${format(actual)} to be a number`);
  }
  if (Number.isFinite(actual)) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be a finite number`,
      stackStartFn: isNotFinite,
    });
  }
};

type Constructor<T> = {
  new (...args: any[]): T;
};

export const isInstanceOf = <T>(
  actual: unknown,
  constructor: Constructor<T>,
  message?: string,
): asserts actual is T => {
  if (!(actual instanceof constructor)) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} to be an instance of ${constructor.name}`,
      stackStartFn: isInstanceOf,
    });
  }
};

export const isNotInstanceOf = <T, U>(
  actual: T,
  constructor: Constructor<U>,
  message?: string,
): asserts actual is Exclude<T, U> => {
  if (actual instanceof constructor) {
    throw new AssertionError({
      message: message || `Expected ${format(actual)} not to be an instance of ${constructor.name}`,
      stackStartFn: isNotInstanceOf,
    });
  }
};

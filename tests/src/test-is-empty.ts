import { AssertionError, equal, ok } from "node:assert";
import { test } from "node:test";
import { isEmpty, isNotEmpty } from "rich-assert";
import { fails } from "./fails.js";

test("compare strings", () => {
  isEmpty("");
  isNotEmpty("x");

  const err = fails(() => {
    isEmpty("omg");
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to be empty");
});

test("compare arrays", () => {
  isEmpty([]);
  isNotEmpty(["x"]);

  const err = fails(() => {
    isEmpty(["x"]);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to be empty");
});

test("compare sets", () => {
  isEmpty(new Set());
  isNotEmpty(new Set(["x"]));

  const err = fails(() => {
    isEmpty(new Set(["x"]));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to be empty");
});

test("compare maps", () => {
  isEmpty(new Map());
  isNotEmpty(new Map([["x", "y"]]));

  const err = fails(() => {
    isEmpty(new Map([["x", "y"]]));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to be empty");
});

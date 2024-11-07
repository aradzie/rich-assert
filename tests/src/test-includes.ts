import { AssertionError, equal, ok } from "node:assert";
import { test } from "node:test";
import { doesNotInclude, includes } from "rich-assert";
import { fails } from "./fails.js";

test("check strings", () => {
  includes("foobar", "foo");
  doesNotInclude("foobar", "baz");

  const err = fails(() => {
    includes("bar", "foo");
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to include");
});

test("check arrays", () => {
  includes(["foo", "bar"], "foo");
  doesNotInclude(["foo", "bar"], "baz");

  const err = fails(() => {
    includes(["bar"], "foo");
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to include");
});

test("check sets", () => {
  includes(new Set(["foo", "bar"]), "foo");
  doesNotInclude(new Set(["foo", "bar"]), "baz");

  const err = fails(() => {
    includes(new Set(["bar"]), "foo");
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to include");
});

test("check maps", () => {
  includes(
    new Map([
      ["foo", 1],
      ["bar", 2],
    ]),
    "foo",
  );
  doesNotInclude(
    new Map([
      ["foo", 1],
      ["bar", 2],
    ]),
    "baz",
  );

  const err = fails(() => {
    includes(new Map([["bar", 2]]), "foo");
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Expected to include");
});

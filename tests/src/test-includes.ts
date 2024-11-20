import { test } from "node:test";
import { doesNotInclude, includes, like } from "rich-assert";
import { fails } from "./fails.js";

test("check strings", () => {
  includes("foobar", "foo");
  doesNotInclude("foobar", "baz");

  like(
    fails(() => {
      includes("bar", "foo");
    }),
    {
      message: 'Expected <string "bar"> to include <string "foo">',
    },
  );
});

test("check arrays", () => {
  includes(["foo", "bar"], "foo");
  doesNotInclude(["foo", "bar"], "baz");

  like(
    fails(() => {
      includes(["bar"], "foo");
    }),
    {
      message: 'Expected [object Array] to include <string "foo">',
    },
  );
});

test("check sets", () => {
  includes(new Set(["foo", "bar"]), "foo");
  doesNotInclude(new Set(["foo", "bar"]), "baz");

  like(
    fails(() => {
      includes(new Set(["bar"]), "foo");
    }),
    {
      message: 'Expected [object Set] to include <string "foo">',
    },
  );
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

  like(
    fails(() => {
      includes(new Map([["bar", 2]]), "foo");
    }),
    {
      message: 'Expected [object Map] to include <string "foo">',
    },
  );
});

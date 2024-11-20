import { test } from "node:test";
import { isEmpty, isNotEmpty, like } from "rich-assert";
import { fails } from "./fails.js";

test("compare strings", () => {
  isEmpty("");
  isNotEmpty("x");

  like(
    fails(() => {
      isEmpty("omg");
    }),
    { message: 'Expected <string "omg"> to be empty' },
  );
});

test("compare arrays", () => {
  isEmpty([]);
  isNotEmpty(["x"]);

  like(
    fails(() => {
      isEmpty(["x"]);
    }),
    { message: "Expected [object Array] to be empty" },
  );
});

test("compare sets", () => {
  isEmpty(new Set());
  isNotEmpty(new Set(["x"]));

  like(
    fails(() => {
      isEmpty(new Set(["x"]));
    }),
    { message: "Expected [object Set] to be empty" },
  );
});

test("compare maps", () => {
  isEmpty(new Map());
  isNotEmpty(new Map([["x", "y"]]));

  like(
    fails(() => {
      isEmpty(new Map([["x", "y"]]));
    }),
    { message: "Expected [object Map] to be empty" },
  );
});

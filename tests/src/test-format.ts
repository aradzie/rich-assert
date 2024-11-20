import { equal } from "node:assert/strict";
import { test } from "node:test";
import { format } from "rich-assert/lib/format.js";

test("format nullish", () => {
  equal("<null>", format(null));
  equal("<undefined>", format(undefined));
});

test("format boolean", () => {
  equal("<false>", format(false));
  equal("<true>", format(true));
});

test("format number", () => {
  equal("<number NaN>", format(NaN));
  equal("<number 0>", format(0));
});

test("format bigint", () => {
  equal("<bigint 123>", format(123n));
});

test("format string", () => {
  equal('<string "">', format(""));
  equal('<string "\\"hello\\"">', format('"hello"'));
  equal('<string "\\\\\\n\\r">', format("\\\n\r"));
});

test("format symbol", () => {
  equal("<symbol Symbol(abc)>", format(Symbol("abc")));
});

test("format date", () => {
  equal("<date 1970-01-01T00:00:00.000Z>", format(new Date(0)));
});

test("format object", () => {
  equal("[object Object]", format({}));
  equal("[object Array]", format([]));
  equal("[object Set]", format(new Set()));
  equal("[object Map]", format(new Map()));
});

test("format function", () => {
  equal(
    "[object Function]",
    format(function () {}),
  );
  equal(
    "[object Function]",
    format(() => {}),
  );
});

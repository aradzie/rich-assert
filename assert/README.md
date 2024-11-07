# A rich assert library for the node test runner

This is a drop-in replacement for the `node:asert/strict` library.
Why? There are a few reasons:

* The node assert library is a little bit confusing.
  There are both non-strict and strict variants of the assertions.
  The former is a legacy design mistake and the later should be preferred.
  The `rich-assert` library provides only strict assertions.
* The node assert library is a little bit lacking. It provides a bare minimum
  set of assertions and forces us to write verbose tests.
  The `rich-assert` library provides some new useful assertions for writing
  shorter tests. One of those new assertions is `like` for partial comparison
  of objects. It only checks a subset of object properties and provides
  a detailed explanation of where the objects differ, at which array index
  or object key.

`rich-assert` is really a tiny wrapper around `node:assert/strict`. It simply
re-export the strict asserts and adds a few more helpful functions.

## Usage

```javascript
import { test } from "node:test";
import { deepEqual, includes, like, isTrue, isNull, isEmpty } from "rich-assert";

test("test", () => {
  // Every assertion is strict.
  deepEqual({ foo: 1, bar: 2 }, { foo: 1, bar: 2 });
  includes([1], 1);
  like({ foo: 1, bar: 2 }, { foo: 1 });
  isTrue(true);
  isNull(null);
  isEmpty([]);
});
```

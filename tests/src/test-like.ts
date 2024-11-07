import { AssertionError } from "node:assert";
import { deepEqual, equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { like } from "rich-assert";
import { fails } from "./fails.js";

test("compare null and undefined", () => {
  like(null, undefined);
  like([null], [undefined]);
  like({ a: null }, { a: undefined });
});

test("compare booleans", () => {
  like(true, true);

  const err = fails(() => {
    like(true, false);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>");
  equal(err.operator, "like");
  equal(err.actual, true);
  equal(err.expected, false);
});

test("compare numbers", () => {
  like(1, 1);

  const err = fails(() => {
    like(1, 2);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>");
  equal(err.operator, "like");
  equal(err.actual, 1);
  equal(err.expected, 2);
});

test("compare strings", () => {
  like("a", "a");

  const err = fails(() => {
    like("a", "b");
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>");
  equal(err.operator, "like");
  equal(err.actual, "a");
  equal(err.expected, "b");
});

test("compare dates", () => {
  like(new Date(123), new Date(123));

  const err = fails(() => {
    like(new Date(1), new Date(2));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>");
  equal(err.operator, "like");
  deepEqual(err.actual, new Date(1));
  deepEqual(err.expected, new Date(2));
});

test("compare arrays", () => {
  like([], []);
  like(["a"], ["a"]);
  like([["a"]], [["a"]]);

  const err = fails(() => {
    like(["a"], ["b"]);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>[0]");
  equal(err.operator, "like");
  deepEqual(err.actual, "a");
  deepEqual(err.expected, "b");
});

test("compare plain objects", () => {
  like({}, {});
  like({ a: { b: 1 }, c: 2 }, {});
  like({ a: { b: 1 }, c: 2 }, { a: { b: 1 } });
  like({ a: { b: 1 }, c: 2 }, { a: { b: 1 }, c: 2 });

  const err = fails(() => {
    like({ a: { b: 1 }, c: 2 }, { a: { b: 2 }, c: 2 });
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>.a.b");
  equal(err.operator, "like");
  deepEqual(err.actual, 1);
  deepEqual(err.expected, 2);
});

test("compare classes", () => {
  class MyClass {
    #a = 1;
    #b = 2;

    get a() {
      return this.#a;
    }

    get b() {
      return this.#b;
    }

    get [Symbol.toStringTag]() {
      return "MyClass";
    }
  }

  like(new MyClass(), {});
  like(new MyClass(), { a: 1 });
  like(new MyClass(), { b: 2 });
  like(new MyClass(), { a: 1, b: 2 });
  like([new MyClass()], [{ a: 1, b: 2 }]);

  const err = fails(() => {
    like([new MyClass()], [{ a: 1, b: 3 }]);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>[0].b");
  equal(err.operator, "like");
  deepEqual(err.actual, 2);
  deepEqual(err.expected, 3);
});

test("different array lengths", () => {
  const err = fails(() => {
    like([1], [1, 2]);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>.length");
  equal(err.operator, "like");
  deepEqual(err.actual, 1);
  deepEqual(err.expected, 2);
});

test("different set sizes", () => {
  const err = fails(() => {
    like(new Set([1]), new Set([1, 2]));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>.size");
  equal(err.operator, "like");
  deepEqual(err.actual, 1);
  deepEqual(err.expected, 2);
});

test("different set values", () => {
  const err = fails(() => {
    like(new Set([1]), new Set([2]));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>");
  equal(err.operator, "like");
  deepEqual(err.actual, undefined);
  deepEqual(err.expected, 2);
});

test("different map sizes", () => {
  const err = fails(() => {
    like(
      new Map([[1, "a"]]),
      new Map([
        [1, "a"],
        [2, "b"],
      ]),
    );
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>.size");
  equal(err.operator, "like");
  deepEqual(err.actual, 1);
  deepEqual(err.expected, 2);
});

test("different map values", () => {
  const err = fails(() => {
    like(new Map([[1, "a"]]), new Map([[1, "b"]]));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>['1']");
  equal(err.operator, "like");
  deepEqual(err.actual, "a");
  deepEqual(err.expected, "b");
});

test("missing map values", () => {
  const err = fails(() => {
    like(new Map([[1, "a"]]), new Map([[2, "b"]]));
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>['2']");
  equal(err.operator, "like");
  deepEqual(err.actual, undefined);
  deepEqual(err.expected, "b");
});

test("different property values", () => {
  const err = fails(() => {
    like([{ a: { b: 1 } }], [{ a: { b: 2 } }]);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>[0].a.b");
  equal(err.operator, "like");
  deepEqual(err.actual, 1);
  deepEqual(err.expected, 2);
});

test("missing property values", () => {
  const err = fails(() => {
    like([{ a: { b: 1 } }], [{ a: { b: 1, c: 2 } }]);
  });
  ok(err instanceof AssertionError);
  equal(err.message, "Objects are not like at <root>[0].a.c");
  equal(err.operator, "like");
  deepEqual(err.actual, undefined);
  deepEqual(err.expected, 2);
});

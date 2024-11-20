import { test } from "node:test";
import {
  isFinite,
  isInstanceof,
  isNaN,
  isNotFinite,
  isNotInstanceOf,
  isNotNaN,
  isNotNull,
  isNotNullish,
  isNotUndefined,
  isNull,
  isNullish,
  isUndefined,
  like,
} from "rich-assert";
import { fails } from "./fails.js";

test("null", () => {
  isNull(null);
  isNotNull({});

  like(
    fails(() => {
      isNull({});
    }),
    {
      message: "Expected [object Object] to be null",
    },
  );
});

test("undefined", () => {
  isUndefined(undefined);
  isNotUndefined({});

  like(
    fails(() => {
      isUndefined({});
    }),
    {
      message: "Expected [object Object] to be undefined",
    },
  );
});

test("nullish", () => {
  isNullish(null);
  isNullish(undefined);
  isNotNullish({});

  like(
    fails(() => {
      isNullish({});
    }),
    {
      message: "Expected [object Object] to be nullish",
    },
  );
});

test("NaN", () => {
  isNaN(NaN);
  isNotNaN(0);
  isNotNaN(+Infinity);
  isNotNaN(-Infinity);

  like(
    fails(() => {
      isNaN(0);
    }),
    {
      message: "Expected <number 0> to be NaN",
    },
  );
});

test("finite", () => {
  isFinite(0);
  isNotFinite(NaN);
  isNotFinite(+Infinity);
  isNotFinite(-Infinity);

  like(
    fails(() => {
      isFinite(NaN);
    }),
    {
      message: "Expected <number NaN> to be a finite number",
    },
  );
});

test("instanceof", () => {
  class Abc {
    get [Symbol.toStringTag]() {
      return "Abc";
    }
  }
  class Xyz {
    get [Symbol.toStringTag]() {
      return "Xyz";
    }
  }

  isInstanceof(new Abc(), Object);
  isInstanceof(new Abc(), Abc);
  isInstanceof(new Xyz(), Object);
  isInstanceof(new Xyz(), Xyz);
  isNotInstanceOf(new Abc(), Xyz);
  isNotInstanceOf(null, Xyz);
  isNotInstanceOf(true, Xyz);
  isNotInstanceOf("", Xyz);

  like(
    fails(() => {
      isInstanceof(null, Abc);
    }),
    {
      message: "Expected <null> to be an instance of Abc",
    },
  );
  like(
    fails(() => {
      isInstanceof("omg", Abc);
    }),
    {
      message: 'Expected <string "omg"> to be an instance of Abc',
    },
  );
  like(
    fails(() => {
      isInstanceof(new Xyz(), Abc);
    }),
    {
      message: "Expected [object Xyz] to be an instance of Abc",
    },
  );
});

test("asserts not null", () => {
  const v = [] as string[] | null;
  isNotNull(v);
  use(v.length); // Should compile.
});

test("asserts not nullish", () => {
  const v = [] as string[] | null;
  isNotNullish(v);
  use(v.length); // Should compile.
});

function use(arg: any) {
  if (arg) {
    // Do nothing.
  }
}

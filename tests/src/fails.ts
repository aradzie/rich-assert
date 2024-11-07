import { type AssertionError, fail } from "node:assert";

export function fails(cb: () => void) {
  try {
    cb();
  } catch (err) {
    return err as AssertionError;
  }
  fail("Should have failed");
}

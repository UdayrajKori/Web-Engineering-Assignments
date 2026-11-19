import { test } from "node:test";
import assert from "node:assert/strict";

import { makeCounter, memoize } from "../src/closures.js";

test("makeCounter increments and decrements", () => {
  const counter = makeCounter(5);

  assert.equal(counter.value, 5);
  assert.equal(counter.inc(), 6);
  assert.equal(counter.inc(), 7);
  assert.equal(counter.dec(), 6);
  assert.equal(counter.value, 6);
});

test("memoize caches function results", () => {
  let calls = 0;

  const square = memoize((n) => {
    calls++;
    return n * n;
  });

  assert.equal(square(5), 25);
  assert.equal(square(5), 25);
  assert.equal(square(6), 36);

  assert.equal(calls, 2);
});

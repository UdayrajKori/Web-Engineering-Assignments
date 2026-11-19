import { test } from "node:test";
import assert from "node:assert/strict";

import { retry, sleep, withTimeout, pool } from "../src/async-utils.js";

test("sleep waits before resolving", async () => {
  const start = Date.now();

  await sleep(50);

  const elapsed = Date.now() - start;

  assert.ok(elapsed >= 40);
});

test("retry succeeds after failures", async () => {
  let calls = 0;

  const result = await retry(
    async () => {
      if (++calls < 3) {
        throw new Error("flaky");
      }

      return "ok";
    },
    { retries: 3, delayMs: 5 },
  );

  assert.equal(result, "ok");
  assert.equal(calls, 3);
});

test("withTimeout rejects slow work", async () => {
  await assert.rejects(withTimeout(sleep(200), 20), /Timed out/);
});

test("pool preserves order", async () => {
  const out = await pool(
    [1, 2, 3].map((n) => async () => {
      await sleep(10);
      return n;
    }),
    2,
  );

  assert.deepEqual(out, [1, 2, 3]);
});

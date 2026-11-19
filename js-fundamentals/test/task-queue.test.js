import { test } from "node:test";
import assert from "node:assert/strict";

import { TaskQueue } from "../src/task-queue.js";

test("TaskQueue executes tasks in order", async () => {
  const queue = new TaskQueue("My Queue");

  const order = [];

  queue.push(async () => {
    order.push(1);
    return "first";
  });

  queue.push(async () => {
    order.push(2);
    return "second";
  });

  queue.push(async () => {
    order.push(3);
    return "third";
  });

  assert.equal(queue.size, 3);

  const results = await queue.runAll();

  assert.deepEqual(order, [1, 2, 3]);

  assert.deepEqual(results, ["first", "second", "third"]);

  assert.equal(queue.size, 0);
});

test("TaskQueue counts created instances", () => {
  const before = TaskQueue.created;

  new TaskQueue("Queue 1");
  new TaskQueue("Queue 2");

  assert.equal(TaskQueue.created, before + 2);
});

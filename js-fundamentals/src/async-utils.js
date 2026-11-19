// export const sleep = (ms) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// };

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function retry(fn, { retries = 3, delayMs = 100, signal } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    signal?.throwIfAborted();

    try {
      const result = await fn(attempt, { signal });

      signal?.throwIfAborted();

      return result;
    } catch (err) {
      if (signal?.aborted) {
        signal.throwIfAborted();
      }

      lastError = err;

      if (attempt < retries) {
        await sleepWithSignal(delayMs * 2 ** attempt, signal);
      }
    }
  }

  throw lastError;
}

export function withTimeout(promise, ms) {
  let timer;

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function pool(tasks, limit = 2) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, worker),
  );

  return results;
}

function sleepWithSignal(ms, signal) {
  if (!signal) return sleep(ms);

  signal.throwIfAborted();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
      reject(signal.reason);
    }

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

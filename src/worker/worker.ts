/* ./worker/worker.ts */

const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export function processData(num: number): string {
  // Process the data without stalling the UI
  const startTime = new Date().getTime();
  const sum = fib(num);
  const time = new Date().getTime() - startTime;
  const result = `result: ${sum} computed in ${time}ms`;

  return result;
}

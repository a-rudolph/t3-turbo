type ArgsType<T> = T extends (...args: infer U) => unknown ? U : never;
type CustomReturnType<T> = T extends (...args: unknown[]) => infer U
  ? U
  : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<TFn extends Function>(fn: TFn, delay: number) {
  let timeoutId: number | null = null;

  return (...args: ArgsType<TFn>) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      timeoutId = window.setTimeout(() => {
        const result = fn(...args) as CustomReturnType<TFn>;
        resolve(result);
      }, delay);
    });
  };
}

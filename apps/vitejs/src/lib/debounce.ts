type ArgsType<T> = T extends (...args: infer U) => any ? U : never;
type CustomReturnType<T> = T extends (...args: any[]) => infer U ? U : never;

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

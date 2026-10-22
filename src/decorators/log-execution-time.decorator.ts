export function LogExecutionTime() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      const duration = (end - start).toFixed(2);

      console.log(`[BENCHMARK] Метод ${propertyKey} виконано за ${duration} ms.`);
      return result;
    };

    return descriptor;
  };
}
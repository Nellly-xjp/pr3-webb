export function FrozenEntity() {
  return function (constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
  };
}
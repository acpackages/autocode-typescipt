type EffectFn = () => void;

let activeEffect: EffectFn | null = null;
const effectStack: EffectFn[] = [];
const targetMap = new WeakMap<object, Map<string | symbol, Set<EffectFn>>>();

export function acTrack(target: object, key: string | symbol) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

export function acTrigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    const effectsToRun = new Set(dep);
    effectsToRun.forEach((effect) => {
      effect();
    });
  }
}

const reactiveMap = new WeakMap<object, any>();
const IS_REACTIVE = Symbol('is_reactive');

export function acReactive<T extends object>(target: T): T {
  if (target === null || typeof target !== 'object' || (target as any)[IS_REACTIVE] || target instanceof Node) {
    return target;
  }
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target);
  }

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      if (key === IS_REACTIVE) {
        return true;
      }

      const result = Reflect.get(target, key, receiver);

      // Auto-bind methods to the PROXY so 'this' is always reactive inside methods
      if (typeof result === 'function' && key !== 'constructor') {
        return result.bind(receiver);
      }

      acTrack(target, key);

      // Recursive proxying
      if (result && typeof result === 'object' && !(result instanceof Node)) {
        return acReactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = (target as any)[key];
      const result = Reflect.set(target, key, value, receiver);

      if (oldValue !== value || (Array.isArray(target) && key === 'length')) {
        acTrigger(target, key);
      }
      return result;
    },
  });

  reactiveMap.set(target, proxy);
  return proxy;
}

export function acEffect(fn: EffectFn) {
  const effectWrapper = () => {
    if (!effectStack.includes(effectWrapper)) {
      try {
        effectStack.push(effectWrapper);
        activeEffect = effectWrapper;
        fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1] || null;
      }
    }
  };
  effectWrapper();
}

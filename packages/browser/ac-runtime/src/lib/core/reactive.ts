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

const IS_REACTIVE = Symbol.for('is_reactive');
const IS_REACTIVE_ARRAY = Symbol('is_reactive_array');

// Mutating array methods that bypass the property setter
const MUTATING_METHODS = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'fill', 'copyWithin'] as const;

/**
 * Makes an array's mutations reactive without using Proxy.
 * Strategy (Vue 2 style):
 *  1. Patch each mutating method directly on the array instance so it
 *     calls acTrigger(owner, key) after running the real method.
 *  2. Expose a helper `$set(index, value)` for index assignments so
 *     callers can do `this.rows.$set(i, record)` instead of `this.rows[i] = record`.
 *
 * NOTE: Plain index assignment `arr[i] = v` still won't auto-trigger
 * because there's no Proxy. Use `arr.$set(i, v)` for that case.
 */
export function acReactiveArray<T extends any[]>(arr: T, owner: object, key: string | symbol): T {
  if ((arr as any)[IS_REACTIVE_ARRAY]) return arr; // already patched

  Object.defineProperty(arr, IS_REACTIVE_ARRAY, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  // Patch mutating methods on the instance (not on Array.prototype)
  for (const method of MUTATING_METHODS) {
    const original = Array.prototype[method] as Function;
    Object.defineProperty(arr, method, {
      value: function (...args: any[]) {
        const result = original.apply(this, args);
        acTrigger(this, IS_REACTIVE_ARRAY);
        acTrigger(owner, key);
        return result;
      },
      writable: true,
      enumerable: false,
      configurable: true,
    });
  }

  // $set(index, value) — reactive index assignment without Proxy
  Object.defineProperty(arr, '$set', {
    value: function (index: number, value: any) {
      (this as any)[index] = value;
      acTrigger(this, IS_REACTIVE_ARRAY);
      acTrigger(owner, key);
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });

  return arr;
}

function acReactiveObject(
  obj: any,
  parentTrackTarget?: any,
  parentKey?: PropertyKey | any
) {
  if (!isPlainObject(obj)) return obj;

  if (obj.__isReactive) return obj;
  Object.defineProperty(obj, '__isReactive', {
    value: true,
    enumerable: false,
    configurable: false
  });

  for (const key of Object.keys(obj)) {
    let value = obj[key];

    // Wrap nested values
    if (Array.isArray(value)) {
      value = acReactiveArray(value, obj, key);
    } else if (isPlainObject(value)) {
      value = acReactiveObject(value, obj, key);
    }

    Object.defineProperty(obj, key, {
      get() {
        acTrack(obj, key);
        if (Array.isArray(value)) {
          acTrack(value, IS_REACTIVE_ARRAY);
        }
        return value;
      },
      set(newVal: any) {
        if (newVal !== value) {

          const oldVal = value;

          if (Array.isArray(newVal)) {
            value = acReactiveArray(newVal, obj, key);
          } else if (isPlainObject(newVal)) {
            value = acReactiveObject(newVal, obj, key);
          } else {
            value = newVal;
          }

          acTrigger(obj, key);

          if (typeof parentTrackTarget.acOnPropertyChanges == 'function' && parentTrackTarget['__ac_initialized__']) {
            parentTrackTarget.acOnPropertyChanges({
              key: parentKey,
              property: key,
              oldValue: oldVal,
              newValue: newVal
            });
          }

          // Optional: notify parent property
          if (parentTrackTarget && parentKey) {
            acTrigger(parentTrackTarget, parentKey);
          }
        }
      },
      enumerable: true,
      configurable: true
    });
  }

  return obj;
}

function _makePropertiesReactive(target: object | any, trackTarget: object) {
  const ownKeys = Object.getOwnPropertyNames(target);

  for (const key of ownKeys) {
    if (key === 'constructor') continue;

    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    if (!descriptor) continue;

    // Skip if already a getter/setter, not configurable, or a function
    if (descriptor.get || descriptor.set) continue;
    if (!descriptor.configurable) continue;
    if (typeof descriptor.value === 'function') continue;

    // Patch array instances or plain objects immediately
    let value = descriptor.value;
    if (Array.isArray(value)) {
      value = acReactiveArray(value, trackTarget, key);
    } else if (isPlainObject(value)) {
      value = acReactiveObject(value, trackTarget, key);
    }

    Object.defineProperty(target, key, {
      get() {
        acTrack(trackTarget, key);
        if (Array.isArray(value)) {
          acTrack(value, IS_REACTIVE_ARRAY);
        }
        return value;
      },
      set(newVal: any) {
        if (newVal !== value) {

          if (Array.isArray(newVal)) {
            value = acReactiveArray(newVal, trackTarget, key);
          } else if (isPlainObject(newVal)) {
            value = acReactiveObject(newVal, trackTarget, key);
          } else {
            value = newVal;
          }
          acTrigger(trackTarget, key);
          if (typeof target.acOnPropertyChanges == 'function' && target['__ac_initialized__']) {
            target.acOnPropertyChanges({ key, oldValue: value, newValue: newVal });
          }
        }
      },
      enumerable: descriptor.enumerable ?? true,
      configurable: true,
    });
  }
}

function isPlainObject(obj: any): boolean {
  if (obj === null || typeof obj !== 'object') return false;
  return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * Makes an object reactive by converting all own data properties into
 * getter/setter pairs using Object.defineProperty.
 * This is the Vue 2 / Angular approach — no Proxy needed.
 * Works with static class properties, built-in types, and avoids all Proxy pitfalls.
 */
import { getAcInputMetadata, getAcOutputMetadata, getAcViewChildMetadata } from './decorators';

export function acMakeReactive<T extends object>(target: T): T {
  if (target === null || typeof target !== 'object') return target;
  if ((target as any)[IS_REACTIVE]) return target;

  // Mark as reactive to prevent double-processing
  Object.defineProperty(target, IS_REACTIVE, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  _makePropertiesReactive(target, target);

  // Also make properties from metadata reactive (e.g. uninitialized @AcInput)
  const constructor = target.constructor as any;
  if (constructor) {
    const metadata = [
      getAcInputMetadata(constructor),
      getAcOutputMetadata(constructor),
      getAcViewChildMetadata(constructor)
    ];
    let added = false;
    for (const meta of metadata) {
      for (const key of Object.keys(meta)) {
        if (!(key in target)) {
          (target as any)[key] = undefined;
          added = true;
        }
      }
    }
    if (added) {
      _makePropertiesReactive(target, target);
    }
  }

  // Auto-bind all methods to the instance to ensure correct 'this' context
  // when called from template engine scopes or event listeners.
  let proto = Object.getPrototypeOf(target);
  while (proto && proto !== Object.prototype) {
    const propertyNames = Object.getOwnPropertyNames(proto);
    for (const name of propertyNames) {
      if (name === 'constructor') continue;
      const descriptor = Object.getOwnPropertyDescriptor(proto, name);
      if ((descriptor && typeof descriptor.value === 'function')) {
        // Only bind if not already bound or overridden on instance
        if (!Object.prototype.hasOwnProperty.call(target, name)) {
          (target as any)[name] = descriptor.value.bind(target);
        }
      }
    }
    proto = Object.getPrototypeOf(proto);
  }

  return target;
}

/**
 * Makes static properties on a class constructor reactive.
 * Call this after defining your class to enable reactive static properties.
 * Example: acMakeStaticReactive(App);
 */
export function acMakeStaticReactive(constructor: any): void {
  if (!constructor || typeof constructor !== 'function') return;
  if (constructor[IS_REACTIVE]) return;

  Object.defineProperty(constructor, IS_REACTIVE, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  _makePropertiesReactive(constructor, constructor);
}

/**
 * @deprecated Use acMakeReactive instead. Kept for backward compatibility.
 */
export function acReactive<T extends object>(target: T): T {
  return acMakeReactive(target);
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

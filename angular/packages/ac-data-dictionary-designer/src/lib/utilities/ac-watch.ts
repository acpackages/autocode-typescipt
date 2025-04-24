import { AcEvents } from "@ac_packages/autocode";

export function acWatchForChanges<T>(obj: any): T {
  let events: AcEvents = new AcEvents();

  function wrap(value: any): any {
    if (typeof value !== "object" || value === null) return value;

    // Handle arrays separately to track push, pop, splice, etc.
    if (Array.isArray(value)) {
      value.forEach((item, index) => (value[index] = wrap(item))); // Ensure deep wrapping
      value = new Proxy(value, {
        set(target, property: any, newValue) {
          target[property] = wrap(newValue);
          events.execute("change", { type: "set", key: property, value: newValue });
          return true;
        },
        deleteProperty(target, property: any) {
          const success = delete target[property];
          if (success) events.execute("change", { type: "delete", key: property });
          return success;
        },
      });

      // Intercept array methods
      ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach((method: any) => {
        Object.defineProperty(value, method, {
          value: function (...args: any[]) {
            const result = Array.prototype[method].apply(this, args);
            events.execute("change", { type: "array", method, args });
            return result;
          },
          enumerable: false,
          writable: true,
          configurable: true,
        });
      });
    }

    return new Proxy(value, {
      set(target, property, newValue) {
        const isNewProperty = !(property in target);
        target[property] = wrap(newValue);
        events.execute("change", { type: isNewProperty ? "add" : "update", key: property, value: newValue });
        return true;
      },
      get(target, property) {
        return wrap(target[property]);
      },
      deleteProperty(target, property) {
        const success = delete target[property];
        if (success) events.execute("change", { type: "delete", key: property });
        return success;
      },
    });
  }

  Object.assign(obj, wrap(obj)); // Modify the original object

  (obj as any).on = (event: string, callback: Function) => {
    return events.register(event, callback);
  };

  (obj as any).off = (event: string, callback: Function) => {
    // return events.unregister(event, callback);
  };

  return obj;
}

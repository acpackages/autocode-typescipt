/* eslint-disable @typescript-eslint/no-unused-vars */

import { AcEvents } from "../core/ac-events";
import { Autocode } from "../core/autocode";
import { AcEnumContextEvent } from "../enums/ac-enum-context-event.enum";
import { IAcContextEvent } from "../interfaces/ac-context-event.interface";

/* eslint-disable @typescript-eslint/no-this-alias */
type AcContextListener = (
  path: string,
  value: any,
  oldValue: any,
  root: any
) => void;

export class AcContextRegistry {
  private static contexts: Map<string, any> = new Map();

  static register({ name, context }: { name: string, context: AcContext }) {
    if (this.contexts.has(name)) {
      throw new Error(`AcContext with name "${name}" already exists`);
    }
    this.contexts.set(name, context);
  }

  static exists({ name }: { name: string }): boolean {
    return this.getInstance({ name }) != undefined;
  }

  static get({ name }: { name: string }): AcContext | undefined {
    return this.contexts.get(name).proxy;
  }

  static getInstance({ name }: { name: string }): AcContext | undefined {
    return this.contexts.get(name);
  }

  static unregister({ name }: { name: string }) {
    this.contexts.delete(name);
  }

  static list(): string[] {
    return Array.from(this.contexts.keys());
  }
}

export class AcContext {
  __acContextName__!: string;
  __events__: AcEvents = new AcEvents();
  proxy: any;
  value: any = {};

  constructor({ value = {}, name }: { value?: any, name?: string } = {}) {
    const instance: any = this;
    this.value = value;
    instance.__acContextName__ = name || Autocode.uuid();
    this.proxy = this.makeReactive(value);
    Object.defineProperties(this.proxy, {
      __acContextName__: { value: this.__acContextName__, enumerable: false },
      off: { value: ({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }) => this.off({ event, callback, subscriptionId }), enumerable: false },
      on: { value: ({ event, callback }: { event: string, callback: Function }) => this.on({ event, callback }), enumerable: false },
      toJson: {
        value: () => {
          const result: any = {};
          for (const key of Object.keys(this.value)) {
            if (!['__acContextName__', 'on', 'toJson'].includes(key)) {
              result[key] = value[key];
            }
          }
          return result;
        }
      }
    });

    if (instance.__acContextName__) {
      AcContextRegistry.register({ name: instance.__acContextName__, context: this });
    }

    return this.proxy;
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.__events__.unsubscribe({ event, callback, subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }) {
    return this.__events__.subscribe({ event: event, callback: callback });
  }

  private makeReactive(obj: any, path: string[] = [], root: any = null): any {
    const self = this;
    root = root || obj;

    return new Proxy(obj, {
      get(target, key, receiver) {
        const value = Reflect.get(target, key, receiver);
        if (value && typeof value === "object" && !(value as any).__isAcContext) {
          return self.makeReactive(value, [...path, String(key)], root);
        }
        return value;
      },
      deleteProperty: (target, prop) => {
        if (prop in target) {
          const eventArgs: IAcContextEvent = {
            event: 'delete',
            target: target,
            property: prop,
            oldValue: target[prop]
          }
          delete target[prop];
          delete this.value[prop];
          this.__events__.execute({ event: AcEnumContextEvent.Change, args: eventArgs });
          this.__events__.execute({ event: AcEnumContextEvent.Delete, args: eventArgs });
          return true;
        }
        return false;
      },
      set: (target, prop, value) => {
        const oldValue = target[prop];
        target[prop] = value;
        if (oldValue != value) {
          const eventArgs: IAcContextEvent = {
            event: 'set',
            target: target,
            property: prop,
            value: value,
            oldValue: oldValue
          }
          this.__events__.execute({ event: AcEnumContextEvent.Set, args: eventArgs });
          if (oldValue != undefined) {
            eventArgs.event = 'update';
            this.__events__.execute({ event: AcEnumContextEvent.Update, args: eventArgs });
          }
          else {
            eventArgs.event = 'add';
            this.__events__.execute({ event: AcEnumContextEvent.Add, args: eventArgs });
          }
          this.__events__.execute({ event: AcEnumContextEvent.Change, args: eventArgs });
        }
        return true;
      }
    });
  }
}

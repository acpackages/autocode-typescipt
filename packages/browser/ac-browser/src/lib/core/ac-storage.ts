/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
type ChangeCallback = (key: string, newValue: any, oldValue: any) => void;

export class AcStorage {
  private __acVersion__: number = 1;
  constructor() {
    const object:any = this;
    function getAllProps(obj: any) {
      let props: string[] = [];
      let current = obj;
      while (current && current !== Object.prototype) {
        props = props.concat(Object.getOwnPropertyNames(current));
        current = Object.getPrototypeOf(current);
      }
      return Array.from(new Set(props));
    }
    const objectKeys:string[] = getAllProps(this);
    const proxy = new Proxy(this, {
      get: (target, prop: string | symbol, receiver) => {
        if (typeof prop === 'string' && !objectKeys.includes(prop)) {
          return target.getItem({key:prop});
        }
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop: string | symbol, value, receiver) => {
        if(!objectKeys.includes(prop.toString())){
          if (typeof prop === 'string' && !objectKeys.includes(prop)) {
            target.setItem({ key: prop, value: value });
          }
          return Reflect.set(target, prop, value, receiver);
        }
        else{
          console.error(`Cannot set ${prop.toString()} on AcStorage.`);
          return true;
        }

      },
    });
    for(const key of this.keys()){
      object[key] = this.getItem({key});
    }
    return proxy;
  }

  getItem({ key }: { key: string }):any {
    const valueString: string | null = localStorage.getItem(key);
    if (valueString) {
      try {
        const valueObject = JSON.parse(valueString);
        if (valueObject["acStorageVersion"]) {
          return valueObject['value'];
        }
      }
      catch (ex) {
        //
      }
    }
  }

  hasItem({ key }: { key: string }) {
    const valueString: string | null = localStorage.getItem(key);
    if (valueString) {
      try {
        const valueObject = JSON.parse(valueString);
        if (valueObject["acStorageVersion"]) {
          return true;
        }
      }
      catch (ex) {
        //
      }
    }
    return false;
  }

  setItem({ key, value }: { key: string, value: any }): void {
    const valueObject = { "value": value, "valueType": typeof value, "acStorageVersion": this.__acVersion__ };
    localStorage.setItem(key, JSON.stringify(valueObject));
  }

  values():any {
    return Object.values(this.toJson());
  }

  keys():string[] {
    return Object.keys(this.toJson());
  }

  toJson():any {
    const values: any = {};
    Object.keys(localStorage).forEach((key) => {
      const value = this.getItem({key});
      if (value != undefined) {
        values[key] = value;
      }
    });
    return values;
  }

  toString() {
    return JSON.stringify(this.toJson(), null, 2);
  }
}

export const acStorage:any = new AcStorage();
const _window:any = window;
_window["acStorage"] = acStorage;

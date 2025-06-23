import { Autocode } from "./autocode";

export type AcPromiseInstance = {
  id: string;
  promise: Promise<any>;
  resolve: (value: any ) => void;
  reject: (reason?: any) => void;
};
export class AcPromiseManager {
  private promises = new Map<string, AcPromiseInstance>();

  create<T>(key?: string): AcPromiseInstance {
    if(key==undefined){
      key = Autocode.uniqueId();
    }
    const instance = this.createInstance<T>(key);
    this.promises.set(key, instance);
    return instance;
  }

  containsKey(key:string){
    return this.promises.has(key);
  }

  private createInstance<T>(id:string): AcPromiseInstance {
    let resolve!: (value: any) => void;
    let reject!: (reason?: any) => void;

    const promise = new Promise<any>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { id,promise, resolve, reject };
  }

  resolve(key: string, value?: any) {
    const deferred = this.promises.get(key);
    deferred?.resolve(value);
    this.promises.delete(key);
  }

  reject(key: string, reason?: any) {
    const deferred = this.promises.get(key);
    deferred?.reject(reason);
    this.promises.delete(key);
  }
}

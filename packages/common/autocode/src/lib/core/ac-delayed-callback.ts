import { acNullifyInstanceProperties } from "../utils/ac-utility-functions";
import { Autocode } from "./autocode";
type TimeoutHandle = ReturnType<typeof setTimeout>;

export class AcDelayedCallback {
  private timeouts: Record<string, TimeoutHandle> = {};

  add({ callback, key, duration = 0 }: { callback: Function, key?: string, duration?: number }) {
    if (!key) {
      key = Autocode.uuid();
    }
    else{
      this.clearTimeoutSafe(key);
    }
    this.timeouts[key] = setTimeout(() => {
      delete this.timeouts[key];
      callback();
    }, duration);
  }

  clearAll() {
    Object.keys(this.timeouts).forEach(key =>
      this.clearTimeoutSafe(key)
    );
  }

  private clearTimeoutSafe(key: string): void {
    const timeout = this.timeouts[key];
    if (timeout !== undefined) {
      clearTimeout(timeout);
      delete this.timeouts[key];
    }
  }

  destroy(){
    this.clearAll();
    acNullifyInstanceProperties({instance:this});
  }

  reset({ callback, key, duration = 0 }: { callback: Function, key: string, duration?: number }) {
    if(this.timeouts[key]){
      this.clearTimeoutSafe(key);
      this.timeouts[key] = setTimeout(() => {
        delete this.timeouts[key];
        callback();
      }, duration);
    }

  }
}

export const acDelayedCallback:AcDelayedCallback = new AcDelayedCallback();

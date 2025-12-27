const acSingleTimeoutRegistry:any = {};
export function acSingleTimeout({callback,key,duration = 0}:{callback:Function,key:string,duration?:number}){
  if(acSingleTimeoutRegistry[key]){
    clearTimeout(acSingleTimeoutRegistry[key]);
  }
  acSingleTimeoutRegistry[key] = setTimeout(() => {
    delete acSingleTimeoutRegistry[key];
    clearTimeout(acSingleTimeoutRegistry[key]);
    callback();
  }, duration);
}

export function acNullifyInstanceProperties({instance,excludeKeys = []}:{instance: any,excludeKeys?: (string | RegExp)[]}): void {
  const obj = instance;

  if (obj && obj !== Object.prototype) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);

    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (key === 'constructor') continue;

      // Skip readonly / non-configurable
      if (descriptor.configurable === false) continue;

      try {
        // Getter / Setter
        if (descriptor.set) {
          instance[key] = null;
        }
        // Normal property
        else if ('value' in descriptor) {
          instance[key] = null;
        }
      } catch {
        // Ignore assignment errors
      }
    }
  }
}

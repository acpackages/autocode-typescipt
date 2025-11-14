const acSingleTimeoutRegistry:any = {};
export function acSingleTimeout({callback,key,duration = 0}:{callback:Function,key:string,duration?:number}){
  if(acSingleTimeoutRegistry[key]){
    clearTimeout(acSingleTimeoutRegistry[key]);
  }
  acSingleTimeoutRegistry[key] = setTimeout(() => {
    delete acSingleTimeoutRegistry[key];
    callback();
  }, duration);
}

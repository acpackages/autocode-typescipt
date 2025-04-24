declare global {
  interface Object {
      changes(newObject: any): any;
      clone(): any;
      containsKey(key:any): any;
      copyTo(destination:any): any;
      isEmpty():boolean;
      isNotEmpty():boolean;
      isSame(compareObject:any):boolean;
      filter<T>(filterFunction: (key: string, value: T) => boolean): Object;
      toQueryString():string;
  }
}

Object.prototype.changes = function (newObject: any): any {
  const oldObject = this;
  let result: any = {};

  const isObject = (value: any): value is Record<string, any> => {
      return value !== null && typeof value === 'object' && !Array.isArray(value);
  };

  try {
      if (isObject(oldObject) && isObject(newObject)) {
          const keys1 = Object.keys(oldObject);
          const keys2 = Object.keys(newObject);
          keys2.forEach(key => {
              if (!(key in oldObject)) {
                  result[key] = { old: undefined, new: newObject[key], change: "add" };
              } else if (oldObject[key] !== newObject[key]) {
                  result[key] = { old: oldObject[key], new: newObject[key], change: "modify" };
              }
          });
          keys1.forEach(key => {
              if (!(key in newObject)) {
                  result[key] = { new: undefined, old: oldObject[key], change: "remove" };
              }
          });
      } else if (isObject(oldObject)) {
          const keys = Object.keys(oldObject);
          keys.forEach(key => {
              result[key] = { new: undefined, old: oldObject[key], change: "remove" };
          });
      } else if (isObject(newObject)) {
          const keys = Object.keys(newObject);
          keys.forEach(key => {
              result[key] = { old: undefined, new: newObject[key], change: "add" };
          });
      }
  } catch (error) {
      console.error(error);
  }
  return result;
};

Object.prototype.clone = function (): any {
  const obj:any = this;
  let result: any = obj;
  if (obj != null && obj != undefined) {
      try {
          result = JSON.parse(JSON.stringify(obj));
      } catch {
          Object.keys(obj).forEach((key) => {
              let value = obj[key];
              if (value instanceof Object && value.constructor !== Object) {
                  result[key] = value;
              } else {
                  result[key] = Object.prototype.clone.call(value);
              }
          });
      }
  }
  return result;
};

Object.prototype.copyTo = function (destination:any): any {
  let source:any = this;
  Object.keys(this).forEach((key)=>{
      destination[key]=source[key];
    });
  return destination;
};

Object.prototype.containsKey = function (key:any): any {
  let source:any = this;
  return Object.keys(source).includes(key);
};


Object.prototype.isEmpty = function ():boolean{
  return Object.keys(this).length ==0;
}

Object.prototype.isNotEmpty = function ():boolean{
  return !this.isEmpty;
}

Object.prototype.isSame = function (compareObject: any):boolean{
  let result=true;
  let objectA:any = this;
  let objectAKeys = Object.keys(this);
  let objectBKeys = Object.keys(compareObject);
  objectAKeys.forEach(key => {
      if(JSON.stringify(objectA[key])!=JSON.stringify(compareObject[key])){
        result = false;
      }
    });
    objectBKeys.forEach(key => {
      if(JSON.stringify(compareObject[key])!=JSON.stringify(objectA[key])){
        result = false;
      }
    });
  return result;
}

Object.prototype.filter = function <T>(filterFunction: (key: string, value: T) => boolean): Object {
  const obj = this;
  const result: any = {};
  if (typeof filterFunction === 'function') {
      Object.entries(obj).forEach(([key, value]) => {
          if (filterFunction(key, value)) {
              result[key] = value;
          }
      });
  }
  return result;
};

Object.prototype.toQueryString = function ():string{
  let requestString:string[]=[];
  try{
      let requestData:any = this;
      Object.keys(requestData).forEach((key)=>{
        let value=requestData[key];
        if(value!=""&&value!=undefined){
          requestString.push(key+"="+value);
        }
      });
    }
    catch(ex){
    }
  return requestString.join("&");
}

export { };

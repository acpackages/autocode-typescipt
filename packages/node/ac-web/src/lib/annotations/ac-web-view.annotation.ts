import 'reflect-metadata';
export function AcWebView() {
  return function (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    if (propertyKey) {
      // Method decorator
      Reflect.defineMetadata('ac:web:view', true, target, propertyKey);
    } else {
      // Class decorator
      Reflect.defineMetadata('ac:web:view', true, target);
    }
  };
}

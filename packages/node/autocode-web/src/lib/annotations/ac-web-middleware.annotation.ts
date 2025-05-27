import 'reflect-metadata';
function AcWebMiddleware(middlewareClass: string) {
  return function (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    const metadataKey = 'ac:web:middleware';

    if (propertyKey) {
      // Method-level middleware
      Reflect.defineMetadata(metadataKey, middlewareClass, target, propertyKey);
    } else {
      // Class-level middleware
      Reflect.defineMetadata(metadataKey, middlewareClass, target);
    }
  };
}

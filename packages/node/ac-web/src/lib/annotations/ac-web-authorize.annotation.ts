import 'reflect-metadata';

export function AcWebAuthorize({roles}:{roles?: string[]}) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    const metadataKey = 'ac:web:authorize';

    if (propertyKey) {
      // Method-level decorator
      Reflect.defineMetadata(metadataKey, roles, target, propertyKey);
    } else {
      // Class-level decorator
      Reflect.defineMetadata(metadataKey, roles, target);
    }
  };
}

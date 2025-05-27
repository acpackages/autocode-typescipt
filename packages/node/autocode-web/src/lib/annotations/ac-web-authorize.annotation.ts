import 'reflect-metadata';
interface AcWebAuthorizeOptions {
  roles?: string[];
}

function AcWebAuthorize(options: AcWebAuthorizeOptions = {}) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    const metadataKey = 'ac:web:authorize';

    if (propertyKey) {
      // Method-level decorator
      Reflect.defineMetadata(metadataKey, options, target, propertyKey);
    } else {
      // Class-level decorator
      Reflect.defineMetadata(metadataKey, options, target);
    }
  };
}

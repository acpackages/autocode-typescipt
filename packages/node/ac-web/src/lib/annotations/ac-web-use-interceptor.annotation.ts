import 'reflect-metadata';

export function AcWebUseInterceptor({ names }: { names: string[] }) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataKey = 'ac:web:use-interceptor';
    Reflect.defineMetadata(metadataKey, names, target, propertyKey);
  };
}

import 'reflect-metadata';

export function AcWebRoute({path,method}:{path: string;method?: string;}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataKey = 'ac:web:route';
    const routeMeta = {
      path,
      method: method || 'get',
    };
    Reflect.defineMetadata(metadataKey, routeMeta, target, propertyKey);
  };
}

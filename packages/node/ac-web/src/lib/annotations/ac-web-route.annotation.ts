import 'reflect-metadata';
interface AcWebRouteOptions {
  path: string;
  method?: string;
}

function AcWebRoute(path: string, options: { method?: string } = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataKey = 'ac:web:route';
    const routeMeta = {
      path,
      method: options.method || 'get',
    };
    Reflect.defineMetadata(metadataKey, routeMeta, target, propertyKey);
  };
}

import 'reflect-metadata';
export function AcWebRouteConsumes({contentType}:{contentType: string}) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('ac:web:route:consumes', contentType, target, propertyKey);
  };
}

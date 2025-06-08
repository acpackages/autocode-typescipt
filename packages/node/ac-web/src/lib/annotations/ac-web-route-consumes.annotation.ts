import 'reflect-metadata';
function AcWebRouteConsumes(contentType: string) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('ac:web:route:consumes', contentType, target, propertyKey);
  };
}

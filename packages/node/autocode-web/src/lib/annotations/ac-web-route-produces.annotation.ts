import 'reflect-metadata';
function AcWebRouteProduces(contentType: string) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('ac:web:route:produces', contentType, target, propertyKey);
  };
}

import 'reflect-metadata';
export function AcWebService() {
  return function (target: any) {
    Reflect.defineMetadata('ac:web:service', true, target);
  };
}

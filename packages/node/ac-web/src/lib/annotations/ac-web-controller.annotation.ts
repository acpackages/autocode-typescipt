import 'reflect-metadata';
function AcWebController() {
  return function (target: any) {
    Reflect.defineMetadata('ac:web:controller', true, target);
  };
}

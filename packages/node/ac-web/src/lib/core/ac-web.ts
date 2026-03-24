/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcHooks, acHooks, AcLogger, AcEnumLogType, AcFileUtils } from '@autocode-ts/autocode';
import { AcWebRouteDefinition } from '../models/ac-web-route-definition.model';
import { AcWebRequest } from '../models/ac-web-request.model';
import { AcWebResponse } from '../models/ac-web-response.model';
import { AcWebRequestHandlerArgs } from '../models/ac-web-request-handler-args.model';
import { AcWebConfig } from '../models/ac-web-config.model';
import { AcEnumWebHook } from '../enums/ac-enum-web-hook.enum';
import { AcApiDoc } from '../api-docs/models/ac-api-doc.model';
import { AcApiDocPath } from '../api-docs/models/ac-api-doc-path.model';
import { AcApiDocRoute } from '../api-docs/models/ac-api-doc-route.model';
import { AcApiDocServer } from '../api-docs/models/ac-api-doc-server.model';
import { AcApiSwagger } from '../api-docs/swagger/ac-api-swagger';
import { AcSwaggerResources } from '../api-docs/swagger/ac-swagger-resources';

export class AcWeb {
  acApiDoc: AcApiDoc;
  private _webConfig: AcWebConfig = AcWebConfig.getInstance();

  get webConfig(): AcWebConfig {
    return this._webConfig;
  }

  set webConfig(value: AcWebConfig) {
    this._webConfig = value;
    if (value.exposeFilesController) {
      this.staticFilesDirectory({ directory: value.filesControllerConfig.uploadDirectory });
    }
  }

  routeDefinitions: Record<string, AcWebRouteDefinition> = {};
  staticFilesRoutes: Record<string, any>[] = [];
  assetFilesRoutes: Record<string, any>[] = [];
  rawContentMaps: Record<string, any>[] = [];

  port: number = 0;
  sslPort: number = 0;
  sslCertificateChainPath: string = '';
  sslPrivateKeyPath: string = '';
  forceHttps: boolean = false;

  logger: AcLogger = new AcLogger({ logMessages: true, logDirectory: 'logs/ac-web', logType: AcEnumLogType.Console, logFileName: 'ac-web.txt' });
  urlPrefix: string = '';

  constructor({ paths = [] }: { paths?: string[] } = {}) {
    this.acApiDoc = new AcApiDoc();
    acHooks.execute({ hook: AcEnumWebHook.AcWebCreated, args: [this] });

    // Register the route that generates the main swagger.json file.
    this.get({
      url: '/swagger/swagger.json',
      handler: (args: AcWebRequestHandlerArgs) => {
        const acApiSwagger = new AcApiSwagger();
        this.acApiDoc.paths = [];
        const paths: Record<string, AcApiDocPath> = {};

        for (const routeDefinition of Object.values(this.routeDefinitions)) {
          const url = routeDefinition.url;
          if (!url.startsWith('/swagger/')) {
            if (!paths[url]) {
              const pathObj = new AcApiDocPath();
              pathObj.url = url;
              paths[url] = pathObj;
            }
            const acApiDocPath = paths[url];
            const acApiDocRoute = routeDefinition.documentation;
            switch (routeDefinition.method.toUpperCase()) {
              case 'CONNECT': acApiDocPath.connect = acApiDocRoute; break;
              case 'DELETE': acApiDocPath.delete = acApiDocRoute; break;
              case 'GET': acApiDocPath.get = acApiDocRoute; break;
              case 'HEAD': acApiDocPath.head = acApiDocRoute; break;
              case 'OPTIONS': acApiDocPath.options = acApiDocRoute; break;
              case 'PATCH': acApiDocPath.patch = acApiDocRoute; break;
              case 'POST': acApiDocPath.post = acApiDocRoute; break;
              case 'PUT': acApiDocPath.put = acApiDocRoute; break;
              case 'TRACE': acApiDocPath.trace = acApiDocRoute; break;
            }
          }
        }

        this.acApiDoc.paths = Object.values(paths);
        acApiSwagger.acApiDoc = this.acApiDoc;
        return AcWebResponse.json({ data: acApiSwagger.generateJson() });
      },
    });

    // Register routes to serve the static Swagger UI files.
    for (const swaggerFileName of Object.keys(AcSwaggerResources.files)) {
      this.get({
        url: `/swagger${swaggerFileName}`,
        handler: (args: AcWebRequestHandlerArgs) => {
          this.logger.log(`Handling Swagger File : ${swaggerFileName}`);
          const fileContent = AcSwaggerResources.files[swaggerFileName];
          const mimeType = AcFileUtils.mimeFromPath({ path: swaggerFileName });
          this.logger.log(`Handling Swagger File Mime : ${mimeType}`);
          return AcWebResponse.raw({ content: fileContent, headers: { 'Content-Type': mimeType } });
        },
      });
    }
  }

  _extractPathParams({ routePath, uri }: { routePath: string; uri: string }): Record<string, string> {
    const pattern = new RegExp('^' +
      routePath.replace(/\{(\w+)\}/g, (_, name) => `(?<${name}>[^/]+)`) +
      '$');
    const match = pattern.exec(uri);
    if (!match || !match.groups) return {};
    const result: Record<string, string> = {};
    for (const name in match.groups) {
      result[name] = match.groups[name] || '';
    }
    return result;
  }

  _matchPath({ routePath, uri }: { routePath: string; uri: string }): boolean {
    const pattern = new RegExp('^' +
      routePath.replace(/\{(\w+)\}/g, (_, name) => `(?<${name}>[^/]+)`) +
      '$');
    return pattern.test(uri);
  }

  async handleWebRequest({ request, routeDefinition }: { request: AcWebRequest; routeDefinition: AcWebRouteDefinition }): Promise<AcWebResponse> {
    const requestLogger = new AcLogger({
      logFileName: `${request.url}.log`,
      logDirectory: 'logs/ac-web-requests',
      logMessages: true,
      logType: AcEnumLogType.Text,
    });

    // Case 1: Handler is a controller class + method name string
    if (routeDefinition.controller && typeof routeDefinition.handler === 'string') {
      this.logger.log('Handling controller route...');
      try {
        const ControllerClass = routeDefinition.controller;
        const controllerInstance = new ControllerClass();
        const methodName = routeDefinition.handler;
        this.logger.log(`Handler controller method name is : ${methodName}`);
        if (typeof controllerInstance[methodName] === 'function') {
          return await controllerInstance[methodName]({ request, requestLogger });
        }
        return AcWebResponse.notFound();
      } catch (e: any) {
        return AcWebResponse.internalError({ data: e.toString() });
      }
    }
    // Case 2: Handler is a simple closure function
    else if (typeof routeDefinition.handler === 'function') {
      try {
        this.logger.log('Handling function route...');
        const args = new AcWebRequestHandlerArgs({ request, logger: requestLogger });
        return await (routeDefinition.handler as Function)(args);
      } catch (e: any) {
        return AcWebResponse.internalError({ data: e.toString() });
      }
    }

    return AcWebResponse.notFound();
  }

  registerController({ controllerClass, routePrefix = '' }: { controllerClass: any; routePrefix?: string }): AcWeb {
    this.logger.log(`Registering controller class...`);
    let classRoute = routePrefix;

    // Check for route metadata on the controller class itself
    const classMetadata = (controllerClass as any)._acWebRoute;
    if (classMetadata) {
      classRoute = classMetadata.path || classRoute;
    }
    this.logger.log(`Class route is : ${classRoute}`);

    // Check for route metadata on the controller's methods
    const methodMetadata = (controllerClass as any)._acWebRoutes;
    if (methodMetadata) {
      for (const routeMeta of methodMetadata) {
        const fullPath = `${classRoute}/${routeMeta.path.trim()}`.replace(/\/\//g, '/');
        const httpMethod = routeMeta.method.toLowerCase();
        const routeKey = `${httpMethod}>${fullPath}`;
        this.logger.log(`Method route details > Method: ${httpMethod}, Path : ${fullPath}, RouteKey : ${routeKey}`);

        const routeDefinition = AcWebRouteDefinition.instanceFromJson({
          [AcWebRouteDefinition.KEY_URL]: fullPath,
          [AcWebRouteDefinition.KEY_METHOD]: httpMethod,
          [AcWebRouteDefinition.KEY_CONTROLLER]: controllerClass,
          [AcWebRouteDefinition.KEY_HANDLER]: routeMeta.handlerName,
          [AcWebRouteDefinition.KEY_DOCUMENTATION]: routeMeta.documentation || new AcApiDocRoute(),
        });
        this.routeDefinitions[routeKey] = routeDefinition;
      }
    }
    this.logger.log('Controller registered.');
    return this;
  }

  route({ url, handler, method, acApiDocRoute }: {
    url: string;
    handler: (args: AcWebRequestHandlerArgs) => any;
    method: string;
    acApiDocRoute?: AcApiDocRoute;
  }): AcWeb {
    const routeKey = `${method.toLowerCase()}>${url}`;
    this.routeDefinitions[routeKey] = AcWebRouteDefinition.instanceFromJson({
      [AcWebRouteDefinition.KEY_URL]: url,
      [AcWebRouteDefinition.KEY_METHOD]: method.toLowerCase(),
      [AcWebRouteDefinition.KEY_HANDLER]: handler,
      [AcWebRouteDefinition.KEY_DOCUMENTATION]: acApiDocRoute ?? new AcApiDocRoute(),
    });
    return this;
  }

  addHostUrl({ url }: { url: string }): AcWeb {
    const server = new AcApiDocServer();
    server.url = url;
    this.acApiDoc.addServer(server);
    return this;
  }

  assetFiles({ assetDirectory, prefix = '' }: { assetDirectory: string; prefix?: string }): AcWeb {
    this.logger.log(`Registering asset files directory : ${assetDirectory}`);
    this.assetFilesRoutes.push({ prefix, directory: assetDirectory });
    return this;
  }

  rawContentMap({ map, prefix = '', fallbackUrl = '' }: { map: Record<string, any>; prefix?: string; fallbackUrl?: string }): AcWeb {
    this.rawContentMaps.push({ prefix, map, fallbackUrl });
    return this;
  }

  staticFilesDirectory({ directory, prefix = '' }: { directory: string; prefix?: string }): AcWeb {
    this.logger.log(`Registering static files directory : ${directory}`);
    const fs = require('fs');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    this.staticFilesRoutes.push({ prefix, directory });
    return this;
  }

  // --- Standard HTTP method helpers ---

  connect({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'CONNECT', acApiDocRoute });
  }

  delete({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'DELETE', acApiDocRoute });
  }

  get({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'GET', acApiDocRoute });
  }

  head({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'HEAD', acApiDocRoute });
  }

  options({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'OPTIONS', acApiDocRoute });
  }

  patch({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'PATCH', acApiDocRoute });
  }

  post({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'POST', acApiDocRoute });
  }

  put({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'PUT', acApiDocRoute });
  }

  trace({ url, handler, acApiDocRoute }: { url: string; handler: (args: AcWebRequestHandlerArgs) => any; acApiDocRoute?: AcApiDocRoute }): AcWeb {
    return this.route({ url, handler, method: 'TRACE', acApiDocRoute });
  }

  getUrlJson(): Record<string, any> {
    const urls = Object.keys(this.routeDefinitions);
    const result: Record<string, any> = {};

    for (let url of urls) {
      url = url.substring(url.indexOf('>') + 1);
      url = url.replace(/\{.*?\}/g, '');
      url = url.trim();
      if (url.charAt(url.length - 1) === '/') {
        url = url.substring(0, url.length - 1);
      }
      const parts = url.replace(/^\//, '').split('/');

      let current = result;
      for (let i = 0; i < parts.length; i++) {
        const key = parts[i].replace(/\{.*?\}/g, '');
        // simple camelCase conversion
        const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        if (i === parts.length - 1) {
          current[camelKey] = url;
        } else {
          if (!current[camelKey]) {
            current[camelKey] = {};
          }
          if (typeof current[camelKey] === 'object' && !Array.isArray(current[camelKey])) {
            current = current[camelKey];
          }
        }
      }
    }

    return result;
  }
}

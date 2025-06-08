import { AcApiDoc, AcApiDocPath, AcApiSwagger, AcApiDocRoute, AcApiDocParameter, AcApiDocContent, AcApiDocRequestBody, AcApiDocServer, AcApiDocUtils } from 'autocode';
import { AcWebRouteDefinition, AcWebRequest, AcWebResponse, AcWebValueFromPath, AcWebValueFromQuery, AcWebValueFromForm, AcWebValueFromBody, AcWebValueFromHeader, AcWebValueFromCookie, AcWebRouteMeta, AcEnumWebHook, AcSwaggerResources } from 'autocode_web';
import { AcLogger, AcEnumLogType, AcHooks, AcJsonUtils, AcFileUtils } from 'autocode_extensions';

export class AcWeb {
  acApiDoc: AcApiDoc;
  routeDefinitions: Record<string, AcWebRouteDefinition> = {};
  staticFilesRoutes: Record<string, any>[] = [];
  logger: AcLogger = new AcLogger({ logMessages: true, logDirectory: 'logs/ac-web', logType: AcEnumLogType.CONSOLE, logFileName: 'ac-web.txt' });
  urlPrefix: string = "";

  constructor({ paths = [] }: { paths?: string[] } = {}) {
    this.acApiDoc = new AcApiDoc();
    AcHooks.execute({ hookName: AcEnumWebHook.AC_WEB_CREATED, args: [this] });

    this.get({ url: '/swagger/swagger.json', handler: ({ req }) => {
      const acApiSwagger = new AcApiSwagger();
      this.acApiDoc.paths = [];
      const paths: Record<string, AcApiDocPath> = {};

      for (const routeDefinition of Object.values(this.routeDefinitions)) {
        const url = routeDefinition.url;
        if (!url.startsWith("/swagger/")) {
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
    }});

    for (const swaggerFileName of Object.keys(AcSwaggerResources.files)) {
      this.get({ url: `/swagger${swaggerFileName}`, handler: ({ req }) => {
        this.logger.log(`Handling Swagger File : ${swaggerFileName}`);
        const fileContent = AcSwaggerResources.files[swaggerFileName];
        const mimeType = AcFileUtils.getMimeTypeFromPath(swaggerFileName);
        this.logger.log(`Handling Swagger File Mime : ${mimeType}`);
        return AcWebResponse.raw({ content: fileContent, headers: { 'Content-Type': mimeType } });
      }});
    }
  }

  _extractPathParams({ routePath, uri }: { routePath: string, uri: string }): Record<string, string> {
    const pattern = new RegExp('^' +
      routePath.replace(/[{](\w+)[}]/g, (_, name) => `(?<${name}>[^/]+)`) +
      '$');
    const match = pattern.exec(uri);
    if (!match || !match.groups) return {};
    const result: Record<string, string> = {};
    for (const name in match.groups) {
      result[name] = match.groups[name] || '';
    }
    return result;
  }

  _getRouteDocFromHandlerReflection({ handler, acApiDocRoute }: { handler: Function, acApiDocRoute?: AcApiDocRoute }): AcApiDocRoute {
    acApiDocRoute ??= new AcApiDocRoute();
    const functionStr = handler.toString();
    // Placeholder: TypeScript lacks runtime metadata like Dart mirrors
    // Manual or decorator-based metadata collection would be required in practice
    return acApiDocRoute;
  }

   addHostUrl({url}:{url:string}):AcWeb {
    var server = new AcApiDocServer();
    server.url = url;
    this.acApiDoc.addServer({server: server});
    return this;
  }

  connect({ url, handler }: { url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this._registerRoute({ method: 'CONNECT', url, handler });
  }

  get({ url, handler }: { url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this._registerRoute({ method: 'GET', url, handler });
  }

  post({ url, handler }: { url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this._registerRoute({ method: 'POST', url, handler });
  }

  put({ url, handler }: { url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this._registerRoute({ method: 'PUT', url, handler });
  }

  delete({ url, handler }: { url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this._registerRoute({ method: 'DELETE', url, handler });
  }

  patch({ url, handler }: { url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this._registerRoute({ method: 'PATCH', url, handler });
  }

  staticFile({ url, filePath }: { url: string, filePath: string }): void {
    this.staticFilesRoutes.push({ url, filePath });
  }

  _registerRoute({ method, url, handler }: { method: string, url: string, handler: (args: { req: AcWebRequest }) => AcWebResponse }): void {
    this.routeDefinitions[`${method} ${url}`] = {
      method,
      url,
      handler,
      documentation: new AcApiDocRoute()
    };
  }
}

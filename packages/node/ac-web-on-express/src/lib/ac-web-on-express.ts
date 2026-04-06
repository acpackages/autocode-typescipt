/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcWeb, AcWebRequest, AcWebResponse, AcWebRouteDefinition, AcWebRequestHandlerArgs, AcEnumWebResponseType, AcSavedFileDetails, AcWebFile } from '@autocode-ts/ac-web';
import { AcLogger, AcEnumLogType, AcFileUtils, AcResult, AcEnumHttpResponseCode } from '@autocode-ts/autocode';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

export class AcWebOnExpress extends AcWeb {
  private expressApp: express.Application;
  private httpServer?: http.Server;
  private httpsServer?: https.Server;
  private upload = multer({ storage: multer.memoryStorage() });

  constructor({ paths = [] }: { paths?: string[] } = {}) {
    super({ paths });
    this.expressApp = express();
    this.expressApp.use(cors());
    this.expressApp.use(express.json({ limit: '50mb' }));
    this.expressApp.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.expressApp.use(cookieParser());
  }

  async start(): Promise<AcResult> {
    const acResult = new AcResult();
    try {
      if (this.port === 0) this.port = 80;

      this.logger.log(`Starting Express server on port ${this.port}...`);

      if (this.forceHttps) {
        this.expressApp.all('*', (req: Request, res: Response) => {
          const httpsUrl = `https://${req.hostname}${this.sslPort !== 443 ? `:${this.sslPort}` : ''}${req.url}`;
          this.logger.log(`Redirecting to: ${httpsUrl}`);
          res.redirect(301, httpsUrl);
        });
      } else {
        this._addRoutesToExpressApp(this.expressApp);
      }

      this.httpServer = this.expressApp.listen(this.port, () => {
        this.logger.log(`Express server running on port ${this.port}`);
      });

      if (this.sslPort > 0 && this.sslCertificateChainPath && this.sslPrivateKeyPath) {
        const credentials = {
          key: fs.readFileSync(this.sslPrivateKeyPath, 'utf8'),
          cert: fs.readFileSync(this.sslCertificateChainPath, 'utf8'),
        };
        this.httpsServer = https.createServer(credentials, this.expressApp);
        this.httpsServer.listen(this.sslPort, () => {
          this.logger.log(`Secure Express server running on port ${this.sslPort}`);
        });
      }

      acResult.setSuccess();
    } catch (ex: any) {
      this.logger.error(ex);
      acResult.setException({ exception: ex });
    }
    return acResult;
  }

  async stop(): Promise<void> {
    this.logger.log('Stopping Express server...');
    if (this.httpServer) {
      await new Promise<void>((resolve) => this.httpServer!.close(() => resolve()));
    }
    if (this.httpsServer) {
      await new Promise<void>((resolve) => this.httpsServer!.close(() => resolve()));
    }
    this.logger.log('Express server stopped.');
  }

  private _addRoutesToExpressApp(app: express.Application): void {
    // 1. Static Files Routes
    for (const staticDir of this.staticFilesRoutes) {
      const prefix = staticDir['prefix'] || '/';
      const directory = staticDir['directory'];
      this.logger.log(`Registering static directory: ${directory} at prefix: ${prefix}`);
      app.use(prefix, express.static(directory));
    }

    // 2. Asset Files Routes (serving from memory/bundle if implemented similar to Dart)
    for (const assetDir of this.assetFilesRoutes) {
      const prefix = assetDir['prefix'] || '/';
      const directory = assetDir['directory'];
      this.logger.log(`Registering asset directory: ${directory} at prefix: ${prefix}`);
      app.get(`${prefix}*`, async (req: Request, res: Response) => {
        const relativePath = req.params[0] || '';
        const fullPath = path.join(directory, relativePath);
        if (fs.existsSync(fullPath)) {
          res.sendFile(fullPath);
        } else {
          res.status(404).send('Not Found');
        }
      });
    }

    // 3. Raw Content Maps
    for (const rawMap of this.rawContentMaps) {
      const prefix = rawMap['prefix'] || '/';
      const map = rawMap['map'] as Record<string, string>;
      const fallbackUrl = rawMap['fallbackUrl'];
      app.get(`${prefix}*`, (req: Request, res: Response) => {
        let routePath = req.params[0] || '';
        if (routePath.startsWith('/')) routePath = routePath.substring(1);

        let content = map[routePath];
        if (!content && fallbackUrl) {
          content = map[fallbackUrl];
        }

        if (content) {
          const mimeType = AcFileUtils.mimeFromPath({ path: routePath }) || 'text/html';
          res.setHeader('Content-Type', mimeType);
          if (content.startsWith('base64:')) {
            const buffer = Buffer.from(content.substring(7), 'base64');
            res.send(buffer);
          } else {
            res.send(content);
          }
        } else {
          res.status(404).send('Not Found');
        }
      });
    }

    // 4. Dynamic Routes from routeDefinitions
    for (const routeKey of Object.keys(this.routeDefinitions)) {
      const routeDefinition = this.routeDefinitions[routeKey];
      const method = routeDefinition.method.toLowerCase();
      const expressPath = this._normalizeRoutePath(routeDefinition.url);

      this.logger.log(`Registering route: ${method.toUpperCase()} ${expressPath}`);

      (app as any)[method](expressPath, this.upload.any(), async (req: Request, res: Response) => {
        this.logger.log(`Handling Express request: ${method.toUpperCase()} ${req.url}`);
        const acRequest = await this._createAcWebRequestFromExpressReq(req);
        const acResponse = await this.handleWebRequest({ request: acRequest, routeDefinition });
        this._applyAcWebResponseToExpressRes(acResponse, res);
      });
    }

    // 5. Custom Error Handlers (404 and 500)
    app.use((req: Request, res: Response) => {
      this._handle404(req, res);
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      this._handle500(err, req, res);
    });
  }

  private _normalizeRoutePath(path: string): string {
    // Convert {param} to :param for Express
    return path.replace(/\{(\w+)\}/g, ':$1');
  }

  private async _createAcWebRequestFromExpressReq(req: Request): Promise<AcWebRequest> {
    const toPlainObject: Function = (value: any): Record<string, any> => {
      if (!value) return {};

      // Convert null-prototype or weird objects → plain object
      return { ...value };
    }

    const acRequest = new AcWebRequest();
    acRequest.url = req.url.substring(1);
    acRequest.method = req.method;
    acRequest.headers = toPlainObject(
      Object.fromEntries(
        Object.entries(req.headers).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(',') : v
        ])
      )
    );

    acRequest.get = toPlainObject(req.query);
    acRequest.post = toPlainObject(req.body);
    acRequest.cookies = toPlainObject(req.cookies);
    acRequest.pathParameters = toPlainObject(req.params);

    // Handle files if using multer
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const acFile = new AcWebFile();
        acFile.fileName = file.originalname;
        acFile.mimeType = file.mimetype;
        acFile.contentBuffer = file.buffer;
        acRequest.files[file.fieldname] = acFile;
      }
    }

    return acRequest;
  }

  private _applyAcWebResponseToExpressRes(acResponse: AcWebResponse, res: Response): void {
    res.status(acResponse.responseCode || 200);

    // Set headers
    if (acResponse.headers) {
      for (const key of Object.keys(acResponse.headers)) {
        res.setHeader(key, acResponse.headers[key]);
      }
    }

    // Set Cookies
    if (acResponse.cookies) {
      for (const key of Object.keys(acResponse.cookies)) {
        res.cookie(key, acResponse.cookies[key]);
      }
    }

    switch (acResponse.responseType) {
      case AcEnumWebResponseType.Json:
        res.json(acResponse.content);
        break;
      case AcEnumWebResponseType.Html:
        res.setHeader('Content-Type', 'text/html');
        res.send(acResponse.content);
        break;
      case AcEnumWebResponseType.Redirect:
        res.redirect(acResponse.content);
        break;
      case AcEnumWebResponseType.Download:
        // content would be a buffer or file path
        res.send(acResponse.content);
        break;
      case AcEnumWebResponseType.Raw:
        res.send(acResponse.content);
        break;
      default:
        res.send(acResponse.content);
    }
  }

  private _handle404(req: Request, res: Response): void {
    const accept = req.headers.accept || '';
    if (accept.includes('application/json')) {
      res.status(404).json({
        path: req.path,
        method: req.method,
        message: 'Not Found',
      });
    } else {
      res.status(404).send(this._write404Html(req));
    }
  }

  private _handle500(err: any, req: Request, res: Response): void {
    const accept = req.headers.accept || '';
    this.logger.error(err);
    if (accept.includes('application/json')) {
      res.status(500).json({
        error: err.toString(),
        stack: err.stack,
      });
    } else {
      res.status(500).send(this._write500Html(err, req));
    }
  }

  private _write404Html(req: Request): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>404 - Not found!</title>
  <style>
    body, html { margin: 0; padding: 0; border: 0; font-family: monospace; background-color: #e4e4e4; }
    .content { width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .title { font-size: 30px; margin: 10px 0; }
    .info { font-size: 16px; margin: 5px 0; }
  </style>
</head>
<body>
  <div class="content">
    <div class="title">Not found!</div>
    <div class="info">Path: <i>${req.path}</i></div>
    <div class="info">Method: <i>${req.method}</i></div>
  </div>
</body>
</html>`;
  }

  private _write500Html(err: any, req: Request): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Server error</title>
  <style>
    body, html { margin: 0; padding: 0; border: 0; background-color: #e4e4e4; font-family: sans-serif; }
    .header { font-size: 20px; background-color: rgba(204, 49, 0, 0.94); color: #F8F8F8; padding: 10px; font-weight: bold; }
    .content { padding: 15px; }
    .info-title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
    pre { background: #fff; padding: 10px; border: 1px solid #ccc; overflow: auto; }
  </style>
</head>
<body>
  <div class="header">Server error!</div>
  <div class="content">
    <div class="info-title">Message</div>
    <pre>${err.message || err.toString()}</pre>
    <div class="info-title">Stack</div>
    <pre>${err.stack || 'No stack trace available'}</pre>
    <div class="info-title">Request</div>
    <div>Resource: ${req.path}</div>
    <div>Method: ${req.method}</div>
  </div>
</body>
</html>`;
  }
}

import { AcWebInterceptor } from '../core/ac-web-interceptor';
import { AcEncryption, AcEnumHttpResponseCode } from '@autocode-ts/autocode';
import { AcWebRequest } from '../models/ac-web-request.model';
import { AcWebResponse } from '../models/ac-web-response.model';

export class AcWebJwtInterceptor extends AcWebInterceptor {
  readonly excludePaths: string[];
  secretKey?: string;
  readonly verifyToken?: (token: string) => Promise<Record<string, any> | null>;
  readonly headerKey: string;

  static readonly claimsKey = 'jwt_payload';

  readonly name = 'AcWebJwtInterceptor';

  constructor({
    secretKey,
    verifyToken,
    excludePaths = [],
    headerKey = 'authorization',
  }: {
    secretKey?: string;
    verifyToken?: (token: string) => Promise<Record<string, any> | null>;
    excludePaths?: string[];
    headerKey?: string;
  }) {
    super();
    this.secretKey = secretKey;
    this.verifyToken = verifyToken;
    this.excludePaths = excludePaths;
    this.headerKey = headerKey;
  }

  setSecretKey({ secret }: { secret: string }): void {
    this.secretKey = secret;
  }

  async onRequest({ request }: { request: AcWebRequest }): Promise<AcWebResponse | null> {
    try {
      // Skip excluded paths
      const path = `/${(request.url || '').split('?')[0]}`.replace(/\/\//g, '/');
      console.log(`[AcWebJwtInterceptor] onRequest path: ${path}`);
      for (const excluded of this.excludePaths) {
        const cleanExcluded = excluded.startsWith('/') ? excluded : `/${excluded}`;
        if (path === cleanExcluded || path.startsWith(cleanExcluded)) {
          return null;
        }
      }

      console.log(`[AcWebJwtInterceptor] Extracting header: ${this.headerKey}`);
      const authHeader = this._getHeader(request, this.headerKey);
      if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        console.log(`[AcWebJwtInterceptor] Missing or invalid bearer header`);
        return this._unauthorized('Missing or invalid Authorization header');
      }

      const token = authHeader.substring(7).trim();
      console.log(`[AcWebJwtInterceptor] Token extracted, length: ${token.length}`);
      if (!token) {
        return this._unauthorized('Empty token');
      }

      let claims: Record<string, any> | null = null;

      console.log(`[AcWebJwtInterceptor] Verifying token. verifyToken: ${typeof this.verifyToken}, secretKey: ${!!this.secretKey}`);
      if (this.verifyToken) {
        claims = await this.verifyToken(token);
      } else if (this.secretKey) {
        claims = AcEncryption.verifyToken({ token, secret: this.secretKey });
      }
      console.log(`[AcWebJwtInterceptor] Claims result: ${!!claims}`);

      if (!claims) {
        console.log(`[AcWebJwtInterceptor] Token invalid or expired for token: ${token ? token.substring(0, 10) + '...' : 'null'}`);
        return this._unauthorized('Token is invalid or expired');
      }

      if (!request.internalParams) {
        request.internalParams = {};
      }
      request.internalParams[AcWebJwtInterceptor.claimsKey] = claims;
      return null; // continue
    } catch (e: any) {
      console.error(`[AcWebJwtInterceptor] ERROR in onRequest: ${e.message}`, e.stack);
      throw e;
    }
  }

  // Helpers

  private _getHeader(request: AcWebRequest, key: string): string | null {
    const lower = key.toLowerCase();
    for (const [k, v] of Object.entries(request.headers || {})) {
      if (k.toLowerCase() === lower) {
        return v ? String(v) : null;
      }
    }
    return null;
  }

  static generateToken({
    payload,
    secret,
    expiresInSeconds,
  }: {
    payload: Record<string, any>;
    secret: string;
    expiresInSeconds?: number;
  }): string {
    return AcEncryption.generateToken({ data: payload, secret, expiresInSeconds });
  }

  generateToken({
    payload,
    secret,
    expiresInSeconds,
  }: {
    payload: Record<string, any>;
    secret: string;
    expiresInSeconds?: number;
  }): string {
    return AcWebJwtInterceptor.generateToken({ payload, secret, expiresInSeconds });
  }







  private _unauthorized(message: string): AcWebResponse {
    return AcWebResponse.json({
      data: { error: 'Unauthorized', message },
      responseCode: AcEnumHttpResponseCode.Unauthorized,
    });
  }
}

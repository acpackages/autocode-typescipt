import * as crypto from 'crypto';
import { AcWebInterceptor } from '../core/ac-web-interceptor';
import { AcEnumHttpResponseCode } from '@autocode-ts/autocode';
import { AcWebRequest } from '../models/ac-web-request.model';
import { AcWebResponse } from '../models/ac-web-response.model';

export class AcWebJwtInterceptor extends AcWebInterceptor {
  readonly excludePaths: string[];
  secretKey?: string;
  readonly verifyToken?: (token: string) => Promise<Record<string, any> | null>;
  readonly headerKey: string;

  static readonly claimsKey = 'jwt_claims';

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

  setSecretKey({secret}:{secret: string}): void {
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
        claims = AcWebJwtInterceptor._verifyHs256({token,secret: this.secretKey});
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

  static generateToken({payload,secret,expiresInSeconds}:{payload: Record<string, any>, secret: string, expiresInSeconds?: number}): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerEncoded = AcWebJwtInterceptor._base64UrlEncode(Buffer.from(JSON.stringify(header)));

    const body = { ...payload };
    if (expiresInSeconds) {
      body['exp'] = Math.floor(Date.now() / 1000) + expiresInSeconds;
    }
    const bodyEncoded = AcWebJwtInterceptor._base64UrlEncode(Buffer.from(JSON.stringify(body)));

    const signingInput = `${headerEncoded}.${bodyEncoded}`;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(signingInput);
    const signatureEncoded = AcWebJwtInterceptor._base64UrlEncode(hmac.digest());

    return `${signingInput}.${signatureEncoded}`;
  }

  private static _verifyHs256({token,secret}:{token: string, secret: string}): Record<string, any> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Verify signature
      const signingInput = `${parts[0]}.${parts[1]}`;
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(signingInput);
      const expectedSignature = AcWebJwtInterceptor._base64UrlEncode(hmac.digest());

      if (expectedSignature !== parts[2]) return null;

      // Decode payload
      const payloadJson = Buffer.from(AcWebJwtInterceptor._base64UrlDecode(parts[1])).toString('utf8');
      const claims = JSON.parse(payloadJson);

      // Validate time claims (exp / nbf)
      const now = Math.floor(Date.now() / 1000);
      if (claims.exp !== undefined && claims.exp < now) return null;
      if (claims.nbf !== undefined && claims.nbf > now) return null;

      return claims;
    } catch (_) {
      return null;
    }
  }

  private static _base64UrlEncode(buffer: Buffer): string {
    return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private static _base64UrlDecode(input: string): Buffer {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const padContent = base64.length % 4;
    if (padContent > 0) {
      base64 = base64.padEnd(base64.length + (4 - padContent), '=');
    }
    return Buffer.from(base64, 'base64');
  }

  private _unauthorized(message: string): AcWebResponse {
    return AcWebResponse.json({
      data: { error: 'Unauthorized', message },
      responseCode: AcEnumHttpResponseCode.Unauthorized,
    });
  }
}

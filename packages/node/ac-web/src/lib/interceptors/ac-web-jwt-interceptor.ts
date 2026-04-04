import * as crypto from 'crypto';
import { AcWebInterceptor } from '../core/ac-web-interceptor';
import { AcWebRequest, AcWebResponse } from '@autocode-ts/ac-web';
import { AcEnumHttpResponseCode } from '@autocode-ts/autocode';

export class AcWebJwtInterceptor extends AcWebInterceptor {
  readonly excludePaths: string[];
  readonly secretKey?: string;
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

  async onRequest({ request }: { request: AcWebRequest }): Promise<AcWebResponse | null> {
    // Skip excluded paths
    const path = `/${request.url.split('?')[0]}`.replace(/\/\//g, '/');
    for (const excluded of this.excludePaths) {
      const cleanExcluded = excluded.startsWith('/') ? excluded : `/${excluded}`;
      if (path === cleanExcluded || path.startsWith(cleanExcluded)) {
        return null;
      }
    }

    // Extract bearer token from header
    const authHeader = this._getHeader(request, this.headerKey);
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
      return this._unauthorized('Missing or invalid Authorization header');
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      return this._unauthorized('Empty token');
    }

    let claims: Record<string, any> | null = null;

    if (this.verifyToken) {
      claims = await this.verifyToken(token);
    } else if (this.secretKey) {
      claims = this._verifyHs256(token, this.secretKey);
    }

    if (!claims) {
      return this._unauthorized('Token is invalid or expired');
    }

    if (!request.internalParams) {
      request.internalParams = {};
    }
    request.internalParams[AcWebJwtInterceptor.claimsKey] = claims;
    return null; // continue
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

  private _verifyHs256(token: string, secret: string): Record<string, any> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Verify signature
      const signingInput = `${parts[0]}.${parts[1]}`;
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(signingInput);
      const expectedSignature = this._base64UrlEncode(hmac.digest());

      if (expectedSignature !== parts[2]) return null;

      // Decode payload
      const payloadJson = Buffer.from(this._base64UrlDecode(parts[1])).toString('utf8');
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

  private _base64UrlEncode(buffer: Buffer): string {
    return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private _base64UrlDecode(input: string): Buffer {
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

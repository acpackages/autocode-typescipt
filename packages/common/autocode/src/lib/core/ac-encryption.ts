import CryptoJS from 'crypto-js';

export class AcEncryption {
  static encryptionKey = '###RandomEncryptionKey###';

  // Fixed IV: 16 characters from char codes 0 to 15
  private static iv = CryptoJS.enc.Utf8.parse(
    Array.from({ length: 16 }, (_, i) => String.fromCharCode(i)).join('')
  );

  private static _base64UrlDecode(input: string): string {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const padContent = base64.length % 4;
    if (padContent > 0) {
      base64 = base64.padEnd(base64.length + (4 - padContent), '=');
    }
    const words = CryptoJS.enc.Base64.parse(base64);
    return CryptoJS.enc.Utf8.stringify(words);
  }

  private static _base64UrlEncode(input: string): string {
    const words = CryptoJS.enc.Utf8.parse(input);
    return this._base64UrlEncodeFromWordArray(words);
  }

  private static _base64UrlEncodeFromWordArray(words: CryptoJS.lib.WordArray): string {
    return CryptoJS.enc.Base64.stringify(words)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private static _deriveKey({ keyText }: { keyText: string }): CryptoJS.lib.WordArray {
    return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(keyText));
  }

  static encrypt({
    plainText,
    encryptionKey,
  }: {
    plainText: string;
    encryptionKey?: string;
  }): string {
    const key = this._deriveKey({ keyText: encryptionKey ?? this.encryptionKey });
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString(); // Base64
  }

  static decrypt({
    encryptedText,
    encryptionKey,
  }: {
    encryptedText: string;
    encryptionKey?: string;
  }): string {
    const key = this._deriveKey({ keyText: encryptionKey ?? this.encryptionKey });
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  static generateToken({ data, secret, expiresInSeconds }: {
    data: Record<string, any>;
    secret: string;
    expiresInSeconds?: number;
  }): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerEncoded = this._base64UrlEncode(JSON.stringify(header));

    const body = { ...data };
    if (expiresInSeconds) {
      body['exp'] = Math.floor(Date.now() / 1000) + expiresInSeconds;
    }
    const bodyEncoded = this._base64UrlEncode(JSON.stringify(body));

    const signingInput = `${headerEncoded}.${bodyEncoded}`;
    const hmac = CryptoJS.HmacSHA256(signingInput, secret);
    const signatureEncoded = this._base64UrlEncodeFromWordArray(hmac);

    return `${signingInput}.${signatureEncoded}`;
  }

  static verifyToken({ token, secret }: { token: string, secret: string }): Record<string, any> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Verify signature
      const signingInput = `${parts[0]}.${parts[1]}`;
      const hmac = CryptoJS.HmacSHA256(signingInput, secret);
      const expectedSignature = this._base64UrlEncodeFromWordArray(hmac);

      if (expectedSignature !== parts[2]) return null;

      // Decode payload
      const payloadJson = this._base64UrlDecode(parts[1]);
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


}


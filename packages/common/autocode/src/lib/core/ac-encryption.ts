// For Node compatibility, import only if running in Node
let nodeCrypto: typeof import('crypto') | null = null;
const isNode = typeof window === 'undefined' && typeof process !== 'undefined' && process.versions?.node !== undefined;

if (isNode) {
  // Dynamic import so bundlers can tree-shake properly for browsers
  nodeCrypto = require('crypto');
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  if (isNode) {
    // Node Buffer to ArrayBuffer
    return Buffer.from(base64, 'base64').buffer;
  } else {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  if (isNode) {
    return Buffer.from(buffer).toString('base64');
  } else {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}

export class AcEncryption {
  static encryptionKey = '###RandomEncryptionKey###';
  private static iv = new Uint8Array([...Array(16).keys()]); // 0,1,2,...15

  static async encrypt({
    plainText,
    customKey,
  }: {
    plainText: string;
    customKey?: string;
  }): Promise<string> {
    if (isNode && nodeCrypto) {
      // Node.js implementation
      const key = this._deriveKeyNode(customKey ?? this.encryptionKey);
      const cipher = nodeCrypto.createCipheriv('aes-256-cbc', key, this.iv);
      let encrypted = cipher.update(plainText, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return encrypted;
    } else if (typeof window !== 'undefined' && window.crypto?.subtle) {
      // Browser implementation using Web Crypto API
      const keyMaterial = await this._deriveKeyBrowser(customKey ?? this.encryptionKey);
      const encodedText = new TextEncoder().encode(plainText);

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: this.iv,
        },
        keyMaterial,
        encodedText
      );

      return arrayBufferToBase64(encryptedBuffer);
    } else {
      throw new Error('No supported crypto implementation found');
    }
  }

  static async decrypt({
    encryptedText,
    customKey,
  }: {
    encryptedText: string;
    customKey?: string;
  }): Promise<string> {
    if (isNode && nodeCrypto) {
      // Node.js implementation
      const key = this._deriveKeyNode(customKey ?? this.encryptionKey);
      const decipher = nodeCrypto.createDecipheriv('aes-256-cbc', key, this.iv);
      let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } else if (typeof window !== 'undefined' && window.crypto?.subtle) {
      // Browser implementation
      const keyMaterial = await this._deriveKeyBrowser(customKey ?? this.encryptionKey);
      const encryptedBuffer = base64ToArrayBuffer(encryptedText);

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: this.iv,
        },
        keyMaterial,
        encryptedBuffer
      );

      return new TextDecoder().decode(decryptedBuffer);
    } else {
      throw new Error('No supported crypto implementation found');
    }
  }

  // Node.js: derive key as Buffer using SHA-256
  private static _deriveKeyNode(keyText: string): Buffer {
    return nodeCrypto!.createHash('sha256').update(keyText, 'utf8').digest();
  }

  // Browser: derive key as CryptoKey using SHA-256
  private static async _deriveKeyBrowser(keyText: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keyText);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', keyData);
    return window.crypto.subtle.importKey(
      'raw',
      hashBuffer,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt']
    );
  }
}

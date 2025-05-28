import CryptoJS from 'crypto-js';

export class AcEncryption {
  static encryptionKey = '###RandomEncryptionKey###';

  // Fixed IV: 16 characters from char codes 0 to 15
  private static iv = CryptoJS.enc.Utf8.parse(
    Array.from({ length: 16 }, (_, i) => String.fromCharCode(i)).join('')
  );

  private static _deriveKey(keyText: string): CryptoJS.lib.WordArray {
    return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(keyText));
  }

  static encrypt({
    plainText,
    encryptionKey,
  }: {
    plainText: string;
    encryptionKey?: string;
  }): string {
    const key = this._deriveKey(encryptionKey ?? this.encryptionKey);
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
    const key = this._deriveKey(encryptionKey ?? this.encryptionKey);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as fs from 'fs';
import * as path from 'path';
import { AcBindJsonProperty, AcJsonUtils, AcResult } from "@autocode-ts/autocode";

export class AcWebFile {
  static readonly KeyCharset = 'charset';
  static readonly KeyContentText = 'contentText';
  static readonly KeyContentBuffer = 'contentBuffer';
  static readonly KeyFileName = 'filename';
  static readonly KeyMimeType = 'mimeType';

  @AcBindJsonProperty({ key: AcWebFile.KeyCharset })
  charset?: string;

  @AcBindJsonProperty({ key: AcWebFile.KeyFileName })
  fileName?: string;

  @AcBindJsonProperty({ key: AcWebFile.KeyMimeType })
  mimeType?: string;

  /** Text content for text-based file uploads */
  contentText?: string;

  /** Binary buffer for binary file uploads */
  contentBuffer?: Buffer;

  constructor() {}

  static instanceFromJson(jsonData: Record<string, any>): AcWebFile {
    const instance = new AcWebFile();
    instance.fromJson(jsonData);
    return instance;
  }

  fromJson(jsonData: Record<string, any>): AcWebFile {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  setContentType({ contentType }: { contentType: string }): void {
    // Expected format: "mime/type; charset=utf-8"
    const parts = contentType.split(';');
    this.mimeType = parts[0]?.trim();
    if (parts[1]) {
      const charsetMatch = parts[1].match(/charset\s*=\s*(\S+)/i);
      if (charsetMatch) {
        this.charset = charsetMatch[1];
      }
    }
  }

  async writeTo({ filePath, encoding = 'utf-8' }: { filePath: string; encoding?: BufferEncoding }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (this.contentText) {
        fs.writeFileSync(filePath, this.contentText, { encoding });
      } else if (this.contentBuffer) {
        fs.writeFileSync(filePath, this.contentBuffer);
      }
      result.setSuccess({ value: filePath });
    } catch (ex: any) {
      result.setException({ exception: ex });
    }
    return result;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}

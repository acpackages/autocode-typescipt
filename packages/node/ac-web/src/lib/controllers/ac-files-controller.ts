/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { AcLogger, AcResult, AcJsonUtils, AcBindJsonProperty } from "@autocode-ts/autocode";
import { AcWebConfig } from "../models/ac-web-config.model";
import { AcWebFile } from "../models/ac-web-file.model";
import { AcWebRequest } from "../models/ac-web-request.model";
import { AcWebResponse } from "../models/ac-web-response.model";
import { AcWebApiResponse } from "../models/ac-web-api-response.model";

export class AcFilesController {
  logger!: AcLogger;
  acWebConfig: AcWebConfig = AcWebConfig.getInstance();

  async upload({ request, requestLogger }: { request: AcWebRequest; requestLogger: AcLogger }): Promise<AcWebResponse> {
    this.logger = requestLogger;
    const apiResponse = new AcWebApiResponse();
    const uploadFormKey = this.acWebConfig.filesControllerConfig.uploadFormKey;
    if (request.files[uploadFormKey]) {
      const result = await this.saveFile({ webFile: request.files[uploadFormKey] as AcWebFile });
      if (this.acWebConfig.filesControllerConfig.afterUploadCallback) {
        apiResponse.setFromResult({ result: await this.acWebConfig.filesControllerConfig.afterUploadCallback({ savedResult: result, request }), logger: this.logger });
      } else {
        apiResponse.setFromResult({ result, logger: this.logger });
      }
    } else {
      apiResponse.setFailure({ message: `${uploadFormKey} parameter missing`, logger: this.logger });
    }
    return apiResponse.toWebResponse();
  }

  async saveFile({ webFile }: { webFile: AcWebFile }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const fileName = (webFile.fileName || '').replace(/\s+/g, '');
      const savePath = this.acWebConfig.filesControllerConfig.uploadDirectory;
      const ext = path.extname(fileName).replace('.', '').toLowerCase();
      let generateAllSizes = this.acWebConfig.filesControllerConfig.generateDifferentSizeImages;
      if (!['jpg', 'jpeg', 'png'].includes(ext) && generateAllSizes) {
        generateAllSizes = false;
      }
      let newPath = `${savePath}/${Date.now()}`;
      while (fs.existsSync(newPath)) {
        newPath = `${savePath}/${Date.now()}`;
      }
      fs.mkdirSync(newPath, { recursive: true });
      const targetFile = `${newPath}/${fileName}`;
      this.logger.log(`Writing file to path : ${targetFile}`);
      const fileResult = await webFile.writeTo({ filePath: targetFile });
      if (fileResult.isSuccess()) {
        const stats = fs.statSync(targetFile);
        const fileDetails = new AcSavedFileDetails({
          path: targetFile,
          height: 0,
          type: ext,
          width: 0,
          size: stats.size,
        });
        if (generateAllSizes) {
          const allSizesResult = await this.generateAllSizeImages({ filePath: targetFile, fileDetails });
          result.setFromResult({ result: allSizesResult, logger: this.logger });
        } else {
          result.setSuccess({ value: fileDetails, logger: this.logger });
        }
      } else {
        result.setFromResult({ result: fileResult, logger: this.logger });
      }
    } catch (ex: any) {
      result.setException({ exception: ex, logger: this.logger });
    }
    return result;
  }

  async generateAllSizeImages({ filePath, fileDetails }: { filePath: string; fileDetails: AcSavedFileDetails }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const metadata = await sharp(filePath).metadata();
      const sourceWidth = metadata.width || 0;
      const sourceHeight = metadata.height || 0;
      fileDetails.height = sourceHeight;
      fileDetails.width = sourceWidth;
      let originalPx = sourceHeight;
      if (sourceWidth > sourceHeight) {
        originalPx = sourceWidth;
      }

      let continueOperation = true;
      const config = this.acWebConfig.filesControllerConfig;
      const sizes: Array<{ key: string; px: number }> = [
        { key: 'lg', px: config.imageLgPx },
        { key: 'md', px: config.imageMdPx },
        { key: 'sm', px: config.imageSmPx },
        { key: 'xs', px: config.imageXsPx },
      ];

      for (const sizeConfig of sizes) {
        if (!continueOperation) break;
        if (originalPx > sizeConfig.px) {
          const fileSaveResult = await this.generateResizedImage({ originalPath: filePath, directoryName: sizeConfig.key, imagePx: sizeConfig.px });
          if (fileSaveResult.isSuccess()) {
            fileDetails.otherSizes[sizeConfig.key] = fileSaveResult.value!;
          } else {
            continueOperation = false;
            result.setFromResult({ result: fileSaveResult, logger: this.logger });
          }
        }
      }

      if (continueOperation) {
        result.setSuccess({ value: fileDetails, logger: this.logger });
      }
    } catch (ex: any) {
      result.setException({ exception: ex, logger: this.logger });
    }
    return result;
  }

  async generateResizedImage({ originalPath, directoryName, imagePx, preserveRatio = true }: { originalPath: string; directoryName: string; imagePx: number; preserveRatio?: boolean }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const dir = path.dirname(originalPath);
      const fileName = path.basename(originalPath);
      const destinationDir = path.join(dir, directoryName);
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      const destinationPath = path.join(destinationDir, fileName);
      const resizeResult = await this.resizeImage({ originalPath, resizedPath: destinationPath, size: imagePx, preserveRatio });
      result.setFromResult({ result: resizeResult, logger: this.logger });
    } catch (ex: any) {
      result.setException({ exception: ex, logger: this.logger });
    }
    return result;
  }

  async resizeImage({ originalPath, resizedPath, size, preserveRatio }: { originalPath: string; resizedPath: string; size: number; preserveRatio: boolean }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const metadata = await sharp(originalPath).metadata();
      const originalWidth = metadata.width || 0;
      const originalHeight = metadata.height || 0;
      const ext = path.extname(originalPath).replace('.', '').toLowerCase();
      let newWidth = size;
      let newHeight = size;
      const sourceAspectRatio = originalWidth / originalHeight;
      if (sourceAspectRatio < 1) {
        newWidth = Math.round(newWidth * sourceAspectRatio);
      } else {
        newHeight = Math.round(newHeight / sourceAspectRatio);
      }
      await sharp(originalPath).resize(newWidth, newHeight).toFile(resizedPath);
      const stats = fs.statSync(resizedPath);
      const savedFileDetails = new AcSavedFileDetails({
        height: newHeight,
        width: newWidth,
        size: stats.size,
        path: resizedPath,
        type: ext,
      });
      result.setSuccess({ value: savedFileDetails, logger: this.logger });
    } catch (ex: any) {
      result.setException({ exception: ex, logger: this.logger });
    }
    return result;
  }
}

export class AcSavedFileDetails {
  static readonly KeyHeight = 'height';
  static readonly KeyPath = 'path';
  static readonly KeySize = 'size';
  static readonly KeyType = 'type';
  static readonly KeyWidth = 'width';
  static readonly KeyOtherSizes = 'otherSizes';

  @AcBindJsonProperty({ key: AcSavedFileDetails.KeyHeight })
  height: number = 0;

  @AcBindJsonProperty({ key: AcSavedFileDetails.KeyPath })
  path: string = '';

  @AcBindJsonProperty({ key: AcSavedFileDetails.KeySize })
  size: number = 0;

  @AcBindJsonProperty({ key: AcSavedFileDetails.KeyType })
  type: string = '';

  @AcBindJsonProperty({ key: AcSavedFileDetails.KeyWidth })
  width: number = 0;

  @AcBindJsonProperty({ key: AcSavedFileDetails.KeyOtherSizes })
  otherSizes: Record<string, any> = {};

  constructor({
    height = 0,
    path = '',
    size = 0,
    type = '',
    width = 0,
  }: {
    height?: number;
    path?: string;
    size?: number;
    type?: string;
    width?: number;
  } = {}) {
    this.height = height;
    this.path = path;
    this.size = size;
    this.type = type;
    this.width = width;
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcSavedFileDetails {
    const instance = new AcSavedFileDetails();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcSavedFileDetails {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}

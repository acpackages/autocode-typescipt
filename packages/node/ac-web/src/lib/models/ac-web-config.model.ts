/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";
import { AcWebRequest } from "./ac-web-request.model";

export class AcWebConfig {
  private static _instance: AcWebConfig;

  filesControllerConfig: AcFilesControllerConfig = new AcFilesControllerConfig();
  exposeFilesController: boolean = false;

  private constructor() {}

  static getInstance(): AcWebConfig {
    if (!AcWebConfig._instance) {
      AcWebConfig._instance = new AcWebConfig();
    }
    return AcWebConfig._instance;
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcWebConfig {
    const instance = AcWebConfig.getInstance();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcWebConfig {
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

export class AcFilesControllerConfig {
  private static _instance: AcFilesControllerConfig;

  afterUploadCallback?: (params: { savedResult: any; request: AcWebRequest }) => Promise<any>;
  generateDifferentSizeImages: boolean = true;
  imageXsPx: number = 35;
  imageSquareThumbPx: number = 70;
  imageThumbPx: number = 100;
  imageSmPx: number = 360;
  imageMdPx: number = 720;
  imageLgPx: number = 1080;
  uploadDirectory: string = 'file-uploads';
  uploadFormKey: string = 'file';
  routePrefix: string = '/api/files';

  constructor() {}

  static getInstance(): AcFilesControllerConfig {
    if (!AcFilesControllerConfig._instance) {
      AcFilesControllerConfig._instance = new AcFilesControllerConfig();
    }
    return AcFilesControllerConfig._instance;
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcFilesControllerConfig {
    const instance = AcFilesControllerConfig.getInstance();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcFilesControllerConfig {
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

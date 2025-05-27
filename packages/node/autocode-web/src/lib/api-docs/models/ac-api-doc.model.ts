/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcApiDocContact } from "./ac-api-doc-contact.model";
import { AcApiDocLicense } from "./ac-api-doc-license.model";
import { AcApiDocModel } from "./ac-api-doc-model.model";
import { AcApiDocPath } from "./ac-api-doc-path.model";
import { AcApiDocServer } from "./ac-api-doc-server.model";
import { AcApiDocTag } from "./ac-api-doc-tag.model";

export class AcApiDoc {
  static readonly KEY_CONTACT = "contact";
  static readonly KEY_COMPONENTS = "components";
  static readonly KEY_DESCRIPTION = "description";
  static readonly KEY_LICENSE = "license";
  static readonly KEY_MODELS = "models";
  static readonly KEY_PATHS = "paths";
  static readonly KEY_SERVERS = "servers";
  static readonly KEY_TAGS = "tags";
  static readonly KEY_TERMS_OF_SERVICE = "termsOfService";
  static readonly KEY_TITLE = "title";
  static readonly KEY_VERSION = "version";

  contact?: AcApiDocContact;
  components: any[] = [];
  description: string = "";
  license?: AcApiDocLicense;

  @AcBindJsonProperty({ key: AcApiDoc.KEY_MODELS})
  models: Record<string, AcApiDocModel> = {};

  @AcBindJsonProperty({ key: AcApiDoc.KEY_PATHS, arrayType: AcApiDocPath })
  paths: AcApiDocPath[] = [];

  @AcBindJsonProperty({ key: AcApiDoc.KEY_SERVERS, arrayType: AcApiDocServer })
  servers: AcApiDocServer[] = [];

  @AcBindJsonProperty({ key: AcApiDoc.KEY_TAGS, arrayType: AcApiDocTag })
  tags: AcApiDocTag[] = [];

  @AcBindJsonProperty({ key: AcApiDoc.KEY_TERMS_OF_SERVICE })
  termsOfService: string = "";

  title: string = "";
  version: string = "";

  static instanceFromJson(jsonData: Record<string, any>): AcApiDoc {
    const instance = new AcApiDoc();
    return instance.fromJson(jsonData);
  }

  addModel(model: AcApiDocModel): this {
    this.models[model.name] = model;
    return this;
  }

  addPath(path: AcApiDocPath): this {
    this.paths.push(path);
    return this;
  }

  addServer(server: AcApiDocServer): this {
    this.servers.push(server);
    return this;
  }

  addTag(tag: AcApiDocTag): this {
    this.tags.push(tag);
    return this;
  }

  fromJson(jsonData: Record<string, any>): this {
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

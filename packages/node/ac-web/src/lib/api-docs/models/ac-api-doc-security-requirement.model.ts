import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocSecurityRequirement {
  static readonly KEY_REQUIREMENTS = 'requirements';

  @AcBindJsonProperty({ key: AcApiDocSecurityRequirement.KEY_REQUIREMENTS })
  requirements: any[] = [];

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocSecurityRequirement {
    const instance = new AcApiDocSecurityRequirement();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData }: { jsonData: Record<string, any> }): this {
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

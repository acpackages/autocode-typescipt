/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

/**
 * Represents configuration settings for data dictionary / table behavior,
 * such as soft delete support and timestamp column names.
 */
export class AcDDConfig {
  // Static keys (following camelCase naming convention)
  static readonly KeyInsertTimestampColumnKey = "insertTimestampColumnKey";
  static readonly KeyUpdateTimestampColumnKey = "updateTimestampColumnKey";
  static readonly KeyDeleteTimestampColumnKey = "deleteTimestampColumnKey";
  static readonly KeySoftDeleteRows = "softDeleteRows";

  // Properties with decorators
  @AcBindJsonProperty({ key: AcDDConfig.KeySoftDeleteRows })
  softDeleteRows: boolean = false;

  @AcBindJsonProperty({ key: AcDDConfig.KeyInsertTimestampColumnKey })
  insertTimestampColumnKey: string = "";

  @AcBindJsonProperty({ key: AcDDConfig.KeyUpdateTimestampColumnKey })
  updateTimestampColumnKey: string = "";

  @AcBindJsonProperty({ key: AcDDConfig.KeyDeleteTimestampColumnKey })
  deleteTimestampColumnKey: string = "";

  constructor() {
    // Default values are already set above
  }

  /**
   * Creates a new AcDDConfig instance from JSON data
   */
  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDConfig {
    const instance = new AcDDConfig();
    instance.fromJson({ jsonData });
    return instance;
  }

  /**
   * Populates this instance from JSON data
   */
  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  /**
   * Converts this instance to a plain JSON object
   */
  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  /**
   * Returns a pretty-printed JSON string representation
   */
  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

// Global singleton instance (same pattern as in Dart)
export const acDDConfig = new AcDDConfig();

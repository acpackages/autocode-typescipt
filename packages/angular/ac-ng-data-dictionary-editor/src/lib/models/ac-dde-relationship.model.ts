/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDERelationship {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyCascadeDeleteDestination = "cascade_delete_destination";
  static readonly KeyCascadeDeleteSource = "cascade_delete_source";
  static readonly KeyDestinationColumnId = "destination_column_id";
  static readonly KeyDestinationTableId = "destination_table_id";
  static readonly KeyRelationshipId = "relationship_id";
  static readonly KeySourceColumnId = "source_column_id";
  static readonly KeySourceTableId = "source_table_id";

  @AcBindJsonProperty({ key: AcDDERelationship.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDERelationship.KeyCascadeDeleteDestination })
  cascadeDeleteDestination: boolean = false;

  @AcBindJsonProperty({ key: AcDDERelationship.KeyCascadeDeleteSource })
  cascadeDeleteSource: boolean = false;

  @AcBindJsonProperty({ key: AcDDERelationship.KeyDestinationColumnId })
  destinationColumnId: string = "";

  @AcBindJsonProperty({ key: AcDDERelationship.KeyDestinationTableId })
  destinationTableId: string = "";

  @AcBindJsonProperty({ key: AcDDERelationship.KeyRelationshipId })
  relationshipId: string = "";

  @AcBindJsonProperty({ key: AcDDERelationship.KeySourceColumnId })
  sourceColumnId: string = "";

  @AcBindJsonProperty({ key: AcDDERelationship.KeySourceTableId })
  sourceTableId: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDERelationship {
    const instance = new AcDDERelationship();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    destinationColumnId,
    destinationTableId,
    cascadeDeleteDestination,
    cascadeDeleteSource,
    relationshipId,
    sourceColumnId,
    sourceTableId,
  }: {
    dataDictionaryId?: string;
    destinationColumnId?: string;
    destinationTableId?: string;
    cascadeDeleteDestination?: boolean;
    cascadeDeleteSource?: boolean;
    relationshipId?: string;
    sourceColumnId?: string;
    sourceTableId?: string;
  }): AcDDERelationship[] {
    const result: AcDDERelationship[] = [];

    for (const row of Object.values(acDDEDataStorage.relationships)) {
      let includeRow = true;

      if (dataDictionaryId !== undefined && row.dataDictionaryId !== dataDictionaryId) {
        includeRow = false;
      }
      if (destinationColumnId !== undefined && row.destinationColumnId !== destinationColumnId) {
        includeRow = false;
      }
      if (destinationTableId !== undefined && row.destinationTableId !== destinationTableId) {
        includeRow = false;
      }
      if (cascadeDeleteDestination !== undefined && row.cascadeDeleteDestination !== cascadeDeleteDestination) {
        includeRow = false;
      }
      if (cascadeDeleteSource !== undefined && row.cascadeDeleteSource !== cascadeDeleteSource) {
        includeRow = false;
      }
      if (relationshipId !== undefined && row.relationshipId !== relationshipId) {
        includeRow = false;
      }
      if (sourceColumnId !== undefined && row.sourceColumnId !== sourceColumnId) {
        includeRow = false;
      }
      if (sourceTableId !== undefined && row.sourceTableId !== sourceTableId) {
        includeRow = false;
      }

      if (includeRow) {
        result.push(row);
      }
    }

    return result;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

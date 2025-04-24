import { AcEnumDDFieldProperty } from "../enums/ac-dd-field-property.enum";
import { AcEnumDDFieldType } from "../enums/ac-dd-field-type.enum";
import { AcDDRelationship } from "./ac-dd-relationship";
import { AcDDTable } from "./ac-dd-table";
import { AcDDTableFieldProperty } from "./ac-dd-table-field-property";

export class AcDDTableField {
  static readonly keyFieldName = "field_name";
  static readonly keyFieldProperties = "field_properties";
  static readonly keyFieldType = "field_type";
  static readonly keyFieldValue = "field_value";

  get autoNumberLength():number{
    let result:number = 0;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.autoNumberLength]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.autoNumberLength].propertyValue;
      }
    }
    return result;
  }

  get autoNumberPrefix():string{
    let result:string = "";
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.autoNumberPrefix]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.autoNumberPrefix].propertyValue;
      }
    }
    return result;
  }

  get checkInAutoNumber():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.checkInAutoNumber]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.checkInAutoNumber].propertyValue == true;
      }
    }
    return result;
  }
  
  get checkInModify():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.checkInModify]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.checkInModify].propertyValue == true;
      }
    }
    return result;
  }

  get checkInSave():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.checkInSave]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.checkInSave].propertyValue == true;
      }
    }
    return result;
  }

  get defaultValue():any{
    let result:any;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.defaultValue]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.defaultValue].propertyValue == true;
      }
    }
    return result;
  }

  get fieldTitle():string{
    let result:string = this.fieldName;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.fieldTitle]){
        if(this.fieldProperties[AcEnumDDFieldProperty.fieldTitle].propertyValue){        
          result = this.fieldProperties[AcEnumDDFieldProperty.fieldTitle].propertyValue;
        }
      }
    }
    return result;
  }

  get foreignKey():boolean{
    let result:boolean = false;
    if(this.table){
      if(this.table.tableName){
        let relationships:AcDDRelationship[] = AcDDRelationship.getInstances({destinationTable:this.table.tableName,destinationField:this.fieldName});
        result = relationships.length > 0;
      }
    }
    return result;
  }

  get foreignKeyRelationship():AcDDRelationship|undefined{
    let result;
    let relationships:AcDDRelationship[] = this.foreignKeyRelationships;
    if(relationships.length>0){
      result = relationships[0];
    }
    return result;
  }

  get foreignKeyRelationships():AcDDRelationship[]{
    return AcDDRelationship.getInstances({destinationField:this.fieldName,destinationTable:this.table.tableName});
  }  

  get inSearchQuery():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.inSearchQuery]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.inSearchQuery].propertyValue == true;
      }
    }
    return result;
  }

  get isAutoIncrement():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.autoIncrement]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.autoIncrement].propertyValue == true;
      }
    }
    return result;
  }

  get isAutoNumber():boolean{
    let result:boolean = this.fieldType == AcEnumDDFieldType.autoNumber;
    return result;
  }

  get isSelectDistinct():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.isSelectDistinct]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.isSelectDistinct].propertyValue == true;
      }
    }
    return result;
  }

  get notNull():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.notNull]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.notNull].propertyValue == true;
      }
    }
    return result;
  }

  get primaryKey():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.primaryKey]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.primaryKey].propertyValue == true;
      }
    }
    return result;
  }

  get required():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.required]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.required].propertyValue == true;
      }
    }
    return result;
  }

  get selectOptions():any[]{
    let result:any[] = [];
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.selectOptions]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.selectOptions].propertyValue;
      }
    }
    return result;
  }

  get setNullBeforeDelete():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.setNullBeforeDelete]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.setNullBeforeDelete].propertyValue == true;
      }
    }
    return result;
  }

  get size():number{
    let result:number = -1;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.size]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.size].propertyValue;
      }
    }
    return result;
  }

  get uniqueKey():boolean{
    let result:boolean = false;
    if(this.fieldProperties){
      if(this.fieldProperties[AcEnumDDFieldProperty.uniqueKey]){        
        result = this.fieldProperties[AcEnumDDFieldProperty.uniqueKey].propertyValue == true;
      }
    }
    return result;
  }

  fieldName: string = "";
  fieldProperties: { [key: string]: AcDDTableFieldProperty } = {};
  fieldType: string = AcEnumDDFieldType.text;
  fieldValue: any = null;
  table: AcDDTable = new AcDDTable();

  static fromJson(jsonData: { [key: string]: any }): AcDDTableField {
    const instance = new AcDDTableField();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDTableField.keyFieldName)) {
      this.fieldName = String(jsonData[AcDDTableField.keyFieldName]);
    }
    if (jsonData.hasOwnProperty(AcDDTableField.keyFieldType)) {
      this.fieldType = String(jsonData[AcDDTableField.keyFieldType]);
    }
    if (jsonData.hasOwnProperty(AcDDTableField.keyFieldValue)) {
      this.fieldValue = jsonData[AcDDTableField.keyFieldValue];
    }
    if (jsonData.hasOwnProperty(AcDDTableField.keyFieldProperties)) {
      const properties = jsonData[AcDDTableField.keyFieldProperties] as { [key: string]: any };
      for (const propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
          this.fieldProperties[propertyName] = AcDDTableFieldProperty.fromJson(properties[propertyName]);
        }
      }
    }
  }

  toJson(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      [AcDDTableField.keyFieldName]: this.fieldName,
      [AcDDTableField.keyFieldType]: this.fieldType,
      [AcDDTableField.keyFieldValue]: this.fieldValue,
      [AcDDTableField.keyFieldProperties]: {},
    };

    for (const propertyName in this.fieldProperties) {
      if (this.fieldProperties.hasOwnProperty(propertyName)) {
        result[AcDDTableField.keyFieldProperties][propertyName] = this.fieldProperties[propertyName].toJson();
      }
    }

    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}



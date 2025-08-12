/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { stringToCamelCase, stringToPascalCase } from '@autocode-ts/ac-extensions';
import { AcDataDictionary, AcDDTable, AcDDTableColumn, AcDDTableColumnProperty, AcEnumDDColumnProperty, AcEnumDDColumnType } from '@autocode-ts/ac-data-dictionary';

export class AcDataDictionaryCodeGeneratorBase {
  boolColumnProperties: any[] = [
    AcEnumDDColumnProperty.AutoIncrement,
    AcEnumDDColumnProperty.CheckInAutoNumber,
    AcEnumDDColumnProperty.CheckInModify,
    AcEnumDDColumnProperty.CheckInSave,
    AcEnumDDColumnProperty.ForeignKey,
    AcEnumDDColumnProperty.InSearchQuery,
    AcEnumDDColumnProperty.IsSelectDistinct,
    AcEnumDDColumnProperty.NotNull,
    AcEnumDDColumnProperty.PrimaryKey,
    AcEnumDDColumnProperty.Required,
    AcEnumDDColumnProperty.SetNullBeforeDelete,
    AcEnumDDColumnProperty.UniqueKey
  ];
  stringColumnProperties: any[] = [
    AcEnumDDColumnProperty.AutoNumberPrefix,
    AcEnumDDColumnProperty.ColumnTitle,
    AcEnumDDColumnProperty.Format,
    AcEnumDDColumnProperty.Remarks
  ];
  dataDictionaryJson: any = {};
  tabs: number = 0;

  formatColumnValueString({ value, columnDetails, forceNumeric = false }: { value: any, columnDetails: any, forceNumeric?: boolean }): string {
    let result: string = value;
    const type = columnDetails[AcDDTableColumn.KeyColumnType];
    let isNumeric: boolean = false;
    if (forceNumeric == false) {
      switch (type) {
        case AcEnumDDColumnType.AutoIncrement:
        case AcEnumDDColumnType.AutoIndex:
        case AcEnumDDColumnType.Double:
        case AcEnumDDColumnType.Integer:
        case AcEnumDDColumnType.YesNo:
          isNumeric = true;
          break;
      }
    }
    else {
      isNumeric = true;
    }
    if (!isNumeric) {
      result = `"${value}"`;
    }
    return result;
  }

  getClassNameString({ className }: { className: string }): string {
    return stringToPascalCase(className);
  }

  getDataDictionaryString() {
    let result: string = "";
    result += "class DataDictionary {\n";
    this.tabs++;
    result += this.getTabsString() + "static final Map<String,Map<String,dynamic>> tables = {\n";
    const tablesScripts: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyTables]) {
      for (const tableDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyTables])) {
        tablesScripts.push(this.getDDTableString({ tableDetails: tableDetails }));
      }
    }
    result += tablesScripts.join("\n") + "\n";
    result += this.getTabsString() + "};\n";
    result += "}";
    return result;
  }

  getDDColumnProperties({ columnDetails }: { columnDetails: any }): string {
    let result: string = "";

    const propertiesJson: string[] = [];
    if (columnDetails & columnDetails[AcDDTableColumn.KeyColumnProperties]) {
      const properties = columnDetails[AcDDTableColumn.KeyColumnProperties];
      const propertyEnumObj = AcEnumDDColumnProperty as any;

      for (const key of Object.keys(AcEnumDDColumnProperty)) {
        let includeProperty:boolean = true;
        if(this.boolColumnProperties.includes(propertyEnumObj[key])){
          includeProperty = false;
          if(properties[propertyEnumObj[key]] == true){
            includeProperty = true;
          }
        }
        if (includeProperty){
          propertiesJson.push(
            `${this.getKeyString({ key: `AcEnumDDColumnProperty.${key}` })} : ${properties[propertyEnumObj[key]]}`
          );
        }

      }
    }

    if (propertiesJson.length > 0) {
      result = "{\n";
      this.tabs++;
      result += this.getTabsString();
      result += propertiesJson.join(`,\n${this.getTabsString()}`);
      this.tabs--;
      result += `\n${this.getTabsString()}`;
    }

    return result;
  }

  getDDColumnTypeString({ columnType }: { columnType: any }): string {
    let result: string = "";
    return result;
  }

  getDDEnumString(): string {
    let result: string = "";
    result += this.getTabsString() + "/* Enums Start */\n";
    result += this.getTabsString() + "{\n";
    this.tabs++;
    if(this.dataDictionaryJson && this.dataDictionaryJson[AcDataDictionary.KeyTables]){
      for(const tableDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyTables] as any[])){
        const tableName = tableDetails[AcDDTable.KeyTableName];
        result += this.getTabsString() + "public static const " + this.getVariableNameString({variableName:"tbl_" + tableName}) + " = \"" + tableName + "\";\n";
        result += this.getTabsString() + "class " + this.getClassNameString({className:"tbl_" + tableName}) + " {\n";
        const tableColumns = tableDetails[AcDDTable.KeyTableColumns];
        for(const columnName of Object.keys(tableColumns)){
          this.tabs++;
          result += this.getTabsString() + "public static const " + this.getVariableNameString({variableName:columnName}) + " = \"" + columnName + "\";\n";
          this.tabs--;
        }
        result += this.getTabsString() + "}\n";
      }
    }
    this.tabs--;
    result += this.getTabsString() + "}";
    result += "\n" + this.getTabsString() + "/* Enums End */\n\n";
    return result;
  }

  getDDRelationshipString({ relationshipDetails }: { relationshipDetails: any }): string {
    let result: string = "";
    return result;
  }

  getDDTableString({ tableDetails }: { tableDetails: any }): string {
    let result: string = "";
    return result;
  }

  getDDTableColumnString({ tableColumnDetails }: { tableColumnDetails: any }): string {
    let result: string = "";
    return result;
  }

  getKeyString({ key }: { key: string }): string {
    return key;
  }

  getTabsString(): string {
    let result: string = "";
    for (let i = 0; i < this.tabs; i++) {
      result += "\t";
    }
    return result;
  }

  getVariableNameString({ variableName }: { variableName: string }): string {
    return stringToCamelCase(variableName);
  }

  getDDViewString({ viewDetails }: { viewDetails: any }): string {
    let result: string = "";
    return result;
  }

  getDDViewColumnString({ viewColumnDetails }: { viewColumnDetails: any }): string {
    let result: string = "";
    return result;
  }

  getDDTriggerString({ triggerDetails }: { triggerDetails: any }): string {
    let result: string = "";
    return result;
  }
}

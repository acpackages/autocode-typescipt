/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { stringToCamelCase, stringToPascalCase } from '@autocode-ts/ac-extensions';
import { AcDataDictionary, AcDDFunction, AcDDRelationship, AcDDStoredProcedure, AcDDTable, AcDDTableColumn, AcDDTableColumnProperty, AcDDTrigger, AcDDView, AcDDViewColumn, AcEnumDDColumnProperty, AcEnumDDColumnType } from '@autocode-ts/ac-data-dictionary';
import { AcDDECodeGeneratorDefaultConfig } from '../consts/ac-dde-code-generator-default-config.const';
import { boolColumnProperties, numberColumnProperties, stringColumnProperties } from '../consts/ac-dde-property-groups.const';

export class AcDataDictionaryDartCodeGenerator {
  dataDictionaryJson: any = {};
  tabsCount: number = 0;

  get tabs():string{
    let result: string = ``;
    for (let i = 0; i < this.tabsCount; i++) {
      result += `\t`;
    }
    return result;
  }

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
    let result: string = `import 'package:ac_data_dictionary/ac_data_dictionary.dart';\n`;
    result += `${this.getDDKeysString()}\n\n`;
    result += `const Map<String,dynamic> ${AcDDECodeGeneratorDefaultConfig.dataDictionaryConstName} = {\n`;
    this.tabsCount++;

    result += `${this.tabs}AcDataDictionary.keyName : "${this.dataDictionaryJson[AcDataDictionary.KeyName]}",\n`;
    result += `${this.tabs}AcDataDictionary.keyVersion : ${this.dataDictionaryJson[AcDataDictionary.KeyVersion]},\n`;
    result += `${this.tabs}AcDataDictionary.keyTables : {\n`;
    const tableStrings: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyTables]) {
      for (const tableDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyTables])) {
        tableStrings.push(this.getDDTableString({ tableDetails: tableDetails }));
      }
    }
    result += tableStrings.join(`,\n`) + `\n`;
    result += this.tabs + `},\n`;

    result += `${this.tabs}AcDataDictionary.keyViews : {\n`;
    const viewStrings: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyViews]) {
      for (const viewDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyViews])) {
        viewStrings.push(this.getDDViewString({ viewDetails: viewDetails }));
      }
    }
    result += viewStrings.join(`\n`) + `\n`;
    result += this.tabs + `},\n`;

    result += `${this.tabs}AcDataDictionary.keyRelationships : {\n`;
    const relationshipStrings: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyRelationships]) {
      for (const relationshipDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyRelationships])) {
        relationshipStrings.push(this.getDDRelationshipString({ relationshipDetails: relationshipDetails }));
      }
    }
    result += relationshipStrings.join(`,\n`) + `\n`;
    result += this.tabs + `},\n`;

    result += `${this.tabs}AcDataDictionary.keyTriggers : {\n`;
    const triggerStrings: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyTriggers]) {
      for (const triggerDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyTriggers])) {
        triggerStrings.push(this.getDDTriggerString({ triggerDetails: triggerDetails }));
      }
    }
    result += triggerStrings.join(`\n`) + `\n`;
    result += this.tabs + `},\n`;

    result += `${this.tabs}AcDataDictionary.keyStoredProcedures : {\n`;
    const storedProcedureStrings: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyTriggers]) {
      for (const storedProcedureDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyFunctions])) {
        storedProcedureStrings.push(this.getDDStoredProcedureString({ storedProcedureDetails: storedProcedureDetails }));
      }
    }
    result += storedProcedureStrings.join(`\n`) + `\n`;
    result += this.tabs + `},\n`;

    result += `${this.tabs}AcDataDictionary.keyFunctions : {\n`;
    const functionStrings: string[] = [];
    if (this.dataDictionaryJson[AcDataDictionary.KeyTriggers]) {
      for (const functionDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyFunctions])) {
        functionStrings.push(this.getDDFunctionString({ functionDetails: functionDetails }));
      }
    }
    result += functionStrings.join(`\n`) + `\n`;
    result += this.tabs + `}\n`;
    this.tabsCount--;
    result += this.tabs + `};\n`;
    return result;
  }

  getDDColumnProperties({ columnDetails }: { columnDetails: any }): string {
    let result: string = `{`;
    this.tabsCount++;
    const propertiesJson: string[] = [];
    if (columnDetails && columnDetails[AcDDTableColumn.KeyColumnProperties]) {
      const properties = columnDetails[AcDDTableColumn.KeyColumnProperties];
      for (const key of Object.keys(properties)) {
        const value = properties[key][AcDDTableColumnProperty.KeyPropertyValue];
        let propertyKey = stringToCamelCase(key);
        console.log(`${key} => ${propertyKey}`);
        let propertyValue = `${value}`;
        let validProperty:boolean = false;
        if(boolColumnProperties.includes(key) && value == true){
          validProperty = true;
        }
        else if(numberColumnProperties.includes(key) && value){
          validProperty = true;
        }
        else if(stringColumnProperties.includes(key) && value){
          validProperty = true;
          propertyValue = `"${value}"`;
        }
        if(validProperty){
          let propertyJson:string = '';
          propertyJson += `${this.tabs}AcEnumDDColumnProperty.${propertyKey} : {\n`;
          this.tabsCount++;
          propertyJson += `${this.tabs}AcDDTableColumnProperty.keyPropertyName : AcEnumDDColumnProperty.${propertyKey},\n`;
          propertyJson += `${this.tabs}AcDDTableColumnProperty.keyPropertyValue : ${propertyValue}\n`;
          this.tabsCount--;
          propertyJson += `${this.tabs}}`;
          propertiesJson.push(propertyJson);
        }
      }
    }

    if (propertiesJson.length > 0) {
      result += `\n`+propertiesJson.join(`,\n`)+``;
    }
    this.tabsCount--;

    result += `\n${this.tabs}}`;
    return result;
  }

  getDDColumnTypeString({ columnType }: { columnType: any }): string {
    let result: string = columnType;
    switch(columnType){
      case AcEnumDDColumnType.AutoIncrement:
        result = `AcEnumDDColumnType.autoIncrement`;
        break;
      case AcEnumDDColumnType.AutoIndex:
        result = `AcEnumDDColumnType.autoIndex`;
        break;
      case AcEnumDDColumnType.AutoNumber:
        result = `AcEnumDDColumnType.autoNumber`;
        break;
      case AcEnumDDColumnType.Blob:
        result = `AcEnumDDColumnType.blob`;
        break;
      case AcEnumDDColumnType.Date:
        result = `AcEnumDDColumnType.date`;
        break;
      case AcEnumDDColumnType.Datetime:
        result = `AcEnumDDColumnType.datetime`;
        break;
      case AcEnumDDColumnType.Double:
        result = `AcEnumDDColumnType.double_`;
        break;
      case AcEnumDDColumnType.Encrypted:
        result = `AcEnumDDColumnType.encrypted`;
        break;
      case AcEnumDDColumnType.Integer:
        result = `AcEnumDDColumnType.integer`;
        break;
      case AcEnumDDColumnType.Json:
        result = `AcEnumDDColumnType.json`;
        break;
      case AcEnumDDColumnType.Password:
        result = `AcEnumDDColumnType.password`;
        break;
      case AcEnumDDColumnType.String:
        result = `AcEnumDDColumnType.string`;
        break;
      case AcEnumDDColumnType.Text:
        result = `AcEnumDDColumnType.text`;
        break;
      case AcEnumDDColumnType.Time:
        result = `AcEnumDDColumnType.time`;
        break;
      case AcEnumDDColumnType.Timestamp:
        result = `AcEnumDDColumnType.timestamp`;
        break;
      case AcEnumDDColumnType.Uuid:
        result = `AcEnumDDColumnType.uuid`;
        break;
      case AcEnumDDColumnType.YesNo:
        result = `AcEnumDDColumnType.yesNo`;
        break;
    }
    return result;
  }

  getDDKeysString(): string {
    let result: string = ``;
    result += this.tabs + `/* Keys Start */\n`;
    if (this.dataDictionaryJson) {
      if(this.dataDictionaryJson[AcDataDictionary.KeyTables]){
        const tableKeys:string[] = [];
        const tableColumnKeys:string[] = [];
        for (const tableDetails of Object.values(this.dataDictionaryJson[AcDataDictionary.KeyTables] as any[])) {
          const tableName = tableDetails[AcDDTable.KeyTableName];
          this.tabsCount++;
          tableKeys.push(`${this.tabs}static const String ${stringToCamelCase(tableName)} = "${tableName}";`);
          this.tabsCount--;

          const columnKeys:string[] = [];
          this.tabsCount++;
          for (const columnName of Object.keys(tableDetails[AcDDTable.KeyTableColumns])) {
            columnKeys.push(`${this.tabs}static const String ${stringToCamelCase(columnName)} = "${columnName}";`);
          }
          this.tabsCount--;

          let tableColumnsKeyString = this.tabs + `class ${AcDDECodeGeneratorDefaultConfig.tableNameColumnClassPrefix}${stringToPascalCase(tableName)} {\n`;
          tableColumnsKeyString += columnKeys.join(`\n`);
          tableColumnsKeyString += `\n${this.tabs}}`;
          tableColumnKeys.push(tableColumnsKeyString);

        }
        result += this.tabs + `/* Table Keys Start */\n`;
        result += this.tabs + `\nclass ${AcDDECodeGeneratorDefaultConfig.tableKeysClassName} {\n`;
        result += tableKeys.join(`\n`);
        result += `\n${this.tabs}}\n\n`;
        result += tableColumnKeys.join(`\n`);
        result += `\n\n`;
        result += this.tabs + `/* Table Keys End */\n`;
      }
    }
    result += this.tabs + `/* Keys End */\n`;
    return result;
  }

  getDDFunctionString({ functionDetails }: { functionDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const functionName = functionDetails[AcDDFunction.KeyFunctionName];
    let functionCode:string = functionDetails[AcDDFunction.KeyFunctionCode];
    functionCode = functionCode.trim();
    const keyName = `${AcDDECodeGeneratorDefaultConfig.functionKeysClassName}.${stringToCamelCase(functionName)}`;
    result += `${keyName} : {\n`;
    this.tabsCount++;
    result += `AcDDFunction.keyFunctionName : ${keyName},\n`;
    result += `AcDDFunction.keyFunctionCode : "${functionCode}"\n`;
    this.tabsCount--;
    result += `}`;
    this.tabsCount--;
    return result;
  }

  getDDRelationshipString({ relationshipDetails }: { relationshipDetails: any }): string {
    let result: string = `${this.tabs}{\n`;
    this.tabsCount++;
    const cascadeDeleteDestination = relationshipDetails[AcDDRelationship.KeyCascadeDeleteDestination];
    const cascadeDeleteSource = relationshipDetails[AcDDRelationship.KeyCascadeDeleteSource];
    const destinationColumn = relationshipDetails[AcDDRelationship.KeyDestinationColumn];
    const destinationTable = relationshipDetails[AcDDRelationship.KeyDestinationTable];
    const sourceTable = relationshipDetails[AcDDRelationship.KeySourceTable];
    const sourceColumn = relationshipDetails[AcDDRelationship.KeySourceColumn];
    this.tabsCount++;
    result += `${this.tabs}AcDDRelationship.keySourceTable : ${AcDDECodeGeneratorDefaultConfig.tableKeysClassName}.${stringToCamelCase(sourceTable)},\n`;
    result += `${this.tabs}AcDDRelationship.keySourceColumn : "${AcDDECodeGeneratorDefaultConfig.tableNameColumnClassPrefix}${stringToPascalCase(sourceTable)}.${stringToCamelCase(sourceColumn)}",\n`;
    result += `${this.tabs}AcDDRelationship.keyDestinationTable : ${AcDDECodeGeneratorDefaultConfig.tableKeysClassName}.${stringToCamelCase(destinationTable)},\n`;
    result += `${this.tabs}AcDDRelationship.keyDestinationColumn : "${AcDDECodeGeneratorDefaultConfig.tableNameColumnClassPrefix}${stringToPascalCase(destinationTable)}.${stringToCamelCase(destinationColumn)}",\n`;
    result += `${this.tabs}AcDDRelationship.keyCascadeDeleteDestination : ${cascadeDeleteDestination},\n`;
    result += `${this.tabs}AcDDRelationship.keyCascadeDeleteSource : ${cascadeDeleteSource}\n`;
    this.tabsCount--;
    result += `${this.tabs}}`;
    this.tabsCount--;
    return result;
  }

  getDDStoredProcedureString({ storedProcedureDetails }: { storedProcedureDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const storedProcedureName = storedProcedureDetails[AcDDStoredProcedure.KeyStoredProcedureName];
    let storedProcedureCode:string = storedProcedureDetails[AcDDStoredProcedure.KeyStoredProcedureCode];
    storedProcedureCode = storedProcedureCode.trim();
    const keyName = `${AcDDECodeGeneratorDefaultConfig.storeProcedureKeysClassName}.${stringToCamelCase(storedProcedureName)}`;
    result += `${keyName} : {\n`;
    this.tabsCount++;
    result += `AcDDStoredProcedure.keyStoredProcedureName : ${keyName},\n`;
    result += `AcDDStoredProcedure.keyStoredProcedureCode : "${storedProcedureCode}"\n`;
    this.tabsCount--;
    result += `}`;
    this.tabsCount--;
    return result;
  }

  getDDTableString({ tableDetails }: { tableDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const tableName = tableDetails[AcDDTable.KeyTableName];
    const keyName = `${AcDDECodeGeneratorDefaultConfig.tableKeysClassName}.${stringToCamelCase(tableName)}`;
    result += `${this.tabs}${keyName} : {\n`;
    this.tabsCount++;
    result += `${this.tabs}AcDDTable.keyTableName : ${keyName},\n`;
    result += `${this.tabs}AcDDTable.keyTableColumns : {\n`;

    if (tableDetails[AcDDTable.KeyTableColumns]) {
      const columnStrings: string[] = [];
      for (const columnDetails of Object.values(tableDetails[AcDDTable.KeyTableColumns])) {
        columnStrings.push(this.getDDTableColumnString({ tableName:tableName,columnDetails: columnDetails }));
      }
      result += columnStrings.join(',\n');
    }

    result += `${this.tabs}\n${this.tabs}}\n`;
    this.tabsCount--;
    result += `${this.tabs}}`;
    this.tabsCount--;
    return result;
  }

  getDDTableColumnString({ tableName,columnDetails }: { tableName:string,columnDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const columnName = columnDetails[AcDDTableColumn.KeyColumnName];
    const keyName = `${AcDDECodeGeneratorDefaultConfig.tableNameColumnClassPrefix}${stringToPascalCase(tableName)}.${stringToCamelCase(columnName)}`;
    result += `${this.tabs}${keyName} : {\n`;
    this.tabsCount++;
    result += `${this.tabs}AcDDTableColumn.keyColumnName : ${keyName},\n`;
    result += `${this.tabs}AcDDTableColumn.keyColumnType : ${this.getDDColumnTypeString({columnType:columnDetails[AcDDTableColumn.KeyColumnType]})},\n`;
    result += `${this.tabs}AcDDTableColumn.keyColumnProperties : ${this.getDDColumnProperties({columnDetails:columnDetails})}\n`;
    this.tabsCount--;
    result += `${this.tabs}}`;
    this.tabsCount--;
    return result;
  }

  getDDViewString({ viewDetails }: { viewDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const viewName = viewDetails[AcDDView.KeyViewName];
    let viewQuery:string = viewDetails[AcDDView.KeyViewQuery] ?? ``;
    viewQuery = viewQuery.trim();
    const keyName = `${AcDDECodeGeneratorDefaultConfig.viewKeysClassName}.${stringToCamelCase(viewName)}`;
    result += `${this.tabs}${keyName} : {\n`;
    this.tabsCount++;
    result += `${this.tabs}AcDDView.keyViewName : ${keyName},\n`;
    result += `${this.tabs}AcDDView.keyViewQuery : "${viewQuery}",\n`;
    result += `${this.tabs}AcDDView.keyViewColumns : {\n`;
    if (viewDetails[AcDDView.KeyViewColumns]) {
      const columnStrings: string[] = [];
      for (const columnDetails of Object.values(viewDetails[AcDDView.KeyViewColumns])) {
        columnStrings.push(this.getDDViewColumnString({ viewName:viewName,columnDetails: columnDetails }));
      }
      result += columnStrings.join(',\n');
    }
    result += `${this.tabs}\n${this.tabs}}\n`;
    this.tabsCount--;
    result += `${this.tabs}}`;
    this.tabsCount--;
    return result;
  }

  getDDViewColumnString({ viewName,columnDetails }: { viewName:string,columnDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const columnName = columnDetails[AcDDViewColumn.KeyColumnName];
    const columnSource = columnDetails[AcDDViewColumn.KeyColumnSource];
    const columnSourceName = columnDetails[AcDDViewColumn.KeyColumnSourceName];
    const keyName = `${AcDDECodeGeneratorDefaultConfig.viewNameColumnClassPrefix}${stringToPascalCase(viewName)}.${stringToCamelCase(columnName)}`;
    result += `${this.tabs}${keyName} : {\n`;
    this.tabsCount++;
    result += `${this.tabs}AcDDViewColumn.keyColumnName : ${keyName},\n`;
    result += `${this.tabs}AcDDViewColumn.keyColumnSource : "${columnSource}",\n`;
    result += `${this.tabs}AcDDViewColumn.keyColumnSourceName : "${columnSourceName}",\n`;
    result += `${this.tabs}AcDDViewColumn.keyColumnType : ${this.getDDColumnTypeString({columnType:columnDetails[AcDDViewColumn.KeyColumnType]})},\n`;
    result += `${this.tabs}AcDDViewColumn.keyColumnProperties : ${this.getDDColumnProperties({columnDetails:columnDetails})}\n`;
    this.tabsCount--;
    result += `${this.tabs}}`;
    this.tabsCount--;
    return result;
  }

  getDDTriggerString({ triggerDetails }: { triggerDetails: any }): string {
    let result: string = ``;
    this.tabsCount++;
    const triggerName = triggerDetails[AcDDTrigger.KeyTriggerName];
    const triggerExecution = triggerDetails[AcDDTrigger.KeyTriggerExecution];
    const rowOperation = triggerDetails[AcDDTrigger.KeyRowOperation];
    const tableName = triggerDetails[AcDDTrigger.KeyTableName];
    let triggerCode:string = triggerDetails[AcDDTrigger.KeyTriggerCode];
    triggerCode = triggerCode.trim();
    result += `${this.tabs}${AcDDECodeGeneratorDefaultConfig.triggerKeysClassName}.${stringToCamelCase(triggerName)} : {\n`;
    this.tabsCount++;
    result += `${this.tabs}AcDDTrigger.keyTriggerName : ${AcDDECodeGeneratorDefaultConfig.triggerKeysClassName}.${stringToCamelCase(triggerName)},\n`;
    result += `${this.tabs}AcDDTrigger.keyTriggerExecution : "${triggerExecution}",\n`;
    result += `${this.tabs}AcDDTrigger.keyRowOperation : "${rowOperation}",\n`;
    result += `${this.tabs}AcDDTrigger.keyTableName : ${AcDDECodeGeneratorDefaultConfig.tableKeysClassName}.${stringToCamelCase(tableName)},\n`;
    result += `${this.tabs}AcDDTrigger.keyTriggerCode : "${triggerCode}"\n`;
    this.tabsCount--;
    result += `${this.tabs}}`;
    this.tabsCount--;
    return result;
  }


}

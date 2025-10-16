import { AcDataDictionary, AcDDTableColumn, AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";
import { AcDatetimeInput, AcInput, AcNumberInput, AcSelectInput, AcTextareaInput, AcTextInput } from "@autocode-ts/ac-browser";
import { IAcDDInputDefinition } from "../interfaces/ac-dd-input-definition.interface";
import { AcDDInputFieldBaseElement } from "../elements/ac-dd-input-field-base-element.element";

export class AcDDInputManager{
  private static columnTypeInputs:Record<string,IAcDDInputDefinition> = {
    [AcEnumDDColumnType.AutoNumber]:{ inputElement:AcTextInput },
    [AcEnumDDColumnType.Blob]:{ inputElement:AcInput },
    [AcEnumDDColumnType.Date]:{ inputElement:AcDatetimeInput},
    [AcEnumDDColumnType.Datetime]:{ inputElement:AcDatetimeInput},
    [AcEnumDDColumnType.Double]:{ inputElement:AcNumberInput},
    [AcEnumDDColumnType.Integer]:{ inputElement:AcNumberInput},
    [AcEnumDDColumnType.Json]:{ inputElement:AcTextInput, },
    [AcEnumDDColumnType.Password]:{ inputElement:AcInput, defaultProperties:{type:'password'} },
    [AcEnumDDColumnType.String]:{ inputElement:AcTextInput },
    [AcEnumDDColumnType.Text]:{ inputElement:AcTextInput },
    [AcEnumDDColumnType.Time]:{ inputElement:AcTextInput },
    [AcEnumDDColumnType.YesNo]:{ inputElement:AcTextInput },
  };
  private static inputDefinitions:Record<string,IAcDDInputDefinition> = {
    "text":{ inputElement:AcTextInput },
    "dateTime":{ inputElement:AcDatetimeInput},
    "number":{ inputElement:AcNumberInput},
    "password":{ inputElement:AcInput, defaultProperties:{type:'password'} },
    "select":{ inputElement:AcSelectInput },
    "textarea":{ inputElement:AcTextareaInput },
  };
  private static inputElementProperties:Record<string,any> = {
  };
  private static foreignKeyInputs:Record<string,IAcDDInputDefinition> = {};
  static inputFieldElementClass:any = AcDDInputFieldBaseElement;
  static inputResolver?:Function;

  static getColumnInputDefinition({columnName,tableName}:{columnName:string,tableName:string}):IAcDDInputDefinition{
    let result:IAcDDInputDefinition = {inputElement:AcInput,defaultProperties:{}};
    const ddTableColumn:AcDDTableColumn|null = AcDataDictionary.getTableColumn({tableName,columnName});
    let resolvedDefinition;
    if(this.inputResolver){
      resolvedDefinition = this.inputResolver();
      result = resolvedDefinition;
    }
    if(resolvedDefinition == undefined){
      if(ddTableColumn){
        const typeInputDefinition = this.columnTypeInputs[ddTableColumn.columnType];
        if(typeInputDefinition){
          result.inputElement = typeInputDefinition.inputElement;
          if(typeInputDefinition.defaultProperties){
            result.defaultProperties = {...result.defaultProperties,...typeInputDefinition.defaultProperties};
          }
        }
        if(ddTableColumn.isForeignKey()){
          const foreignKeys = ddTableColumn.getForeignKeyRelationships();
          if(foreignKeys.length > 0){
            const relationship = foreignKeys[0];
            const foreignKeyInputDefinition = this.foreignKeyInputs[relationship.sourceTable];
            if(foreignKeyInputDefinition){
              result.inputElement = foreignKeyInputDefinition.inputElement;
              if(foreignKeyInputDefinition.defaultProperties){
                result.defaultProperties = {...result.defaultProperties,...foreignKeyInputDefinition.defaultProperties};
              }
            }
          }
        }
        const selectOptions:any[] = ddTableColumn.getValueOptions();
        if(selectOptions.length > 0){
          result.inputElement = AcSelectInput;
          result.defaultProperties['selectOptions'] = selectOptions;
        }
      }
    }
    return result;
  }

  static getInputDefinition({name}:{name:string}):IAcDDInputDefinition|undefined{
    return this.inputDefinitions[name];
  }

  static getInputNames():string[]{
    return Object.keys(this.inputDefinitions);
  }

  static registerColumnTypeInput({columnType,inputDefinition}:{columnType:AcEnumDDColumnType,inputDefinition:IAcDDInputDefinition}){
    AcDDInputManager.columnTypeInputs[columnType] = inputDefinition;
  }

  static registerInputDefinition({name,inputDefinition}:{name:string,inputDefinition:IAcDDInputDefinition}){
    AcDDInputManager.inputDefinitions[name] = inputDefinition;
  }

  static registerForeignKeyInput({primaryTableName,inputDefinition}:{primaryTableName:string,inputDefinition:IAcDDInputDefinition}){
    AcDDInputManager.foreignKeyInputs[primaryTableName] = inputDefinition;
  }
}

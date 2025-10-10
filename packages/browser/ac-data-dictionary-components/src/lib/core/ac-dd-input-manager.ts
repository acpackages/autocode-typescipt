import { AcDataDictionary, AcDDTableColumn, AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";
import { AcDatetimeInputElement, AcInputElement, AcNumberInputElement, AcSelectInputElement, AcTextareaInputElement, AcTextInputElement } from "@autocode-ts/ac-browser";
import { IAcDDInputDefinition } from "../interfaces/ac-dd-input-definition.interface";
import { AcDDInputFieldBaseElement } from "../elements/ac-dd-input-field-base-element.element";

export class AcDDInputManager{
  private static columnTypeInputs:Record<string,IAcDDInputDefinition> = {
    [AcEnumDDColumnType.AutoNumber]:{ inputElement:AcTextInputElement },
    [AcEnumDDColumnType.Blob]:{ inputElement:AcInputElement },
    [AcEnumDDColumnType.Date]:{ inputElement:AcDatetimeInputElement},
    [AcEnumDDColumnType.Datetime]:{ inputElement:AcDatetimeInputElement},
    [AcEnumDDColumnType.Double]:{ inputElement:AcNumberInputElement},
    [AcEnumDDColumnType.Integer]:{ inputElement:AcNumberInputElement},
    [AcEnumDDColumnType.Json]:{ inputElement:AcTextInputElement, },
    [AcEnumDDColumnType.Password]:{ inputElement:AcInputElement, defaultProperties:{type:'password'} },
    [AcEnumDDColumnType.String]:{ inputElement:AcTextInputElement },
    [AcEnumDDColumnType.Text]:{ inputElement:AcTextInputElement },
    [AcEnumDDColumnType.Time]:{ inputElement:AcTextInputElement },
    [AcEnumDDColumnType.YesNo]:{ inputElement:AcTextInputElement },
  };
  private static inputDefinitions:Record<string,IAcDDInputDefinition> = {
    "text":{ inputElement:AcTextInputElement },
    "dateTime":{ inputElement:AcDatetimeInputElement},
    "number":{ inputElement:AcNumberInputElement},
    "password":{ inputElement:AcInputElement, defaultProperties:{type:'password'} },
    "select":{ inputElement:AcSelectInputElement },
    "textarea":{ inputElement:AcTextareaInputElement },
  };
  private static inputElementProperties:Record<string,any> = {
  };
  private static foreignKeyInputs:Record<string,IAcDDInputDefinition> = {};
  static inputFieldElementClass:any = AcDDInputFieldBaseElement;
  static inputResolver?:Function;

  static getColumnInputDefinition({columnName,tableName}:{columnName:string,tableName:string}):IAcDDInputDefinition{
    let result:IAcDDInputDefinition = {inputElement:AcInputElement,defaultProperties:{}};
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
          result.inputElement = AcSelectInputElement;
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

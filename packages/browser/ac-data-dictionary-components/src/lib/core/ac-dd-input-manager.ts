import { AcDataDictionary, AcDDTableColumn, AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";
import { AcDatetimeInputElement, AcInputElement, AcNumberInputElement, AcSelectInputElement, AcTextInputElement } from "@autocode-ts/ac-browser";
import { IAcDDInputDefinition } from "../interfaces/ac-dd-input-definition.interface";
import { AcDDInputFieldBaseElement } from "../elements/ac-dd-input-field-base-element.element";

export class AcDDInputManager{
  private static columnTypeInputs:Record<string,IAcDDInputDefinition> = {
    [AcEnumDDColumnType.AutoNumber]:{ inputClass:AcTextInputElement },
    [AcEnumDDColumnType.Blob]:{ inputClass:AcInputElement },
    [AcEnumDDColumnType.Date]:{ inputClass:AcDatetimeInputElement},
    [AcEnumDDColumnType.Datetime]:{ inputClass:AcDatetimeInputElement},
    [AcEnumDDColumnType.Double]:{ inputClass:AcNumberInputElement},
    [AcEnumDDColumnType.Integer]:{ inputClass:AcNumberInputElement},
    [AcEnumDDColumnType.Json]:{ inputClass:AcTextInputElement, },
    [AcEnumDDColumnType.Password]:{ inputClass:AcInputElement, defaultProperties:{type:'password'} },
    [AcEnumDDColumnType.String]:{ inputClass:AcTextInputElement },
    [AcEnumDDColumnType.Text]:{ inputClass:AcTextInputElement },
    [AcEnumDDColumnType.Time]:{ inputClass:AcTextInputElement },
    [AcEnumDDColumnType.YesNo]:{ inputClass:AcTextInputElement },
  };
  private static inputElementProperties:Record<string,any> = {
  };
  private static foreignKeyInputs:Record<string,IAcDDInputDefinition> = {};
  static inputFieldElementClass:any = AcDDInputFieldBaseElement;
  static inputResolver?:Function;

  static getColumnInputDefinition({columnName,tableName}:{columnName:string,tableName:string}):IAcDDInputDefinition{
    let result:IAcDDInputDefinition = {inputClass:AcInputElement,defaultProperties:{}};
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
          result.inputClass = typeInputDefinition.inputClass;
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
              result.inputClass = foreignKeyInputDefinition.inputClass;
              if(foreignKeyInputDefinition.defaultProperties){
                result.defaultProperties = {...result.defaultProperties,...foreignKeyInputDefinition.defaultProperties};
              }
            }
          }
        }
        const selectOptions:any[] = ddTableColumn.getValueOptions();
        if(selectOptions.length > 0){
          result.inputClass = AcSelectInputElement;
          result.defaultProperties['selectOptions'] = selectOptions;
        }
      }
    }
    return result;
  }

  static registerColumnTypeInput({columnType,inputDefinition}:{columnType:AcEnumDDColumnType,inputDefinition:IAcDDInputDefinition}){
    AcDDInputManager.columnTypeInputs[columnType] = inputDefinition;
  }

  static registerForeignKeyInput({primaryTableName,inputDefinition}:{primaryTableName:string,inputDefinition:IAcDDInputDefinition}){
    AcDDInputManager.foreignKeyInputs[primaryTableName] = inputDefinition;
  }
}

import { AcDataDictionary, AcDDTableColumn, AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";
import { AcDateTimeInput, AcInput, AcInputBase, AcNumberInput, AcSelectInput, AcTextInput } from "@autocode-ts/ac-browser";
import { IAcDDInputDefinition } from "../interfaces/ac-dd-input-definition.interface";

export class AcDDInputManager{
  private static columnTypeInputs:Record<string,IAcDDInputDefinition> = {
    [AcEnumDDColumnType.AutoNumber]:{ inputClass:AcTextInput },
    [AcEnumDDColumnType.Blob]:{ inputClass:AcInput },
    [AcEnumDDColumnType.Date]:{ inputClass:AcDateTimeInput},
    [AcEnumDDColumnType.Datetime]:{ inputClass:AcDateTimeInput},
    [AcEnumDDColumnType.Double]:{ inputClass:AcNumberInput},
    [AcEnumDDColumnType.Integer]:{ inputClass:AcNumberInput},
    [AcEnumDDColumnType.Json]:{ inputClass:AcTextInput, },
    [AcEnumDDColumnType.Password]:{ inputClass:AcInput, defaultProperties:{type:'password'} },
    [AcEnumDDColumnType.String]:{ inputClass:AcTextInput },
    [AcEnumDDColumnType.Text]:{ inputClass:AcTextInput },
    [AcEnumDDColumnType.Time]:{ inputClass:AcTextInput },
    [AcEnumDDColumnType.YesNo]:{ inputClass:AcTextInput },
  };
  private static foreignKeyInputs:Record<string,IAcDDInputDefinition> = {};
  static inputResolver?:Function;

  static getColumnInputDefinition({columnName,tableName}:{columnName:string,tableName:string}):IAcDDInputDefinition{
    let result:IAcDDInputDefinition = {inputClass:AcInput,defaultProperties:{}};
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
          result.inputClass = AcSelectInput;
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

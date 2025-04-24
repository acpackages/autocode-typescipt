import { SimpleDatabase } from "../database/simple-database";
import { Simplify } from "./simplify";

export class AcDataDictionary {
  static dataDictionary:any={};
  constructor(){
  }

  static getSimpleDatabaseTable(table:string){
    let simpleDatabase=new SimpleDatabase();
    if(Simplify.validValue(SimpleDataDictionary.dataDictionary)){
      if(Simplify.validValue(SimpleDataDictionary.dataDictionary["tables"])){
        if(Simplify.validValue(SimpleDataDictionary.dataDictionary["tables"][table])){
          simpleDatabase.setTableDetails(SimpleDataDictionary.dataDictionary["tables"][table]);
        }
        else{
          console.warn("Table Not Found in Data Dictionary",SimpleDataDictionary.dataDictionary);
        }
        if(Simplify.validValue(SimpleDataDictionary.dataDictionary["relationships"])){
          if(Simplify.validValue(SimpleDataDictionary.dataDictionary["relationships"][table])){
            simpleDatabase.setTableForeignKeys(SimpleDataDictionary.dataDictionary["relationships"][table]);
          }
        }
      }
    }
    else{
      console.warn("Invalid Data Dictionary",SimpleDataDictionary.dataDictionary);
    }
    return simpleDatabase;
  }

  static getTablesFieldPropertiesObject(tableName:string,fieldName:string){
    let result:any = {};
    let fields = SimpleDataDictionary.getTablesFieldsObject(tableName);
    let fieldDetails:any = fields[fieldName];
    if(Simplify.validValue(fieldDetails)){
      if(Simplify.validValue(fieldDetails[SimpleDatabase.fieldProperties])){
        result = fieldDetails[SimpleDatabase.fieldProperties];
      }
    }
    else{
      console.warn("Invalid Data Dictionary",SimpleDataDictionary.dataDictionary);
    }
    return result;
  }

  static getTableFieldPropertiesListSelectOptions(tableName:string,fieldName:string){
    let result:any[] = [];
    let properties:any = this.getTablesFieldPropertiesObject(tableName,fieldName);
    for(let propertyName in properties){
      result.push({"label":propertyName,"value":propertyName,"property_value":properties[propertyName]});
    }
    return result;
  }

  static getTablesFieldsObject(tableName:string,includeViews:boolean = true){
    let result:any = {};
    if(Simplify.validValue(SimpleDataDictionary.dataDictionary)){
      if(Simplify.validValue(SimpleDataDictionary.dataDictionary["tables"])){
        let tables:any = SimpleDataDictionary.dataDictionary["tables"];
        let tableDetails = tables[tableName];
        if(Simplify.validValue(tableDetails)){
          if(Simplify.validValue(tableDetails[SimpleDatabase.tableFields])){
            result = tableDetails[SimpleDatabase.tableFields];
          }
          if(includeViews){
            if(SimpleDataDictionary.dataDictionary["views"]){
              if(tableDetails[SimpleDatabase.tableViewName]){
                let viewDetails:any = SimpleDataDictionary.dataDictionary["views"][tableDetails[SimpleDatabase.tableViewName]];
                if(viewDetails){
                  if(viewDetails[SimpleDatabase.viewFields]){
                    for(let fieldName in viewDetails[SimpleDatabase.viewFields]){
                      if(result[fieldName]==undefined){
                        result[fieldName] = viewDetails[SimpleDatabase.viewFields][fieldName];
                      }
                    }
                  }
                }
              }
            }
          }
        }

      }
    }
    else{
      console.warn("Invalid Data Dictionary",SimpleDataDictionary.dataDictionary);
    }
    return result;
  }

  static getTableFieldsListSelectOptions(tableName:string,includeViews:boolean = true){
    let result:any[] = [];
    let fields:any = this.getTablesFieldsObject(tableName,includeViews);
    for(let fieldName in fields){
      result.push({"label":fieldName,"value":fieldName,"field":fields[fieldName]});
    }
    return result;
  }

  static getTablesObject(){
    let result:any = {};
    if(Simplify.validValue(SimpleDataDictionary.dataDictionary)){
      if(Simplify.validValue(SimpleDataDictionary.dataDictionary["tables"])){
        result = SimpleDataDictionary.dataDictionary["tables"];
      }
    }
    else{
      console.warn("Invalid Data Dictionary",SimpleDataDictionary.dataDictionary);
    }
    return result;
  }

  static getTablesListSelectOptions(){
    let result:any[] = [];
    let tables:any = this.getTablesObject();
    for(let tableName in tables){
      result.push({"label":tableName,"value":tableName,"table":tables[tableName]});
    }
    return result;
  }

  static getTableFieldSelectOptions(tableName:string,fieldName:string){
    let options:any = [];
    if(Simplify.validValue(SimpleDataDictionary.dataDictionary["tables"])){
      let tables = SimpleDataDictionary.dataDictionary["tables"];
      if(Simplify.validValue(tables[tableName])){
        let tableDetails = tables[tableName];
        if(Simplify.validValue(tableDetails[SimpleDatabase.tableFields])){
          let tableFields = tables[tableName][SimpleDatabase.tableFields];
          if(Simplify.validValue(tableFields[fieldName])){
            let fieldDetails = tableFields[fieldName];
            if(Simplify.validValue(fieldDetails[SimpleDatabase.fieldProperties])){
              let fieldProperties = fieldDetails[SimpleDatabase.fieldProperties];
              if(Simplify.validValue(fieldProperties[SimpleDatabase.propertySelectOptions])){
                options = Object.values(fieldProperties[SimpleDatabase.propertySelectOptions]);
              }
            }
          }
        }
      }
    }
    return options;
  }

  static registerDataDictionary(dataDictionary:any){
    console.log("Registering Data Dictionary");
    SimpleDataDictionary.dataDictionary = dataDictionary;
  }

}

import { AcEnumConditionOperator } from "../enums/ac-enum-condition-operator.enum";
import { AcEnumLogicalOperator } from "../enums/ac-enum-logical-operator.enum";
import { AcJsonUtils } from "../utils/ac-json-utils";
import { AcFilter } from "./ac-filter.model";


export class AcFilterGroup {
  static readonly KEY_FILTERS = "filters";
  static readonly KEY_OPERATOR = "operator";

  filters: AcFilter[] = [];
  operator: AcEnumLogicalOperator = AcEnumLogicalOperator.And;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcFilter {
    const instance = new AcFilter();
    instance.fromJson({ jsonData });
    return instance;
  }

  static instanceWithValues({
    operator,
    filters,
  }: {
    operator: AcEnumLogicalOperator;
    filters: AcFilter[];
  }):AcFilterGroup {
    const result= new AcFilterGroup();
    result.operator = operator;
    result.filters = filters;
    return result;
  }

  addFilter({key,operator,value}: {key: string;operator: AcEnumConditionOperator;value: any;}): this{
    return this.addFilterModel({filter:AcFilter.instanceWithValues({
      key:key,
      operator:operator,
      value:value
    })});
  }

  addFilterModel({filter}: {filter: AcFilter;}): this{
    this.filters.push(filter);
    return this;
  }

  cloneInstance():AcFilterGroup{
    return new AcFilterGroup().fromJson({jsonData:this.toJson()});
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  hasFilters(): boolean {
    return this.filters.length > 0;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

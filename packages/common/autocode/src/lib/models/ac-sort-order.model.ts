import { AcEnumSortOrder } from "../enums/ac-enum-sort-order.enum";
import { AcJsonUtils } from "../utils/ac-json-utils";
import { AcSort } from "./ac-sort.model";

export class AcSortOrder {
  static readonly KEY_SORT_ORDERS = "sort_orders";

  sortOrders: AcSort[] = [];

  static instanceFromJson({ jsonData }: { jsonData: any }): AcSortOrder {
    const instance = new AcSortOrder();
    instance.fromJson({ jsonData });
    return instance;
  }

  addSort({key,order,removeIfExist = true}:{key:string,order:AcEnumSortOrder,removeIfExist?:boolean}){
    if(removeIfExist){
      this.sortOrders = this.sortOrders.filter((item)=>{return item.key != key});
    }
    this.sortOrders.push(AcSort.instanceWithValues({key:key,order:order}));
  }

  cloneInstance():AcSortOrder{
    return new AcSortOrder().fromJson({jsonData:this.toJson()});
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

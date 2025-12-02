import { arrayRemoveByIndex } from "@autocode-ts/ac-extensions";
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcEvents } from "../core/ac-events";
import { AcEnumSortOrder } from "../enums/ac-enum-sort-order.enum";
import { AcJsonUtils } from "../utils/ac-json-utils";
import { AcSort } from "./ac-sort.model";

export class AcSortOrder {
  static readonly KeySorts = "sortOrders";

  @AcBindJsonProperty({skipInFromJson:true,skipInToJson:true})
  events:AcEvents = new AcEvents();

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
    if(order!=AcEnumSortOrder.None){
      this.sortOrders.push(AcSort.instanceWithValues({key:key,order:order}));
    }
    this.events.execute({event:'change',args:{ key,order,removeIfExist }});
  }

  clone():AcSortOrder{
    return new AcSortOrder().fromJson({jsonData:this.toJson()});
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback,subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  removeSort({key}:{key:string}){
    const index = this.sortOrders.findIndex((item:AcSort)=>{
      return item.key == key;
    })
    if(index >= 0){
      arrayRemoveByIndex(this.sortOrders,index);
    }
    this.events.execute({event:'change',args:{ key }});
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

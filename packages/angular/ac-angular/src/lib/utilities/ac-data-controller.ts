/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumFilterComparisonOperator, AcEnumFilterLogicalOperator } from "../ac-filters/enums/ac-filter-operators.enum";
import { IAcFilterCondition, IAcFilterGroup } from "../ac-filters/interfaces/ac-filter-field.interface";
import { AcEnumSort } from "../ac-sorting/enums/ac-sort.enum";

export class AcDataController {
  autoAddRecord:boolean = false;
  events:AcEvents = new AcEvents();
  dataDisplay: any[] = [];
  dataFiltered: any[] = [];
  dataSorted: any[] = [];

  private _data: any[] = [];
  get data(): any[] {
    return this._data;
  }
  set data(value: any[]) {
    if(value!=undefined && value != null){
      this._data = value;
    }
    else{
      this._data = [];
    }
    this.events.execute({eventName:"dataChanged"});
    this.applyDataFilter();
  }

  private _displayRange: { startIndex: number, endIndex: number } = { startIndex: -1, endIndex: -1 };
  get displayRange(): { startIndex: number, endIndex: number } {
    return this._displayRange;
  }
  set displayRange(value: { startIndex: number, endIndex: number }) {
    this._displayRange = value;
    this.setDisplayData();
  }

  private _filterGroup: IAcFilterGroup = { operator: AcEnumFilterLogicalOperator.and };
  get filterGroup(): IAcFilterGroup {
    return this._filterGroup;
  }
  set filterGroup(value: IAcFilterGroup) {
    this._filterGroup = value;
    this.applyDataFilter();
  }

  private _sortOrder: any;
  get sortOrder(): any {
    return this._sortOrder;
  }
  set sortOrder(value: any) {
    this._sortOrder = value;
    this.applyDataSort();
  }

  addNewRecordPlaceholder(){
    this.dataDisplay.push({});
  }

  applyDataFilter(): void {
    const filteredData:any[] = [];
    let foundFilters:boolean = false;
    if (this.filterGroup) {
      if((this.filterGroup.conditions && this.filterGroup.conditions.length>0) || (this.filterGroup.filterGroups && this.filterGroup.filterGroups.length>0)){
        foundFilters = true;
      }
    }
    if(foundFilters){
      for (const record of this.data) {
        if (this.checkRecordValidForFilterConditionGroup(record, this.filterGroup)) {
          filteredData.push(record);
        }
      }
      this.dataFiltered = filteredData;
      this.events.execute({eventName:"dataFiltered"});
    }
    else{
      this.dataFiltered = [...this.data];
    }
    this.applyDataSort();
  }

  applyDataSort(): void {
    if(this.sortOrder && Object.keys(this.sortOrder).length > 0){
      const dataToSort: any[] = [...this.dataFiltered];
      this.dataSorted = dataToSort.sort((a, b) => {
        for (const key in this.sortOrder) {
          const order = this.sortOrder[key];
          if (a[key] < b[key]) return order === AcEnumSort.asc ? -1 : 1;
          if (a[key] > b[key]) return order === AcEnumSort.asc ? 1 : -1;
        }
        return 0;
      });
      this.events.execute({eventName:"dataSorted"});
    }
    else{
      this.dataSorted = [...this.dataFiltered];
    }
    this.setDisplayData();
  }

  autoAddRecordUpdated(){
    this.data.push(this.dataDisplay[this.dataDisplay.length - 1]);
    this.dataFiltered.push(this.dataDisplay[this.dataDisplay.length - 1]);
    this.dataSorted.push(this.dataDisplay[this.dataDisplay.length - 1]);
    this.dataDisplay.push({});
  }

  checkRecordValidForFilterCondition(record: any, condition: IAcFilterCondition): boolean {
    let result: boolean = false;
    const operator: AcEnumFilterComparisonOperator = condition.operator;
    const conditionValue = condition.value;
    const fieldValue = record[condition.field];
    if (operator == AcEnumFilterComparisonOperator.between) {
      // result = conditionValue < fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.equals) {
      result = conditionValue == fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.greaterThan) {
      result = conditionValue > fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.greaterThanOrEquals) {
      result = conditionValue >= fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.in) {
      // result = conditionValue < fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.isEmpty) {
      result = conditionValue == "";
    }
    else if (operator == AcEnumFilterComparisonOperator.isNotNull) {
      result = conditionValue != null && conditionValue != undefined;
    }
    else if (operator == AcEnumFilterComparisonOperator.isNull) {
      result = conditionValue == null || conditionValue == undefined;
    }
    else if (operator == AcEnumFilterComparisonOperator.lessThan) {
      result = conditionValue <= fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.lessThanOrEquals) {
      result = conditionValue < fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.like) {
      // result = conditionValue < fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.notBetween) {
      // result = conditionValue < fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.notEqual) {
      result = conditionValue != fieldValue;
    }
    else if (operator == AcEnumFilterComparisonOperator.notIn) {
      // result = conditionValue < fieldValue;
    }
    return result;
  }

  checkRecordValidForFilterConditionGroup(record: any, filterGroup: IAcFilterGroup): boolean {
    let result: boolean = true;
    const conditions: IAcFilterCondition[] = filterGroup.conditions ?? [];
    if (conditions.length > 0) {
      result = false;
      const conditionResults: boolean[] = [];
      for (const condition of conditions) {
        conditionResults.push(this.checkRecordValidForFilterCondition(record, condition));
      }
      if (filterGroup.operator == AcEnumFilterLogicalOperator.and) {
        result = !conditionResults.includes(false);
      }
      else {
        result = conditionResults.includes(true);
      }
    }
    return result;
  }

  on({eventName,callback}:{eventName:string,callback:Function}){
    return this.events.subscribe({eventName:eventName,callback:callback});
  }

  setDisplayData() {
    let startIndex: number = this.displayRange.startIndex;
    let endIndex: number = this.displayRange.endIndex;
    if(startIndex < 0){
      startIndex = 0;
    }
    if(endIndex < 0){
      endIndex = this.dataSorted.length - 1;
    }
    if(startIndex !=0 && endIndex != this.dataSorted.length){
      this.dataDisplay = [];
      const newData: any[] = [];
      for (let i = startIndex; i <= endIndex; i++) {
        newData.push(this.dataSorted[i]);
      }
      if(this.autoAddRecord){
        newData.push({});
      }
      setTimeout(() => {
        this.dataDisplay = newData;
      }, 1);
    }
    else{
      this.dataDisplay = [...this.dataSorted];
      if(this.autoAddRecord){
        this.dataDisplay.push({});
      }
      this.events.execute({eventName:"displayDataChange"});
    }
  }

}

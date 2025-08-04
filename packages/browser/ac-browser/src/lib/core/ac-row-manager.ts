/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


export class AcRowManager {
  // The original data source (local or fetched)
  // private _data: any[] = [];
  // get data(): any[] {
  //   return this._data;
  // }

  // set data(value: any[]) {
  //   this._data = value;
  //   this.dataRows = [];
  //   let index = 0;
  //   for(const row of this._data){
  //     this.dataRows.push({
  //       acDataRowId:Autocode.uuid(),
  //       data:row,
  //       index:index
  //     });
  //     index++;
  //   }
  //   this.refreshDisplayedData();
  // }


  // dataFunction?: (params?: any) => Promise<IAcDataRow[]>;
  // dataRows:IAcDataRow[] = [];
  // dataSource: AcEnumDataSource = AcEnumDataSource.Local;
  // displayedRows: IAcDataRow[] = [];
  // usePagination: boolean = false;

  // // constructor() {}



  // private refreshDisplayedData() {
  //   if (this.usePagination) {
  //     this.displayedRows = this.dataRows;
  //   } else {
  //     this.displayedRows = [...this.dataRows];
  //   }
  // }

  // async fetchData(params?: any): Promise<void> {
  //   if (this.dataSource === 'remote' && this.dataFunction) {
  //     const result = await this.dataFunction(params);
  //     this._data = result;
  //     this.refreshDisplayedData();
  //   }
  // }

  // filterData(predicate: (row: IAcDataRow) => boolean): void {
  //   this.displayedRows = this._data.filter(predicate);
  // }

  // addRow({data}:{data: any}): IAcDataRow {
  //   const newRow:IAcDataRow = { data:data, acDataRowId: Autocode.uuid() };
  //   this._data.push(newRow);
  //   this.refreshDisplayedData();
  //   return newRow;
  // }

  // updateRow({data,key,rowId,addIfMissing = true}:{data: any,key?:string,rowId?:string,addIfMissing?:boolean}): IAcDataRow|null {
  //   let index = -1;
  //   if(rowId != undefined){
  //     index = this._data.findIndex(r => r.acDataRowId === rowId);
  //   }
  //   else if(key != undefined){
  //     index = this._data.findIndex(r => r.data[key] === data[key]);
  //   }
  //   if (index >= 0) {
  //     this._data[index].data = data;
  //     this.refreshDisplayedData();
  //     return this._data[index];
  //   }
  //   else if(addIfMissing){
  //     return this.addRow({data:data});
  //   }
  //   return null;
  // }

  // deleteRow({keyValue,key,rowId}:{keyValue: any,key?:string,rowId?:string,addIfMissing?:boolean}): IAcDataRow|null {
  //    let index = -1;
  //   if(rowId != undefined){
  //     index = this._data.findIndex(r => r.acDataRowId === rowId);
  //   }
  //   else if(key != undefined){
  //     index = this._data.findIndex(r => r.data[key] === keyValue);
  //   }
  //   if (index >= 0) {
  //     const row = this._data[index];
  //     arrayRemoveByIndex(this._data,index);
  //     arrayRemoveByIndex(this.dataRows,index);
  //     this.refreshDisplayedData();
  //     return row;
  //   }
  //   return null;
  // }

}

/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AcDatagridColumnComponent } from '../ac-datagrid-column/ac-datagrid-column.component';
import { AcBaseRepeater } from '../../../_base/ac-base-repeater.component';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { AcDatagridRowComponent } from '../ac-datagrid-row/ac-datagrid-row.component';
import { AcDatagridCellComponent } from '../ac-datagrid-cell/ac-datagrid-cell.component';
import { IAcFilterField } from '../../../ac-filters/interfaces/ac-filter-field.interface';
import { AcEnumSort } from '../../../ac-sorting/enums/ac-sort.enum';

@Component({
    selector: 'ac-datagrid',
    templateUrl: './ac-datagrid.component.html',
    styleUrl: './ac-datagrid.component.css',
    standalone: false
})
export class AcDatagridComponent extends AcBaseRepeater{
  @ViewChild('tableBody') tableBody!:ElementRef<any>;
  @ViewChild('tableHead') tableHead!:ElementRef<any>;

  @ContentChildren(AcDatagridColumnComponent) columnComponents?:QueryList<AcDatagridColumnComponent>;

  @Input() columns:IAcDataGridColumn[] = [];
  @Input() editable:boolean = false;
  @Input() tabIndex:number = 0;

  @Output() onColumnResize:EventEmitter<any> = new EventEmitter();
  @Output() onSelectedCellChange: EventEmitter<any> = new EventEmitter();

  thMap:any = {};

  editingColumnIndex = -1;
  editingRowIndex = -1;
  isInFocus:boolean = false;
  previousSelectedColumnIndex = -1;
  previousSelectedRowIndex = -1;
  override rows:any = {};
  selectedColumnIndex = -1;
  selectedRowIndex = -1;
  selectedRow:AcDatagridRowComponent|undefined;
  selectedRowData:any = {};

  override ngAfterViewInit(): void {
    this.setColumnsFromComponents();
    super.ngAfterViewInit();
  }

  editCell(rowIndex:number,columnIndex:number){
    if(this.rows[rowIndex]){
      const rowInstance:AcDatagridRowComponent = this.rows[rowIndex];
      if(rowInstance.cells[columnIndex]){
        this.editingColumnIndex = columnIndex;
        this.editingRowIndex = rowIndex;
        const cellInstance:AcDatagridCellComponent = rowInstance.cells[columnIndex];
        cellInstance.startEditing();
      }
      else{
        console.error("Column does not exist at index "+columnIndex);
      }
    }
    else{
      console.error("Row does not exist at index "+rowIndex);
    }
  }

  getFilterFields():IAcFilterField[]{
    const filterFields:IAcFilterField[] = [];
    for(const column of this.columns){
      filterFields.push({
        field:column.field,
        title:column.title
      })
    }
    return filterFields;
  }

  handleBlur(event:any){
    this.isInFocus = false;
  }

  handleCellSelectionChange(){
    // console.log(new Date().toISOString());
    this.selectedRow = this.rows[this.selectedRowIndex];
    this.selectedRowData = this.selectedRow!.data;
    this.handleSelectedCellChange();
    if(this.previousSelectedRowIndex != this.selectedRowIndex){
      this.handleSelectedRowChange();
    }
    this.previousSelectedColumnIndex = this.selectedColumnIndex;
    this.previousSelectedRowIndex = this.selectedRowIndex;

  }

  handleColumnWidthChange(column:any,event:any){
    const thElement:HTMLElement = this.thMap[column.index];
    thElement.style.width = event.width+'px';
  }

  handleColumnSortChange(column:IAcDataGridColumn,event:any){
    const sortValue:any = event.sort;
    const object = this;
    const field:string =column.field!;
    if ( sortValue == AcEnumSort.none) {
      delete object.sortOrder[field];
    }
    else{
      object.sortOrder[field]= sortValue;
    }
    object.applySort();
  }

  handleFocus(event:any){
    this.isInFocus = true;
  }

  handleKeyDown(event:any){
    const keyCode:string = event.code.toUpperCase();
    if(keyCode=="TAB"){
      event.preventDefault();
      if(!this.isInFocus){
        this.isInFocus = true;
      }
    }
    if(this.isInFocus){
      if(["ARROWDOWN","ARROWLEFT","ARROWRIGHT","ARROWUP","TAB"].includes(keyCode)){
        this.stopActiveEditCell();
        let indexChanged:boolean = false;
        if(keyCode=="ARROWDOWN"){
          if(this.rows[this.selectedRowIndex+1]){
            this.selectedRowIndex++;
            indexChanged = true;
          }
        }
        else if(keyCode=="ARROWLEFT"){
          if(this.rows[this.selectedRowIndex]){
            const rowInstance:AcDatagridRowComponent = this.rows[this.selectedRowIndex];
            if(rowInstance.cells[this.selectedColumnIndex - 1]){
              this.selectedColumnIndex--;
              indexChanged = true;
            }
            else{
              if(this.selectedRowIndex>0){
                this.selectedColumnIndex = Object.keys(rowInstance.cells).length - 1;
                this.selectedRowIndex--;
                indexChanged = true;
              }
            }
          }
        }
        else if(keyCode=="ARROWRIGHT"||keyCode=="TAB"){
          if(this.rows[this.selectedRowIndex]){
            const rowInstance:AcDatagridRowComponent = this.rows[this.selectedRowIndex];
            if(rowInstance.cells[this.selectedColumnIndex + 1]){
              this.selectedColumnIndex++;
              indexChanged = true;
            }
            else{
              if(this.rows[this.selectedRowIndex+1]){
                this.selectedRowIndex++;
                this.selectedColumnIndex=0;
                indexChanged = true;
              }
            }
          }
        }
        else if(keyCode=="ARROWUP"){
          if(this.rows[this.selectedRowIndex - 1]){
            this.selectedRowIndex--;
            indexChanged = true;
          }
        }
        if(indexChanged){
          event.preventDefault();
          this.handleCellSelectionChange();
        }
      }
      else{
        if(this.selectedRowIndex>=0 && this.selectedColumnIndex>=0 &&this.selectedRowIndex !=this.editingRowIndex && this.selectedColumnIndex!= this.editingColumnIndex){
          this.editCell(this.selectedRowIndex,this.selectedColumnIndex);
        }
      }
    }

  }

  override handleRowDataChange(event: any): void {
    super.handleRowDataChange(event);
  }

  handleSelectedCellChange(){
    this.onSelectedCellChange.emit();
    this.events.execute({eventName:'selectedCellChange'});
  }

  handleSelectedRowChange(){
    this.onSelectedRowChange.emit();
    this.events.execute({eventName:'selectedRowlChange'});
  }

  handleThDimensionChange(event:any, column:IAcDataGridColumn){
    column.width = event.width;
  }

  handleThViewInit(event:any, column:any,th:any){
    this.thMap[column.index!] =  th;
  }

  setColumnsFromComponents(){
    if(this.columnComponents){
      let index:number = -1;
      for(const column of this.columnComponents){
        index++;
        const columnDetails:IAcDataGridColumn = column.columnDetails;
        columnDetails.index = index;
        this.columns.push(columnDetails);
      }
    }
  }

  stopActiveEditCell(){
    if(this.editingColumnIndex >=0 && this.editingRowIndex >=0){
      if(this.rows[this.editingRowIndex]){
        const rowInstance:AcDatagridRowComponent = this.rows[this.editingRowIndex];
        if(rowInstance.cells[this.editingColumnIndex]){
          const cellInstance:AcDatagridCellComponent = rowInstance.cells[this.editingColumnIndex];
          cellInstance.stopEditing();
        }
        else{
          console.error("Column does not exist at index "+this.editingColumnIndex);
        }
      }
      else{
        console.error("Row does not exist at index "+this.editingRowIndex);
      }
      this.editingColumnIndex = -1;
      this.editingRowIndex = -1;
      this.tableBody.nativeElement.focus();
    }

  }

}



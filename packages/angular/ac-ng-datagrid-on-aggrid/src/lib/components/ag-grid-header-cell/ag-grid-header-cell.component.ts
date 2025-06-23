/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { AcDataGrid } from '@autocode-ts/ac-angular';

@Component({
  selector: 'ag-grid-header-cell',
  standalone: false,
  templateUrl: './ag-grid-header-cell.component.html',
  styleUrl: './ag-grid-header-cell.component.css'
})
export class AgGridHeaderCellComponent implements IHeaderAngularComp {
  @ViewChild('filterElement')
  filterElement!: ElementRef;
  params!: IHeaderParams;
  AcDataGrid = AcDataGrid;

  agInit(params: IHeaderParams): void {
    this.params = params;
  }

  onSortRequested(event: MouseEvent) {
    event.stopPropagation();
    let sortMode:any = undefined;
    if(this.params.column?.getSort() == 'asc'){
      sortMode = 'desc';
    }
    else if(this.params.column?.getSort() == undefined){
      sortMode = 'asc';
    }
    this.params.setSort(sortMode,true);
  }

  onFilterClick(event: MouseEvent) {
    event.stopPropagation();
    this.params.showFilter(this.filterElement.nativeElement);
  }

  refresh(params: IHeaderParams): boolean {
    return true;
  }
}

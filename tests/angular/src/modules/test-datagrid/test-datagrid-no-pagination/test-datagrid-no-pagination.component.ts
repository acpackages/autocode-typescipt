/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core';
import { employeeData } from '../../data/employee-data';
import { AcBase } from 'packages/angular/ac-angular/src/lib/_base/ac-base.component';
import { AcDatagridComponent } from 'packages/angular/ac-angular/src/lib/ac-datagrid/components/ac-datagrid/ac-datagrid.component';
import { AcFiltersComponent } from 'packages/angular/ac-angular/src/lib/ac-filters/ac-filters/ac-filters.component';

@Component({
  selector: 'app-test-datagrid-no-pagination',
  templateUrl: './test-datagrid-no-pagination.component.html',
  styleUrl: './test-datagrid-no-pagination.component.scss',
  standalone:false
})
export class TestDatagridNoPaginationComponent extends AcBase{
  @ViewChild(AcDatagridComponent) dataGrid!:AcDatagridComponent;
  @ViewChild(AcFiltersComponent) filters!:AcFiltersComponent;
  data:any[] = employeeData.slice(0,50);
  // data:any[] = employeeData;
  override ngAfterViewInit(): void {
    this.setFilterFields();
  }

  setFilterFields(){
    let operationSuccess:boolean = false;
    console.log(this.dataGrid.getFilterFields());
    if(this.dataGrid){
      if(this.filters){
        const fields:any[] = this.dataGrid.getFilterFields();
        if(fields.length > 0){
          this.filters.fields = fields;
          operationSuccess = true;
        }
      }
    }
    if(!operationSuccess){
      setTimeout(() => {
        this.setFilterFields();
      }, 500);
    }
  }
}

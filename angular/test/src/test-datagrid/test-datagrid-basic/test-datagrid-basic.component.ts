import { Component, ViewChild } from '@angular/core';
import { employeeData } from '../../data/employee-data';
import { AcBase } from '../../../../packages/autocode-angular/src/lib/_base/ac-base.component';
import { AcDatagridComponent } from '../../../../packages/autocode-angular/src/lib/ac-datagrid/components/ac-datagrid/ac-datagrid.component';
import { AcFiltersComponent } from '../../../../packages/autocode-angular/src/lib/ac-filters/ac-filters/ac-filters.component';
import { AcPaginationComponent } from '../../../../packages/autocode-angular/src/lib/ac-pagination/ac-pagination/ac-pagination.component';

@Component({
    selector: 'app-test-datagrid-basic',
    templateUrl: './test-datagrid-basic.component.html',
    styleUrl: './test-datagrid-basic.component.scss',
    standalone: false
})
export class TestDatagridBasicComponent extends AcBase{
  @ViewChild(AcDatagridComponent) dataGrid!:AcDatagridComponent;
  @ViewChild(AcFiltersComponent) filters!:AcFiltersComponent;
  @ViewChild(AcPaginationComponent) pagination!:AcPaginationComponent;
  data:any[] = employeeData.slice(0,100);
  // data:any[] = employeeData;
  override ngAfterViewInit(): void {
    this.setFilterFields();
  }

  setFilterFields(){
    let operationSuccess:boolean = false;
    console.log(this.dataGrid.getFilterFields());
    if(this.dataGrid){
      if(this.filters){
        let fields:any[] = this.dataGrid.getFilterFields();
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

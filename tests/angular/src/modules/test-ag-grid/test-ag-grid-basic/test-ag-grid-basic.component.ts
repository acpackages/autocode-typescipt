/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core';
import { employeeData } from '../../data/employee-data';
import { IAcDataGridColumn } from 'packages/angular/ac-angular/src';
import { ActionColumnComponent } from 'tests/angular/src/components/action-column/action-column.component';
import { AcDatagridOnAgGridComponent } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-on-ag-grid/ac-datagrid-on-ag-grid.component';

@Component({
  selector: 'app-test-ag-grid-basic',
  standalone:false,
  templateUrl: './test-ag-grid-basic.component.html',
  styleUrl: './test-ag-grid-basic.component.scss'
})
export class TestAgGridBasicComponent {
  @ViewChild("dataGrid") dataGrid:AcDatagridOnAgGridComponent;
  columns:IAcDataGridColumn[] = [
    {
      field:"id",
      title:"Id"
    },{
      field:"name",
      title:"Name"
    },
    {
      field:"gender",
      title:"Gender"
    },
    {
      field:"dateOfBirth",
      title:"Date of Birth"
    },
    {
      field:"hobbies",
      title:"Hobbies"
    },
    {
      field:"about",
      title:"About"
    },
    {
      field:"action",
      title:"Action",
      component:ActionColumnComponent
    }
  ];
  data:any[] = employeeData;

  handleActiveRowChange(event:any){
    console.log("Active Row Change",event);
  }

  handleCellFocused(event:any){
    console.log("Cell Focused",event);
  }

  handleCellValueChanged(event:any){
    console.log("Cell Value Changed",event);
  }

  handleDeleteRow(data:any){;
    this.dataGrid.deleteRow({data:data});
  }

  handleEditRow(data:any){;
    const updatedData:any = {...data,name:'Updated Name : '+data['name']};
    this.dataGrid.updateRow({data:updatedData,key:'id'});
  }

  handleRowAdded(event:any){
    console.log("Row Added",event);
  }

  handleRowDataModified(event:any){
    console.log("Row Data Modified",event);
  }

  handleRowDeleted(event:any){
    console.log("Row Deleted",event);
  }

  handleRowFocus(event:any){
    console.log("Row Focused",event);
  }

  handleRowSelected(event:any){
    console.log("Row Selected",event);
  }

  handleRowUpdated(event:any){
    console.log("Row Updated",event);
  }

  handleSearchUpdated(){
    console.log("Search Updated");
  }
}

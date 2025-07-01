/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core';
import { employeeData } from '../../data/employee-data';
import { IAcDataGridColumn } from 'packages/angular/ac-angular/src';
import { ActionColumnComponent } from 'tests/angular/src/components/action-column/action-column.component';
import { AcDatagridOnAgGridComponent } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-on-aggrid/ac-datagrid-on-aggrid.component';

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
      allowSelect:true,
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
  data:any[] = [];

  ngOnInit(){
    console.log(this);
    setTimeout(() => {
      this.data = employeeData.splice(0,10);
    }, 1500);
  }

  handleActiveRowChange(event:any){
    console.log("Active Row Change",event);
  }

  handleCellFocused(event:any){
    console.log("Cell Focused",event);
  }

  handleCellRenderComponentInit(event: any) {
    // if(event.component){
    //   if(event.component == ActionColumnComponent){
    //     if(event.componentInstance){
    //       console.log("Subscribing for delete event");
    //       event.componentInstance.onDelete.subscribe(params => {
    //           console.log('Action received via service!', event.data);
    //           alert(`Deleting row: ${event.data.name}`);
    //       });
    //       event.componentInstance.onEdit.subscribe(params => {
    //           console.log('Action received via service!', event.data);
    //           alert(`Deleting row: ${event.data.name}`);
    //           const updatedData: any = { ...event.data, name: 'Updated Name : ' + event.data['name'] };
    //           this.dataGrid.updateRow({ data: updatedData,'key':'id' });
    //       });
    //     }
    //   }
    // }
    // console.log("Cell Render Component Init", event);
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

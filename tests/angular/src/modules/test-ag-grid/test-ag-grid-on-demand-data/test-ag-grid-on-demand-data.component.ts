/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AcEnumFormatDateTime, AcEnumFormatNumber, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse } from '@autocode-ts/ac-angular';
import { AcDatagridOnAgGridComponent } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-on-ag-grid/ac-datagrid-on-ag-grid.component';
import { ActionColumnComponent } from 'tests/angular/src/components/action-column/action-column.component';

@Component({
  selector: 'app-test-ag-grid-on-demand-data',
  standalone: false,
  templateUrl: './test-ag-grid-on-demand-data.component.html',
  styleUrl: './test-ag-grid-on-demand-data.component.scss'
})
export class TestAgGridOnDemandDataComponent {
  @ViewChild("dataGrid") dataGrid: AcDatagridOnAgGridComponent;
  baseUrl = 'http://autocode.localhost/tests/ac-web/mvc-test/';
  columns:IAcDataGridColumn[] = [
    {
        field:"select",
        title:"",
        allowSelect:true,
        allowSort:false,
        allowFilter:false,
        width:1250,
        allowCustomization:false
      },
      {
        field:"account_id",
        title:"Id",
        cellClass:"text-center",
        headerClass:'text-center',
      },{
        field:"account_name",
        title:"Name"
      },
      {
        field:"account_number",
        title:"Number"
      },
      {
        field:"account_target",
        title:"Target"
      },
      {
        field:"account_type",
        title:"Type"
      },
      {
        field:"created_on",
        title:"Timestamp",
        formatDate:AcEnumFormatDateTime.input
      },
      {
        field:"account_balance",
        title:"Balance",
        formatNumber:AcEnumFormatNumber.currency
      },
      {
        field:"action",
        title:"Action",
        component:ActionColumnComponent
      }
    ];
  constructor(private httpClient: HttpClient) {
  }
  dataFunction: Function = async (params: IAcDataGridDataOnDemandParams) => {
    let requestData: any = {};
    if (params.pageNumber && params.pageSize) {
      requestData = { 'page_number': params.pageNumber, 'page_size': params.pageSize };
    }
    else {
      requestData = { "get_all_rows": true };
    }
    if (params.filterGroup) {
      requestData['filters'] = params.filterGroup;
    }
    if (params.sortOrder) {
      const orderByStrings: string[] = [];
      for (const sort of params.sortOrder) {
        orderByStrings.push(sort.column_name + " " + sort.order);
      }
      requestData['order_by'] = orderByStrings.join(",");
    }
    const apiResponse = await this.postData('api/accounts/get', requestData);
    // .then((apiResponse: any) => {
    console.log(apiResponse);
    if (apiResponse['status'] == "success") {
      const response: IAcDataGridDataOnDemandResponse = {
        data: apiResponse.rows,
        totalCount: apiResponse.total_rows
      };
      params.successCallback!(response);
    }
    // });


  }

  async postData(endpoint: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseUrl + endpoint, payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe().subscribe({
        next: async (data) => {
          console.log(data);
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  handleActiveRowChange(event: any) {
    console.log("Active Row Change", event);
  }

  handleCellFocused(event: any) {
    console.log("Cell Focused", event);
  }

  handleCellEditorComponentInit(event: any) {

    console.log("Cell Editor Component Init", event);
  }

  handleCellRenderComponentInit(event: any) {
    if(event.component){
      if(event.component == ActionColumnComponent){
        if(event.componentInstance){
          console.log("Subscribing for delete event");
          event.componentInstance.onDelete.subscribe(params => {
        console.log('Action received via service!', event.data);
        alert(`Deleting account: ${event.data.account_name}`);
    });
        }
      }
    }
    console.log("Cell Render Component Init", event);
  }

  handleCellValueChanged(event: any) {
    console.log("Cell Value Changed", event);
  }

  handleColumnOrderChanged(event: any) {
    console.log("Column Order Changed", event);
  }

  handleColumnVisibilityChanged(event: any) {
    console.log("Column Visibility Changed", event);
  }

  handleColumnWidthChanged(event: any) {
    console.log("Column Width Changed", event);
  }

  handleDeleteRow(data: any) {
    ;
    this.dataGrid.deleteRow({ data: data });
  }

  handleEditRow(data: any) {
    ;
    const updatedData: any = { ...data, account_name: 'Updated Name : ' + data['account_name'] };
    this.dataGrid.updateRow({ data: updatedData, key: 'id' });
  }

  async handleGetSelectedData() {
    const selectedData: any[] = await this.dataGrid.getSelectedData();
    console.log(selectedData);
  }

  handleGetDataGridState() {
    const state: any = this.dataGrid.getGridState();
    console.log(state);
  }

  handleRowAdded(event: any) {
    console.log("Row Added", event);
  }

  handleRowDataModified(event: any) {
    console.log("Row Data Modified", event);
  }

  handleRowDeleted(event: any) {
    console.log("Row Deleted", event);
  }

  handleRowFocus(event: any) {
    console.log("Row Focused", event);
  }

  handleRowSelected(event: any) {
    console.log("Row Selected", event);
  }

  handleRowUpdated(event: any) {
    console.log("Row Updated", event);
  }

  handleSearchUpdated() {
    console.log("Search Updated");
  }

  handleSetDataGridState() {
    const state: any = {
    "columns": [
        {
            "colId": "0",
            "width": 37,
            "hide": false,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": null
        },
        {
            "colId": "account_id",
            "width": 183,
            "hide": true,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": 1
        },
        {
            "colId": "account_name",
            "width": 865,
            "hide": false,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": 1
        },
        {
            "colId": "account_number",
            "width": 150,
            "hide": false,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": null
        },
        {
            "colId": "account_target",
            "width": 232,
            "hide": false,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": null
        },
        {
            "colId": "account_type",
            "width": 192,
            "hide": false,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": null
        },
        {
            "colId": "account_balance",
            "width": 206,
            "hide": true,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": 1
        },
        {
            "colId": "remarks",
            "width": 236,
            "hide": true,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": 1
        },
        {
            "colId": "action",
            "width": 176,
            "hide": false,
            "pinned": null,
            "sort": null,
            "sortIndex": null,
            "aggFunc": null,
            "rowGroup": false,
            "rowGroupIndex": null,
            "pivot": false,
            "pivotIndex": null,
            "flex": null
        }
    ]
};
    this.dataGrid.setDatagridState(state);
  }

  handleStateUpdated(event: any) {
    console.log("Datagrid State Updated",event);
  }

}

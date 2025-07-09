/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AcEnumFormatDateTime, AcEnumFormatNumber, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse } from '@autocode-ts/ac-angular';
import { AcDatagridOnAgGridComponent } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-on-aggrid/ac-datagrid-on-aggrid.component';
import { SelectAccountInputComponent } from 'tests/angular/src/components/select-account-input/select-account-input.component';
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
  columns: IAcDataGridColumn[] = [
    {
      field: "select",
      title: "",
      allowSelect: true,
      allowSort: false,
      allowFilter: false,
      minWidth: 50,
      maxWidth: 50,
      width: 50,
      allowCustomization: false
    },
     {
      field: "account_name",
      title: "Name"
    },
    {
      field: "account_number",
      title: "Number"
    },
    {
      field: "account_target",
      title: "Target"
    },
    {
      field: "account_type",
      title: "Type"
    },
    {
      field: "created_on",
      title: "Timestamp",
      formatDate: AcEnumFormatDateTime.input
    },
    {
      field: "account_balance",
      title: "Balance",
      formatNumber: AcEnumFormatNumber.currency
    },
    {
      field: "action",
      title: "Action",
      component: ActionColumnComponent
    },
    {
      field: "account_id",
      title: "Id",
      cellClass: "text-center",
      headerClass: 'text-center',
      allowEdit:false,
      component: SelectAccountInputComponent
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
    this.log(apiResponse);
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
          this.log(data);
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  handleActiveRowChange(event: any) {
    this.log("Active Row Change", event);
  }

  handleCellFocused(event: any) {
    this.log("Cell Focused", event);
  }

  handleCellEditorComponentBeforeInit(event: any) {
    if (event.component) {
    }
    // this.log("Cell Editor Component Before Init", event);
  }

  handleCellEditorComponentInit(event: any) {
    this.log(event);
    if (event.component == SelectAccountInputComponent) {
      this.log(event.componentInstance.dataGridSelect);
      event.componentInstance.dataGridSelect.inputElementRef.nativeElement.focus();
      setTimeout(() => {
          const value = event.data[event.column.field];
          // this.log("Account Value : " + value);
          event.componentInstance.defaultSelectedData = {'account_id':event.data['account_id'],'account_name':event.data['account_']}
          event.componentInstance.value = value;
        }, 500);
    }
    // this.log("Cell Editor Component Init", event);
  }

  handleCellRenderComponentBeforeInit(event: any) {
    if (event.component) {
      if (event.component == SelectAccountInputComponent) {
        // this.log("Cell Renderer Component Before Init", event);
        if (event.componentProperties == undefined) {
          event.componentProperties = {};
        }
        // event.componentProperties["value"] = event.data[event.column.field];
      }
    }

  }


  handleCellRenderComponentInit(event: any) {
    if (event.component) {
      if (event.component == ActionColumnComponent) {
        if (event.componentInstance) {
          this.log("Subscribing for delete event");
          event.componentInstance.onDelete.subscribe(params => {
            this.dataGrid.deleteRow({ value: event.data['account_id'], 'key': 'account_id' });
            alert(`Deleting account: ${event.data.account_name}`);
          });
          event.componentInstance.onEdit.subscribe(params => {
            this.log('Action received via service!', event.data);
            const updatedData: any = { ...event.data, account_name: 'Updated Name : ' + event.data['account_name'] };
            this.dataGrid.updateRow({ data: updatedData, 'key': 'account_id' });
          });
        }
      }

      else if (event.component == SelectAccountInputComponent) {
        setTimeout(() => {
          event.componentInstance.defaultSelectedData = {'account_id':event.data['account_id'],'account_name':event.data['account_name']}

          event.componentInstance.value = event.data['account_id'];

          // const value = event.data[event.column.field];
        }, 500);
      }
    }
    this.log("Cell Render Component Init", event);
  }

  handleCellValueChanged(event: any) {
    this.log("Cell Value Changed", event);
  }

  handleColumnOrderChanged(event: any) {
    this.log("Column Order Changed", event);
  }

  handleColumnVisibilityChanged(event: any) {
    this.log("Column Visibility Changed", event);
  }

  handleColumnWidthChanged(event: any) {
    this.log("Column Width Changed", event);
  }

  handleDeleteRow(data: any) {
    ;
    this.dataGrid.deleteRow({ data: data });
  }

  handleEditRow(data: any) {
    const updatedData: any = { ...data, account_name: 'Updated Name : ' + data['account_name'] };
    this.dataGrid.updateRow({ data: updatedData, key: 'id' });
  }

  async handleGetSelectedData() {
    const selectedData: any[] = await this.dataGrid.getSelectedData();
    this.log(selectedData);
  }

  handleGetDataGridState() {
    const state: any = this.dataGrid.getGridState();
    this.log(state);
  }

  handleRowAdded(event: any) {
    this.log("Row Added", event);
  }

  handleRowDataModified(event: any) {
    this.log("Row Data Modified", event);
  }

  handleRowDeleted(event: any) {
    this.log("Row Deleted", event);
  }

  handleRowFocus(event: any) {
    this.log("Row Focused", event);
  }

  handleRowSelected(event: any) {
    this.log("Row Selected", event);
  }

  handleRowUpdated(event: any) {
    this.log("Row Updated", event);
  }

  handleSearchUpdated() {
    this.log("Search Updated");
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
    this.log("Datagrid State Updated", event);
  }

  log(...args:any){
    // console.trace();
    // console.log(args);
  }

}

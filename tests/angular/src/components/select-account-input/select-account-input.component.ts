/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ElementRef,forwardRef, Input, ViewChild } from '@angular/core';
import { AcBaseInput, AutocodeService, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse } from 'packages/angular/ac-angular/src';
import { ActionColumnComponent } from '../action-column/action-column.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcDatagridDropdownOnAgGrid } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-dropdown-on-aggrid/ac-datagrid-dropdown-on-aggrid.component';

@Component({
    selector: 'select-account-input',
    templateUrl: './select-account-input.component.html',
    styleUrl: './select-account-input.component.scss',
    standalone: false,
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAccountInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectAccountInputComponent),
      multi: true
    }
  ],
})
export class SelectAccountInputComponent extends AcBaseInput{
  @ViewChild('dataGridSelect') dataGridSelect:AcDatagridDropdownOnAgGrid;
  @Input() defaultSelectedData:any;
  baseUrl = 'http://autocode.localhost/tests/ac-web/mvc-test/';
  columns:IAcDataGridColumn[] = [
      {
        field:"account_name",
        title:"Name"
      },
      {
        field:"account_id",
        title:"Id",
        cellClass:"text-center",
        headerClass:'text-center',
      },
      {
        field:"action",
        title:"Action",
        component:ActionColumnComponent
      }
  ];
  constructor(private httpClient: HttpClient,elementRef:ElementRef,autocodeService:AutocodeService) {
    super(elementRef,autocodeService);
  }

  dataFunction: Function = async (params: IAcDataGridDataOnDemandParams) => {
    console.warn(params);
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

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // this.dataGridSelect.setDropdownSize({height:900,width:800});
    console.log(this);
  }

  override focus(){
    let retryOperation= true;
    if(this.dataGridSelect){
      if(this.dataGridSelect.inputElementRef){
        if(this.dataGridSelect.inputElementRef.nativeElement){
          retryOperation = false;
          setTimeout(() => {
            this.dataGridSelect.inputElementRef.nativeElement.focus();
          }, 100);
        }
      }
    }
    if(retryOperation){
      setTimeout(() => {
        this.focus();
      }, 100);
    }
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

  context:any = {}

  override setValue(value: any): void {
    console.warn("Setting account ",value);
    super.setValue(value);

  }

  handleDropdownShow(){
  //   setTimeout(() => {

  //   }, 2000);
  }

  handleValueChange(event:any){
    this.log(this);
    // this.value = this.dataGridSelect.value;
  }

  log(...args:any){
    // console.trace();
    // console.log(args);
  }

}

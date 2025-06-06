/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse } from '@autocode-typescript/autocode-angular';

@Component({
  selector: 'app-test-ag-grid-on-demand-data',
  standalone: false,
  templateUrl: './test-ag-grid-on-demand-data.component.html',
  styleUrl: './test-ag-grid-on-demand-data.component.scss'
})
export class TestAgGridOnDemandDataComponent {
  baseUrl = 'http://autocode.localhost/tests/autocode-web/mvc-test/';
  constructor(private httpClient: HttpClient) {
  }
  dataFunction: Function = async (params: IAcDataGridDataOnDemandParams) => {
    let requestData: any = {};
    if(params.pageNumber && params.pageSize){
      requestData = { 'page_number': params.pageNumber, 'page_size': params.pageSize };
    }
    else{
      requestData = {"get_all_rows" : true};
    }
    if(params.filterGroup){
      requestData['filters'] = params.filterGroup;
    }
    if(params.sortOrder){
      const orderByStrings:string[] = [];
      for(const sort of params.sortOrder){
        orderByStrings.push(sort.column_name+" "+sort.order);
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
}

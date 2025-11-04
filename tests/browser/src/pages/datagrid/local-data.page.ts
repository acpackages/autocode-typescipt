/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-browser/src/lib/components/ac-datagrid/css/ac-datagrid.css';
import './../../../../../packages/browser/ac-browser/src/lib/components/ac-pagination/css/ac-pagination.css';
import { AcDatagrid, AcDatagridApi, AcDatagridRowSelectionExtension, AcEnumDatagridExtension, AcEnumDataSourceType } from '@autocode-ts/ac-browser';
import { customersData } from './../../../../data/customers-data';

export class DatagridLocalData extends HTMLElement {
  public static observedAttributes = [];
  datagrid!: AcDatagrid;
  datagridApi!:AcDatagridApi;

  async connectedCallback() {
    const html = `
      <h5>Datagrid : Offline Data</h5>
      <div class="local-datagrid-container" style="height:80vh;"></div>
    `;
    this.innerHTML = html;
    this.datagrid = new AcDatagrid();
    this.datagridApi = this.datagrid.datagridApi;
    console.log(this.datagridApi);
    this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.RowNumbers});
    // const selectionExtension:AcDatagridRowSelectionExtension = this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.RowSelection})!;
    this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.RowDragging});
    this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.KeyboardActions});
    this.datagridApi.usePagination = true;
    // this.datagridApi.allowRowSelect = true;
    this.datagridApi.dataSourceType = AcEnumDataSourceType.Offline;
    // console.log(this.getElementsByClassName("local-datagrid-container"));
    this.getElementsByClassName("local-datagrid-container")[0].append(this.datagrid);
    this.datagridApi.columnDefinitions = [
      {field:'index',title:"SrNo.",width:50},
      {field:'first_name',title:"First Name"},
      {field:'last_name',title:"Last Name"},
      {field:'company',title:"Company"},
      {field:'city',title:"City"},
      {field:'country',title:"Country"},
      {field:'phone_1',title:"Phone 1"},
      {field:'phone_2',title:"Phone 2"},
      {field:'email',title:"Email"},
      {field:'subscription_date',title:"Subscription Date"},
      {field:'website',title:"Website"},
      {field:'customer_id',title:"Id"},
    ];
    const multiplier = 1;
    const data:any[] = [];
    let index:number = 0;
    for(let i=0;i<multiplier;i++){
      for(const row of customersData){
        index++;
        data.push({index:index,...row})
      }
    }
    this.datagridApi.data = data;

    // setTimeout(() => {
    //   // this.datagrid.datagridApi.setRowSelection({key:"customer_id",value:'fa51d247-f53c-4f25-8436-9de299bb9160',isSelected:true});
    //   // console.log("Set selection true");
    //   // this.element.checked != this.datagridRow.isSelected
    //   selectionExtension.setAllRowsSelection({isSelected:true});
    //   setTimeout(() => {
    //   // this.datagrid.datagridApi.setRowSelection({key:"customer_id",value:'fa51d247-f53c-4f25-8436-9de299bb9160',isSelected:true});
    //   // console.log("Set selection true");
    //   // this.element.checked != this.datagridRow.isSelected
    //   selectionExtension.setAllRowsSelection({isSelected:false});
    // }, 2500);
    // }, 2500);

    // console.log(this.datagrid);
  }
}

/* eslint-disable @nx/enforce-module-boundaries */
import { AcDatagridRowSelectionExtension } from 'packages/browser/ac-browser/src/lib/ac-datagrid/extensions/_extensions.export';
import './../../../../../packages/browser/ac-browser/src/lib/ac-datagrid/css/ac-datagrid.css';
import './../../../../../packages/browser/ac-browser/src/lib/ac-pagination/css/ac-pagination.css';
import { AcDatagrid, AcDatagridApi, AcEnumDatagridExtension, AcEnumDataSourceType } from '@autocode-ts/ac-browser';

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
    this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.RowNumbers});
    const selectionExtension:AcDatagridRowSelectionExtension = this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.RowSelection});
    this.datagridApi.enableExtension({extensionName:AcEnumDatagridExtension.RowDragging});
    this.datagridApi.usePagination = true
    // this.datagridApi.allowRowSelect = true;
    this.datagridApi.dataSourceType = AcEnumDataSourceType.Offline;
    console.log(this.getElementsByClassName("local-datagrid-container"));
    this.getElementsByClassName("local-datagrid-container")[0].append(this.datagrid.element);
    this.datagridApi.columnDefinitions = [
      {field:'customer_id',title:"Id"},
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
    ];
    const res = await fetch('http://autocode.localhost/tests/ac-web/mvc-test/api/customers/get?page_size=1000');
    if(res.ok){
      const response = await res.json();
      this.datagridApi.data = response.rows;
    }

    setTimeout(() => {
      // this.datagrid.datagridApi.setRowSelection({key:"customer_id",value:'fa51d247-f53c-4f25-8436-9de299bb9160',isSelected:true});
      // console.log("Set selection true");
      // this.element.checked != this.datagridRow.isSelected
      selectionExtension.setAllRowsSelection({isSelected:true});
      setTimeout(() => {
      // this.datagrid.datagridApi.setRowSelection({key:"customer_id",value:'fa51d247-f53c-4f25-8436-9de299bb9160',isSelected:true});
      // console.log("Set selection true");
      // this.element.checked != this.datagridRow.isSelected
      selectionExtension.setAllRowsSelection({isSelected:false});
    }, 2500);
    }, 2500);

    console.log(this.datagrid);
  }
}

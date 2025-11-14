/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRow, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, AcEnumDatagridHook, IAcDatagridColumnDefinition } from '@autocode-ts/ac-browser';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';
import { AcDataManager, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { AcNgDatagridComponent, AcNgDatagridModule, IAcNgDatagridColumnDefinition } from '@autocode-ts/ac-angular';
import { customersData } from './../../../../data/customers-data';
import { ActionColumnComponent } from '../../components/action-column/action-column.component';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-datagrid',
  imports: [CommonModule, AcNgDatagridModule,ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss',
  standalone: true
})
export class DatagridComponent {
  @ViewChild('datagrid') datagrid:AcNgDatagridComponent;
  @ViewChild('idTemplate', { static: true }) idTemplateRef!: TemplateRef<any>;
  data?: any;

  columnDefinitions:IAcNgDatagridColumnDefinition[] = [
    // { field: 'action', title: "Action", autoWidth: true, allowEdit: false,cellEditorComponent: ActionColumnComponent,cellEditorComponentProperties:{showEdit:false},useCellEditorForRenderer:true},
    { field: 'action', title: "Action", autoWidth: true, allowEdit: false},
    { field: 'index', title: "SrNo.", autoWidth: true, allowEdit: false,cellRendererTemplateRef: this.idTemplateRef},
    { field: 'first_name', title: "First Name", autoWidth: true, allowEdit: true },
    { field: 'last_name', title: "Last Name", autoWidth: true, allowEdit: true },
    { field: 'company', title: "Company" },
    { field: 'city', title: "City" },
    { field: 'country', title: "Country" },
    { field: 'phone_1', title: "Phone 1" },
    { field: 'phone_2', title: "Phone 2" },
    { field: 'email', title: "Email" },
    { field: 'subscription_date', title: "Subscription Date" },
    { field: 'website', title: "Website" },
    { field: 'customer_id', title: "Id", index: 2, visible: false },
  ];
  onDemandFunction?:any;

  constructor(private elementRef: ElementRef) {
    console.log(this);
    this.setOnDemandData();
  }

  handleDatagridInit(){
    const button = document.createElement('button');
    button.setAttribute('class','btn btn-primary');
    button.setAttribute('type','button');
    button.innerHTML='Add Row';
    button.addEventListener('click',()=>{
      this.datagrid.datagridApi.addRow();
    });
    this.datagrid.datagrid.datagridFooter.append(button);
  }

  handleEdit(datagridRow:AcDatagridRow){
    datagridRow.data['first_name'] = `Updated ${datagridRow.data['first_name']}`;
    console.log(datagridRow);
  }

  setLocalData() {
    const data: any[] = [];
    const multiplier = 1;
    let index: number = 0;
    for (let i = 0; i < multiplier; i++) {
      for (const row of customersData) {
        index++;
        data.push({ index: index, ...row });
      }
    }
    this.data = data;
  }

  setOnDemandData() {
    const onDemandProxyDataManager: AcDataManager = new AcDataManager();
    const data: any[] = [];
    const multiplier = 1;
    let index: number = 0;
    for (let i = 0; i < multiplier; i++) {
      for (const row of customersData) {
        index++;
        data.push({ index: index, ...row })
      }
    }
    onDemandProxyDataManager.data = data;

    this.onDemandFunction = async (args: IAcOnDemandRequestArgs) => {
      console.log("Getting on demand data");
      console.log(args);
      if (args.filterGroup) {
        onDemandProxyDataManager.filterGroup = args.filterGroup;
      }
      if (args.sortOrder) {
        onDemandProxyDataManager.sortOrder = args.sortOrder;
      }
      onDemandProxyDataManager.searchQuery = args.searchQuery ?? '';
      onDemandProxyDataManager.processRows();
      const totalCount = onDemandProxyDataManager.totalRows;
      const data = await onDemandProxyDataManager.getData({ startIndex: args.startIndex, rowsCount: args.rowsCount });
      const response = {
        totalCount,
        data
      };
      console.log(response);
      args.successCallback(response);
    };
  }

  handleDatagridRowUpdate(datagridRow:AcDatagridRow){
    const datagridApi = datagridRow.datagridApi;
    const data = {...datagridRow.data};
    data['index']++;
    this.datagrid.datagridApi.updateRow({data:data,rowId:datagridRow.rowId})
  }
}

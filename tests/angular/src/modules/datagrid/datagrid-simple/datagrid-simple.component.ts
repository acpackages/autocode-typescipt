/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { AcDatagridApi, AcDatagridExtensionManager, AcEnumDatagridColumnDataType, IAcDatagridCell, IAcDatagridRow } from '@autocode-ts/ac-browser';
import { AcDataManager, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { AcNgDatagridComponent, AcNgDatagridModule, AcNgInputsModule, AcNgValueAccessorDirective, IAcNgDatagridColumnDefinition } from '@autocode-ts/ac-angular';
import { customersData } from './../../../../../data/customers-data';
import { ComponentsModule } from '../../../components/components.module';
import { AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME, AgGridOnAcDatagrid } from '@autocode-ts/ac-datagrid-on-ag-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerCompanySelectInput } from 'tests/angular/src/components/select-inputs/customer-company-select-input.element';

@Component({
  selector: 'app-datagrid-simple',
  imports: [CommonModule, AcNgDatagridModule,ComponentsModule, AcNgInputsModule,ReactiveFormsModule,FormsModule,AcNgValueAccessorDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './datagrid-simple.component.html',
  styleUrl: './datagrid-simple.component.scss',
  standalone: true
})
export class DatagridSimpleComponent implements OnDestroy, AfterViewInit{
  @ViewChild('datagrid') datagrid:AcNgDatagridComponent;
  @ViewChild('idTemplate', { static: true }) idTemplateRef!: TemplateRef<any>;
  data?: any;

  columnDefinitions:IAcNgDatagridColumnDefinition[] = [
    // { field: 'action', title: "Action", autoWidth: true, allowEdit: false,cellEditorComponent: ActionColumnComponent,cellEditorComponentProperties:{showEdit:false},useCellEditorForRenderer:true},
    { field: 'action', title: "Action", autoWidth: true, allowEdit: false},
    { field: 'index', title: "SrNo.", autoWidth: true, allowEdit: true,
      dataType:AcEnumDatagridColumnDataType.Number,cellRendererTemplateRef: this.idTemplateRef,cellClass:'text-center',headerCellClass:'text-center',
    cellEditorElementAttrs:{'class':'text-center'}},
    { field: 'first_name', title: "First Name", autoWidth: true, allowEdit: true },
    { field: 'last_name', title: "Last Name", autoWidth: true, allowEdit: true },
    { field: 'company', title: "Company",flexSize:1,allowEdit: true },
    // { field: 'city', title: "City" },
    // { field: 'country', title: "Country" },
    // { field: 'phone_1', title: "Phone 1" },
    // { field: 'phone_2', title: "Phone 2" },
    // { field: 'email', title: "Email" },
    // { field: 'subscription_date', title: "Subscription Date" },
    // { field: 'website', title: "Website" },
    // { field: 'customer_id', title: "Id", index: 2, visible: false },
  ];
  onDemandFunction?:any;

  constructor(private elementRef: ElementRef) {
    CustomerCompanySelectInput;
    //
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setOnDemandData();
      // this.setLocalData();
    }, 1);
  }


  ngOnDestroy(): void {
    //
  }

  handleCellKeyUp(event:any){
    // console.log("Cell key up",event);
  }


  handleCellValueChange(event:any){
    const datagridCell:IAcDatagridCell = event.datagridCell;
    if(datagridCell.datagridColumn.columnKey == "company"){
      const updatedData = {...datagridCell.datagridRow.data};
      const datagridApi:AcDatagridApi = event.datagridApi;
      updatedData.first_name = updatedData.first_name+'-modified';
      updatedData.last_name = updatedData.last_name+'-modified';
      datagridApi.updateRow({data:updatedData,rowId:datagridCell.datagridRow.rowId});
    }
    console.log("Cell value change",event);
  }

  handleCompanyChange(args:any){
    // if(this.datagrid.)
  }

  handleDatagridInit(){
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
    this.datagrid.datagridApi.showAddButton = true;
    this.datagrid.datagridApi.enableExtension({extensionName:AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME});
  }

  handleDatagridRowUpdate(datagridRow:IAcDatagridRow){
    // const datagridApi = datagridRow;
    const data = {...datagridRow.data};
    data['index']++;
    this.datagrid.datagridApi.updateRow({data:data,rowId:datagridRow.rowId})
  }

  handleDropdownInit(event: any) {
    event.target.focus();
  }



  handleEdit(datagridRow:IAcDatagridRow){
    datagridRow.data['first_name'] = `Updated ${datagridRow.data['first_name']}`;
  }

  handleElementInit(event:any,datagridRow:IAcDatagridRow){
    // event.target.value = datagridRow.data['first_name'];
  }

  handleNameChange(datagridRow:IAcDatagridRow){
    //
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
      args.successCallback(response);
    };
  }


}

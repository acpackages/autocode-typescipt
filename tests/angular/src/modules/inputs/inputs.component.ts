/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef,OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { AcDataManager,IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { AcNgDatagridSelectComponent, AcNgInputsModule, AcNgValueAccessorDirective, IAcNgDatagridColumnDefinition } from '@autocode-ts/ac-angular';
import { customersData } from './../../../../data/customers-data';
import { ComponentsModule } from '../../components/components.module';
import { AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME, AgGridOnAcDatagrid } from '@autocode-ts/ac-datagrid-on-ag-grid';
import { AcDatagridExtensionManager } from '@autocode-ts/ac-browser';
import { Tables, TblActTaxRates } from '../../consts/act-data-dictionary';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  imports: [CommonModule, AcNgInputsModule,ComponentsModule,AcNgValueAccessorDirective,FormsModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  standalone: true
})
export class InputsComponent implements OnDestroy{
  @ViewChild('selectInput') selectInput:AcNgDatagridSelectComponent;
  @ViewChild('idTemplate', { static: true }) idTemplateRef!: TemplateRef<any>;

  Tables = Tables;
  TblActTaxRates = TblActTaxRates;

  data?: any;
  record:any = {};

  columnDefinitions:IAcNgDatagridColumnDefinition[] = [
    { field: 'index', title: "SrNo.", autoWidth: true, allowEdit: false,cellRendererTemplateRef: this.idTemplateRef},
    { field: 'first_name', title: "First Name", autoWidth: true, allowEdit: true },
    { field: 'last_name', title: "Last Name", autoWidth: true, allowEdit: true },
    { field: 'company', title: "Company",flexSize:1 },
  ];
  onDemandFunction?:any;

  constructor(private elementRef: ElementRef) {
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
    this.setOnDemandData();
  }

  ngOnDestroy(): void {
    console.log("Datagrid Desrtoyed");
  }

  handleDatagridInit(){
    console.log("Datagrid api")
    this.selectInput.datagridApi.enableExtension({extensionName:AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME});
    const button = document.createElement('button');
    button.setAttribute('class','btn btn-primary');
    button.setAttribute('type','button');
    button.innerHTML='Add Row';
    button.addEventListener('click',()=>{
      this.selectInput.datagridApi.addRow();
    });
    this.selectInput.datagrid.datagridFooter.append(button);
  }

  async handleFormSubmit() {
    console.log(this);
    // const httpResponse: IAcHttpResponse = await AcHttp.postPromise({ url: '', data: { row: this.record } });
    // if (httpResponse.status == AcEnumHttpResponseCode.Ok && httpResponse.data) {
    //   //
    // }
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
}

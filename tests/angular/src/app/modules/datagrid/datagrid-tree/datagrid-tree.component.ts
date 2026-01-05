/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { AC_DATAGRID_EXTENSION_NAME, AcDatagridExtensionManager, AcDatagridTreeTableExtension, IAcDatagridRow } from '@autocode-ts/ac-browser';
import { AcDataManager, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { AcNgDatagridComponent, AcNgDatagridModule, AcNgInputsModule, IAcNgDatagridColumnDefinition } from '@autocode-ts/ac-angular';
import { productCategoriesData } from './../../../../../../data/product-categories-data';
import { ComponentsModule } from '../../../components/components.module';
import { AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME, AcDatagridOnAgGridExtension, AgGridOnAcDatagrid } from '@autocode-ts/ac-datagrid-on-ag-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datagrid-tree',
  imports: [CommonModule, AcNgDatagridModule,ComponentsModule, AcNgInputsModule,ReactiveFormsModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './datagrid-tree.component.html',
  styleUrl: './datagrid-tree.component.scss',
  standalone: true
})
export class DatagridTreeComponent implements OnDestroy, AfterViewInit{
  @ViewChild('datagrid') datagrid:AcNgDatagridComponent;
  @ViewChild('idTemplate', { static: true }) idTemplateRef!: TemplateRef<any>;
  data?: any;

  columnDefinitions:IAcNgDatagridColumnDefinition[] = [
    // { field: 'action', title: "Action", autoWidth: true, allowEdit: false,cellEditorComponent: ActionColumnComponent,cellEditorComponentProperties:{showEdit:false},useCellEditorForRenderer:true},
    { field: 'action', title: "Action", autoWidth: true, allowEdit: false,width:75},
    { field: 'index', title: "SrNo.", autoWidth: true, allowEdit: false,cellRendererTemplateRef: this.idTemplateRef,cellClass:'text-center',headerCellClass:'text-center',width:75},
    { field: 'name', title: "Name", autoWidth: true, allowEdit: true,flexSize:1 },
    // { field: 'country', title: "Country" },
    // { field: 'phone_1', title: "Phone 1" },
    // { field: 'phone_2', title: "Phone 2" },
    // { field: 'email', title: "Email" },
    // { field: 'subscription_date', title: "Subscription Date" },
    // { field: 'website', title: "Website" },
    // { field: 'customer_id', title: "Id", index: 2, visible: false },
  ];
  onDemandFunction?:any;
  agGridExtension?:AcDatagridOnAgGridExtension;
  treeTableExtension?:AcDatagridTreeTableExtension;

  constructor(private elementRef: ElementRef) {
    console.log(this);
    //
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.setOnDemandData();
    }, 1);
  }


  ngOnDestroy(): void {
    console.log("Datagrid Desrtoyed");
  }

  handleDatagridInit(){
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
    this.datagrid.datagridApi.showAddButton = true;
    this.treeTableExtension = this.datagrid.datagridApi.enableExtension({extensionName:AC_DATAGRID_EXTENSION_NAME.TreeTable}) as any;
    this.treeTableExtension.treeDataParentKey = 'parent_category_id';
    this.treeTableExtension.treeDataChildKey = 'category_id';
    this.treeTableExtension.treeDataDisplayKey = 'name';

    this.agGridExtension = this.datagrid.datagridApi.enableExtension({extensionName:AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME}) as any;
    console.log(this);

      this.setLocalData();
  }

  handleEdit(datagridRow:IAcDatagridRow){
    datagridRow.data['first_name'] = `Updated ${datagridRow.data['first_name']}`;
   console.log(datagridRow);
  }

  handleElementInit(event:any,datagridRow:IAcDatagridRow){
    // event.target.value = datagridRow.data['first_name'];
  }

  handleNameChange(datagridRow:IAcDatagridRow){
   console.log(datagridRow);
  }

  setLocalData() {
    const data: any[] = [];
    const multiplier = 1;
    let index: number = 0;
    for (let i = 0; i < multiplier; i++) {
      for (const row of productCategoriesData) {
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
      for (const row of productCategoriesData) {
        index++;
        data.push({ index: index, ...row })
      }
    }
    onDemandProxyDataManager.data = data;

    this.onDemandFunction = async (args: IAcOnDemandRequestArgs) => {
      console.log("Getting on demand data",args);
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
      // console.log(response);
      args.successCallback(response);
    };
  }

  handleDatagridRowUpdate(datagridRow:IAcDatagridRow){
    // const datagridApi = datagridRow;
    const data = {...datagridRow.data};
    data['index']++;
    this.datagrid.datagridApi.updateRow({data:data,rowId:datagridRow.rowId})
  }
}

/* eslint-disable @nx/enforce-module-boundaries */
import { AcDatagrid, AcDatagridApi, AcDatagridExtensionManager, AcDatagridRowSelectionExtension, AC_DATAGRID_EXTENSION_NAME, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AC_DATAGRID_EVENT, IAcDatagridCellRendererElementInitEvent, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcEnumDataSourceType, AcDatagridOnDemandDataSource, acInit } from '@autocode-ts/ac-browser';
import { AcDatagridOnAgGridExtension, AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME, AgGridOnAcDatagrid } from '@autocode-ts/ac-datagrid-on-ag-grid';
import { PageHeader } from '../../components/page-header/page-header.component';
import { ActionsDatagridColumn } from '../../components/actions-datagrid-column/actions-datagrid-column.component';
import { IAcOnDemandRequestArgs, IAcOnDemandResponseArgs } from '@autocode-ts/autocode';

export class AggridOnDemandData extends HTMLElement {
  datagrid!: AcDatagrid;
  datagridApi!: AcDatagridApi;
  pageHeader: PageHeader = new PageHeader();
  agGridExtension!: AcDatagridOnAgGridExtension;
  columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  dataExportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  dataSource!:AcDatagridOnDemandDataSource;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  rowNumbersExtension!: AcDatagridRowNumbersExtension;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;
  async connectedCallback() {
    const html = `
      <div id="aggridContainer" class="aggrid-container" style="height:calc(100vh - 60px);"></div>
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'AGGrid on AcDatagrid : On Demand Data';
    this.initDatagrid();
    acInit();
  }

  async initDatagrid() {
    const gridDiv = document.querySelector<HTMLElement>('#aggridContainer');
    if (gridDiv) {
      AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
      this.datagrid = new AcDatagrid();
      this.datagridApi = this.datagrid.datagridApi;
      this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.ColumnDragging }) as AcDatagridColumnDraggingExtension;
      this.columnsCustomizerExtension = this.datagridApi.enableExtension( {extensionName:AC_DATAGRID_EXTENSION_NAME.ColumnsCustomizer}) as AcDatagridColumnsCustomizerExtension;
      this.dataExportXlsxExtension = this.datagridApi.enableExtension( {extensionName:AC_DATAGRID_EXTENSION_NAME.DataExportXlsx}) as AcDatagridDataExportXlsxExtension;
      this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.RowNumbers }) as AcDatagridRowNumbersExtension;
      this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.RowSelection }) as AcDatagridRowSelectionExtension;
      this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.RowDragging }) as AcDatagridRowDraggingExtension;
      this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME }) as AcDatagridOnAgGridExtension;

      this.datagridApi.dataSourceType = AcEnumDataSourceType.OnDemand;
      this.dataSource = this.datagridApi.dataSource;
      this.dataSource.onDemandFunction = async (args:IAcOnDemandRequestArgs) =>{
        const pageSize: number = args.rowsCount!;
        const pageNumber: number = args.pageNumber!;
        const res = await fetch(`http://autocode.localhost/tests/ac-web/mvc-test/api/customers/get?page_size=${pageSize}&page_number=${pageNumber}`);
        if (res.ok) {
          const response = await res.json();
          const callbackResponse:IAcOnDemandResponseArgs  = {
            data:response.rows,
            totalCount:response.total_rows
          };
          args.successCallback(callbackResponse);
          this.datagridApi.data = response.rows;
        }
        return
      }
      this.datagridApi.usePagination = true;

      this.columnsCustomizerExtension.showColumnCustomizerPanel = true;

      this.rowNumbersExtension.showRowNumbers = true;

      this.rowSelectionExtension.allowSelection = true;
      this.rowSelectionExtension.allowMultipleSelection = true;

      // this.datagrid.init();

      this.getElementsByClassName("aggrid-container")[0].append(this.datagrid);
      this.datagridApi.columnDefinitions = [
        { field: 'action', title: "", allowSort: false, cellRendererElement:ActionsDatagridColumn,width:65},
        { field: 'customer_id', title: "Id" },
        { field: 'first_name', title: "First Name", allowEdit:true },
        { field: 'last_name', title: "Last Name" },
        { field: 'company', title: "Company" },
        { field: 'city', title: "City" },
        { field: 'country', title: "Country" },
        { field: 'phone_1', title: "Phone 1" },
        { field: 'phone_2', title: "Phone 2" },
        { field: 'email', title: "Email" },
        { field: 'subscription_date', title: "Subscription Date" },
        { field: 'website', title: "Website" },

      ];

      this.pageHeader.addMenuItem({
        label: 'Row Numbers',
        children: [
          {
            label: 'Show Row Numbers',
            callback: () => {
              this.rowNumbersExtension.showRowNumbers = true;
            }
          },
          {
            label: 'Hide Row Numbers',
            callback: () => {
              this.rowNumbersExtension.showRowNumbers = false;
              console.log(this.datagridApi);
            }
          },
        ]
      });
      this.pageHeader.addMenuItem({
        label: 'Customize & Export',
        children: [
          {
            label: 'Toggle Columns Customizer',
            callback: () => {
              this.columnsCustomizerExtension.toggleColumnsCustomizer();
            }
          },
          {
            label: 'Export XLSX',
            callback: () => {
              this.dataExportXlsxExtension.exportData({fileName:'Customer Data.xlsx'});
            }
          },
        ]
      });
      this.pageHeader.addMenuItem({
        label: 'Data & Selection',
        children: [
          {
            label: 'Goto First Row',
            callback: () => {
              this.datagridApi.focusFirstRow({highlightCells:true});
            }
          },
          {
            label: 'Goto Last Row',
            callback: () => {
              this.datagridApi.focusLastRow({highlightCells:true});
            }
          },
          {
            label: 'Clear Selection',
            callback: () => {
              this.rowSelectionExtension.clearSelection();
            }
          },
          {
            label: 'Select All Rows',
            callback: () => {
              this.rowSelectionExtension.setAllRowsSelection({ isSelected: true });
            }
          },
          {
            label: 'Get Selected Rows',
            callback: () => {
              console.log(this.rowSelectionExtension.getSelectedRows());
            }
          },
          {
            label: 'Get Selected Rows Data',
            callback: () => {
              console.log(this.rowSelectionExtension.getSelectedRowsData());
            }
          },

        ]
      });

      this.datagridApi.on({event:AC_DATAGRID_EVENT.CellRendererElementInit,callback:(args:IAcDatagridCellRendererElementInitEvent)=>{
        const instance = args.cellRendererElementInstance;
        if(instance instanceof ActionsDatagridColumn){
          instance.editButton.addEventListener('click',(event:any)=>{
            const updatedData:any = {...instance.datagridCell.datagridRow.data};
            updatedData['first_name'] = `Modified - ${updatedData['first_name']}`;
            this.datagridApi.updateRow({data:updatedData,rowId:instance.datagridCell.rowId});
            // this.datagridApi.addRow({data:updatedData});
          });
        }
      }});
      this.datagridApi.events.subscribeAllEvents({callback:(eventName:string,args:any)=>{
        // console.log(`Detected event : ${eventName}`,args);
        const identifiedEvents:any[] = [
          AC_DATAGRID_EVENT.CellClick,
          AC_DATAGRID_EVENT.CellDoubleClick,
          AC_DATAGRID_EVENT.CellEditingStart,
          AC_DATAGRID_EVENT.CellEditingStop,
          AC_DATAGRID_EVENT.CellFocus,
          AC_DATAGRID_EVENT.CellKeyDown,
          AC_DATAGRID_EVENT.CellMouseDown,
          AC_DATAGRID_EVENT.CellMouseLeave,
          AC_DATAGRID_EVENT.CellMouseOver,
          AC_DATAGRID_EVENT.CellRendererElementInit,
          AC_DATAGRID_EVENT.CellValueChange,

          AC_DATAGRID_EVENT.ColumnHeaderClick,

          AC_DATAGRID_EVENT.PaginationChange,

          AC_DATAGRID_EVENT.RowClick,
          AC_DATAGRID_EVENT.RowDoubleClick,

          AC_DATAGRID_EVENT.SortOrderChange
        ];
        if(!identifiedEvents.includes(eventName)){
          console.log(`Found event : ${eventName}`,args);
        }
      }});

    }
  }
}

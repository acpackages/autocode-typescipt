/* eslint-disable @nx/enforce-module-boundaries */
import { AcDatagridElement, AcDatagridApi, AcDatagridExtensionManager, AcDatagridRowSelectionExtension, AcEnumDatagridExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcEnumDatagridEvent, IAcDatagridCellRendererElementInitEvent, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcEnumDataSourceType, AcDatagridOnDemandDataSource, IAcDatagridOnDemandRequestArgs, IAcDatagridOnDemandResponseArgs } from '@autocode-ts/ac-browser';
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName, AgGridOnAcDatagrid } from '@autocode-ts/ag-datagrid-on-ag-grid';
import { PageHeader } from '../../components/page-header/page-header.component';
import { ActionsDatagridColumn } from '../../components/actions-datagrid-column/actions-datagrid-column.component';

export class AggridOnDemandData extends HTMLElement {
  datagrid!: AcDatagridElement;
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
    this.pageHeader.pageTitle = 'AGGrid on AcDatagridElement : On Demand Data';
    this.initDatagrid();
  }

  async initDatagrid() {
    const gridDiv = document.querySelector<HTMLElement>('#aggridContainer');
    if (gridDiv) {
      AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
      this.datagrid = new AcDatagridElement();
      this.datagridApi = this.datagrid.datagridApi;
      this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
      this.columnsCustomizerExtension = this.datagridApi.enableExtension( {extensionName:AcEnumDatagridExtension.ColumnsCustomizer}) as AcDatagridColumnsCustomizerExtension;
      this.dataExportXlsxExtension = this.datagridApi.enableExtension( {extensionName:AcEnumDatagridExtension.DataExportXlsx}) as AcDatagridDataExportXlsxExtension;
      this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
      this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
      this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
      this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension;

      this.datagridApi.dataSourceType = AcEnumDataSourceType.OnDemand;
      this.dataSource = this.datagridApi.dataSource;
      this.dataSource.onDemandFunction = async (args:IAcDatagridOnDemandRequestArgs) =>{
        const pageSize: number = args.rowsCount;
        const pageNumber: number = (args.startIndex / pageSize) + 1;
        const res = await fetch(`http://autocode.localhost/tests/ac-web/mvc-test/api/customers/get?page_size=${pageSize}&page_number=${pageNumber}`);
        if (res.ok) {
          const response = await res.json();
          const callbackResponse:IAcDatagridOnDemandResponseArgs  = {
            data:response.rows,
            totalCount:1000
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

      this.getElementsByClassName("aggrid-container")[0].append(this.datagrid.element);
      this.datagridApi.colDefs = [
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

      this.datagridApi.on({eventName:AcEnumDatagridEvent.CellRendererElementInit,callback:(args:IAcDatagridCellRendererElementInitEvent)=>{
        const instance = args.cellRendererElementInstance;
        if(instance instanceof ActionsDatagridColumn){
          instance.editButton.addEventListener('click',(event:any)=>{
            const updatedData:any = {...instance.datagridCell.datagridRow.data};
            updatedData['first_name'] = `Modified - ${updatedData['first_name']}`;
            this.datagridApi.updateRow({data:updatedData,rowId:instance.datagridCell.acRowId});
            // this.datagridApi.addRow({data:updatedData});
          });
        }
      }});
      this.datagridApi.events.subscribeAllEvents({callback:(eventName:string,args:any)=>{
        const skipEvents:any[] = [
          AcEnumDatagridEvent.CellRendererElementInit
        ];
        if(!skipEvents.includes(eventName)){
          console.log(`Found event : ${eventName}`,args);
        }
      }});

    }
  }
}

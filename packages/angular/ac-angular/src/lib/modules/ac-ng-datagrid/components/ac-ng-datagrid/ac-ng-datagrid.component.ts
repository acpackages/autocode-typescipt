/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { ApplicationRef, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, AcEnumDatagridHook, IAcDatagridColumnDefinition } from '@autocode-ts/ac-browser';
import { AcDataManager, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { AcNgDatagridCellEditor } from '../../elements/ac-ng-datagrid-cell-editor.element';
import { AcNgDatagridCellRenderer } from '../../elements/ac-ng-datagrid-cell-renderer.element';

@Component({
  selector: 'ac-ng-datagrid',
  templateUrl: './ac-ng-datagrid.component.html',
  styleUrl: './ac-ng-datagrid.component.scss',
  standalone: false
})
export class AcNgDatagridComponent implements OnInit {
  @ViewChild('acDatagrid') acDatagridRef: ElementRef<AcDatagrid>;
  @Input() columnDefinitions:IAcDatagridColumnDefinition[] = [];
  @Input() columnEditorTemplates:Record<string,TemplateRef<any>> = {};
  @Input() columnRendererTemplates:Record<string,TemplateRef<any>> = {};
  @Input() data?: any[];
  @Input() onDemandFunction?: ((args: IAcOnDemandRequestArgs) => void) | any;
  @Input() usePagination: boolean = true;

  @Output() onCellRendererElementInit: EventEmitter<any> = new EventEmitter();
  addNewButton: HTMLElement = document.createElement('button');
  datagrid:AcDatagrid;
  datagridApi!: AcDatagridApi;

  // agGridExtension!: AcDatagridOnAgGridExtension;
  columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  dataExportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  dataManager!: AcDataManager;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  rowNumbersExtension!: AcDatagridRowNumbersExtension;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;

  constructor(private elementRef: ElementRef,private appRef: ApplicationRef,private injector:Injector) {
    console.log(this);
  }

  ngOnInit(): void {
    this.initDatagrid();
  }

  private initDatagrid() {
    if (this.acDatagridRef) {
      this.datagrid = this.acDatagridRef.nativeElement;
      this.datagridApi = this.datagrid.datagridApi;
      this.dataManager = this.datagridApi.dataManager;
      this.setColumnDefinitions();
      this.datagridApi.usePagination = this.usePagination;
      if(this.data){
        this.dataManager.data = this.data;
      }
      if(this.onDemandFunction){
        this.dataManager.onDemandFunction = this.onDemandFunction;
      }


      this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
      this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
      this.dataExportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
      this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
      this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
      this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
      // this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension|any;
      // this.agGridExtension.logger.logMessages = false;
      this.columnsCustomizerExtension.showColumnCustomizerPanel = true;
      this.datagridApi.on({
        event: AcEnumDatagridEvent.CellRendererElementInit, callback: (args: any) => {
          this.onCellRendererElementInit.emit(args);
        }
      });
    }
    else {
      setTimeout(() => {
        this.initDatagrid();
      }, 10);
    }
  }

  private setColumnDefinitions(){
    const columns:IAcDatagridColumnDefinition[] = [];
    for(const colDef of this.columnDefinitions){
      if(this.columnRendererTemplates[colDef.field]){
        colDef.cellRendererTemplateRef = this.columnRendererTemplates[colDef.field];
      }
      if(colDef.cellRendererTemplateRef || colDef.cellRendererComponent){
        colDef.cellRendererElement = AcNgDatagridCellRenderer;
        if(!colDef.cellRendererElementParams){
          colDef.cellRendererElementParams = {};
        }
       colDef.cellRendererElementParams['___appRef___'] = this.appRef;
       colDef.cellRendererElementParams['___injector___'] = this.injector;
      }
      if(this.columnEditorTemplates[colDef.field]){
        colDef.cellEditorTemplateRef = this.columnEditorTemplates[colDef.field];
      }
      if(colDef.cellEditorTemplateRef || colDef.cellEditorComponent){
        colDef.cellEditorElement = AcNgDatagridCellEditor;
         if(!colDef.cellEditorElementParams){
          colDef.cellEditorElementParams = {};
        }
       colDef.cellEditorElementParams['___appRef___'] = this.appRef;
       colDef.cellEditorElementParams['___injector___'] = this.injector;
      }
      columns.push(colDef);
    }
    this.datagridApi.columnDefinitions = columns;

  }
}

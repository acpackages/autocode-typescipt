/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { ApplicationRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, IAcDatagridColumnDefinition } from '@autocode-ts/ac-browser';
import { AcRuntimeService } from '@autocode-ts/ac-ng-runtime';
import { AcNgDatagridCellEditor } from '../../elements/ac-ng-datagrid-cell-editor.element';
import { AcNgDatagridCellRenderer } from '../../elements/ac-ng-datagrid-cell-renderer.element';
import { AcDataManager, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { IAcNgDatagridColumnDefinition } from '../../interfaces/ac-datagrid-column-definition.interface';

@Component({
  selector: 'ac-ng-datagrid',
  templateUrl: './ac-ng-datagrid.component.html',
  styleUrl: './ac-ng-datagrid.component.scss',
  standalone: false,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AcNgDatagridComponent implements OnInit {
  @ViewChild('acDatagrid') acDatagridRef: ElementRef<AcDatagrid>;
  @Input() datagridClass: string = '';
  @Input() columnDefinitions: IAcNgDatagridColumnDefinition[] = [];
  @Input() columnEditorTemplates: Record<string, TemplateRef<any>> = {};
  @Input() columnRendererTemplates: Record<string, TemplateRef<any>> = {};
  @Input() data?: any[];
  @Input() onDemandFunction?: ((args: IAcOnDemandRequestArgs) => void) | any;
  @Input() usePagination: boolean = true;

  @Output() onActiveRowChange: EventEmitter<any> = new EventEmitter();
  @Output() onCellBlur: EventEmitter<any> = new EventEmitter();
  @Output() onCellClick: EventEmitter<any> = new EventEmitter();
  @Output() onCellDoubleClick: EventEmitter<any> = new EventEmitter();
  @Output() onCellDrag: EventEmitter<any> = new EventEmitter();
  @Output() onCellDragEnd: EventEmitter<any> = new EventEmitter();
  @Output() onCellDragEnter: EventEmitter<any> = new EventEmitter();
  @Output() onCellDragLeave: EventEmitter<any> = new EventEmitter();
  @Output() onCellDragOver: EventEmitter<any> = new EventEmitter();
  @Output() onCellDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onCellDragDrop: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorElementInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditingStart: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditingStop: EventEmitter<any> = new EventEmitter();
  @Output() onCellFocus: EventEmitter<any> = new EventEmitter();
  @Output() onCellHover: EventEmitter<any> = new EventEmitter();
  @Output() onCellKeyDown: EventEmitter<any> = new EventEmitter();
  @Output() onCellKeyPress: EventEmitter<any> = new EventEmitter();
  @Output() onCellKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseLeave: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseMove: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseOver: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseUp: EventEmitter<any> = new EventEmitter();
  @Output() onCellRendererElementInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellTouchCancel: EventEmitter<any> = new EventEmitter();
  @Output() onCellTouchEnd: EventEmitter<any> = new EventEmitter();
  @Output() onCellTouchMove: EventEmitter<any> = new EventEmitter();
  @Output() onCellTouchStart: EventEmitter<any> = new EventEmitter();
  @Output() onCellValueChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDefinitionsSet: EventEmitter<any> = new EventEmitter();
  @Output() onColumnBlur: EventEmitter<any> = new EventEmitter();
  @Output() onColumnClick: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDataChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDoubleClick: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDragEnd: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDragEnter: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDragLeave: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDragOver: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onColumnDragDrop: EventEmitter<any> = new EventEmitter();
  @Output() onColumnFilterChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnFocus: EventEmitter<any> = new EventEmitter();
  @Output() onColumnHeaderClick: EventEmitter<any> = new EventEmitter();
  @Output() onColumnHover: EventEmitter<any> = new EventEmitter();
  @Output() onColumnKeyDown: EventEmitter<any> = new EventEmitter();
  @Output() onColumnKeyPress: EventEmitter<any> = new EventEmitter();
  @Output() onColumnKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMouseLeave: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMouseMove: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMouseOver: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMouseUp: EventEmitter<any> = new EventEmitter();
  @Output() onColumnResize: EventEmitter<any> = new EventEmitter();
  @Output() onColumnSortChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnTouchCancel: EventEmitter<any> = new EventEmitter();
  @Output() onColumnTouchEnd: EventEmitter<any> = new EventEmitter();
  @Output() onColumnTouchMove: EventEmitter<any> = new EventEmitter();
  @Output() onColumnTouchStart: EventEmitter<any> = new EventEmitter();
  @Output() onColumnPositionChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnVisibilityChange: EventEmitter<any> = new EventEmitter();
  @Output() onDisplayedRowsChange: EventEmitter<any> = new EventEmitter();
  @Output() onPaginationChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRowBlur: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowDataChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowDelete: EventEmitter<any> = new EventEmitter();
  @Output() onRowDoubleClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowDrag: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragCancel: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragDrop: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragEnd: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragEnter: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragLeave: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragOver: EventEmitter<any> = new EventEmitter();
  @Output() onRowDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onRowEditingStart: EventEmitter<any> = new EventEmitter();
  @Output() onRowEditingStop: EventEmitter<any> = new EventEmitter();
  @Output() onRowFocus: EventEmitter<any> = new EventEmitter();
  @Output() onRowHover: EventEmitter<any> = new EventEmitter();
  @Output() onRowKeyDown: EventEmitter<any> = new EventEmitter();
  @Output() onRowKeyPress: EventEmitter<any> = new EventEmitter();
  @Output() onRowKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() onRowMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() onRowMouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() onRowMouseLeave: EventEmitter<any> = new EventEmitter();
  @Output() onRowMouseMove: EventEmitter<any> = new EventEmitter();
  @Output() onRowMouseOver: EventEmitter<any> = new EventEmitter();
  @Output() onRowMouseUp: EventEmitter<any> = new EventEmitter();
  @Output() onRowPositionChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelectionChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowTouchCancel: EventEmitter<any> = new EventEmitter();
  @Output() onRowTouchEnd: EventEmitter<any> = new EventEmitter();
  @Output() onRowTouchMove: EventEmitter<any> = new EventEmitter();
  @Output() onRowTouchStart: EventEmitter<any> = new EventEmitter();
  @Output() onRowUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onStateChange: EventEmitter<any> = new EventEmitter();
  @Output() onSortOrderChange: EventEmitter<any> = new EventEmitter();
  @Output() onTotalRowsChange: EventEmitter<any> = new EventEmitter();
  @Output() onDatagridInit: EventEmitter<any> = new EventEmitter();

  addNewButton: HTMLElement = document.createElement('button');
  datagrid: AcDatagrid;
  datagridApi!: AcDatagridApi;

  columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  dataExportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  dataManager!: AcDataManager;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  rowNumbersExtension!: AcDatagridRowNumbersExtension;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;

  constructor(private runtimeService: AcRuntimeService, private appRef: ApplicationRef ) {
  }

  ngOnInit(): void {
    this.initDatagrid();
  }

  private async initDatagrid() {
    if (this.acDatagridRef) {
      this.datagrid = this.acDatagridRef.nativeElement;
      this.datagridApi = this.datagrid.datagridApi;
      this.dataManager = this.datagridApi.dataManager;
      if (this.datagridClass) {
        acAddClassToElement({ class_: this.datagridClass, element: this.datagrid });
      }
      this.setColumnDefinitions();
      this.datagridApi.usePagination = this.usePagination;
      this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
      this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
      this.dataExportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
      this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
      this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
      this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
      this.columnsCustomizerExtension.showColumnCustomizerPanel = true;
      this.registerListeners();
      this.datagridApi.on({
        event: AcEnumDatagridEvent.CellRendererElementInit, callback: (args: any) => {
          this.onCellRendererElementInit.emit(args);
        }
      });
      if (this.data) {
        this.dataManager.data = this.data;
      }
      if (this.onDemandFunction) {
        this.dataManager.onDemandFunction = this.onDemandFunction;
      }
      this.onDatagridInit.emit();
    }
    else {
      setTimeout(() => {
        this.initDatagrid();
      }, 10);
    }
  }

  private registerListeners(){
    this.datagridApi.on({event:AcEnumDatagridEvent.ActiveRowChange,callback:(args:any)=>{
      this.onActiveRowChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellBlur,callback:(args:any)=>{
      this.onCellBlur.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellClick,callback:(args:any)=>{
      this.onCellClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDoubleClick,callback:(args:any)=>{
      this.onCellDoubleClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDrag,callback:(args:any)=>{
      this.onCellDrag.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDragEnd,callback:(args:any)=>{
      this.onCellDragEnd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDragEnter,callback:(args:any)=>{
      this.onCellDragEnter.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDragLeave,callback:(args:any)=>{
      this.onCellDragLeave.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDragOver,callback:(args:any)=>{
      this.onCellDragOver.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDragStart,callback:(args:any)=>{
      this.onCellDragStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellDragDrop,callback:(args:any)=>{
      this.onCellDragDrop.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellEditorElementInit,callback:(args:any)=>{
      this.onCellEditorElementInit.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellEditingStart,callback:(args:any)=>{
      this.onCellEditingStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellEditingStop,callback:(args:any)=>{
      this.onCellEditingStop.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellFocus,callback:(args:any)=>{
      this.onCellFocus.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellHover,callback:(args:any)=>{
      this.onCellHover.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellKeyDown,callback:(args:any)=>{
      this.onCellKeyDown.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellKeyPress,callback:(args:any)=>{
      this.onCellKeyPress.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellKeyUp,callback:(args:any)=>{
      this.onCellKeyUp.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellMouseDown,callback:(args:any)=>{
      this.onCellMouseDown.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellMouseEnter,callback:(args:any)=>{
      this.onCellMouseEnter.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellMouseLeave,callback:(args:any)=>{
      this.onCellMouseLeave.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellMouseMove,callback:(args:any)=>{
      this.onCellMouseMove.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellMouseOver,callback:(args:any)=>{
      this.onCellMouseOver.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellMouseUp,callback:(args:any)=>{
      this.onCellMouseUp.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellTouchCancel,callback:(args:any)=>{
      this.onCellTouchCancel.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellTouchEnd,callback:(args:any)=>{
      this.onCellTouchEnd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellTouchMove,callback:(args:any)=>{
      this.onCellTouchMove.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellTouchStart,callback:(args:any)=>{
      this.onCellTouchStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.CellValueChange,callback:(args:any)=>{
      this.onCellValueChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDefinitionsSet,callback:(args:any)=>{
      this.onColumnDefinitionsSet.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnBlur,callback:(args:any)=>{
      this.onColumnBlur.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnClick,callback:(args:any)=>{
      this.onColumnClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDataChange,callback:(args:any)=>{
      this.onColumnDataChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDoubleClick,callback:(args:any)=>{
      this.onColumnDoubleClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDragEnd,callback:(args:any)=>{
      this.onColumnDragEnd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDragEnter,callback:(args:any)=>{
      this.onColumnDragEnter.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDragLeave,callback:(args:any)=>{
      this.onColumnDragLeave.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDragOver,callback:(args:any)=>{
      this.onColumnDragOver.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDragStart,callback:(args:any)=>{
      this.onColumnDragStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnDragDrop,callback:(args:any)=>{
      this.onColumnDragDrop.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnFilterChange,callback:(args:any)=>{
      this.onColumnFilterChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnFocus,callback:(args:any)=>{
      this.onColumnFocus.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnHeaderClick,callback:(args:any)=>{
      this.onColumnHeaderClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnHover,callback:(args:any)=>{
      this.onColumnHover.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnKeyDown,callback:(args:any)=>{
      this.onColumnKeyDown.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnKeyPress,callback:(args:any)=>{
      this.onColumnKeyPress.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnKeyUp,callback:(args:any)=>{
      this.onColumnKeyUp.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnMouseDown,callback:(args:any)=>{
      this.onColumnMouseDown.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnMouseEnter,callback:(args:any)=>{
      this.onColumnMouseEnter.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnMouseLeave,callback:(args:any)=>{
      this.onColumnMouseLeave.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnMouseMove,callback:(args:any)=>{
      this.onColumnMouseMove.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnMouseOver,callback:(args:any)=>{
      this.onColumnMouseOver.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnMouseUp,callback:(args:any)=>{
      this.onColumnMouseUp.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnResize,callback:(args:any)=>{
      this.onColumnResize.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnSortChange,callback:(args:any)=>{
      this.onColumnSortChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnTouchCancel,callback:(args:any)=>{
      this.onColumnTouchCancel.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnTouchEnd,callback:(args:any)=>{
      this.onColumnTouchEnd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnTouchMove,callback:(args:any)=>{
      this.onColumnTouchMove.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnTouchStart,callback:(args:any)=>{
      this.onColumnTouchStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnPositionChange,callback:(args:any)=>{
      this.onColumnPositionChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.ColumnVisibilityChange,callback:(args:any)=>{
      this.onColumnVisibilityChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.DisplayedRowsChange,callback:(args:any)=>{
      this.onDisplayedRowsChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.PaginationChange,callback:(args:any)=>{
      this.onPaginationChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowAdd,callback:(args:any)=>{
      this.onRowAdd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowBlur,callback:(args:any)=>{
      this.onRowBlur.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowClick,callback:(args:any)=>{
      this.onRowClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDataChange,callback:(args:any)=>{
      this.onRowDataChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDelete,callback:(args:any)=>{
      this.onRowDelete.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDoubleClick,callback:(args:any)=>{
      this.onRowDoubleClick.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDrag,callback:(args:any)=>{
      this.onRowDrag.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragCancel,callback:(args:any)=>{
      this.onRowDragCancel.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragDrop,callback:(args:any)=>{
      this.onRowDragDrop.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragEnd,callback:(args:any)=>{
      this.onRowDragEnd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragEnter,callback:(args:any)=>{
      this.onRowDragEnter.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragLeave,callback:(args:any)=>{
      this.onRowDragLeave.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragOver,callback:(args:any)=>{
      this.onRowDragOver.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDragStart,callback:(args:any)=>{
      this.onRowDragStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowEditingStart,callback:(args:any)=>{
      this.onRowEditingStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowEditingStop,callback:(args:any)=>{
      this.onRowEditingStop.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowFocus,callback:(args:any)=>{
      this.onRowFocus.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowHover,callback:(args:any)=>{
      this.onRowHover.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowKeyDown,callback:(args:any)=>{
      this.onRowKeyDown.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowKeyPress,callback:(args:any)=>{
      this.onRowKeyPress.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowKeyUp,callback:(args:any)=>{
      this.onRowKeyUp.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowMouseDown,callback:(args:any)=>{
      this.onRowMouseDown.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowMouseEnter,callback:(args:any)=>{
      this.onRowMouseEnter.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowMouseLeave,callback:(args:any)=>{
      this.onRowMouseLeave.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowMouseMove,callback:(args:any)=>{
      this.onRowMouseMove.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowMouseOver,callback:(args:any)=>{
      this.onRowMouseOver.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowMouseUp,callback:(args:any)=>{
      this.onRowMouseUp.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowPositionChange,callback:(args:any)=>{
      this.onRowPositionChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowSelectionChange,callback:(args:any)=>{
      this.onRowSelectionChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowTouchCancel,callback:(args:any)=>{
      this.onRowTouchCancel.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowTouchEnd,callback:(args:any)=>{
      this.onRowTouchEnd.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowTouchMove,callback:(args:any)=>{
      this.onRowTouchMove.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowTouchStart,callback:(args:any)=>{
      this.onRowTouchStart.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.RowUpdate,callback:(args:any)=>{
      this.onRowUpdate.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.StateChange,callback:(args:any)=>{
      this.onStateChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.SortOrderChange,callback:(args:any)=>{
      this.onSortOrderChange.emit(args);
    }});
    this.datagridApi.on({event:AcEnumDatagridEvent.TotalRowsChange,callback:(args:any)=>{
      this.onTotalRowsChange.emit(args);
    }});
  }

  private setColumnDefinitions() {
    const columns: IAcDatagridColumnDefinition[] = [];
    for (const colDef of this.columnDefinitions) {
      if (this.columnRendererTemplates[colDef.field]) {
        colDef.cellRendererTemplateRef = this.columnRendererTemplates[colDef.field];
      }
      if (colDef.cellRendererTemplateRef || colDef.cellRendererComponent) {
        colDef.cellRendererElement = AcNgDatagridCellRenderer;
        if (!colDef.cellRendererElementParams) {
          colDef.cellRendererElementParams = {};
        }
        colDef.cellRendererElementParams['___appRef___'] = this.appRef;
        colDef.cellRendererElementParams['___runtimeService___'] = this.runtimeService;
      }
      if (this.columnEditorTemplates[colDef.field]) {
        colDef.cellEditorTemplateRef = this.columnEditorTemplates[colDef.field];
      }
      if (colDef.cellEditorTemplateRef || colDef.cellEditorComponent) {
        colDef.cellEditorElement = AcNgDatagridCellEditor;
        if (!colDef.cellEditorElementParams) {
          colDef.cellEditorElementParams = {};
        }
        colDef.cellEditorElementParams['___appRef___'] = this.appRef;
        colDef.cellEditorElementParams['___runtimeService___'] = this.runtimeService;
      }
      columns.push(colDef);
    }
    this.datagridApi.columnDefinitions = columns;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { ApplicationRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AC_DATAGRID_EVENT, AC_DATAGRID_EXTENSION_NAME, IAcDatagridColumnDefinition } from '@autocode-ts/ac-browser';
import { AcRuntimeService } from '@autocode-ts/ac-ng-runtime';
import { AC_DATA_MANAGER_EVENT, AcDataManager, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { IAcNgDatagridColumnDefinition } from '../../interfaces/ac-datagrid-column-definition.interface';
import { AcNgDatagridCellRenderer } from '../../elements/ac-ng-datagrid-cell-renderer.element';
import { AcNgDatagridCellEditor } from '../../elements/ac-ng-datagrid-cell-editor.element';

@Component({ selector: '', template: '' })
export class AcNgDatagridEvents {
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

  protected registerListeners(datagridApi: AcDatagridApi) {
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ActiveRowChange, callback: (args: any) => {
        this.onActiveRowChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellBlur, callback: (args: any) => {
        this.onCellBlur.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellClick, callback: (args: any) => {
        this.onCellClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDoubleClick, callback: (args: any) => {
        this.onCellDoubleClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDrag, callback: (args: any) => {
        this.onCellDrag.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDragEnd, callback: (args: any) => {
        this.onCellDragEnd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDragEnter, callback: (args: any) => {
        this.onCellDragEnter.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDragLeave, callback: (args: any) => {
        this.onCellDragLeave.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDragOver, callback: (args: any) => {
        this.onCellDragOver.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDragStart, callback: (args: any) => {
        this.onCellDragStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellDragDrop, callback: (args: any) => {
        this.onCellDragDrop.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellEditorElementInit, callback: (args: any) => {
        this.onCellEditorElementInit.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellEditingStart, callback: (args: any) => {
        this.onCellEditingStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellEditingStop, callback: (args: any) => {
        this.onCellEditingStop.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellFocus, callback: (args: any) => {
        this.onCellFocus.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellHover, callback: (args: any) => {
        this.onCellHover.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellKeyDown, callback: (args: any) => {
        this.onCellKeyDown.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellKeyPress, callback: (args: any) => {
        this.onCellKeyPress.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellKeyUp, callback: (args: any) => {
        this.onCellKeyUp.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellMouseDown, callback: (args: any) => {
        this.onCellMouseDown.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellMouseEnter, callback: (args: any) => {
        this.onCellMouseEnter.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellMouseLeave, callback: (args: any) => {
        this.onCellMouseLeave.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellMouseMove, callback: (args: any) => {
        this.onCellMouseMove.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellMouseOver, callback: (args: any) => {
        this.onCellMouseOver.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellMouseUp, callback: (args: any) => {
        this.onCellMouseUp.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellTouchCancel, callback: (args: any) => {
        this.onCellTouchCancel.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellTouchEnd, callback: (args: any) => {
        this.onCellTouchEnd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellTouchMove, callback: (args: any) => {
        this.onCellTouchMove.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellTouchStart, callback: (args: any) => {
        this.onCellTouchStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.CellValueChange, callback: (args: any) => {
        this.onCellValueChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDefinitionsSet, callback: (args: any) => {
        this.onColumnDefinitionsSet.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnBlur, callback: (args: any) => {
        this.onColumnBlur.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnClick, callback: (args: any) => {
        this.onColumnClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDataChange, callback: (args: any) => {
        this.onColumnDataChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDoubleClick, callback: (args: any) => {
        this.onColumnDoubleClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDragEnd, callback: (args: any) => {
        this.onColumnDragEnd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDragEnter, callback: (args: any) => {
        this.onColumnDragEnter.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDragLeave, callback: (args: any) => {
        this.onColumnDragLeave.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDragOver, callback: (args: any) => {
        this.onColumnDragOver.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDragStart, callback: (args: any) => {
        this.onColumnDragStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnDragDrop, callback: (args: any) => {
        this.onColumnDragDrop.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnFilterChange, callback: (args: any) => {
        this.onColumnFilterChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnFocus, callback: (args: any) => {
        this.onColumnFocus.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnHeaderClick, callback: (args: any) => {
        this.onColumnHeaderClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnHover, callback: (args: any) => {
        this.onColumnHover.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnKeyDown, callback: (args: any) => {
        this.onColumnKeyDown.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnKeyPress, callback: (args: any) => {
        this.onColumnKeyPress.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnKeyUp, callback: (args: any) => {
        this.onColumnKeyUp.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnMouseDown, callback: (args: any) => {
        this.onColumnMouseDown.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnMouseEnter, callback: (args: any) => {
        this.onColumnMouseEnter.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnMouseLeave, callback: (args: any) => {
        this.onColumnMouseLeave.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnMouseMove, callback: (args: any) => {
        this.onColumnMouseMove.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnMouseOver, callback: (args: any) => {
        this.onColumnMouseOver.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnMouseUp, callback: (args: any) => {
        this.onColumnMouseUp.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnResize, callback: (args: any) => {
        this.onColumnResize.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnSortChange, callback: (args: any) => {
        this.onColumnSortChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnTouchCancel, callback: (args: any) => {
        this.onColumnTouchCancel.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnTouchEnd, callback: (args: any) => {
        this.onColumnTouchEnd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnTouchMove, callback: (args: any) => {
        this.onColumnTouchMove.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnTouchStart, callback: (args: any) => {
        this.onColumnTouchStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnPositionChange, callback: (args: any) => {
        this.onColumnPositionChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.ColumnVisibilityChange, callback: (args: any) => {
        this.onColumnVisibilityChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.DisplayedRowsChange, callback: (args: any) => {
        this.onDisplayedRowsChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.PaginationChange, callback: (args: any) => {
        this.onPaginationChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATA_MANAGER_EVENT.RowAdd, callback: (args: any) => {
        this.onRowAdd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowBlur, callback: (args: any) => {
        this.onRowBlur.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowClick, callback: (args: any) => {
        this.onRowClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDataChange, callback: (args: any) => {
        this.onRowDataChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDelete, callback: (args: any) => {
        this.onRowDelete.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDoubleClick, callback: (args: any) => {
        this.onRowDoubleClick.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDrag, callback: (args: any) => {
        this.onRowDrag.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragCancel, callback: (args: any) => {
        this.onRowDragCancel.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragDrop, callback: (args: any) => {
        this.onRowDragDrop.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragEnd, callback: (args: any) => {
        this.onRowDragEnd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragEnter, callback: (args: any) => {
        this.onRowDragEnter.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragLeave, callback: (args: any) => {
        this.onRowDragLeave.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragOver, callback: (args: any) => {
        this.onRowDragOver.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowDragStart, callback: (args: any) => {
        this.onRowDragStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowEditingStart, callback: (args: any) => {
        this.onRowEditingStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowEditingStop, callback: (args: any) => {
        this.onRowEditingStop.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowFocus, callback: (args: any) => {
        this.onRowFocus.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowHover, callback: (args: any) => {
        this.onRowHover.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowKeyDown, callback: (args: any) => {
        this.onRowKeyDown.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowKeyPress, callback: (args: any) => {
        this.onRowKeyPress.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowKeyUp, callback: (args: any) => {
        this.onRowKeyUp.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowMouseDown, callback: (args: any) => {
        this.onRowMouseDown.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowMouseEnter, callback: (args: any) => {
        this.onRowMouseEnter.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowMouseLeave, callback: (args: any) => {
        this.onRowMouseLeave.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowMouseMove, callback: (args: any) => {
        this.onRowMouseMove.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowMouseOver, callback: (args: any) => {
        this.onRowMouseOver.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowMouseUp, callback: (args: any) => {
        this.onRowMouseUp.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowPositionChange, callback: (args: any) => {
        this.onRowPositionChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowSelectionChange, callback: (args: any) => {
        this.onRowSelectionChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowTouchCancel, callback: (args: any) => {
        this.onRowTouchCancel.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowTouchEnd, callback: (args: any) => {
        this.onRowTouchEnd.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowTouchMove, callback: (args: any) => {
        this.onRowTouchMove.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowTouchStart, callback: (args: any) => {
        this.onRowTouchStart.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.RowUpdate, callback: (args: any) => {
        this.onRowUpdate.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.StateChange, callback: (args: any) => {
        this.onStateChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.SortOrderChange, callback: (args: any) => {
        this.onSortOrderChange.emit(args);
      }
    });
    datagridApi.on({
      event: AC_DATAGRID_EVENT.TotalRowsChange, callback: (args: any) => {
        this.onTotalRowsChange.emit(args);
      }
    });
  }
}

@Component({
  selector: 'ac-ng-datagrid',
  templateUrl: './ac-ng-datagrid.component.html',
  styleUrl: './ac-ng-datagrid.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcNgDatagridComponent extends AcNgDatagridEvents implements OnChanges, OnDestroy, OnInit {
  @ViewChild('acDatagrid') acDatagridRef: ElementRef<AcDatagrid>;
  @Input() datagridClass: string = '';
  @Input() columnDefinitions: IAcNgDatagridColumnDefinition[] = [];
  @Input() columnEditorTemplates: Record<string, TemplateRef<any>> = {};
  @Input() columnRendererTemplates: Record<string, TemplateRef<any>> = {};
  @Input() data?: any[];
  @Input() flexColumn: string = '';
  @Input() headerHeight: number = 30;
  @Input() rowHeight: number = 30;
  @Input() onDemandFunction?: ((args: IAcOnDemandRequestArgs) => void) | any;
  @Input() showAddButton: boolean = false;
  @Input() showSearchInput: boolean = true;
  @Input() usePagination: boolean = true;

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

  constructor(private runtimeService: AcRuntimeService, private appRef: ApplicationRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.datagrid && this.datagridApi) {
      if (changes['rowHeight']) {
        this.datagridApi.rowHeight = this.rowHeight;
      }
      else if (changes['headerHeight']) {
        this.datagridApi.headerHeight = this.headerHeight;
      }
      else if (changes['onDemandFunction']) {
        this.dataManager.onDemandFunction = this.onDemandFunction;
      }
      else if (changes['data']) {
        this.dataManager.data = this.data;
      }
      else if (changes['columnDefinitions'] || changes['columnEditorTemplates'] || changes['columnRendererTemplates'] || changes['flexColumn']) {
        this.setColumnDefinitions();
      }
      else if (changes['usePagination']) {
        this.datagridApi.usePagination = this.usePagination;
      }
      else if (changes['showAddButton']) {
        this.datagridApi.showAddButton = this.showAddButton;
      }
      else if (changes['showSearchInput']) {
        this.datagridApi.showSearchInput = this.showSearchInput;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.datagrid) {
      this.datagrid.destroy();
      this.dataManager = null;
      this.datagridApi = null;
    }
  }

  ngOnInit(): void {
    this.initDatagrid();
  }

  private async initDatagrid() {
    if (this.acDatagridRef) {
      this.datagrid = this.acDatagridRef.nativeElement;
      this.datagridApi = this.datagrid.datagridApi;
      this.dataManager = this.datagridApi.dataManager;

      this.datagridApi.usePagination = this.usePagination;
      this.datagridApi.headerHeight = this.headerHeight;
      this.datagridApi.rowHeight = this.rowHeight;
      this.datagridApi.showAddButton = this.showAddButton;
      this.datagridApi.showSearchInput = this.showSearchInput;


      if (this.datagridClass) {
        acAddClassToElement({ class_: this.datagridClass, element: this.datagrid });
      }
      this.setColumnDefinitions();

      this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.ColumnDragging }) as AcDatagridColumnDraggingExtension;
      this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
      this.dataExportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
      this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.RowNumbers }) as AcDatagridRowNumbersExtension;
      this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.RowSelection }) as AcDatagridRowSelectionExtension;
      this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_EXTENSION_NAME.RowDragging }) as AcDatagridRowDraggingExtension;
      this.columnsCustomizerExtension.showColumnCustomizerPanel = true;
      this.registerListeners(this.datagridApi);
      this.datagridApi.on({
        event: AC_DATAGRID_EVENT.CellRendererElementInit, callback: (args: any) => {
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

  private setColumnDefinitions() {
    const columns: IAcDatagridColumnDefinition[] = [];
    for (const colDef of this.columnDefinitions) {
       if (this.columnRendererTemplates[colDef.field]) {
        colDef.cellRendererTemplateRef = this.columnRendererTemplates[colDef.field];
      }
      if (this.columnEditorTemplates[colDef.field]) {
        colDef.cellEditorTemplateRef = this.columnEditorTemplates[colDef.field];
      }
      if (colDef.cellEditorComponent || colDef.cellEditorTemplateRef) {
        colDef.cellEditorElement = AcNgDatagridCellEditor;
      if (!colDef.cellEditorElementParams) {
        colDef.cellEditorElementParams = {};
      }
      colDef.cellEditorElementParams['___appRef___'] = this.appRef;
      colDef.cellEditorElementParams['___runtimeService___'] = this.runtimeService;
      }
      if (colDef.cellRendererComponent || colDef.cellRendererTemplateRef) {
        colDef.cellRendererElement = AcNgDatagridCellRenderer;
        if (!colDef.cellRendererElementParams) {
          colDef.cellRendererElementParams = {};
        }
        colDef.cellRendererElementParams['___appRef___'] = this.appRef;
        colDef.cellRendererElementParams['___runtimeService___'] = this.runtimeService;
      }
      if (this.flexColumn == colDef.field) {
        colDef.flexSize = 1;
      }
      columns.push(colDef);
    }
    this.datagridApi.columnDefinitions = columns;
  }
}


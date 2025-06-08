import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AcDatagridOnAgGridComponent } from './components/ac-datagrid-on-ag-grid/ac-datagrid-on-ag-grid.component';
import { AgGridCellEditorComponent } from './components/ag-grid-cell-editor/ag-grid-cell-editor.component';
import { AgGridCellRendererComponent } from './components/ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { AgGridHeaderCellComponent } from './components/ag-grid-header-cell/ag-grid-header-cell.component';


@NgModule({
  declarations: [
    AcDatagridOnAgGridComponent,
    AgGridCellEditorComponent,
    AgGridCellRendererComponent,
    AgGridHeaderCellComponent
  ],
  exports: [
    AcDatagridOnAgGridComponent
  ],
  imports: [
    AgGridAngular,
    CommonModule
  ]
})
export class AcDatagridOnAgGridModule { }

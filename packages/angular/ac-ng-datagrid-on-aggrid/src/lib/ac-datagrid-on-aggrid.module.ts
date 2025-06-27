import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AcDatagridOnAgGridComponent } from './components/ac-datagrid-on-aggrid/ac-datagrid-on-aggrid.component';
import { AgGridCellEditorComponent } from './components/ag-grid-cell-editor/ag-grid-cell-editor.component';
import { AgGridCellRendererComponent } from './components/ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { AgGridHeaderCellComponent } from './components/ag-grid-header-cell/ag-grid-header-cell.component';
import { AcDatagridDropdownOnAgGrid } from './components/ac-datagrid-dropdown-on-aggrid/ac-datagrid-dropdown-on-aggrid.component';
import { AcInputsModule } from '@autocode-ts/ac-angular';


@NgModule({
  declarations: [
    AcDatagridDropdownOnAgGrid,
    AcDatagridOnAgGridComponent,
    AgGridCellEditorComponent,
    AgGridCellRendererComponent,
    AgGridHeaderCellComponent,
  ],
  exports: [
    AcDatagridOnAgGridComponent,
    AcDatagridDropdownOnAgGrid
  ],
  imports: [
    AcInputsModule,
    AgGridAngular,
    CommonModule
  ]
})
export class AcDatagridOnAgGridModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcDatagridDropdownDatagridComponent } from './components/ac-datagrid-dropdown-datagrid/ac-datagrid-dropdown-datagrid.component';
import { AcDatagridDropdownContentComponent } from './components/ac-datagrid-dropdown-content/ac-datagrid-dropdown-content.component';



@NgModule({
  declarations: [
    AcDatagridDropdownDatagridComponent,
    AcDatagridDropdownContentComponent
  ],
  exports: [
    AcDatagridDropdownDatagridComponent,
    AcDatagridDropdownContentComponent

  ],
  imports: [
    CommonModule
  ]
})
export class AcDatagridDropdownModule { }

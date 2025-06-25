import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcDatagridColumnComponent } from './components/ac-datagrid-column/ac-datagrid-column.component';
import { AcDatagridComponent } from './components/ac-datagrid/ac-datagrid.component';
import { AcDatagridRowComponent } from './components/ac-datagrid-row/ac-datagrid-row.component';
import { AcDatagridCellComponent } from './components/ac-datagrid-cell/ac-datagrid-cell.component';
import { AcDatagridColumnHeadComponent } from './components/ac-datagrid-column-head/ac-datagrid-column-head.component';
import { AcRuntimeModule } from '../ac-runtime/ac-runtime.module';
import { AcInputsModule } from "../ac-inputs/ac-inputs.module";
import { AcSortingModule } from '../ac-sorting/ac-sorting.module';
import { AcDatagridColumnEditTemplateDirective } from './directives/ac-datagrid-column-edit-template.directive';
import { AcDatagridColumnRenderTemplateDirective } from './directives/ac-datagrid-column-render-template.directive';
import { FormsModule } from '@angular/forms';
import { AcAngularModule } from '../ac-angular.module';

@NgModule({
  declarations: [
    AcDatagridComponent,
    AcDatagridColumnComponent,
    AcDatagridColumnEditTemplateDirective,
    AcDatagridColumnHeadComponent,
    AcDatagridColumnRenderTemplateDirective,
    AcDatagridRowComponent,
    AcDatagridCellComponent
  ],
  exports: [
    AcDatagridComponent,
    AcDatagridColumnComponent,
    AcDatagridColumnEditTemplateDirective,
    AcDatagridColumnHeadComponent,
    AcDatagridColumnRenderTemplateDirective,
    AcDatagridRowComponent,
    AcDatagridCellComponent
  ],
  imports: [
    AcAngularModule,
    AcInputsModule,
    AcRuntimeModule,
    AcSortingModule,
    CommonModule,
    FormsModule
  ]
})
export class AcDatagridModule { }

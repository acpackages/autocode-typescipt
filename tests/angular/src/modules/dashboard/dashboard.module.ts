import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DatagridComponent } from '../datagrid/datagrid.component';
import { ScrollableComponent } from '../scrollable/scrollable.component';
import { InputsComponent } from '../inputs/inputs.component';

export const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'datagrid', component: DatagridComponent
  },
  {
    path: 'inputs', component: InputsComponent
  },
  {
    path: 'scrollable', component: ScrollableComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports:[
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', component: DashboardComponent
    ,
  },
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

/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';
// import { AcDataGrid } from 'packages/angular/ac-angular/src';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent {
  title = 'test-angular';

  constructor(){
    this.setDataGridConfig();
  }

  setDataGridConfig(){
    // AcDataGrid.filterButtonHtml = '<i class="fa fa-filter"></i>';
    // AcDataGrid.filterButtonAppliedHtml = '<i class="fa-solid fa-filter-circle-xmark"></i>';
    // AcDataGrid.sortButtonHtml = '<i class="fa fa-sort"></i>';
    // AcDataGrid.sortButtonAscHtml = '<i class="fa fa-arrow-down-short-wide"></i>';
    // AcDataGrid.sortButtonDescHtml = '<i class="fa fa-arrow-down-wide-short"></i>';
  }
}

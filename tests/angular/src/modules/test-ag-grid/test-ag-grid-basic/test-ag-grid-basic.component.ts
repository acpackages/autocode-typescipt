/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { employeeData } from '../../data/employee-data';

@Component({
  selector: 'app-test-ag-grid-basic',
  standalone:false,
  templateUrl: './test-ag-grid-basic.component.html',
  styleUrl: './test-ag-grid-basic.component.scss'
})
export class TestAgGridBasicComponent {
  data:any[] = employeeData;
}

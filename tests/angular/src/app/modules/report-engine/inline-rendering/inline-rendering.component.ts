/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { AcNgReportEngineModule } from '@autocode-ts/ac-ng-report-engine';
import { AcNgRuntimeModule } from '@autocode-ts/ac-ng-runtime'
import { ComponentsModule } from '../../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { customersData } from './../../../../../../data/customers-data';
import { acInitBwipjsPipe } from '@autocode-ts/ac-bwipjs-pipe';

@Component({
  selector: 'app-inline-rendering',
  imports: [CommonModule, AcNgReportEngineModule,ComponentsModule,ReactiveFormsModule,FormsModule,AcNgRuntimeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inline-rendering.component.html',
  styleUrl: './inline-rendering.component.scss',
  standalone: true
})
export class InlineRenderingComponent implements OnDestroy, AfterViewInit{

  data = [...customersData.slice(0,50)];

  constructor(private elementRef: ElementRef) {
    console.log(this);
    acInitBwipjsPipe();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.setOnDemandData();
    }, 1);
  }


  ngOnDestroy(): void {
    console.log("Datagrid Desrtoyed");
  }


}

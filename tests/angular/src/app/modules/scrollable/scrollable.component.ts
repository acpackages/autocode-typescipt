/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { AcNgScrollableComponent, AcNgScrollableModule } from '@autocode-ts/ac-angular';
import { customersData } from './../../../../../data/customers-data';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-scrollable-test',
  imports: [CommonModule, AcNgScrollableModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './scrollable.component.html',
  styleUrl: './scrollable.component.scss',
  standalone: true
})
export class ScrollableComponent {
  data?: any;

  constructor(private elementRef: ElementRef) {
    console.log(this);
    this.setLocalData();
  }



  setLocalData() {
    const data: any[] = [];
    const multiplier = 1;
    let index: number = 0;
    for (let i = 0; i < multiplier; i++) {
      for (const row of customersData) {
        index++;
        data.push({ index: index, ...row });
      }
    }
    this.data = data;
  }


}

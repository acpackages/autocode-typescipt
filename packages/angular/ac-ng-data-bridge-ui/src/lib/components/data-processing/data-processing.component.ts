/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component,Input, OnInit } from '@angular/core';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';

@Component({
  selector: 'data-processing',
  standalone:false,
  templateUrl: './data-processing.component.html',
  styleUrl: './data-processing.component.css',
})
export class DataProccesingComponent {
  @Input() dataBridge?:AcDataBridge;

  ACI_SVG_SOLID = ACI_SVG_SOLID;
  Object = Object;
}

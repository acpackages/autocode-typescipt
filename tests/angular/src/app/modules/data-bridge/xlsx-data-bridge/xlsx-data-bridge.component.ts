/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge';
import { AcNgDataBridgeUiModule } from '@autocode-ts/ac-ng-data-bridge-ui';
import { IMPORT_SHEET_DEFINITIONS } from './consts/source-def.const';
import { dataDictionaryJson } from 'tests/data/act-data-dictionary-v1';

@Component({
  selector: 'app-xlsx-data-bridge',
  imports: [CommonModule, ReactiveFormsModule, FormsModule,AcNgDataBridgeUiModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './xlsx-data-bridge.component.html',
  styleUrl: './xlsx-data-bridge.component.scss',
  standalone: true
})
export class XLSXDataBridgeComponent implements OnDestroy {
  dataBridge: AcDataBridge;

  constructor() {
    const worker = new Worker(
      new URL('./ac-data-bridge.worker', import.meta.url),
      { type: 'module' }
    );
    this.dataBridge = new AcDataBridge({ worker });
    console.log(this);
    this.dataBridge.setTemplateEntities({entities:IMPORT_SHEET_DEFINITIONS});
    this.dataBridge.setDataDictionary({dataDictionaryJson:dataDictionaryJson});
  }

  async test(){
    //
  }

  ngOnDestroy() {
    this.dataBridge.destroy();
  }


}

/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';

@Component({
  selector: 'ac-ng-data-bridge-ui',
  standalone:false,
  templateUrl: './ac-ng-data-bridge-ui.component.html',
  styleUrl: './ac-ng-data-bridge-ui.component.css',
})
export class AcNgDataBridgeUiComponent{
  @Input() dataBridge?:AcDataBridge;
  @Output() downloadTemplate:EventEmitter<any> = new EventEmitter();
  @Output() convertedOutput:EventEmitter<any> = new EventEmitter();

  ACI_SVG_SOLID = ACI_SVG_SOLID;

  get currentStage():string {
    let result = '';
    if(this.dataBridge){
      result = this.dataBridge.currentStage;
    }
    return result;
  }

  handleConvertedOutput(data:any){
    console.log(data);
    this.convertedOutput.emit(data);
  }

  handleDownloadTemplate(){
    this.downloadTemplate.emit();
  }
}

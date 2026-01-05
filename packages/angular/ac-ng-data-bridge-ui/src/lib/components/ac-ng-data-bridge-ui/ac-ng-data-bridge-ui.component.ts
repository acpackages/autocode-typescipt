/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input } from '@angular/core';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge';

@Component({
  selector: 'ac-ng-data-bridge-ui',
  standalone:false,
  templateUrl: './ac-ng-data-bridge-ui.component.html',
  styleUrl: './ac-ng-data-bridge-ui.component.css',
})
export class AcNgDataBridgeUiComponent {
  @Input() dataBridge?:AcDataBridge;

  get currentStage():string {
    let result = '';
    if(this.dataBridge){
      result = this.dataBridge.currentStage;
    }
    return result;
  }
}

/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component,Input, OnInit } from '@angular/core';
import { AcDataBridge, IAcDataBridgeEntity, IAcDataBridgeProcesedRow, IAcDataBridgeProgress } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';

@Component({
  selector: 'convert-to-destination',
  standalone:false,
  templateUrl: './convert-to-destination.component.html',
  styleUrl: './convert-to-destination.component.css',
})
export class ConvertToDestinationComponent {
  @Input() dataBridge?:AcDataBridge;

  ACI_SVG_SOLID = ACI_SVG_SOLID;
  Object = Object;
  showRows:Record<string,boolean> = {};
  showAdditionalRows:Record<string,boolean> = {};

  getChildTemplateDetails(templateName:string,rowDetails:IAcDataBridgeProcesedRow,entityDetails:IAcDataBridgeEntity){
    const destinationTemplate = this.dataBridge.destinationEntities[templateName];
    const clonedTemplate = {...destinationTemplate};
    clonedTemplate.completedCount = 0;
    clonedTemplate.rowsCount = 0;
    const processedRows:Record<string,IAcDataBridgeProcesedRow> = {};
    for(const row of Object.values(destinationTemplate.processedRows)){
      if(row.parentRowId == rowDetails.rowId && row.parentTemplateName == entityDetails.templateName!){
        processedRows[row.rowId] = row;
      }
    }
    clonedTemplate.processedRows = processedRows;
    return clonedTemplate;
  }

  handleStartConverting(){
    //
  }
}

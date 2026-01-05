/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component,Input, OnInit } from '@angular/core';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge';
import { AcDelayedCallback } from '@autocode-ts/autocode';

@Component({
  selector: 'source-destination-mapping',
  standalone:false,
  templateUrl: './source-destination-mapping.component.html',
  styleUrl: './source-destination-mapping.component.css',
})
export class SourceDestinationMappingComponent implements OnInit {
  @Input() dataBridge?:AcDataBridge;
  delayedCallback:AcDelayedCallback= new AcDelayedCallback();
  templateFieldsList:any = {};
  templatesList:{label:string,value:string}[] = [];
  isDetailSet:boolean = false;

  ngOnInit(){
    console.log(this);
    this.setDestinationDetails();
  }

  async setDestinationDetails(){
    if(this.dataBridge){
      console.log("Found data bridge");
      this.templatesList = await this.dataBridge.getTemplatesList();
      for(const source of this.templatesList){
        this.templateFieldsList[source.value] = await this.dataBridge.getTemplateFieldsList({templateName:source.value});
      }
      this.isDetailSet = true;
    }
    else{
      this.delayedCallback.add({callback:()=>{
        this.setDestinationDetails();
      },duration:50});
    }
  }

  handleConvertData(){
    this.dataBridge.startProcessingEntities();
  }

  getColumnsForTemplate({templateName}:{templateName:string}):any[]{
    let result:any[] = this.templateFieldsList[templateName];
    if(!this.templateFieldsList[templateName]){
      result = [];
    }
    return result;
  }
}

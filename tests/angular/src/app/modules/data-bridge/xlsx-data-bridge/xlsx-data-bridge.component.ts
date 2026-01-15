/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcDataBridge, IAcDataBridgeBeforeAddRequestArgs, IAcDataBridgeBeforeAddResponse, IAcDataBridgeEntity } from '@autocode-ts/ac-data-bridge';
import { AcNgDataBridgeUiModule } from '@autocode-ts/ac-ng-data-bridge-ui';
import { IMPORT_SHEET_DEFINITIONS } from './consts/source-def.const';
import { dataDictionaryJson } from 'tests/data/act-data-dictionary-v1';
import { AcEnumHttpResponseCode, AcHttp, IAcHttpResponse } from '@autocode-ts/autocode';
import { AcMessage } from '@autocode-ts/ac-browser';

@Component({
  selector: 'app-xlsx-data-bridge',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AcNgDataBridgeUiModule],
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
    this.dataBridge.getExistingEntitiesDataFunction = async ({ destinations }: { destinations: string[] }): Promise<Record<string, any[]>> => {
      const entities: Record<string, any[]> = {};
      const httpResponse: IAcHttpResponse = await AcHttp.postPromise({
        url: 'http://localhost:8081/api/data/get-existing-data-for-import', data: {
          'accountee_id':"3af0bc61-5161-4f43-bf9a-c45f9b7d457b",
          'tables':destinations
        }
      });
      if (httpResponse.status == AcEnumHttpResponseCode.Ok) {
        const apiResponse: any = httpResponse.data;
        if (apiResponse.status == 'success') {
          const data: any = apiResponse.data.import_data;
          for(const key of Object.keys(data)){
            entities[key] = data[key];
          }
        }
        else {
          AcMessage.error({ message: apiResponse.message ?? 'Error getting existing data' });
        }
      }
      else {
        AcMessage.error({ message: `${httpResponse.status}` });
      }
      return entities;
    }
    this.dataBridge.setTemplateEntities({ entities: IMPORT_SHEET_DEFINITIONS });
    this.dataBridge.setDataDictionary({ dataDictionaryJson: dataDictionaryJson });
    this.dataBridge.beforeAddEntityRow = async (args:IAcDataBridgeBeforeAddRequestArgs):Promise<IAcDataBridgeBeforeAddResponse> =>{
      args.data['accountee_id'] = 'Modified from before add fun';
      return {data:args.data}
    }
  }

  async test() {
    //
  }

  ngOnDestroy() {
    this.dataBridge.destroy();
  }

  handleConvertedOutput(data:any){
    const phoneNumbers = data['act_phone_numbers'];
    const partyPhoneNumbers:any[] = data['act_party_phone_numbers'];
    for(const phoneNumber of phoneNumbers){
      const phoneData = phoneNumber.data;
      const phoneNumberId = phoneData['phone_number_id'];
      const found = partyPhoneNumbers.find((p)=>{
        return p.data.phone_number_id == phoneNumberId;
      })
      if(!found){
        console.log(phoneNumber);
      }
    }
    console.log(data);
  }


}

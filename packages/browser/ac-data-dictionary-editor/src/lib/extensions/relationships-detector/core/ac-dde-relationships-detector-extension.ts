/* eslint-disable @typescript-eslint/no-inferrable-types */

import { IAcDDEMenuGroup } from "../../../_ac-data-dictionary-editor.export";
import { AcDDEExtension } from "../../../core/ac-dde-extension";
import { AcEnumDDEExtension } from "../../../enums/ac-enum-dde-extension.enum";
import { IAcDDEExtension } from "../../../interfaces/ac-dde-extension.interface";
import { AcDDERelationshipsDetector } from "./ac-dde-relationships-detector";

export class AcDDERelationshipsDetectorExtension extends AcDDEExtension {
  detector!:AcDDERelationshipsDetector;

  override init(): void {
    this.detector = new AcDDERelationshipsDetector({extension:this});
    const menuGroup: IAcDDEMenuGroup = {
      label: 'Relationships',
      menuItems: [
        {
          label: 'Detect Relationships', callback: () => {
            const result = this.detector.identifyRelationships();
            this.detector.createRelationshipFromResult({result:result});
            console.log(this);
          }
        }
      ]
    }
    this.editorApi.addMenuGroup({ menuGroup: menuGroup });
  }
}

export const AcRelationshipsDetectorDDEExtension: IAcDDEExtension = {
  extensionName: AcEnumDDEExtension.RelationshipsDetector,
  extensionClass: AcDDERelationshipsDetectorExtension
}

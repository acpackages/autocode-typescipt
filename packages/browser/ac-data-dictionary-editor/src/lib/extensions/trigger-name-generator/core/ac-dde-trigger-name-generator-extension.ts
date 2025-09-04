/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDDEExtension } from "../../../core/ac-dde-extension";
import { AcEnumDDEExtension } from "../../../enums/ac-enum-dde-extension.enum";
import { IAcDDEExtension } from "../../../interfaces/ac-dde-extension.interface";

export class AcDDETriggerNameGeneratorExtension extends AcDDEExtension {
  override init(): void {
    //
  }
}

export const AcTriggerNameGeneratorDDEExtension: IAcDDEExtension = {
  extensionName: AcEnumDDEExtension.TriggerNameGenerator,
  extensionClass: AcDDETriggerNameGeneratorExtension
}

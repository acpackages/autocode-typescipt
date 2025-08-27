import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterExtensionEnabledHookArgs{
  repeaterApi:AcRepeaterApi,
  extensionName:string,
}

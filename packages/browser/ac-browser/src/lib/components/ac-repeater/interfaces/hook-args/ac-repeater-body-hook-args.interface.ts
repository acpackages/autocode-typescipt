import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterBodyElement } from "../../elements/ac-repeater-body.element";

export interface IAcRepeaterBodyHookArgs{
  repeaterApi:AcRepeaterApi,
  datagridBody:AcRepeaterBodyElement,
}

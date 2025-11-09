/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataRow, AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcRepeaterRowElement } from "../elements/ac-repeater-row.element";
import { AcRepeaterApi } from "../core/ac-repeater-api";

export class AcRepeaterRow extends AcDataRow{
  repeaterApi!: AcRepeaterApi;
  instance?: AcRepeaterRowElement;
}

/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IAcDataRow } from "@autocode-ts/autocode";
export interface IAcRepeaterRow extends IAcDataRow {
  isActive?:boolean;
  instance?: any;
}

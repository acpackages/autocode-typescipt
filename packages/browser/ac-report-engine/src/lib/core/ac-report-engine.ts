/* eslint-disable @typescript-eslint/no-inferrable-types */
// import { AcPipe } from "@autocode-ts/ac-pipes";
import { joinPipe, slicePipe } from "../pipes/array-pipes";
import { asyncPipe, coalescePipe, defaultPipe, jsonPipe, lengthPipe } from "../pipes/common-pipes";
import { datePipe } from "../pipes/date-pipes";
import { currencyPipe, numberPipe, percentPipe } from "../pipes/number-pipes";
import { keysPipe, entriesPipe, valuesPipe } from "../pipes/object-pipes";
import { lowercasePipe, trimPipe, uppercasePipe, prefixPipe, suffixPipe } from "../pipes/string-pipes";
// import { AcPipe } from "./ac-pipe";

export class AcReportEngine {
  // private static pipes:Record<string,AcPipe> = {};
  private static isInititalized:boolean = false;
  static logError:Function = (...args: any[])=>{
    // console.error(args);
  }
  static logWarn:Function = (...args: any[])=>{
    // console.warn(args);
  }

  static init(){
    //
    }

}

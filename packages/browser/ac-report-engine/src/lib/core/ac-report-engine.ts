/* eslint-disable @typescript-eslint/no-inferrable-types */
// import { AcPipe } from "@autocode-ts/ac-pipes";
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

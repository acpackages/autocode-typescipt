/* eslint-disable @typescript-eslint/no-inferrable-types */
import { joinPipe, slicePipe } from "../pipes/array-pipes";
import { asyncPipe, coalescePipe, defaultPipe, jsonPipe, lengthPipe } from "../pipes/common-pipes";
import { datePipe } from "../pipes/date-pipes";
import { currencyPipe, numberPipe, percentPipe } from "../pipes/number-pipes";
import { keysPipe, entriesPipe, valuesPipe } from "../pipes/object-pipes";
import { lowercasePipe, trimPipe, uppercasePipe, prefixPipe, suffixPipe } from "../pipes/string-pipes";
import { AcPipe } from "./ac-pipe";

export class AcReportEngine {
  private static pipes:Record<string,AcPipe> = {};
  private static isInititalized:boolean = false;
  static logError:Function = (...args: any[])=>{
    console.error(args);
  }
  static logWarn:Function = (...args: any[])=>{
    // console.warn(args);
  }

  static getPipe({name}:{name:string}){
    const normalizedName = name.toLowerCase();
    return this.pipes[normalizedName];
  }

  static init(){
    if(!this.isInititalized){
      this.isInititalized = true;
      // Array Pipes
      this.registerPipe({pipe:joinPipe});
      this.registerPipe({pipe:slicePipe});
      // Common Pipes
      this.registerPipe({pipe:asyncPipe});
      this.registerPipe({pipe:coalescePipe});
      this.registerPipe({pipe:defaultPipe});
      this.registerPipe({pipe:jsonPipe});
      this.registerPipe({pipe:lengthPipe});
      // Date Pipes
      this.registerPipe({pipe:datePipe});
      // Number Pipes
      this.registerPipe({pipe:currencyPipe});
      this.registerPipe({pipe:numberPipe});
      this.registerPipe({pipe:percentPipe});
      // Object Pipes
      this.registerPipe({pipe:keysPipe});
      this.registerPipe({pipe:entriesPipe});
      this.registerPipe({pipe:valuesPipe});
      // String Pipes
      this.registerPipe({pipe:lowercasePipe});
      this.registerPipe({pipe:trimPipe});
      this.registerPipe({pipe:uppercasePipe})
      this.registerPipe({pipe:prefixPipe});
      this.registerPipe({pipe:suffixPipe});
    }
  }

  static registerPipe({pipe}:{pipe:AcPipe}){
    const normalizedName = pipe.name.toLowerCase();
    if(this.pipes[normalizedName] == undefined){
      this.pipes[normalizedName] = pipe;
    }
    else{
      AcReportEngine.logWarn(`Pipe already registered : ${normalizedName}`);
    }
  }
}

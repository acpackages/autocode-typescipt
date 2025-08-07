import { AcDDView } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDEViewRow{
  view_id:string;
  data_dictionary_id:string;
  [AcDDView.KeyViewName]:string;
  [AcDDView.KeyViewQuery]:string;
}

import { AcWeb } from "../core/ac-web";

export class AcWebHookCreatedArgs {
  acWeb: AcWeb;

  constructor(params: { acWeb: AcWeb }) {
    this.acWeb = params.acWeb;
  }
}

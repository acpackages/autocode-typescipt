/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcLogger } from "@autocode-ts/autocode";
import { AcWebRequest } from "../models/ac-web-request.model";

export class IAcWebRequestHandlerArgs {
  request!: AcWebRequest;
  logger!: AcLogger;
}

/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcLogger } from "@autocode-ts/autocode";
import { AcWebRequest } from "./ac-web-request.model";

export class AcWebRequestHandlerArgs {
  request!: AcWebRequest;
  logger!: AcLogger;

  constructor({ request, logger }: { request?: AcWebRequest; logger?: AcLogger } = {}) {
    if (request) {
      this.request = request;
    }
    if (logger) {
      this.logger = logger;
    }
  }
}

import { AcEvents, AcHooks, AcLogger } from "@autocode-ts/autocode";

export class AcReportEngine {
  evets:AcEvents = new AcEvents();
  hooks:AcHooks = new AcHooks();
  logger:AcLogger = new AcLogger();
}

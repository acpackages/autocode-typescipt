import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";


export class AcCronJob {
  static readonly KEY_CALLBACK = "callback";
  static readonly KEY_DURATION = "duration";
  static readonly KEY_EXECUTION = "execution";
  static readonly KEY_ID = "id";
  static readonly KEY_LAST_EXECUTION_TIME = "last_execution_time";

  id!: string;
  execution!: string;
  duration!: Record<string, number>;

  @AcBindJsonProperty({ key: AcCronJob.KEY_CALLBACK, skipInToJson: true })
  callback: ()=>any;

  @AcBindJsonProperty({ key: AcCronJob.KEY_LAST_EXECUTION_TIME })
  lastExecutionTime?: Date;

  constructor({
    id,
    execution,
    duration,
    callback,
  }: {
    id: string;
    execution: string;
    duration: Record<string, number>;
    callback: ()=>any;
  }) {
    this.id = id;
    this.execution = execution;
    this.duration = duration;
    this.callback = callback;
  }
}

import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";


export class AcCronJob {
  static readonly KeyCallback = "callback";
  static readonly KeyDuration = "duration";
  static readonly KeyExecution = "execution";
  static readonly KeyId = "id";
  static readonly KeyLastExecutionTime = "last_execution_time";

  id!: string;
  execution!: string;
  duration!: Record<string, number>;

  @AcBindJsonProperty({ key: AcCronJob.KeyCallback, skipInToJson: true })
  callback: ()=>any;

  @AcBindJsonProperty({ key: AcCronJob.KeyLastExecutionTime })
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

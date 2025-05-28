import { AcCronJob, AcLogger, Autocode } from "../..";


export class AcCron {
  private static _logger: AcLogger;
  private static _cronJobs: Map<string, AcCronJob> = new Map();
  private static _interval: any;

  static init(): void {
    this._logger = new AcLogger();
  }

  static every({
    callbackFunction,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  }: {
    callbackFunction: () => void;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }): string {
    const id = Autocode.uniqueId();
    const job = new AcCronJob({id:id, execution:'every',duration: {
      days,
      hours,
      minutes,
      seconds
    }, callback:callbackFunction});
    this._cronJobs.set(id, job);
    this._logger.log(
      `Registered cron job with id ${id} for every ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    );
    return id;
  }

  static dailyAt({
    callbackFunction,
    hours = 0,
    minutes = 0,
    seconds = 0
  }: {
    callbackFunction: () => void;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }): string {
    const id = Autocode.uniqueId();
    const job = new AcCronJob({id:id, execution:'daily_at',duration: {
      hours,
      minutes,
      seconds
    }, callback:callbackFunction});
    this._cronJobs.set(id, job);
    this._logger.log(
      `Registered cron job with id ${id} to execute daily at ${hours}:${minutes}:${seconds}`
    );
    return id;
  }

  private static _executeCronJobs(): void {
    const now = new Date();
    for (const job of this._cronJobs.values()) {
      const executionMode = job.execution;
      const duration = job.duration;
      const callback = job.callback;
      const lastExecutionTime = job.lastExecutionTime;

      if (executionMode === 'every') {
        const interval = this._getDurationInSeconds({
          days: duration["days"] ?? 0,
          hours: duration["hours"] ?? 0,
          minutes: duration["minutes"] ?? 0,
          seconds: duration["seconds"] ?? 0
        });
        if (!lastExecutionTime || (now.getTime() - lastExecutionTime.getTime()) / 1000 >= interval) {
          this._logger.log(
            `Executing cron job with id ${job.id} (every). Last execution time is ${lastExecutionTime ?? 'never'}`
          );
          callback();
          job.lastExecutionTime = now;
        }
      } else if (executionMode === 'daily_at') {
        const targetTime = this._formatTime(now.getHours(), now.getMinutes(), now.getSeconds());
        const expectedTime = this._formatTime(
          duration["hours"] ?? 0,
          duration["minutes"] ?? 0,
          duration["seconds"] ?? 0
        );
        if (targetTime === expectedTime) {
          this._logger.log(
            `Executing cron job with id ${job.id} (daily_at). Last execution time is ${lastExecutionTime ?? 'never'}`
          );
          callback();
          job.lastExecutionTime = now;
        }
      }
    }
  }

  private static _getDurationInSeconds({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  }: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }): number {
    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
  }

  private static _formatTime(h: number, m: number, s: number): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  static start(): void {
    this._logger.log(`Cron jobs execution started at ${new Date().toISOString()}`);
    this._interval = setInterval(() => this._executeCronJobs(), 1000);
  }

  static stop(): void {
    if (this._interval) {
      this._logger.log(`Cron jobs execution stopped at ${new Date().toISOString()}`);
      clearInterval(this._interval);
      this._interval = null;
    }
  }
}

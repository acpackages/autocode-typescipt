import { AcLogger } from "./ac-logger";
import { Autocode } from "./autocode";

export class AcCron {
    private static logger = new AcLogger();
    private static cronJobs: Map<string, any> = new Map();
    private static intervalId: NodeJS.Timeout | null = null;

    static every({callbackFunction, days = 0, hours = 0, minutes = 0, seconds=0}:{callbackFunction: Function, days: number, hours: number, minutes: number, seconds: number}): string {
        const id = Autocode.uniqueId();
        AcCron.cronJobs.set(id, {
            execution: "every",
            duration: { days, hours, minutes, seconds },
            function: callbackFunction,
            lastExecutionTime: null,
        });
        AcCron.logger.log(`Registered cron job with id ${id} for every ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
        return id;
    }

    static dailyAt({callbackFunction, hours = 0, minutes = 0, seconds=0}:{callbackFunction: Function, hours: number, minutes: number, seconds: number}): string {
        const id = Autocode.uniqueId();
        AcCron.cronJobs.set(id, {
            execution: "daily_at",
            duration: { hours, minutes, seconds },
            function: callbackFunction,
            lastExecutionTime: null,
        });
        AcCron.logger.log(`Registered cron job with id ${id} to execute daily at ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
        return id;
    }

    private static executeCronJobs() {
        const now = new Date();
        AcCron.cronJobs.forEach((job, id) => {
            const executionMode = job.execution;
            const duration = job.duration;
            const func = job.function;
            const lastExecutionTime = job.lastExecutionTime;

            if (executionMode === "every") {
                const interval = {
                    days: duration.days || 0,
                    hours: duration.hours || 0,
                    minutes: duration.minutes || 0,
                    seconds: duration.seconds || 0,
                };

                const lastTime = lastExecutionTime ? new Date(lastExecutionTime) : null;
                if (!lastTime || now.getTime() - lastTime.getTime() >= AcCron.getDurationInMilliseconds(interval)) {
                    AcCron.logger.log(`Executing cron job with id ${id} (every). Last execution time is ${lastExecutionTime}`);
                    func();
                    job.lastExecutionTime = now;
                }
            } else if (executionMode === "daily_at") {
                const hours = duration.hours || 0;
                const minutes = duration.minutes || 0;
                const seconds = duration.seconds || 0;

                if (now.getHours() === hours && now.getMinutes() === minutes && now.getSeconds() === seconds) {
                    AcCron.logger.log(`Executing cron job with id ${id} (daily_at). Last execution time is ${lastExecutionTime}`);
                    func();
                    job.lastExecutionTime = now;
                }
            }
        });
    }

    private static getDurationInMilliseconds({days = 0, hours = 0, minutes = 0, seconds=0}:{days: number, hours: number, minutes: number, seconds: number}): number {
        return ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
    }

    static start() {
        AcCron.logger.log(`Cron jobs execution started at ${new Date().toISOString()}`);
        AcCron.intervalId = setInterval(() => {
            AcCron.executeCronJobs();
        }, 1000);
    }

    static stop() {
        if (AcCron.intervalId) {
            AcCron.logger.log(`Cron jobs execution stopped at ${new Date().toISOString()}`);
            clearInterval(AcCron.intervalId);
            AcCron.intervalId = null;
        }
    }
}

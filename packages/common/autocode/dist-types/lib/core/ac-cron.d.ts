export declare class AcCron {
    private static _logger;
    private static _cronJobs;
    private static _interval;
    static init(): void;
    static every({ callbackFunction, days, hours, minutes, seconds }: {
        callbackFunction: () => void;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
    }): string;
    static dailyAt({ callbackFunction, hours, minutes, seconds }: {
        callbackFunction: () => void;
        hours?: number;
        minutes?: number;
        seconds?: number;
    }): string;
    private static _executeCronJobs;
    private static _getDurationInSeconds;
    private static _formatTime;
    static start(): void;
    static stop(): void;
}

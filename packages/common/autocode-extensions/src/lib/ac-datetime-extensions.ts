import { DateTime } from 'luxon';

// Extend Date prototype with formatted parsing
declare global {
  interface Date {
    fromFormatted(dateString: string, format?: string): Date;
    addTime({years,months,days,hours,minutes,seconds,milliseconds}: {
      years?: number;
      months?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    }): Date;
    subtractTime({years,months,days,hours,minutes,seconds,milliseconds}: {
      years?: number;
      months?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    }): Date;
    format(format: string): string;
    isSame(compareDate: Date): boolean;
  }
}

Date.prototype.fromFormatted = function (
  dateString: string,
  format = ''
): Date {
  if (format && format.length > 0) {
    const dt = DateTime.fromFormat(dateString, format);
    if (!dt.isValid) throw new Error('Invalid date or format');
    return dt.toJSDate();
  } else {
    const dt = DateTime.fromISO(dateString);
    if (!dt.isValid) throw new Error('Invalid ISO date string');
    return dt.toJSDate();
  }
};

Date.prototype.addTime = function ({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}): Date {
  const dt = DateTime.fromJSDate(this)
    .plus({ years, months, days, hours, minutes, seconds, milliseconds });
  return dt.toJSDate();
};

Date.prototype.subtractTime = function ({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}): Date {
  const dt = DateTime.fromJSDate(this)
    .minus({ years, months, days, hours, minutes, seconds, milliseconds });
  return dt.toJSDate();
};

Date.prototype.format = function (format: string): string {
  return DateTime.fromJSDate(this).toFormat(format);
};

Date.prototype.isSame = function (compareDate: Date): boolean {
  return this.getTime() === compareDate.getTime();
};

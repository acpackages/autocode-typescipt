// src/app/utils/date-utils.ts (or your preferred path)

import { DateTime, DurationLike } from 'luxon';

/**
 * Utility functions for Date and DateTime manipulation using Luxon.
 * Prefer using Luxon's DateTime objects directly when possible for immutability and powerful API.
 * These utilities bridge to native Date objects when necessary.
 */

/**
 * Parses a date string into a native JavaScript Date object using Luxon.
 * If format is provided, uses DateTime.fromFormat. Otherwise, attempts to parse as ISO.
 * @param dateString The date string to parse.
 * @param format Optional: The Luxon format string (e.g., 'dd/MM/yyyy', 'yyyy-MM-dd HH:mm:ss').
 * @returns A native JavaScript Date object.
 * @throws Error if the dateString cannot be parsed with the given format or as ISO.
 */
export function dateFromFormatted(dateString: string, format?: string): Date {
    let dt: DateTime;
    if (format && format.length > 0) {
        dt = DateTime.fromFormat(dateString, format);
    } else {
        // Assume ISO if no format is provided, which is a common standard.
        // fromISO is more robust than just new Date(string) for various ISO formats.
        dt = DateTime.fromISO(dateString);
    }

    if (!dt.isValid) {
        // Provide more detailed error information for debugging
        throw new Error(`Invalid date string "${dateString}" or format "${format || 'ISO'}": ${dt.invalidExplanation}`);
    }
    return dt.toJSDate();
}

/**
 * Adds time to a given native JavaScript Date object.
 * Returns a new Date object (does not modify the original).
 * @param date The original Date object.
 * @param duration An object specifying the units to add (e.g., { years: 1, months: 2 }).
 * @returns A new Date object with the added time.
 */
export function dateAddTime(date: Date, duration: DurationLike): Date {
    const dt = DateTime.fromJSDate(date).plus(duration);
    return dt.toJSDate();
}

/**
 * Subtracts time from a given native JavaScript Date object.
 * Returns a new Date object (does not modify the original).
 * @param date The original Date object.
 * @param duration An object specifying the units to subtract (e.g., { hours: 5, minutes: 30 }).
 * @returns A new Date object with the subtracted time.
 */
export function dateSubtractTime(date: Date, duration: DurationLike): Date {
    const dt = DateTime.fromJSDate(date).minus(duration);
    return dt.toJSDate();
}

/**
 * Formats a native JavaScript Date object into a string using a specified Luxon format.
 * @param date The Date object to format.
 * @param format The Luxon format string (e.g., 'dd/MM/yyyy', 'MMMM dd, yyyy h:mm a').
 * @returns The formatted date string.
 */
export function dateFormat(date: Date, format: string): string {
    return DateTime.fromJSDate(date).toFormat(format);
}

/**
 * Checks if two native JavaScript Date objects represent the same point in time.
 * @param date1 The first Date object.
 * @param date2 The second Date object to compare against.
 * @returns True if both dates represent the exact same millisecond, false otherwise.
 */
export function dateIsSame(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
}

// Optionally, you might want to expose Luxon's DateTime constructor or common formatting tokens
// export { DateTime } from 'luxon';
// export const DATE_FORMATS = {
//     SHORT_DATE: 'dd/MM/yyyy',
//     LONG_DATE: 'MMMM dd, yyyy',
//     TIME: 'hh:mm a',
//     DATETIME: 'dd/MM/yyyy hh:mm a'
// };

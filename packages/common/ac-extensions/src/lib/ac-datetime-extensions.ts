// src/app/utils/date-utils.ts (or your preferred path)

import { DateTime, DurationLike } from 'luxon';
// ---------------------------------------------------------
// CLEAN INPUT (remove ordinals like 1st, 2nd, 3rd, 4th)
// ---------------------------------------------------------
function normalizeInput(str: string): string {
  return str
    .trim()
    .replace(/\b(\d+)(st|nd|rd|th)\b/gi, "$1") // 5th → 5
    .replace(/[,]/g, "");                     // remove commas
}

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

function tryISO(str: string): DateTime | null {
  const iso = DateTime.fromISO(str);
  return iso.isValid ? iso : null;
}

function tryRFC(str: string): DateTime | null {
  const r = DateTime.fromRFC2822(str);
  return r.isValid ? r : null;
}

function tryUnix(str: string): DateTime | null {
  if (/^\d{10}$/.test(str)) {
    return DateTime.fromSeconds(parseInt(str));
  }
  if (/^\d{13}$/.test(str)) {
    return DateTime.fromMillis(parseInt(str));
  }
  return null;
}

function tryFormats(str: string, formats: string[]): DateTime | null {
  for (const f of formats) {
    const dt = DateTime.fromFormat(str, f);
    if (dt.isValid) return dt;
  }
  return null;
}

// ---------------------------------------------------------
// ALL DATE FORMATS
// ---------------------------------------------------------

const DATE_FORMATS = [
  // DMY
  "dd-MM-yyyy", "d-M-yyyy",
  "dd/MM/yyyy", "d/M/yyyy",
  "dd.MM.yyyy", "d.M.yyyy",

  "dd-MM-yy", "d-M-yy",
  "dd/MM/yy", "d/M/yy",
  "dd.MM.yy", "d.M.yy",

  // MDY
  "MM-dd-yyyy", "M-d-yyyy",
  "MM/dd/yyyy", "M/d/yyyy",
  "MM.dd.yyyy", "M.d.yyyy",

  "MM-dd-yy", "M-d-yy",
  "MM/dd/yy", "M/d/yy",
  "MM.dd.yy", "M.d.yy",

  // YMD
  "yyyy-MM-dd",
  "yyyy/MM/dd",
  "yyyy.MM.dd",

  "yy-MM-dd",
  "yy/MM/dd",
  "yy.MM.dd",

  // Textual dates
  "dd MMM yyyy", "d MMM yyyy",
  "dd MMMM yyyy", "d MMMM yyyy",

  "MMM dd yyyy", "MMMM dd yyyy",
  "MMM d yyyy", "MMMM d yyyy",

  "dd MMM yy", "d MMM yy",
  "dd MMMM yy", "d MMMM yy",

  "MMM dd yy", "MMMM dd yy",
  "MMM d yy", "MMMM d yy",
];

// ---------------------------------------------------------
// DATETIME FORMATS (auto-generated)
// ---------------------------------------------------------

const DATETIME_FORMATS = [
  ...DATE_FORMATS.map(f => f + " HH:mm"),
  ...DATE_FORMATS.map(f => f + " HH:mm:ss"),
  ...DATE_FORMATS.map(f => f + " HH:mm:ss.SSS"),

  ...DATE_FORMATS.map(f => f + " hh:mm a"),
  ...DATE_FORMATS.map(f => f + " hh:mm:ss a"),

  // With timezone offsets
  ...DATE_FORMATS.map(f => f + " HH:mm Z"),
];

// ---------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------

export function isValidDateString(str: string): boolean {
  str = normalizeInput(str);

  if (tryUnix(str)) return true;
  if (tryISO(str)) return true;
  if (tryRFC(str)) return true;

  return tryFormats(str, DATE_FORMATS) !== null;
}

export function isValidDateTimeString(str: string): boolean {
  str = normalizeInput(str);

  if (tryUnix(str)) return true;
  if (tryISO(str)) return true;
  if (tryRFC(str)) return true;

  return (
    tryFormats(str, DATETIME_FORMATS) !== null ||
    tryFormats(str, DATE_FORMATS) !== null
  );
}

export function parseDateTimeString(str: string): DateTime | null {
  str = normalizeInput(str);

  // 1. Unix timestamp
  let dt = tryUnix(str);
  if (dt) return dt;

  // 2. ISO (covers most common)
  dt = tryISO(str);
  if (dt) return dt;

  // 3. RFC 2822
  dt = tryRFC(str);
  if (dt) return dt;

  // 4. Datetime formats
  dt = tryFormats(str, DATETIME_FORMATS);
  if (dt) return dt;

  // 5. Date formats
  dt = tryFormats(str, DATE_FORMATS);
  if (dt) return dt;

  // 6. Nothing matched
  return null;
}
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
export function dateFormat(date: Date|DateTime, format: string): string {
  if(date instanceof DateTime){
    return DateTime.fromJSDate(date.toJSDate()).toFormat(format);
  }
  else{
    return DateTime.fromJSDate(date).toFormat(format);
  }
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

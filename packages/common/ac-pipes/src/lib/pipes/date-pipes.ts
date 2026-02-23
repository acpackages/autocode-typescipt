/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";
import { AcPipeRegistry } from "../core/ac-pipe";

AcPipeRegistry.register({
  name: 'date',
  pure: true,
  transform: (
    v: any,
    format: 'short' | 'long' | 'medium' | 'full' | string = 'short',
    locale: string = navigator.language
  ) => {
    if (!v) return '';
    const d = new Date(v);
    if (isNaN(d.getTime())) return v;

    if (typeof format === 'string' && ['short', 'medium', 'long', 'full'].includes(format)) {
      return new Intl.DateTimeFormat(locale, { dateStyle: format as any }).format(d);
    }

    // Custom format fallback or advanced (you can integrate date-fns later)
    return DateTime.fromJSDate(d).toFormat(format);
  }
});

/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipe } from "../core/ac-pipe";

export const currencyPipe: AcPipe = {
  name: 'currency',
  pure: true,
  transform: (
    v: any,
    currency: string = 'INR',
    locale: string = navigator.language
  ) => {
    if (v == null) return '';
    const num = parseFloat(v);
    if (isNaN(num)) return v;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(num);
  }
}

export const numberPipe: AcPipe = {
  name: 'number',
  pure: true,
  transform: (v: any, fractionDigits: number = 2, locale: string = navigator.language) => {
    if (v == null) return '';
    const num = parseFloat(v);
    if (isNaN(num)) return v;
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(num);
  }
}

export const percentPipe: AcPipe = {
  name: 'percent',
  pure: true,
  transform: (v: any, fractionDigits: number = 2, locale: string = navigator.language) => {
    if (v == null) return '';
    const num = parseFloat(v);
    if (isNaN(num)) return v;
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(num / 100);
  }
}

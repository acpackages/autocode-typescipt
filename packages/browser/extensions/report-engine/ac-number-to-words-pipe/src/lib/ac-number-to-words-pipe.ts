import { AcPipe, AcReportEngine } from '@autocode-ts/ac-report-engine';

const PLACEHOLDER = '—';
const INDIAN_SCALE = [
  '',           // 10^0
  'thousand',   // 10^3
  'lakh',       // 10^5
  'crore',      // 10^7
  'arab',       // 10^9
  'kharab',     // 10^11
  'neel',       // 10^13
  'padma',      // 10^15
  'shankh',     // 10^17
];

// International scale names
const INTERNATIONAL_SCALE = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'
];

const ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Number to words – Indian system by default, with proper hundreds support
 */
export const numberToWordsPipe: AcPipe = {
  name: 'numberToWords',
  pure: true,
  transform: async (
    value: any,
    options: Partial<{
      system?: 'indian' | 'international';
      useAnd?: boolean;
      decimalPlaces?: number;
      placeholder?: string;
    }> = {}
  ): Promise<string> => {
    const config = {
      system: 'indian' as const,
      useAnd: true,
      decimalPlaces: 2,
      placeholder: PLACEHOLDER,
      ...options,
    };

    if (value == null || value === '' || value === undefined) {
      return config.placeholder;
    }

    const num = Number(value);
    if (isNaN(num)) {
      return config.placeholder;
    }

    return numberToWords(num, config);
  },
};

function numberToWords(
  num: number,
  config: { system: 'indian' | 'international'; useAnd: boolean; decimalPlaces: number }
): string {
  if (num === 0) return 'zero';

  const isNegative = num < 0;
  const absolute = Math.abs(num);

  const [integerStr, decimalStr] = absolute
    .toFixed(config.decimalPlaces)
    .split('.');

  let result = isNegative ? 'minus ' : '';

  result += convertIntegerPart(Number(integerStr), config);

  if (decimalStr && !/^0+$/.test(decimalStr)) {
    const decimalWords = decimalStr
      .split('')
      .map(d => ONES[Number(d)])
      .filter(Boolean)
      .join(' ');
    result += ` point ${decimalWords}`;
  }

  return result.trim();
}

function convertIntegerPart(
  num: number,
  config: { system: 'indian' | 'international'; useAnd: boolean }
): string {
  if (num === 0) return 'zero';

  const scale = config.system === 'indian' ? INDIAN_SCALE : INTERNATIONAL_SCALE;
  const isIndian = config.system === 'indian';

  const parts: string[] = [];
  let scaleIndex = 0;

  let n = num;

  while (n > 0) {
    // Indian system: first group = 3 digits, then groups of 2
    const groupSize = isIndian && scaleIndex === 0 ? 3 : (isIndian ? 2 : 3);
    const divisor = 10 ** groupSize;
    const chunk = n % divisor;
    n = Math.floor(n / divisor);

    if (chunk !== 0) {
      const chunkWords = convertGroup(chunk, config.useAnd && scaleIndex > 0);

      if (scaleIndex > 0 && scale[scaleIndex]) {
        chunkWords.push(scale[scaleIndex]);
      }

      parts.unshift(...chunkWords);
    }

    scaleIndex++;
  }

  let words = parts.join(' ');

  // Add "and" before the last group when appropriate
  if (config.useAnd && parts.length > 2) {
    const lastSpaceIndex = words.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      words = words.slice(0, lastSpaceIndex) + ' and' + words.slice(lastSpaceIndex);
    }
  }

  return words;
}

/**
 * Convert a group of digits (0–999) to words
 * Handles hundreds properly every time
 */
function convertGroup(n: number, allowAnd: boolean): string[] {
  const words: string[] = [];

  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;

  if (hundreds > 0) {
    words.push(ONES[hundreds], 'hundred');
  }

  if (remainder > 0) {
    // Add "and" only if there's a hundreds part and allowed
    if (hundreds > 0 && allowAnd) {
      words.push('and');
    }

    if (remainder < 20) {
      words.push(ONES[remainder]);
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;

      words.push(TENS[ten]);
      if (one > 0) {
        words.push(ONES[one]);
      }
    }
  }

  return words;
}

export function acInitNumberToWordsPipe() {
  AcReportEngine.registerPipe({ pipe: numberToWordsPipe });
}

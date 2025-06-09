// TypeScript "extension" for Number

declare global {
  interface Number {
    isEven(): boolean;
    isOdd(): boolean;
    format(format: string): string;
    round(decimals?: number): number;
  }
}


Number.prototype.isEven = function() : boolean {
 return this.valueOf() % 2 === 0;
}

Number.prototype.isOdd = function() : boolean {
 return this.valueOf() % 2 !== 0;
}


Number.prototype.format = function (format: string): string {
  if (format === "DISPLAY") {
    format = "0,0.00"; // Use Intl number options below, not pattern strings
  }

  // Intl.NumberFormat doesn't support custom patterns, but can do basic options
  // We'll parse the format string for decimals and grouping:

  // Simple heuristic: count decimals after '.' in format
  const decimalMatch = format.match(/0\.([0]+)/);
  const minimumFractionDigits = decimalMatch ? decimalMatch[1].length : 0;

  const useGrouping = format.includes(',');

  const nf = new Intl.NumberFormat(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits,
    useGrouping,
  });

  return nf.format(this.valueOf());
};

Number.prototype.round = function (decimals = 2): number {
  const mod = Math.pow(10, decimals);
  return Math.round(this.valueOf() * mod) / mod;
};

export {}; // To ensure global augmentation

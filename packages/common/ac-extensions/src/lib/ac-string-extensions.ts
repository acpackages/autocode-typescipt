/* eslint-disable prefer-const */

declare global {
    interface String {
        charAt(index: number): string;
        convertCase(convertTo:string): string;
        equalsIgnoreCase(anotherString: string): boolean;
        forEachChar(callback: (char: string, index: number) => void): void;
        getExtension(): string;
        isAlpha(): boolean;
        isAlphaNumeric(): boolean;
        isEmpty(): boolean;
        isJson(): boolean;
        isNotEmpty(): boolean;
        isNumeric(): boolean;
        matchesCount(match: string): number;
        parseJsonToArray(): any[];
        parseJsonToObject(): any;
        random(): string;
        regexMatch(pattern: string, matches: Record<string, string>): boolean;
        toCamelCase(): string;
        toCamelSnakeCase(): string;
        toCapitalCase(): string;
        toCapitalSnakeCase(): string;
        toCobolCase(): string;
        toDotCase(): string;
        toKebabCase(): string;
        toPascalCase(): string;
        toPascalSnakeCase(): string;
        toScreamingSnakeCase(): string;
        toSentenceCase(): string;
        toSnakeCase(): string;
        toTrainCase(): string;
        words(): string[];
    }
}

String.prototype.charAt = function (index: number): string {
    return this.toString()[index] || '';
};

String.prototype.convertCase = function (convertTo: string): string {
    if(convertTo == 'camel'){
      return this.toCamelCase();
    }
    else if(convertTo == 'camel_snake'){
      return this.toCamelSnakeCase();
    }
    else if(convertTo == 'capital'){
      return this.toCapitalCase();
    }
    else if(convertTo == 'capital_snake'){
      return this.toCapitalSnakeCase();
    }
    else if(convertTo == 'cobol'){
      return this.toCobolCase();
    }
    else if(convertTo == 'dot'){
      return this.toDotCase();
    }
    else if(convertTo == 'kebab'){
      return this.toKebabCase();
    }
    else if(convertTo == 'lower'){
      return this.toLowerCase();
    }
    else if(convertTo == 'pascal'){
      return this.toPascalCase();
    }
    else if(convertTo == 'pascal_snake'){
      return this.toPascalCase();
    }
    else if(convertTo == 'screaming_snake'){
      return this.toScreamingSnakeCase();
    }
    else if(convertTo == 'sentence'){
      return this.toSentenceCase();
    }
    else if(convertTo == 'snake'){
      return this.toSnakeCase();
    }
    else if(convertTo == 'train'){
      return this.toTrainCase();
    }
    else if(convertTo == 'upper'){
      return this.toUpperCase();
    }
    else {
      return this.toString();
    }
};

String.prototype.equalsIgnoreCase = function (anotherString: string): boolean {
  return this.toLowerCase() === anotherString?.toLowerCase();
};

String.prototype.forEachChar = function (callback: (char: string, index: number) => void): void {
  for (let i = 0; i < this.length; i++) {
    callback(this.charAt(i), i);
  }
};

String.prototype.getExtension = function (): string {
    let result = "";
    try {
        // eslint-disable-next-line @typescript-eslint/no-this-alias, prefer-const
        let object: any = this;
        let filePath = object.replaceAll("\\", "/");
        let fileName = filePath.split('/').pop();
        let extension = fileName!.split('.').pop();
        if (extension) {
            result = extension;
        }
    }
    // eslint-disable-next-line no-empty
    catch (ex) { }
    return result;
};

String.prototype.isAlpha = function (): boolean {
  return /^[a-zA-Z]+$/.test(this.toString());
};

String.prototype.isAlphaNumeric = function (): boolean {
  return /^[a-zA-Z0-9]+$/.test(this.toString());
};

String.prototype.isEmpty = function (): boolean {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let result: boolean = true;
    try {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let object: any = this;
        if (object) {
            if (object != "") {
                result = false;
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) { /* empty */ }
    return result;
};

String.prototype.isJson = function (): boolean {
    try {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let object: any = this;
        JSON.parse(object);
        return true;
    } catch (e) {
        return false;
    }
};

String.prototype.isNotEmpty = function (): boolean {
    try {
        return !this.isEmpty;
    } catch (e) {
        return false;
    }
};

String.prototype.isNumeric = function (): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let object: any = this;
    return !isNaN(parseFloat(object));
};

String.prototype.matchesCount = function (match: string): number {
  if (!match) return 0;
  return this.split(match).length - 1;
};

String.prototype.parseJsonToArray = function (): any[] {
    let result: any[] = [];
    try {
        let jsonResult = JSON.parse(this.toString());
        if (Array.isArray(jsonResult)) {
            result = jsonResult;
        }
        else {
            Object.keys(jsonResult).forEach((key) => {
                result.push(jsonResult[key]);
            });
        }
    }
    catch (ex) {
        console.error(result);
    }
    return result;
};

String.prototype.parseJsonToObject = function (): any[] {
    let result: any = {};
    try {
        result = JSON.parse(this.toString());
    }
    catch (ex) {
        console.error(result);
    }
    return result;
};

String.prototype.random = function (): string {
    return Math.random().toString(36).replace('0.', '') + Date.now();
};

String.prototype.regexMatch = function (pattern: string, matches: Record<string, string>): boolean {
    const placeholderRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
    const groupMatches = Array.from(pattern.matchAll(placeholderRegex)).map(m => m[1]);

    // Escape the pattern for regex, but keep our placeholders
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexString = escapedPattern.replace(/\\\{([a-zA-Z_][a-zA-Z0-9_]*)\\\}/g, '([^/]+)');

    const finalRegex = new RegExp(`^${regexString}$`);
    const rawMatches = finalRegex.exec(this.toString());

    if (!rawMatches) return false;

    for (let i = 0; i < groupMatches.length; i++) {
        matches[groupMatches[i]] = rawMatches[i + 1] || '';
    }
    return true;
};

String.prototype.toCamelCase = function (): string {
  const words = this.words().map(w => w.toLowerCase());
  return words.map((word, index) => {
    if (index === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

String.prototype.toPascalCase = function (): string {
    return this.words().map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
};

String.prototype.toCapitalCase = function (): string {
    return this.words().map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
};

String.prototype.toSentenceCase = function (): string {
    const s = this.toString().trim().toLowerCase();
    return s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;
};

String.prototype.toSnakeCase = function (): string {
    return this.words().map(w => w.toLowerCase()).join('_');
};

String.prototype.toScreamingSnakeCase = function (): string {
    return this.words().map(w => w.toUpperCase()).join('_');
};

String.prototype.toKebabCase = function (): string {
    return this.words().map(w => w.toLowerCase()).join('-');
};

String.prototype.toCobolCase = function (): string {
    return this.words().map(w => w.toUpperCase()).join('-');
};

String.prototype.toTrainCase = function (): string {
    return this.words()
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('-');
};

String.prototype.toDotCase = function (): string {
    return this.words().map(w => w.toLowerCase()).join('.');
};

String.prototype.words = function (): string[] {
  const matches = this
    .trim()
    .replace(/[_\-\\.\s]+/g, ' ') // Unify separators
    .match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g); // Break into words
  return matches || [];
};

export { };

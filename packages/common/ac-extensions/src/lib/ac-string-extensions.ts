/**
 * Utility functions for String manipulation.
 * Do NOT extend String.prototype directly. Use these as standalone functions.
 */

// --- Basic Utilities ---

/**
 * Gets the character at the specified index, returning an empty string if out of bounds.
 * @param str The input string.
 * @param index The index of the character.
 * @returns The character at the index, or an empty string.
 */
export function stringCharAt(str: string, index: number): string {
    if (typeof str !== 'string') return ''; // Handle non-string input gracefully
    return str[index] || '';
}

/**
 * Checks if a string is empty (null, undefined, or zero length).
 * @param str The input string.
 * @returns True if the string is empty, false otherwise.
 */
export function stringIsEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.length === 0;
}

/**
 * Checks if a string is not empty.
 * @param str The input string.
 * @returns True if the string is not empty, false otherwise.
 */
export function stringIsNotEmpty(str: string | null | undefined): boolean {
    return !stringIsEmpty(str);
}

/**
 * Compares two strings ignoring case.
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns True if the strings are equal ignoring case, false otherwise.
 */
export function stringEqualsIgnoreCase(str1: string, str2: string): boolean {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        return false;
    }
    return str1.toLowerCase() === str2.toLowerCase();
}

/**
 * Iterates over each character of a string, invoking a callback function.
 * @param str The input string.
 * @param callback The function to call for each character (char, index).
 */
export function stringForEachChar(str: string, callback: (char: string, index: number) => void): void {
    if (typeof str !== 'string') return;
    for (let i = 0; i < str.length; i++) {
        callback(str.charAt(i), i);
    }
}

/**
 * Extracts the file extension from a path.
 * @param filePath The file path string.
 * @returns The file extension (e.g., 'txt', 'jpg'), or an empty string if none.
 */
export function stringGetExtension(filePath: string): string {
    if (typeof filePath !== 'string') return '';
    try {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const fileName = normalizedPath.split('/').pop();
        if (!fileName) return '';

        const parts = fileName.split('.');
        if (parts.length > 1 && parts[0].length > 0) {
            return parts.pop() || '';
        }
    } catch (ex) {
        console.error("Error getting extension:", ex);
    }
    return '';
}

/**
 * Checks if a string contains only alphabetic characters.
 * @param str The input string.
 * @returns True if the string is purely alphabetic, false otherwise.
 */
export function stringIsAlpha(str: string): boolean {
    if (typeof str !== 'string') return false;
    return /^[a-zA-Z]+$/.test(str);
}

/**
 * Checks if a string contains only alphanumeric characters.
 * @param str The input string.
 * @returns True if the string is purely alphanumeric, false otherwise.
 */
export function stringIsAlphaNumeric(str: string): boolean {
    if (typeof str !== 'string') return false;
    return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Checks if a string is a valid JSON.
 * @param str The input string.
 * @returns True if the string is valid JSON, false otherwise.
 */
export function stringIsJson(str: string): boolean {
    if (typeof str !== 'string') return false;
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Checks if a string represents a numeric value.
 * @param str The input string.
 * @returns True if the string can be parsed as a number, false otherwise.
 */
export function stringIsNumeric(str: string): boolean {
    if (typeof str !== 'string') return false;
    return !isNaN(parseFloat(str)) && isFinite(Number(str));
}

/**
 * Counts the occurrences of a substring within a string.
 * @param str The input string.
 * @param match The substring to count.
 * @returns The number of times the substring appears.
 */
export function stringMatchesCount(str: string, match: string): number {
    if (typeof str !== 'string' || typeof match !== 'string' || !match.length) return 0;
    return str.split(match).length - 1;
}

/**
 * Parses a JSON string into an array. If it's an object, it converts values to an array.
 * @param jsonString The JSON string to parse.
 * @returns An array of any type.
 */
export function stringParseJsonToArray(jsonString: string): any[] {
    if (typeof jsonString !== 'string' || !stringIsJson(jsonString)) {
        console.error("Invalid JSON string provided for stringParseJsonToArray.");
        return [];
    }
    try {
        const jsonResult = JSON.parse(jsonString);
        if (Array.isArray(jsonResult)) {
            return jsonResult;
        } else if (typeof jsonResult === 'object' && jsonResult !== null) {
            return Object.values(jsonResult);
        }
        return [];
    } catch (ex) {
        console.error("Error parsing JSON to array:", ex);
        return [];
    }
}

/**
 * Parses a JSON string into an object.
 * @param jsonString The JSON string to parse.
 * @returns An object of any type.
 */
export function stringParseJsonToObject(jsonString: string): any {
    if (typeof jsonString !== 'string' || !stringIsJson(jsonString)) {
        console.error("Invalid JSON string provided for stringParseJsonToObject.");
        return {};
    }
    try {
        const jsonResult = JSON.parse(jsonString);
        if (typeof jsonResult === 'object' && jsonResult !== null && !Array.isArray(jsonResult)) {
            return jsonResult;
        }
        console.warn("JSON string parsed to a non-object type (e.g., array, primitive). Returning empty object.");
        return {};
    } catch (ex) {
        console.error("Error parsing JSON to object:", ex);
        return {};
    }
}

/**
 * Generates a random string (useful for unique IDs).
 * @returns A random string.
 */
export function stringRandom(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Matches a string against a pattern containing placeholders (e.g., "{id}").
 * Extracts values into a provided matches object.
 * @param str The input string to match.
 * @param pattern The pattern string with placeholders.
 * @param matches An object to populate with extracted key-value pairs.
 * @returns True if the string matches the pattern, false otherwise.
 */
export function stringRegexMatch(str: string, pattern: string, matches: { [key: string]: string }): boolean {
    if (typeof str !== 'string' || typeof pattern !== 'string') return false;
    if (typeof matches !== 'object' || matches === null) {
        console.error("stringRegexMatch: 'matches' parameter must be a non-null object.");
        return false;
    }

    const placeholderRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
    const groupNames = Array.from(pattern.matchAll(placeholderRegex)).map(m => m[1]);

    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexString = escapedPattern.replace(/\\\{([a-zA-Z_][a-zA-Z0-9_]*)\\\}/g, '([^/]+)');

    const finalRegex = new RegExp(`^${regexString}$`);
    const rawMatches = finalRegex.exec(str);

    if (!rawMatches) return false;

    for (let i = 0; i < groupNames.length; i++) {
        matches[groupNames[i]] = rawMatches[i + 1] || '';
    }
    return true;
}

// --- Case Conversion Utilities (relying on stringWords) ---

/**
 * Splits a string into words based on common delimiters and casing.
 * @param str The input string.
 * @returns An array of words.
 */
export function stringWords(str: string): string[] {
    if (typeof str !== 'string') return [];

    return str
        // normalize delimiters (_ - . / \ and spaces) → space
        .replace(/[_\-./\\\s]+/g, ' ')
        // split before Uppercase following lowercase or number: helloWorld → hello World, id2User → id2 User
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        // split between acronym and next word: XMLParser → XML Parser
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        // split letters and numbers: order123 → order 123, X9Y → X 9 Y
        .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
        .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
        // trim and split
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}
/**
 * Converts a string to a specified case format.
 * @param str The input string.
 * @param convertTo The target case format.
 * @returns The string converted to the specified case.
 */
export function stringConvertCase(str: string, convertTo: string): string {
    if (typeof str !== 'string') return '';
    switch (convertTo) {
        case 'camel': return stringToCamelCase(str);
        case 'camel_snake': return stringToCamelSnakeCase(str);
        case 'capital': return stringToCapitalCase(str);
        case 'capital_snake': return stringToCapitalSnakeCase(str);
        case 'cobol': return stringToCobolCase(str);
        case 'dot': return stringToDotCase(str);
        case 'kebab': return stringToKebabCase(str);
        case 'lower': return str.toLowerCase();
        case 'pascal': return stringToPascalCase(str);
        case 'pascal_snake': return stringToPascalSnakeCase(str);
        case 'screaming_snake': return stringToScreamingSnakeCase(str);
        case 'sentence': return stringToSentenceCase(str);
        case 'snake': return stringToSnakeCase(str);
        case 'train': return stringToTrainCase(str);
        case 'upper': return str.toUpperCase();
        default: return str;
    }
}


/**
 * Converts a string to camelCase.
 * @param str The input string.
 * @returns The string in camelCase.
 */
export function stringToCamelCase(str: string): string {
    const words = stringWords(str).map(w => w.toLowerCase());
    return words.map((word, index) => {
        if (index === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

/**
 * Converts a string to PascalCase.
 * @param str The input string.
 * @returns The string in PascalCase.
 */
export function stringToPascalCase(str: string): string {
    return stringWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

/**
 * Converts a string to Capital Case (Title Case).
 * @param str The input string.
 * @returns The string in Capital Case.
 */
export function stringToCapitalCase(str: string): string {
    return stringWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

/**
 * Converts a string to Sentence case.
 * @param str The input string.
 * @returns The string in Sentence case.
 */
export function stringToSentenceCase(str: string): string {
    const trimmed = str.toString().trim();
    if (trimmed.length === 0) return '';
    const firstChar = trimmed.charAt(0).toUpperCase();
    const rest = trimmed.slice(1).toLowerCase();
    return firstChar + rest;
}

/**
 * Converts a string to snake_case.
 * @param str The input string.
 * @returns The string in snake_case.
 */
export function stringToSnakeCase(str: string): string {
    return stringWords(str).map(w => w.toLowerCase()).join('_');
}

/**
 * Converts a string to SCREAMING_SNAKE_CASE.
 * @param str The input string.
 * @returns The string in SCREAMING_SNAKE_CASE.
 */
export function stringToScreamingSnakeCase(str: string): string {
    return stringWords(str).map(w => w.toUpperCase()).join('_');
}

/**
 * Converts a string to kebab-case.
 * @param str The input string.
 * @returns The string in kebab-case.
 */
export function stringToKebabCase(str: string): string {
    return stringWords(str).map(w => w.toLowerCase()).join('-');
}

/**
 * Converts a string to COBOL-CASE.
 * @param str The input string.
 * @returns The string in COBOL-CASE.
 */
export function stringToCobolCase(str: string): string {
    return stringWords(str).map(w => w.toUpperCase()).join('-');
}

/**
 * Converts a string to Train-Case.
 * @param str The input string.
 * @returns The string in Train-Case.
 */
export function stringToTrainCase(str: string): string {
    return stringWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('-');
}

/**
 * Converts a string to dot.case.
 * @param str The input string.
 * @returns The string in dot.case.
 */
export function stringToDotCase(str: string): string {
    return stringWords(str).map(w => w.toLowerCase()).join('.');
}


// --- Missing Case Conversions Implementations ---

/**
 * Converts a string to camel_Snake_Case. (e.g., "hello_World_Foo")
 * This is a less common convention. Interpreted as first word lowercase,
 * subsequent words capitalized, all separated by underscores.
 * @param str The input string.
 * @returns The string in camel_Snake_Case.
 */
export function stringToCamelSnakeCase(str: string): string {
    const words = stringWords(str);
    if (words.length === 0) return '';
    return words.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('_');
}

/**
 * Converts a string to Capital_Snake_Case. (e.g., "Hello_World_Foo")
 * This is similar to PascalCase but with underscores as separators.
 * @param str The input string.
 * @returns The string in Capital_Snake_Case.
 */
export function stringToCapitalSnakeCase(str: string): string {
    // This is effectively the same as PascalCase words joined by underscores.
    return stringWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('_');
}

/**
 * Converts a string to Pascal_Snake_Case. (e.g., "Pascal_Snake_Case")
 * This is identical to Capital_Snake_Case.
 * @param str The input string.
 * @returns The string in Pascal_Snake_Case.
 */
export function stringToPascalSnakeCase(str: string): string {
    // In many contexts, Pascal_Snake_Case is identical to Capital_Snake_Case.
    // It's PascalCase words joined by underscores.
    return stringToCapitalSnakeCase(str);
}

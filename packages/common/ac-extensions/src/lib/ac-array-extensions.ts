/**
 * Utility functions for Array manipulation.
 */

/**
 * Returns the difference between two arrays (elements in the first array but not in the second).
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @returns A new array containing elements unique to arr1.
 */
export function arrayDifference<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(x => !arr2.includes(x));
}

/**
 * Returns the symmetrical difference between two arrays (elements unique to either array).
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @returns A new array containing elements unique to arr1 or arr2.
 */
export function arrayDifferenceSymmetrical<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const result: T[] = [];

    for (const item of set1) {
        if (!set2.has(item)) {
            result.push(item);
        }
    }
    for (const item of set2) {
        if (!set1.has(item)) {
            result.push(item);
        }
    }
    return result;
}

/**
 * Returns the intersection of two arrays (elements common to both arrays).
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @returns A new array containing elements present in both arr1 and arr2.
 */
export function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.filter(x => set2.has(x));
}

/**
 * Checks if an array is empty.
 * @param arr The array to check.
 * @returns True if the array is empty, false otherwise.
 */
export function arrayIsEmpty<T>(arr: T[]): boolean {
    return arr.length === 0;
}

/**
 * Checks if an array is not empty.
 * @param arr The array to check.
 * @returns True if the array is not empty, false otherwise.
 */
export function arrayIsNotEmpty<T>(arr: T[]): boolean {
    return arr.length > 0;
}

/**
 * Returns a new array with the given value prepended to it.
 * @param arr The original array.
 * @param value The value to prepend.
 * @returns A new array with the value at the beginning.
 */
export function arrayPrepend<T>(arr: T[], value: T): T[] {
    return [value, ...arr];
}

/**
 * Returns a new array with the first occurrence of the given value removed.
 * Does not modify the original array.
 * @param arr The original array.
 * @param value The value to remove.
 * @returns A new array with the value removed, or the original array if the value was not found.
 */
export function arrayRemove<T>(arr: T[], value: T): T[] {
    const index = arr.indexOf(value);
    if (index === -1) {
        return [...arr];
    }
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

/**
 * Returns a new array with the element at the given index removed.
 * Does not modify the original array.
 * @param arr The original array.
 * @param index The index of the element to remove.
 * @returns A new array with the element at the specified index removed.
 */
export function arrayRemoveByIndex<T>(arr: T[], index: number): T[] {
    if (index < 0 || index >= arr.length) {
        return [...arr];
    }
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

/**
 * Returns the union of two arrays (all unique elements from both arrays).
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @returns A new array containing all unique elements from both arrays.
 */
export function arrayUnion<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set([...arr1, ...arr2]);
    return Array.from(set);
}

/**
 * Converts an array of objects into an object (map/dictionary) using a specified key.
 * @param arr The array of objects.
 * @param key The key property of the objects to use for the result object's keys.
 * @returns A new object where keys are values of the specified property and values are the original objects.
 */
export function arrayToObject<T extends Record<string, any>>(arr: T[], key: string): Record<string, T> {
    const result: Record<string, T> = {};
    arr.forEach((item: T) => {
        if (item && item[key] !== undefined) {
            result[item[key]] = item;
        }
    });
    return result;
}

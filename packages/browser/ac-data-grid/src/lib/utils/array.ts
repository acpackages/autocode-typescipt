/** An array that is always empty and that cannot be modified */
export const _EmptyArray = Object.freeze([]) as unknown as any[];

export function _last<T>(arr: T[]): T;
export function _last<T extends Node>(arr: NodeListOf<T>): T;
export function _last(arr: any): any {
    if (!arr?.length) {
        return;
    }

    return arr[arr.length - 1];
}

export function _areEqual<T>(
    a?: readonly T[] | null,
    b?: readonly T[] | null,
    comparator?: (a: T, b: T) => boolean
): boolean {
    if (a == null && b == null) {
        return true;
    }

    return (
        a != null &&
        b != null &&
        a.length === b.length &&
        a.every((value, index) => (comparator ? comparator(value, b[index]) : b[index] === value))
    );
}

/**
 * Utility that uses the fastest looping approach to apply a callback to each element of the array
 * https://jsperf.app/for-for-of-for-in-foreach-comparison
 */
export function _forAll<T>(array: T[] | undefined, callback: (value: T) => void) {
    if (!array) {
        return;
    }
    for (const value of array) {
        callback(value);
    }
}

export function _removeFromArray<T>(array: T[], object: T) {
    const index = array.indexOf(object);

    if (index >= 0) {
        array.splice(index, 1);
    }
}

// should consider refactoring the callers to create a new array rather than mutating the original, which is expensive
export function _moveInArray<T>(array: T[], objectsToMove: T[], toIndex: number) {
    // first take out items from the array
    for (let i = 0; i < objectsToMove.length; i++) {
        _removeFromArray(array, objectsToMove[i]);
    }

    // now add the objects, in same order as provided to us, that means we start at the end
    // as the objects will be pushed to the right as they are inserted
    for (let i = objectsToMove.length - 1; i >= 0; i--) {
        array.splice(toIndex, 0, objectsToMove[i]);
    }
}

export function _flatten<T>(arrays: Array<T[]>): T[] {
    // Currently the fastest way to flatten an array according to https://jsbench.me/adlib26t2y/2
    return ([] as T[]).concat.apply([], arrays);
}

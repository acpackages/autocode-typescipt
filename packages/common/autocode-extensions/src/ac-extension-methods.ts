/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './lib/ac-array-extensions';
import './lib/ac-blob-extensions';
import './lib/ac-datetime-extensions';
import './lib/ac-file-extensions';
import './lib/ac-number-extensions';
import './lib/ac-object-extensions';
import './lib/ac-string-extensions';
/* Array Extension Methods Start */

export function arrayDifference(value: any[], arr: any[]): any[] {
    return value.difference(arr);
};

export function arrayDifferenceSymmetrical(value: any[], arr: any[]): any[] {
    return value.differenceSymmetrical(arr);
};

export function arrayIntersection(value: any[], arr: any[]): any[] {
    return value.intersection(arr);
};

export function arrayIsEmpty(value: any[]): boolean {
    return value.isEmpty();
};

export function arrayIsNotEmpty(value: any[]): boolean {
    return value.isNotEmpty();
};

export function arrayPrepend(value: any[], prependValue: any): any[] {
    return value.prepend(prependValue);
};

export function arrayRemove(value: any[], removeValue: any): any[] {
    return value.remove(removeValue);
};

export function arrayRemoveByIndex(value: any[], index: number): any[] {
    return value.removeByIndex(index);
};

export function arrayUnion(value: any[], arr: any[]): any[] {
    return value.union(arr);
};

export function arrayToObject(value: any[], key: string): Record<string, any> {
    return value.toObject(key);
};

/* Array Extension Methods End */

/* Blob Extension Methods Start */

export function blobToBase64(blob: Blob): Promise<string> {
    return blob.toBase64();
}

/* Blob Extension Methods End*/

/* File Extension Methods Start */

export function fileFromBase64(fileBase64String: string, fileName: string): File {
    const arr: any = fileBase64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}


export async function fileToBytesObject(value: File): Promise<any> {
    return value.toBytesObject();
};

export async function fileToBlobObject(value: File): Promise<any> {
   return value.toBlobObject();
};

/* File Extension Methods End */

/* Number Extension Methods Start */

export function numberRound(number: any, decimals = 0): number {
    let result = 0;
    try {
        if (number != undefined && number != null && !isNaN(number)) {
            result = parseFloat(number.toString()).round(decimals);
        }
    } catch (e) {
    }
    return result;
}

/* Number Extension Methods End */

/* Object Extension Methods Start */

export function objectChanges(value:any,newObject: any): any {
    return value.changes(newObject);
};


export function objectClone(value:any): any {
    return value.clone();
};

export function objectCopyFrom(value:any,source: any): any {
    return value.copyFrom(source);
};

export function objectCopyTo(value:any,destination: any): any {
    return value.copyTo(value);
};

export function objectContainsKey(value:any,key: any): any {
    return value.containsKey(key);
};

export function objectFilter(value:any,filterFunction: (key: string, value: any) => boolean): any {
    return value.filter(filterFunction);
};

export function objectIsEmpty(value:any): boolean {
    return value.isEmpty();
}

export function objectIsNotEmpty(value:any): boolean {
    return value.isNotEmpty();
}

export function objectIsSame(value:any,compareObject: any): boolean {
    return value.isSame(compareObject);
}

export function objectToQueryString(value:any): string {
    return value.toQueryString();
}


/* Object Extension Methods End */

/* String Extension Methods Start */

export function stringGetExtension(value: string): string {
    return value.getExtension();
};

export function stringIsEmpty(value: string): boolean {
    return value.isEmpty();
};

export function stringIsJson(value: string): boolean {
    return value.isJson();
};

export function stringIsNotEmpty(value: string): boolean {
   return value.isNotEmpty();
};

export function stringIsNumeric(value: string): boolean {
    return value.isNumeric();
};

export function stringRandom(): string {
    return Math.random().toString(36).replace('0.', '') + Date.now();
};

export function stringParseJsonToArray(value: string): any[] {
    return value.parseJsonToArray();
};

export function stringParseJsonToObject(value: string): any[] {
    return value.parseJsonToObject();
};

export function stringToCapitalCase(value: string): string {
    return value.toCapitalCase();
};

/* String Extension Methods End */

// src/app/utils/blob-utils.ts (or a similar path)

/**
 * Converts a Blob object to a Base64 string.
 * @param blob The Blob object to convert.
 * @returns A Promise that resolves with the Base64 string (without the "data:mime/type;base64," prefix).
 */
export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1];
            if (base64String) {
                resolve(base64String);
            } else {
                reject(new Error('Failed to read Blob as data URL or extract Base64 string.'));
            }
        };

        reader.onerror = (error) => {
            reject(new Error(`Failed to convert Blob to Base64: ${error?.target?.error?.name || 'Unknown Error'}`));
        };

        reader.readAsDataURL(blob);
    });
}

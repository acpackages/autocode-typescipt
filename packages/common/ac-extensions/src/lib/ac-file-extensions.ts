// src/app/interfaces/file-data.interface.ts (or wherever you keep your interfaces)

export interface FileBlobData {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  blob: Blob; // Explicitly a Blob type
}

export interface FileBytesData {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  bytes: number[]; // Explicitly an array of numbers (Uint8Array values)
}

/**
 * Utility functions for File object manipulation.
 */

/**
 * Converts a File object into a structured object containing its metadata and a Blob representation.
 * @param file The File object to process.
 * @returns A Promise that resolves with an object containing file metadata and a Blob.
 */
export async function fileToBlobObject(file: File): Promise<FileBlobData> {
  if (!(file instanceof File)) {
    throw new TypeError('Input must be a File object.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });

  return {
    name: file.name,
    lastModified: file.lastModified,
    size: file.size,
    type: file.type,
    blob: blob,
  };
}

/**
 * Converts a File object into a structured object containing its metadata and byte array.
 * @param file The File object to process.
 * @returns A Promise that resolves with an object containing file metadata and its byte array.
 */
export async function fileToBytesObject(file: File): Promise<FileBytesData> {
  if (!(file instanceof File)) {
    throw new TypeError('Input must be a File object.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = Array.from(new Uint8Array(arrayBuffer)); // Convert Uint8Array to a regular number array

  return {
    name: file.name,
    lastModified: file.lastModified,
    size: file.size,
    type: file.type,
    bytes: bytes,
  };
}

// Example of a potentially more commonly used utility:
/**
 * Reads the content of a File as a Base64 string.
 * @param file The File object to read.
 * @returns A Promise that resolves with the Base64 string (without the "data:mime/type;base64," prefix).
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error('Failed to read File as data URL or extract Base64 string.'));
      }
    };
    reader.onerror = (error) => {
      reject(new Error(`Failed to convert File to Base64: ${error?.target?.error?.name || 'Unknown Error'}`));
    };
    reader.readAsDataURL(file);
  });
}

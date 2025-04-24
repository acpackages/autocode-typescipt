declare global {
    interface Blob {
        toBase64(): Promise<string>;
    }
}

Blob.prototype.toBase64 = function <T>(): Promise<string> {
    let blob = this;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1] || '';
            resolve(base64String);
        };
        reader.onerror = () => {
            reject(new Error('Failed to convert Blob to Base64'));
        };
        reader.readAsDataURL(blob);
    });
};

export { };
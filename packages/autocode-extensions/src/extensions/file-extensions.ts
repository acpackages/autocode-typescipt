declare global {
    interface File {        
        toBlobObject(): Promise<any>;
        toBytesObject(): Promise<any>;
    }
}


File.prototype.toBlobObject = async function (): Promise<any> {
    const result: any = {
        name: this.name,
        lastModified: this.lastModified,
        size: this.size,
        type: this.type,
    };
    result.blob = new Blob([new Uint8Array(await this.arrayBuffer())], { type: this.type });
    return result;
};

File.prototype.toBytesObject = async function (): Promise<any> {
    const result: any = {
        name: this.name,
        lastModified: this.lastModified,
        size: this.size,
        type: this.type,
    };
    result.bytes = Object.values(new Uint8Array(await this.arrayBuffer()));
    return result;
};


export { };

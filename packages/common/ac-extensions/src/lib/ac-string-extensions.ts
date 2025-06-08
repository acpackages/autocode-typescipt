/* eslint-disable prefer-const */

declare global {
    interface String {
        getExtension(): string;
        isEmpty(): boolean;
        isJson(): boolean;
        isNotEmpty(): boolean;
        isNumeric(): boolean;
        parseJsonToArray(): any[];
        parseJsonToObject(): any;
        random(): string;
        toCapitalCase(): string;
    }
}

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

String.prototype.toCapitalCase = function (): string {
    let words = this.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
};

export { };

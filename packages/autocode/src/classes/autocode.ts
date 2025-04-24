import { AcLogger } from "./_classes";

export class Autocode {
    static uniqueIds: any = {};
    static logger: AcLogger = new AcLogger();
    static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    static enumToObject<T>(enumType: any): Record<string, T[keyof T]> {
        return Object.keys(enumType)
            .filter((key) => isNaN(Number(key)))
            .reduce((obj, key) => {
                obj[key] = enumType[key as keyof T];
                return obj;
            }, {} as Record<string, T[keyof T]>);
    }

    static generateRandomString(length: number = 10): string {
        let result = '';
        try {
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * Autocode.characters.length);
                result += Autocode.characters.charAt(randomIndex);
            }
        }
        catch (ex) { }
        return result;
    }

    static getClassNameFromInstance(instance: any): string {
        return instance.constructor.name.substring(1);
    }

    static isBrowser(): boolean {
        return typeof window !== 'undefined';
    }

    static isValidPrimaryKey(value: any): boolean {
        let valid: boolean = false;
        if (value != null && value != undefined) {
            if (typeof value == "string") {
                if (value != "0" && value != "") {
                    valid = true;
                }
            }
            if (typeof value == "number") {
                if (value != 0 && !isNaN(value)) {
                    valid = true;
                }
            }
        }
        return valid;
    }

    static isValidValue(value: any): boolean {
        try {
            if (value != undefined && value != null) {
                return true;
            }
        }
        catch (ex) { }
        return false;
    }

    static uniqueId(): string {
        let id: string = "";
        try {
            let timestamp = new Date().getTime().toString(16);
            let randomPart = Math.random().toString(16).substring(2);
            id = "simId_" + Autocode.generateRandomString() + timestamp + randomPart;
            if (Autocode.isValidValue(Autocode.uniqueIds[timestamp])) {
                while (Autocode.isValidValue(Autocode.uniqueIds[timestamp][id])) {
                    randomPart = Math.random().toString(16).substring(2);
                    id = "simId_" + Autocode.generateRandomString() + timestamp + randomPart;
                }
            }
            else {
                Autocode.uniqueIds[timestamp] = {};
            }
            Autocode.uniqueIds[timestamp][id] = id;
        }
        catch (ex) {
        }
        return id;
    }

}

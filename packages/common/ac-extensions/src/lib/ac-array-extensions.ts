declare global {
    interface Array<T> {
        difference(arr: T[]): T[];
        differenceSymmetrical(arr: T[]): T[];
        intersection(arr: T[]): T[];
        isEmpty(): boolean;
        isNotEmpty(): boolean;
        prepend(value: T): T[];
        remove(value: T): T[];
        removeByIndex(index: number): T[];
        union(arr: T[]): T[];
        toObject(key: string): Record<string, any>;
    }
}

Array.prototype.difference = function <T>(arr: T[]): T[] {
    return this.filter(x => !arr.includes(x));
};

Array.prototype.differenceSymmetrical = function <T>(arr: T[]): T[] {
    return this.filter(x => !arr.includes(x)).concat(arr.filter(x => !this.includes(x)));
};

Array.prototype.intersection = function <T>(arr: T[]): T[] {
    return this.filter(x => arr.includes(x));
};

Array.prototype.isEmpty = function <T>(): boolean {
    return this.length == 0;
};

Array.prototype.isNotEmpty = function <T>(): boolean {
    return this.length > 0;
};

Array.prototype.prepend = function <T>(value: T): T[] {
    return [value, ...this];
};

Array.prototype.remove = function <T>(value: T): T[] {
    const index = this.indexOf(value);
    if (index >= 0) {
        this.splice(index, 1);
    }
    return this;
};

Array.prototype.removeByIndex = function <T>(index: number): T[] {
    if (index >= 0 && index < this.length) {
        this.splice(index, 1);
    }
    return this;
};

Array.prototype.union = function <T>(arr: T[]): T[] {
    const set = new Set([...this, ...arr]);
    return Array.from(set);
};

Array.prototype.toObject = function (key: string): Record<string, any> {
    const result: Record<string, any> = {};
    this.forEach((item: any) => {
        result[item[key]] = item;
    });
    return result;
};

export { };

declare global {
    interface Number {
        isEven(): boolean;
        isOdd(): boolean;        
        round(decimals: number): number;
    }
}

Number.prototype.isEven = function (): boolean {
    let value:any = this;
    return value % 2 == 0;
};

Number.prototype.isOdd = function (): boolean {
    let value:any = this;
    return value % 2 !== 0;
};

Number.prototype.round = function (decimals: number = 2): number {
    let result: number = 0;
    try {
        let numberString = parseFloat(this.toString());
        let multiple: number = 1;
        if (decimals > 0) {
            let index: number = 0;
            while (index < decimals) {
                multiple *= 10;
                index++;
            }
        }
        result = Math.round((result * multiple)) / multiple;
    } catch (e) {
    }
    return result;
};

export { }

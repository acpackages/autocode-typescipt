export interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

export class AcPipeRegistry {
    private static pipes = new Map<string, PipeTransform>();

    static register(name: string, pipe: PipeTransform) {
        this.pipes.set(name, pipe);
    }

    static getPipe(name: string): PipeTransform {
        const pipe = this.pipes.get(name);
        if (!pipe) {
            throw new Error(`Pipe '${name}' not found.`);
        }
        return pipe;
    }
}

// Built-in pipes
AcPipeRegistry.register('uppercase', {
    transform(value: any) {
        return String(value).toUpperCase();
    }
});

AcPipeRegistry.register('lowercase', {
    transform(value: any) {
        return String(value).toLowerCase();
    }
});

AcPipeRegistry.register('json', {
    transform(value: any) {
        // Handle circular references
        const seen = new WeakSet();
        return JSON.stringify(value, (key, val) => {
            if (typeof val === 'object' && val !== null) {
                if (seen.has(val)) {
                    return '[Circular]';
                }
                seen.add(val);
            }
            return val;
        }, 2);
    }
});

export const acPipeRegistry = AcPipeRegistry;

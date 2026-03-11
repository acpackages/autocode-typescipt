export type AcPipeTransform = (value: any, ...args: any[]) => any | Promise<any>;

export interface IAcPipe {
  name: string;
  transform: AcPipeTransform;
  pure?: boolean; // true by default (recomputes only if args change)
}

export class AcPipeRegistry {
  private static pipes = new Map<string, IAcPipe>();

  static register(pipe: IAcPipe) {
    this.pipes.set(pipe.name.toLowerCase(), pipe);
  }

  static getPipe({name}:{name: string}): IAcPipe {
    const pipe = this.pipes.get(name.toLowerCase());
    if (!pipe) {
      throw new Error(`Pipe '${name}' not found.`);
    }
    return pipe;
  }
}

export const acPipeRegistry = AcPipeRegistry;

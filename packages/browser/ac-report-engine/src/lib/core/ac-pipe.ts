export type AcPipeTransform = (value: any, ...args: any[]) => any | Promise<any>;

export interface AcPipe {
  name:string;
  transform: AcPipeTransform;
  pure?: boolean; // true by default (recomputes only if args change)
}

import type { CellRange } from '../interfaces/IRangeService';
import type { CellValueChange } from './iUndoRedo';

export class AcDGUndoRedoAction {
    cellValueChanges: CellValueChange[];

    constructor(cellValueChanges: CellValueChange[]) {
        this.cellValueChanges = cellValueChanges;
    }
}

export class AcDGRangeUndoRedoAction extends UndoRedoAction {
    constructor(
        cellValueChanges: CellValueChange[],
        public readonly initialRange?: CellRange,
        public readonly finalRange?: CellRange,
        public readonly ranges?: CellRange[]
    ) {
        super(cellValueChanges);
    }
}

const DEFAULT_STACK_SIZE = 10;
export class AcDGUndoRedoStack {
    private readonly maxStackSize: number;

    private actionStack: UndoRedoAction[] = [];

    constructor(maxStackSize?: number) {
        this.maxStackSize = maxStackSize ? maxStackSize : DEFAULT_STACK_SIZE;
        this.actionStack = new Array<UndoRedoAction>(this.maxStackSize);
    }

    public pop(): UndoRedoAction | undefined {
        return this.actionStack.pop();
    }

    public push(item: UndoRedoAction): void {
        const shouldAddActions = item.cellValueChanges && item.cellValueChanges.length > 0;

        if (!shouldAddActions) {
            return;
        }

        if (this.actionStack.length === this.maxStackSize) {
            this.actionStack.shift();
        }

        this.actionStack.push(item);
    }

    public clear(): void {
        this.actionStack = [];
    }

    public getCurrentStackSize(): number {
        return this.actionStack.length;
    }
}

import type { AgPromise } from '../utils/promise';
import type { IComponent } from './iComponent';

export interface IAcDGUserCompDetails<TComp extends IComponent<any> = any> {
    componentClass: any;
    componentFromFramework: boolean;
    params: any;
    type: ComponentType;
    popupFromSelector?: boolean;
    popupPositionFromSelector?: 'over' | 'under';
    newAgStackInstance: () => AgPromise<TComp>;
}

export interface IAcDGComponentType<TComp = any> {
    name: string;
    cellRenderer?: boolean;
    mandatoryMethods?: (keyof TComp & string)[];
    optionalMethods?: (keyof TComp & string)[];
}

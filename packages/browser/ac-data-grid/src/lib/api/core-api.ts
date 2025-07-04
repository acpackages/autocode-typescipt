import type { BeanCollection } from '../context/context';
import type { GridOptions } from '../entities/gridOptions';
import type { ManagedGridOptionKey, ManagedGridOptions } from '../gridOptionsInitial';
import type { AgModuleName, ModuleName } from '../interfaces/iModule';

export function getGridId(beans: BeanCollection): string {
    return beans.context.getGridId();
}

export function destroy(beans: BeanCollection): void {
    beans.gridDestroySvc.destroy();
}

export function isDestroyed(beans: BeanCollection): boolean {
    return beans.gridDestroySvc.destroyCalled;
}

export function getGridOption<Key extends keyof GridOptions<TData>, TData = any>(
    beans: BeanCollection,
    key: Key
): GridOptions<TData>[Key] {
    return beans.gos.get(key);
}

export function setGridOption<Key extends ManagedGridOptionKey, TData = any>(
    beans: BeanCollection,
    key: Key,
    value: GridOptions<TData>[Key]
): void {
    updateGridOptions(beans, { [key]: value });
}

export function updateGridOptions<TDataUpdate = any>(
    beans: BeanCollection,
    options: ManagedGridOptions<TDataUpdate>
): void {
    // NOTE: The TDataUpdate generic is used to ensure that the update options match the generic passed into the GridApi above as TData.
    // This is required because if we just use TData directly then Typescript will get into an infinite loop due to callbacks which recursively include the GridApi.
    beans.gos.updateGridOptions({ options });
}

export function isModuleRegistered(beans: BeanCollection, moduleName: AgModuleName): boolean {
    const withoutSuffix = moduleName.replace(/Module$/, '') as ModuleName;
    return beans.gos.isModuleRegistered(withoutSuffix);
}

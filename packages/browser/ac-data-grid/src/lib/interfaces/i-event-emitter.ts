import type { IAcDataGridEvent } from '../events';

export type EventTypeMap<T extends string = any> = { [K in T]: IAcDataGridEvent<K> };
export type BuildEventTypeMap<TEventTypes extends string, T extends { [K in TEventTypes]: IAcDataGridEvent<K> }> = T;

export type IEventListener<TEventType extends string> = (params: IAcDataGridEvent<TEventType>) => void;
export type IGlobalEventListener<TEventType extends string> = (
    eventType: TEventType,
    event: IAcDataGridEvent<TEventType>
) => void;
export interface IEventEmitter<TEventType extends string> {
    addEventListener(
        eventType: TEventType,
        listener: IEventListener<TEventType>,
        async?: boolean,
        options?: AddEventListenerOptions
    ): void;
    removeEventListener(
        eventType: TEventType,
        listener: IEventListener<TEventType>,
        async?: boolean,
        options?: AddEventListenerOptions
    ): void;
}

/** Internal version of IEventEmitter so that we can avoid the public api methods on RowNode and Column that need
 * to handle the Angular Zone wrapping of event handlers.
 */
export interface IAgEventEmitter<TEventType extends string> {
    __addEventListener(
        eventType: TEventType,
        listener: IEventListener<TEventType>,
        async?: boolean,
        options?: AddEventListenerOptions
    ): void;
    __removeEventListener(
        eventType: TEventType,
        listener: IEventListener<TEventType>,
        async?: boolean,
        options?: AddEventListenerOptions
    ): void;
}

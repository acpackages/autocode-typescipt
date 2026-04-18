import { acNullifyInstanceProperties } from "@autocode-ts/autocode";

export class AcDataBridgeSocket {
    private listeners: Record<string, Function[]> = {};

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = this.listeners[event].filter(l => l !== callback);
    }

    emit(event: string, data?: any) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in AcDataBridgeSocket listener for event "${event}":`, error);
            }
        });
    }

    destroy() {
        this.listeners = {};
        acNullifyInstanceProperties({ instance: this });
    }
}

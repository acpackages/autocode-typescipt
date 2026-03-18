/* eslint-disable @typescript-eslint/no-inferrable-types */
export type EventHandler = (data: any, ack?: (response: any) => void) => void;

export class AcWsClient {
    private _webSocket: WebSocket | null = null;
    private _isConnected = false;
    private _eventHandlers: Record<string, EventHandler[]> = {};
    private _reconnectTimeout: any = null;
    private _shouldReconnect = true;
    private _ackCounter = 0;
    private _pendingAcks: Record<number, { resolve: (data: any) => void; timeout: any }> = {};

    constructor(
        public readonly url: string,
        public readonly nsp: string = '/',
        public readonly query: Record<string, string> = {},
        public readonly options: { rejectUnauthorized?: boolean; timeout?: number } = {}
    ) { }

    /* Converts http(s) URLs to ws(s) scheme automatically */
    private _toWsUrl(url: string): string {
        if (url.startsWith('https://')) return 'wss://' + url.slice(8);
        if (url.startsWith('http://')) return 'ws://' + url.slice(7);
        return url;
    }

    public async connect(): Promise<void> {
        this._shouldReconnect = true;
        const urlObj = new URL(this._toWsUrl(this.url));
        Object.entries(this.query).forEach(([key, value]) => {
            urlObj.searchParams.set(key, value);
        });
        urlObj.searchParams.set('nsp', this.nsp);

        try {
            // In Node.js, pass rejectUnauthorized for self-signed certs
            if (typeof globalThis.process !== 'undefined' && this.options.rejectUnauthorized === false) {
                this._webSocket = new WebSocket(urlObj.toString(), {
                    rejectUnauthorized: false,
                } as any);
            } else {
                this._webSocket = new WebSocket(urlObj.toString());
            }
            this._webSocket.binaryType = 'arraybuffer';

            this._webSocket.onopen = () => {
                this._isConnected = true;
                this._handleEvent('connect', null);
            };

            this._webSocket.onmessage = (event) => {
                if (event.data instanceof ArrayBuffer) {
                    this._handleBinary(new Uint8Array(event.data));
                    return;
                }

                try {
                    const decoded = JSON.parse(event.data);
                    const nsp = decoded.n || '/';
                    if (nsp !== this.nsp) return;

                    const eventName = decoded.e;
                    const payload = decoded.d;
                    const ackId = decoded.a;
                    const respId = decoded.r;

                    if (respId !== undefined) {
                        const pending = this._pendingAcks[respId];
                        if (pending) {
                            if (pending.timeout) {
                                clearTimeout(pending.timeout);
                            }
                            pending.resolve(payload);
                            delete this._pendingAcks[respId];
                        }
                        return;
                    }

                    if (eventName) {
                        this._handleEvent(eventName, payload, ackId);
                    }
                } catch (e) {
                    // Ignore malformed messages
                }
            };

            this._webSocket.onclose = () => this._handleDisconnect();
            this._webSocket.onerror = () => this._handleDisconnect();
        } catch (e) {
            this._handleDisconnect();
        }
    }

    private _handleBinary(data: Uint8Array): void {
        this._handleEvent('binary', data);
    }

    public on(event: string, handler: EventHandler): void {
        if (!this._eventHandlers[event]) {
            this._eventHandlers[event] = [];
        }
        this._eventHandlers[event].push(handler);
    }

    private _handleEvent(event: string, data: any, ackId?: number): void {
        const handlers = this._eventHandlers[event];
        if (handlers) {
            for (const handler of handlers) {
                if (ackId !== undefined) {
                    handler(data, (response: any) => {
                        this._send({ r: ackId, d: response, n: this.nsp });
                    });
                } else {
                    handler(data);
                }
            }
        }
    }

    public get volatile(): AcWsVolatileClient {
        return new AcWsVolatileClient(this);
    }

    public emit(event: string, data: any, volatile = false): Promise<any> {
        return new Promise((resolve) => {
            const ackId = ++this._ackCounter;

            let timeout: any = null;
            if (this.options.timeout && this.options.timeout > 0) {
                timeout = setTimeout(() => {
                    if (this._pendingAcks[ackId]) {
                        delete this._pendingAcks[ackId];
                        resolve(null);
                    }
                }, this.options.timeout);
            }

            this._pendingAcks[ackId] = { resolve, timeout };

            this._send({
                e: event,
                d: data,
                a: ackId,
                n: this.nsp,
                ...(volatile ? { v: true } : {}),
            });
        });
    }

    private _send(map: Record<string, any>): void {
        if (this._isConnected && this._webSocket && this._webSocket.readyState === WebSocket.OPEN) {
            this._webSocket.send(JSON.stringify(map));
        }
    }

    public sendBinary(bytes: Uint8Array): void {
        if (this._isConnected && this._webSocket && this._webSocket.readyState === WebSocket.OPEN) {
            this._webSocket.send(bytes.buffer);
        }
    }

    private _handleDisconnect(): void {
        if (!this._isConnected && this._reconnectTimeout !== null) return;

        this._isConnected = false;
        this._webSocket = null;
        this._handleEvent('disconnect', null);

        if (this._shouldReconnect) {
            this._reconnectTimeout = setTimeout(() => {
                this._reconnectTimeout = null;
                this.connect();
            }, 2000);
        }
    }

    public disconnect(): void {
        this._shouldReconnect = false;
        if (this._reconnectTimeout) {
            clearTimeout(this._reconnectTimeout);
            this._reconnectTimeout = null;
        }
        if (this._webSocket) {
            this._webSocket.close();
            this._webSocket = null;
        }
        this._isConnected = false;
    }

    public get isConnected(): boolean {
        return this._isConnected;
    }
}

export class AcWsVolatileClient {
    constructor(private _client: AcWsClient) { }
    public emit(event: string, data: any): void {
        this._client.emit(event, data, true);
    }
}

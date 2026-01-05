/// <reference lib="webworker" />

import * as Comlink from 'comlink';
import { AcDataBridgeWorker } from '@autocode-ts/ac-data-bridge';

const instance = new AcDataBridgeWorker();
Comlink.expose(instance);
//
export {};

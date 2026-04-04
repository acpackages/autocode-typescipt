import { acNullifyInstanceProperties } from '../utils/ac-utility-functions';
import { Autocode } from './autocode';

export class AcBackgroundFile {
  private filePath: string;
  private isClosed = false;
  private tempBuffer: any[] = [];
  private processingBuffer: any = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private workerIntialized: boolean = false;
  private worker: any | null = null;

  constructor({ filePath }: { filePath: string }) {
    this.filePath = filePath;
    if (Autocode.isBrowser()) {
      this.intizalizeBrowserBackgroundFile();
    } else {
      this.initializeNodeBackgroundFile();
    }
  }

  public close() {
    this.isClosed = true;
    if (this.worker) {
      this.worker.terminate(); // Terminate the worker when done
    }
  }

  destroy() {
    acNullifyInstanceProperties({ instance: this });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private intizalizeBrowserBackgroundFile() {
  }

  private async initializeNodeBackgroundFile() {
    this.notifyWorkerInitialized();
  }

  private log({ message }: { message: any }) {
    // Optional logging method
  }

  notifyWorkerInitialized() {
    this.processBuffer();
    this.workerIntialized = true;
  }

  public writeAsString({ content }: { content: string }) {
    this.tempBuffer.push(content);
    if (this.workerIntialized) {
      this.processBuffer();
    }
  }

  private processBuffer() {
    if (!this.processingBuffer) {
      if (this.tempBuffer.length > 0 && this.worker) {
        this.processingBuffer = true;
        // eslint-disable-next-line prefer-const
        let content = this.tempBuffer.shift();
        this.worker.postMessage({ filePath: this.filePath, content: content + '\n' });
      }
    }
  }
}


import { Autocode } from '../index';

export class AcBackgroundFile {
  private filePath: string;
  private isClosed = false;
  private tempBuffer: any[] = [];
  private processingBuffer:any = false;
  private workerIntialized: boolean = false;
  private worker: any | null = null;

  constructor(filePath: string) {
    this.filePath = filePath;
    if (Autocode.isBrowser()) {
      this.intizalizeBrowserBackgroundFile();
    }
    else {
      this.initializeNodeBackgroundFile();
    }
  }

  public close() {
    this.isClosed = true;
    if (this.worker) {
      this.worker.terminate();  // Terminate the worker when done
    }
  }

  private intizalizeBrowserBackgroundFile() {
  }

  private async initializeNodeBackgroundFile() {
    // const { Worker } = await import('worker_threads');
    // const inlineWorkerCode = `
    //       import { parentPort } from 'worker_threads';
    //       import { promises as fs } from 'fs';

    //       parentPort.on('message', async (data) => {
    //           const { filePath, content } = data;
    //           try {
    //               await fs.appendFile(filePath, content);
    //               parentPort.postMessage('content_written');
    //           } catch (error) {
    //               parentPort.postMessage('Error writing to file: ' + error.message);
    //           }
    //       });
    //       parentPort.postMessage('worker_initiazlized');
    //   `;
    // this.worker = new Worker(inlineWorkerCode, { eval: true });
    // this.worker.on('message', (msg: any) => {      
    //   this.processingBuffer = false;
    //   if(msg=="content_written" || msg == "worker_initiazlized"){
    //     this.processBuffer();
    //   }
    // });
    // this.worker.on('error', (err: any) => {
    //   console.error('Worker error:', err);
    // });
    // this.worker.on('exit', (code: any) => {
    //   if (code !== 0) {
    //     console.error(`Worker stopped with exit code ${code}`);
    //   }
    // });
    this.notifyWorkerInitialized();
  }

  private log(message: any) {
    // Optional logging method
  }

  notifyWorkerInitialized() {
    this.processBuffer();    
    this.workerIntialized = true;
  }

  public writeAsString(content: string) {
    this.tempBuffer.push(content);
    if(this.workerIntialized){
      this.processBuffer();  
    }
  }

  private processBuffer() {
    if(!this.processingBuffer){
      if(this.tempBuffer.length > 0){
        this.processingBuffer = true;
        let content = this.tempBuffer.shift();
        this.worker.postMessage({ filePath: this.filePath, content: content + '\n' });
      }
    }
  }

}

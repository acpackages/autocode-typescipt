/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AcBase, AutocodeService } from '@autocode-ts/ac-angular';
import { Autocode } from '@autocode-ts/autocode';
import { AcNodeComponent } from '../ac-node/ac-node.component';
import { ClassicPreset } from 'rete';
import { IAcNodeConnectionEvent } from '../../interfaces/ac-node-connection-event.interface';
import { AcEnumNodeConnectionStatus } from '../../enums/ac-node-connection-status.enum';

@Component({
  selector: 'ac-node-socket',
  standalone: false,
  templateUrl: './ac-node-socket.component.html',
  styleUrl: './ac-node-socket.component.css'
})
export class AcNodeSocketComponent extends AcBase {
  @Input() allowMultipleConnections: boolean = false;
  @Input() isInput: boolean = false;
  @Input() isOutput: boolean = false;
  @Input() name: string = "";
  @Input() socketId: string = "";
  @Input() value: any = "";
  @Input() acNodeComponent!: AcNodeComponent;
  @Output() connected: EventEmitter<any> = new EventEmitter<any>();
  @Output() disconnected: EventEmitter<any> = new EventEmitter<any>();
  @Output() initialized: EventEmitter<any> = new EventEmitter<any>();

  override commentElementTag: boolean = false;
  connections: any = {};
  data: any = {};
  hasConnections: boolean = false;
  uniqueIdentifier: string = Autocode.uniqueId();

  constructor(elementRef: ElementRef, autocodeService: AutocodeService, private cdr: ChangeDetectorRef) {
    super(elementRef, autocodeService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.autoBindComponent();
    this.initialized.emit(this);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.acNodeComponent) {
      this.acNodeComponent.emit({ type: 'unmount', data: { element: this.elementRef.nativeElement } });
    }
  }

  autoBindComponent() {
    this.setSocketId();
    if (this.acNodeComponent) {
      if (this.acNodeComponent.acNodeEditorComponent) {
        if(this.isInput){
          const input = new ClassicPreset.Input(this, this.socketId, this.allowMultipleConnections);
          this.acNodeComponent.node!.addInput(this.socketId, input);
          this.data = { type: 'socket', side: 'input', key: this.socketId, nodeId: this.acNodeComponent.node!.id, seed: this.acNodeComponent.seed, input: input };
          this.emitChanges();
        }
        if(this.isOutput){
          const output = new ClassicPreset.Output(this, this.socketId, this.allowMultipleConnections);
          this.acNodeComponent.node!.addOutput(this.socketId, output);
          this.data = { type: 'socket', side: 'output', key: this.socketId, nodeId: this.acNodeComponent.node!.id, seed: this.acNodeComponent.seed, output: output };
          this.emitChanges();
        }
      }
    }
  }

  emitChanges() {
    if (this.acNodeComponent) {
      this.acNodeComponent.emit({ type: 'render', data: { ...this.data, element: this.elementRef.nativeElement } });
    }
    else{
      setTimeout(() => {
        this.emitChanges();
      }, 500);
    }
  }


  notifyConnectionChange(connectionEvent: IAcNodeConnectionEvent) {
    if (connectionEvent.connectionStatus == AcEnumNodeConnectionStatus.connected) {
      this.acNodeComponent.acNodeEditorComponent.logger.log("Input " + this.socketId + " connected to node " + connectionEvent.sourceNodeId + "'s output " + connectionEvent.sourceSocketId);
      this.connections[connectionEvent.connectionId] = connectionEvent;
      if (!this.acNodeComponent.acNodeEditorComponent.importStatus.working) {
        this.connected.emit(connectionEvent);
        this.acNodeComponent.notifyInputConnected(connectionEvent);
      }
    }
    else if (connectionEvent.connectionStatus == AcEnumNodeConnectionStatus.disconnected) {
      this.acNodeComponent.acNodeEditorComponent.logger.log("Input " + this.socketId + " disconnected from node " + connectionEvent.sourceNodeId + "'s output " + connectionEvent.sourceSocketId);
      delete this.connections[connectionEvent.connectionId];
      if (!this.acNodeComponent.acNodeEditorComponent.importStatus.working) {
        this.disconnected.emit(connectionEvent);
        this.acNodeComponent.notifyInputDisconnected(connectionEvent);
      }
    }
    this.acNodeComponent.inputConnections = this.connections;
    this.hasConnections = Object.keys(this.connections).length > 0;
  }

  setSocketId() {
    if (this.socketId == "") {
      let nodeId: string = "";
      if (this.acNodeComponent) {
        nodeId = this.acNodeComponent.nodeId;
      }
      let result: string = "input_";
      if (this.name != "") {
        result += this.name + "_" + nodeId;
      }
      else {
        result += nodeId + "_" + this.uniqueIdentifier;
      }
      this.socketId = result;
    }
  }
}

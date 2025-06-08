/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { AcBase } from '@autocode-ts/ac-angular';
import { AcNodeEditorComponent } from '../ac-node-editor/ac-node-editor.component';

@Component({
    selector: 'ac-node-connection',
    templateUrl: './ac-node-connection.component.html',
    styleUrl: './ac-node-connection.component.css',
    standalone: false
})
export class AcNodeConnectionComponent extends AcBase{
  @Input() data!: any;
  @Input() start: any;
  @Input() end: any;
  @Input() path: string ="";
  connectionId:string = "";
  connectionData:any;
  nodeEditor?:AcNodeEditorComponent;

  override ngOnInit(): void {
    this.setData();
  }

  setData(){
    let isSet:boolean = false;
    if (this.data) {
      if (this.data.data) {
        isSet = true;
        const connectionData = this.data.data;
        this.connectionId=this.data.id;
        connectionData["connection_component"] = this;
        if (connectionData.simple_node_editor) {
          this.nodeEditor = connectionData.simple_node_editor;
        }
        if (connectionData.data) {
          this.connectionData = connectionData.data;
        }
      }
    }
    if(!isSet){
      setTimeout(() => {
        this.setData();
      }, 100);
    }
  }

  onContextMenu(event:any){
    if(this.nodeEditor){
      // this.nodeEditor.showContextMenu(this.nodeEditor.connectionContextMenuTemplate,event,{"connection":this});
    }
  }

  onClick(event:any){
    if(this.nodeEditor){
      // this.nodeEditor.connectionClicked.emit({"connection":this});
    }
  }

  removeConnection() {
    const object=this;
    if(this.nodeEditor){
      this.nodeEditor!.editor.removeConnection(this.connectionId);
    }

  }
}



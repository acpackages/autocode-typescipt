import { Component, Input } from '@angular/core';
import { AcBase } from '../../../../../autocode-angular/src/lib/_base/ac-base.component';
import { IAcNodeConnectionEvent } from '../../interfaces/ac-node-connection-event.interface';
import { AcNodeEditorComponent } from '../ac-node-editor/ac-node-editor.component';
import { ClassicPreset } from 'rete';
import { objectCopyTo } from '@ac_packages/autocode-extensions';

@Component({
  selector: 'ac-node',
  templateUrl: './ac-node.component.html',
  styleUrl: './ac-node.component.css',
  standalone: false
})
export class AcNodeComponent extends AcBase {
  @Input() data!: any;
  @Input() emit!: (data: any) => void;
  @Input() name: string = "";
  @Input() rendered!: () => void;
  // get flowVariables():any {
  //   return this.getNodeFlowVariables();
  // }
  inputConnections: any = {};
  outputConnections: any = {};
  acNodeEditorComponent!: AcNodeEditorComponent;
  nodeVariables: any = {};
  node!: ClassicPreset.Node;
  nodeId: string = "";
  nodeData: any = {};
  seed = 0;

  // @HostBinding("class.selected") get selected() {
  //   let result = false;
  //   if (this.data) {
  //     if (this.data.selected) {
  //       result = this.data.selected;
  //     }
  //   }
  //   return result;
  // }

  // get nodeLabel() {
  //   let result = "Simple Node";
  //   if (this.data) {
  //     if (this.data.label) {
  //       result = this.data.label;
  //     }
  //   }
  //   return result;
  // }

  nodeLabel = "Simple Node";


  ngOnInit(): void {
    super.ngOnInit();
    this.node = this.data;
    if (this.data) {
      if (this.data.data) {
        let nodeData = this.data.data;
        this.nodeId = this.data.id;
        nodeData["node_component"] = this;
        if (nodeData.simple_node_editor) {
          this.acNodeEditorComponent = nodeData.simple_node_editor;
        }
        if (nodeData.data) {
          this.nodeData = nodeData.data;
        }
      }
    }
    if (this.name == "") {
      this.name = this.node!.id;
    }
  }

  ngOnChanges(): void {
    // requestAnimationFrame(() => this.rendered());
    // this.seed++;
  }

  getNodeFlowVariables(): any {
    let result: any = {};
    for (let connectionId in this.inputConnections) {
      let connection: IAcNodeConnectionEvent = this.inputConnections[connectionId];
      if (connection.sourceNode) {
        let sourceNode: AcNodeComponent = connection.sourceNode;
        result = objectCopyTo(sourceNode.getNodeFlowVariables(), result);
      }
    }
    for (let variableName in this.nodeVariables) {
      let variable: any = this.nodeVariables[variableName];
      // result[variableName] = variable[SimpleNodeVariable.keyVariableName];
    }
    return result;
  }

  notifyInputConnected(connectionEvent: IAcNodeConnectionEvent) {
    this.acNodeEditorComponent!.logger.log("Node " + this.nodeId + "'s socket " + connectionEvent.targetNode + " connected to node " + connectionEvent.sourceNodeId + "'s socket " + connectionEvent.sourceSocketId);
  }

  notifyInputDisconnected(connectionEvent: IAcNodeConnectionEvent) {
    this.acNodeEditorComponent!.logger.log("Node " + this.nodeId + "'s socket " + connectionEvent.targetNode + " disconnected from node " + connectionEvent.sourceNodeId + "'s socket " + connectionEvent.sourceSocketId);
  }

  notifyOutputConnected(connectionEvent: IAcNodeConnectionEvent) {
    this.acNodeEditorComponent!.logger.log("Node " + this.nodeId + "'s socket " + connectionEvent.sourceNode + " connected to node " + connectionEvent.targetNodeId + "'s socket " + connectionEvent.targetSocketId);
  }

  notifyOutputDisconnected(connectionEvent: IAcNodeConnectionEvent) {
    this.acNodeEditorComponent!.logger.log("Node " + this.nodeId + "'s socket " + connectionEvent.sourceNode + " disconnected from node " + connectionEvent.targetNodeId + "'s socket " + connectionEvent.targetSocketId);
  }

  removeNode() {
    let connections = this.acNodeEditorComponent!.editor.getConnections();
    if (connections) {
      for (let connection of connections) {
        if ([connection.source, connection.target].includes(this.node!.id)) {
          this.acNodeEditorComponent!.editor.removeConnection(connection.id);
        }
      }
    }
    this.acNodeEditorComponent!.editor.removeNode(this.node!.id);
  }

  cloneNode() {
    let nodeJson: any = this.toJson();
    delete nodeJson["id"];
    delete nodeJson["position"];
    this.acNodeEditorComponent!.addNode(nodeJson);
  }

  toJson() {
    let areaNodes: any = {};
    this.acNodeEditorComponent!.pluginArea.nodeViews.forEach((value: any, key: string) => {
      areaNodes[key] = value;
    });
    let result = {
      "id": this.node!.id,
      "position": areaNodes[this.node!.id].position,
      "label": this.node!.label,
      "data": this.nodeData
    };
    return result;
  }

}


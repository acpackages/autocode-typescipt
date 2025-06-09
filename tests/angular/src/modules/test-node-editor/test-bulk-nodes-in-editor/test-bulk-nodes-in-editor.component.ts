/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core';
import { BulkTestNodeComponent } from '../bulk-test-node/bulk-test-node.component';
import { AcNodeConnectionComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node-connection/ac-node-connection.component';
import { AcNodeEditorComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node-editor/ac-node-editor.component';
import { AcNodeComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node/ac-node.component';

@Component({
  selector: 'app-test-bulk-nodes-in-editor',
  templateUrl: './test-bulk-nodes-in-editor.component.html',
  styleUrl: './test-bulk-nodes-in-editor.component.scss',
  standalone: false
})
export class TestBulkNodesInEditorComponent {
  @ViewChild("nodeEditor") nodeEditor!: AcNodeEditorComponent;
  TestNodeComponent = BulkTestNodeComponent;
  ngOnInit(): void {
    consoleLog(this);
  }

  async addNode(nodeName: any) {
    const nodeA = await this.nodeEditor.addNode({ label: nodeName });
  }

  async createBulkNodes() {
    const nodeHeight: number = 150;
    const nodeWidth: number = 300;
    const maxRowIndex: number = 5;
    let columnIndex: number = 0;
    let rowIndex: number = 0;
    const count: number = 500;
    for (let i = 0; i < count; i++) {
      const nodeData: any = {
        "id": 'node' + i, "label": "Node " + (i+1), position: {
          x: nodeWidth * columnIndex,
          y: nodeHeight * rowIndex,
        }
      };
      await this.nodeEditor.addNode(nodeData);
      rowIndex++;
      if (rowIndex >= maxRowIndex) {
        rowIndex = 0;
        columnIndex++;
      }
    }
    // let connectionDetails: any = {
    //   id: 0,
    //   "source_node_id": 1,
    //   "source_socket_id": "nodeOutput1",
    //   "target_node_id": 2,
    //   "target_socket_id": "nodeInput2"
    // };
    // this.nodeEditor.addConnection(connectionDetails);
    for (let i = 0; i < count - 1; i++) {
      const connectionDetails: any = {
        id: i,
        "source_node_id": "node" + i,
        "source_socket_id": "nodeOutputnode" + i,
        "target_node_id": "node" + (i + 1),
        "target_socket_id": "nodeInputnode" + (i + 1)
      }
      await this.nodeEditor.addConnection(connectionDetails);
    }

  }

  connectionClicked(event: any) {
    console.log("Connection Clicked", event);
  }

  contextMenuClicked(type: string, instance: any, action: string) {
    console.log("Context menu for " + type, instance);
    if (type == "connection") {
      if (action == "remove_connection") {
        const connection: AcNodeConnectionComponent = instance;
        connection.removeConnection();
      }
    }
    else if (type == "editor") {
      if (action == "add_node") {
        const editor: AcNodeEditorComponent = instance;
        editor.addNode();
      }
    }
    else if (type == "node") {
      if (action == "clone_node") {
        const node: AcNodeComponent = instance;
        node.cloneNode();
      }
      else if (action == "remove_node") {
        const node: AcNodeComponent = instance;
        node.removeNode();
      }
    }

  }

  async editorInitialized() {
    consoleLog("Editor Initialized");
    if (this.nodeEditor) {
      await this.createBulkNodes();
      setTimeout(() => {
        // this.nodeEditor.autoArrangeNodes();
      }, 2000);
    }
    else {
      console.log("Invalid Node Editor")
    }
  }

  exportJson() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.toJson());
    }
  }

  getEditorCenter() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.getCurrentCenterPosition());
    }
  }

  getEditorZoom() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.getCurrentZoomLevel());
    }
  }

  getLinearFlow() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.getLinearNodesFlow());
    }
  }

  getLinearFlowJson() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.getLinearFlowJson());
    }
  }

  hanldeAutoArrange(){
    this.nodeEditor.autoArrangeNodes();
    console.log("Nodes auto arranged");
  }

  handleConnectionAdded(event: any) {
    console.log(event);
  }

  importJson(json: any) {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.fromJson(json));
    }
  }

  logComponent() {
    console.log(this);
  }

  logNodesAndConnections() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.getNodesMap());
      console.log(this.nodeEditor.getConnectionsMap());
    }
  }

  resetEditor() {
    if (this.nodeEditor) {
      // console.log(this.nodeEditor.resetEditor());
    }
  }

  updateEditorZoom() {
    if (this.nodeEditor) {
      const currentZoom: number = this.nodeEditor.getCurrentZoomLevel();
      this.nodeEditor.setZoomLevel(currentZoom + 1)
      console.log(this.nodeEditor.getCurrentZoomLevel());
    }
  }

  updateEditorCenter() {
    if (this.nodeEditor) {
      const currentPosition: any = this.nodeEditor.getCurrentCenterPosition();
      this.nodeEditor.setCenterPosition(currentPosition.x + 100, currentPosition.y + 100)
      console.log(this.nodeEditor.getCurrentCenterPosition());
    }
  }
}

function consoleLog(...messages: any) {
  console.log(messages)
}

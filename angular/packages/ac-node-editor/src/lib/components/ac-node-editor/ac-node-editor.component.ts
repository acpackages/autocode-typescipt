import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, Input, OnChanges, Output, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ClassicPreset, GetSchemes, NodeEditor } from 'rete';
import { AngularArea2D, AngularPlugin, Presets } from 'rete-angular-plugin/15';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { AutoArrangePlugin,Presets as ArrangePresets,ArrangeAppliers } from "rete-auto-arrange-plugin";
import { ClassicFlow, ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { ContextMenuPlugin, Presets as ContextMenuPresets } from "rete-context-menu-plugin";
import { AcLogger } from '@ac_packages/autocode';
import { arrayDifference, arrayRemove, arrayToObject } from '@ac_packages/autocode-extensions';
import { AutocodeService } from '../../../../../autocode-angular/src/lib/services/autocode.service';
import { AcEnumNodeConnectionStatus } from '../../enums/ac-node-connection-status.enum';
import { IAcNodeConnectionEvent } from '../../interfaces/ac-node-connection-event.interface';
import { AcNodeSocketComponent } from '../ac-node-socket/ac-node-socket.component';
import { AcBase } from '../../../../../autocode-angular/src/lib/_base/ac-base.component';
import { AcNodeConnectionComponent } from '../ac-node-connection/ac-node-connection.component';
import { AcNodeComponent } from '../ac-node/ac-node.component';
class Node extends ClassicPreset.Node {
  width = 180;
  height = 120;
}
class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}
type Schemes = GetSchemes<Node,Connection<Node>>;
type AreaExtra = AngularArea2D<Schemes>;

@Component({
  selector: 'ac-node-editor',
  templateUrl: './ac-node-editor.component.html',
  styleUrl: './ac-node-editor.component.css',
  standalone: false
})
export class AcNodeEditorComponent extends AcBase {
  /* Temp Code */
  @Input('connectionContextMenuTemplate') connectionContextMenuTemplate!: TemplateRef<any>;
  @Input('editorContextMenuTemplate') editorContextMenuTemplate!: TemplateRef<any>;
  @Input('nodeContextMenuTemplate') nodeContextMenuTemplate!: TemplateRef<any>;
  /* Temp Code */
  @ViewChild('reteEditorContainer') container!: ElementRef;
  @Input() autoInitEditor: boolean = true;
  @Input() defaultConnectionType: Type<any> = AcNodeConnectionComponent;
  @Input() defaultNodeType: Type<any> = AcNodeComponent;
  @Input() enableLogger: boolean = true;
  @Input() logger: AcLogger = new AcLogger();

  @Output() onEditorInitialized: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNodeAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() onConnectionAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() onConnectionClicked: EventEmitter<any> = new EventEmitter<any>();


  connections: any = {};
  editor!: NodeEditor<Schemes>;
  importStatus: any = {
    pendingConnections: [],
    working: false
  };
  nodes: any = {};
  pluginAngular!: AngularPlugin<Schemes, AreaExtra>;
  pluginArea!: AreaPlugin<Schemes, AreaExtra>;
  pluginAutoArrange!: AutoArrangePlugin<Schemes>;
  pluginAutoArrangeApplier!: ArrangeAppliers.TransitionApplier<Schemes, never>;
  pluginConnection!: ConnectionPlugin<Schemes, AreaExtra>;
  pluginContextMenu: any = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([])
  });
  socket = new ClassicPreset.Socket('socket');

  private _contextMenuRef: any;
  private _documentClickListenerForContext: any;
  private _documentContextMenuListenerForContext: any;

  constructor(private injector: Injector, elementRef: ElementRef, private viewContainer: ViewContainerRef, autocodeAngular: AutocodeService) {
    super(elementRef, autocodeAngular)
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.logger.logMessages = this.enableLogger;
    if (this.autoInitEditor) {
      this.logger.log("Auto Initializing Editor");
      this.initEditor();
    }
  }

  async addNode(nodeProperties: any = {}) {
    this.logger.log("Adding Node", nodeProperties.label, nodeProperties);
    let node: any = new ClassicPreset.Node(nodeProperties.label!);
    if (nodeProperties.id) {
      node.id = nodeProperties.id;
    }
    node.data = { simple_node_editor: this };
    if (nodeProperties.data) {
      node.data["data"] = nodeProperties.data;
    }
    console.log(node,new Date());
    await this.editor.addNode(node);
    let nodePosition:any = {};
    if (nodeProperties) {
      if (nodeProperties.position) {
        nodePosition = nodeProperties.position;
      }
    }
    if(nodePosition['x'] == undefined){
      nodePosition = this.getCurrentCenterPosition();
    }
    this.pluginArea.translate(node.id, nodePosition);
    return node.data.node_component;
  }

  // async addNodeBack(nodeProperties: any = {}) {
  //   this.logger.log("Adding Node", nodeProperties.label, nodeProperties);
  //   let node: any = new ClassicPreset.Node(nodeProperties.label!);
  //   if (nodeProperties.id) {
  //     node.id = nodeProperties.id;
  //   }
  //   node.data = { simple_node_editor: this };
  //   if (nodeProperties.data) {
  //     node.data["data"] = nodeProperties.data;
  //   }
  //   console.log(node,new Date());
  //   this.editor.addNode(node);
  //   // let nodePosition:any = {};
  //   // if (nodeProperties) {
  //   //   if (nodeProperties.position) {
  //   //     nodePosition = nodeProperties.position;
  //   //   }
  //   // }
  //   // if(nodePosition['x'] == undefined){
  //   //   nodePosition = this.getCurrentCenterPosition();
  //   // }
  //   // this.pluginArea.translate(node.id, nodePosition);
  //   return node.data.node_component;
  // }

  async addConnection(connectionProperties: any = {}) {
    this.logger.info("Adding Connection", connectionProperties);
    let sourceNodeId = connectionProperties["source_node_id"];
    let sourceOutputId = connectionProperties["source_socket_id"];
    let targetNodeId = connectionProperties["target_node_id"];
    let targetInputId = connectionProperties["target_socket_id"];
    let nodes = this.getNodesMap();
    let foundSockets = false;
    if (nodes[sourceNodeId]) {
      if (nodes[targetNodeId]) {
        if (nodes[sourceNodeId].outputs[sourceOutputId]) {
          if (nodes[targetNodeId].inputs[targetInputId]) {
            foundSockets = true;
            this.logger.info("Found source & target nodes & sockets");
          }
          else {
            this.logger.info("Cannot find target input for connection : " + targetInputId);
          }
        }
        else {
          this.logger.info("Cannot find source output for connection : " + sourceOutputId);
        }
      }
      else {
        this.logger.info("Cannot find target node for connection : " + targetNodeId);
      }
    }
    else {
      this.logger.info("Cannot find source node for connection : " + sourceNodeId);
    }
    if (foundSockets) {
      let connectionData: any = {
        id: connectionProperties.id,
        source: sourceNodeId,
        sourceOutput: sourceOutputId,
        target: targetNodeId,
        targetInput: targetInputId,
        data : {simple_node_editor : this}
      };
      await this.editor.addConnection(connectionData).then((result: any) => {
        if (this.importStatus.pendingConnections.includes(connectionProperties)) {
          this.importStatus.pendingConnections = arrayRemove(this.importStatus.pendingConnections,connectionProperties);
        }
        this.logger.log("Connection Result", result, connectionProperties);
      });
      this.logger.log("Add Connection Complete", connectionProperties);
    }
    else {
      this.logger.log("Trying to add connection in 500ms", connectionProperties);
      setTimeout(async () => {
        await this.addConnection(connectionProperties);
      }, 500);
    }
  }

  async autoArrangeNodes(){
    let object = this;
    this.logger.log("Starting auto arranging nodes...");
    let applier = new ArrangeAppliers.TransitionApplier<Schemes, never>({
      duration: 500,
      timingFunction: (t) => t,
      async onTick(){
        // await AreaExtensions.zoomAt(object.pluginArea, object.editor.getNodes());
      }
    });
    this.pluginAutoArrange.layout();
    // this.pluginAutoArrange.layout({applier:applier});
    // await arrange.layout({ applier: animate ? applier : undefined });
      // AreaExtensions.zoomAt(area, editor.getNodes());
    this.logger.log("Auto arranging nodes completed!");
  }

  checkImportCompleted() {
    if (this.importStatus["working"]) {
      if (this.importStatus.pendingConnections.length == 0) {
        this.logger.log("Import completed.");
        this.importStatus["working"] = false;
      }
      else {
        this.logger.log("Import still in progress...");
        setTimeout(() => {
          this.checkImportCompleted();
        }, 100);
      }
    }
  }

  private closeContextMenu(): void {
    if (this._contextMenuRef) {
      this._contextMenuRef.destroy();
      this._contextMenuRef = null;
      if (this._documentClickListenerForContext) {
        this._documentClickListenerForContext = undefined;
      }
      if (this._documentContextMenuListenerForContext) {
        this._documentContextMenuListenerForContext = undefined;
      }
    }
  }

  async createEditor(container: HTMLElement) {
    this.logger.log("Creating Editor");
    let object = this;
    this.socket = new ClassicPreset.Socket('socket');
    this.editor = new NodeEditor<Schemes>();
    await this.editor.clear();
    let injector = this.injector;
    this.pluginArea = new AreaPlugin<Schemes, AreaExtra>(container);
    this.pluginConnection = new ConnectionPlugin<Schemes, AreaExtra>();
    this.pluginAngular = new AngularPlugin<Schemes, AreaExtra>({ injector });
    this.pluginAutoArrange = new AutoArrangePlugin<Schemes>();
    this.pluginAutoArrange.addPreset(ArrangePresets.classic.setup());
    AreaExtensions.simpleNodesOrder(this.pluginArea);
    AreaExtensions.selectableNodes(this.pluginArea, AreaExtensions.selector(), {
      accumulating: AreaExtensions.accumulateOnCtrl(),
    });
    this.pluginAngular.addPreset(
      Presets.classic.setup({
        customize: {
          connection(data: any) {
            return object.resolveConnection(data);
          },
          node(data: any) {
            return object.resolveNode(data);
          },
          socket() {
            return BlankComponent;
          }
        },
      })
    );
    this.pluginConnection.addPreset(ConnectionPresets.classic.setup());
    this.pluginContextMenu.addPipe((context: any) => {
      if (['contextmenu'].includes(context.type)) {
        let contextMenuData: any = context.data;
        if (contextMenuData["context"] == "root") {
          this.showContextMenu(this.editorContextMenuTemplate,contextMenuData["event"],{"editor":this});
        }
        else if (typeof contextMenuData["context"] == "object") {
          if (contextMenuData["context"]["data"]) {
            if (contextMenuData["context"]["data"]["node_component"]) {
              this.showContextMenu(this.nodeContextMenuTemplate,contextMenuData["event"],{"node":contextMenuData["context"]["data"]["node_component"]});
            }
          }
        }
      }
      return context;
    });
    this.editor.use(this.pluginArea);
    this.pluginArea.use(this.pluginConnection);
    this.pluginArea.use(this.pluginAngular);
    this.pluginArea.use(this.pluginContextMenu);
    this.pluginArea.use(this.pluginAutoArrange);
    this.editor.addPipe((context: any) => {
      // if (['connectioncreated', 'connectionremoved'].includes(context.type)) {
      //   this.logger.log("Connection changed");
      //   let connectionId = context.data.id;
      //   let sourceNodeId = context.data.source;
      //   let sourceNodeOutputId = context.data.sourceOutput;
      //   let targetNodeId = context.data.target;
      //   let targetNodeInputId = context.data.targetInput;
      //   let nodesMap = this.getNodesMap();
      //   let sourceNode = nodesMap[sourceNodeId];
      //   let targetNode = nodesMap[targetNodeId];
      //   let connectionStatus: AcEnumNodeConnectionStatus = AcEnumNodeConnectionStatus.unknown;
      //   if (context.type == "connectioncreated") {
      //     connectionStatus = AcEnumNodeConnectionStatus.connected;
      //     context.data.data = { simple_node_editor: this };
      //   }
      //   else if (context.type == "connectionremoved") {
      //     connectionStatus = AcEnumNodeConnectionStatus.disconnected;
      //   }
      //   let connectionEvent: IAcNodeConnectionEvent = {
      //     connectionId: connectionId,
      //     connectionStatus: connectionStatus,
      //     sourceNodeId: sourceNodeId,
      //     sourceSocketId: sourceNodeOutputId,
      //     targetNodeId: targetNodeId,
      //     targetSocketId: targetNodeInputId,
      //   };
      //   if (sourceNode) {
      //     let output = sourceNode["outputs"][sourceNodeOutputId];
      //     if (output) {
      //       connectionEvent.sourceSocket = output["socket"];
      //     }
      //     else {
      //       this.logger.log("Cannot find source node output")
      //     }
      //   }
      //   else {
      //     this.logger.log("Cannot find source node")
      //   }
      //   if (targetNode) {
      //     let input = targetNode["inputs"][targetNodeInputId];
      //     if (input) {
      //       connectionEvent.targetSocket = input["socket"];
      //     }
      //     else {
      //       this.logger.log("Cannot find target node input")
      //     }
      //   }
      //   else {
      //     this.logger.log("Cannot find target node")
      //   }
      //   connectionEvent.sourceNode = this.getNodeComponentFromNode(sourceNode);
      //   connectionEvent.targetNode = this.getNodeComponentFromNode(targetNode);
      //   if (connectionEvent.sourceNode) {
      //     connectionEvent.sourceNode.notifyOutputConnected(connectionEvent);
      //   }
      //   if (connectionEvent.sourceSocket) {
      //     connectionEvent.sourceSocket.notifyConnectionChange(connectionEvent);
      //   }
      //   if (connectionEvent.targetNode) {
      //     connectionEvent.targetNode.notifyInputConnected(connectionEvent);
      //   }
      //   if (connectionEvent.targetSocket) {
      //     connectionEvent.targetSocket.notifyConnectionChange(connectionEvent);
      //   }
      //   if(connectionStatus == AcEnumNodeConnectionStatus.connected){
      //     this.onConnectionAdded.emit(connectionEvent);
      //     this.events.execute('connectionAdded',connectionEvent);
      //   }
      // }
      return context;
    });
    AreaExtensions.simpleNodesOrder(this.pluginArea);
    AreaExtensions.zoomAt(this.pluginArea, this.editor.getNodes());
    this.logger.log("Editor Created!");
    return () => this.pluginArea.destroy();
  }

  async fromJson(jsonObject: any) {
    this.importStatus.working = true;
    if (jsonObject["editor"] != undefined) {
      if (jsonObject["editor"]["zoom"] != undefined) {
        await this.setZoomLevel(jsonObject["editor"]["zoom"]);
      }
      if (jsonObject["editor"]["center"] != undefined) {
        await this.setCenterPosition(jsonObject["editor"]["center"].x, jsonObject["editor"]["center"].y)
      }
    }
    if (jsonObject["nodes"] != undefined) {
      for (let node of Object.values(jsonObject["nodes"])) {
        await this.addNode(node);
      }
    }
    if (jsonObject["connections"] != undefined) {
      for (let connection of jsonObject["connections"]) {
        this.importStatus.pendingConnections.push(connection);
        await this.addConnection(connection);
      }
    }
    this.checkImportCompleted();
  }

  getConnectionsMap():any {
    let result:any = arrayToObject(this.editor.getConnections(),"id");;
    return result;
  }

  getCurrentZoomLevel(): number {
    return this.pluginArea.area.transform.k;
  }

  getCurrentCenterPosition(): any {
    const transform = this.pluginArea.area.transform;
    const containerRect = this.pluginArea.container.getBoundingClientRect();
    const x = (containerRect.width / 2 - transform.x) / transform.k;
    const y = (containerRect.height / 2 - transform.y) / transform.k;
    return { x: x, y: y };
  }

  getNodesMap() {
    let result: any = arrayToObject(this.editor.getNodes(), "id");;
    return result;
  }

  getLinearFlowJson() {
    let result: any[] = [];
    let flows: any[] = this.getLinearNodesFlow();
    for (let flow of flows) {
      let flowNodes: any = {};
      this.getLinearFlowJsonNodeObject(flowNodes, flow);
      result.push(Object.values(flowNodes))
    }
    return result;
  }

  getLinearFlowJsonNodeObject(nodes: any, node: any) {
    let nodeId = node.id;
    if (nodes[nodeId] == undefined) {
      let nodeComponent = node.data.node_component;
      let flowNode: any = {
        "node_id": node.id,
        "node_label": node.label,
        "node_data": node.data.data,
        "node_variables": nodeComponent.nodeVariables,
        "next_nodes": {}
      };
      nodes[nodeId] = flowNode;
      if (node["next_nodes"]) {
        let nextNodes: any = {};
        for (let outputId in node["next_nodes"]) {
          let nodeOutput = node["next_nodes"][outputId];
          let outputNextNodes = nodeOutput["nodes"];
          let output: AcNodeSocketComponent = nodeOutput["output"]["socket"];
          nextNodes[outputId] = {
            "output_id":output.socketId,
            "output_name":output.name,
            "output_value":output.value,
            "node_ids": Object.keys(outputNextNodes)
          };
          for (let nextNodeId in outputNextNodes) {
            let nextNodeDetails = outputNextNodes[nextNodeId];
            this.getLinearFlowJsonNodeObject(nodes, nextNodeDetails["node"]);
          }
        }
        flowNode["next_nodes"] = nextNodes;
      }
    }
  }

  getLinearNodesFlow() {
    let result: any[] = [];
    let connections = this.editor.getConnections();
    let nodesMap: any = this.getNodesMap();
    let nodeIds: string[] = Object.keys(nodesMap);
    let sourceNodes: any = {};
    let targetNodes: any = {};
    this.logger.log(nodesMap);
    this.logger.log(connections);
    for (let connection of connections) {
      if (sourceNodes[connection.source] == undefined) {
        sourceNodes[connection.source] = {};
      }
      if (targetNodes[connection.target] == undefined) {
        targetNodes[connection.target] = {};
      }
      if (sourceNodes[connection.source][connection.target] == undefined) {
        sourceNodes[connection.source][connection.target] = [];
      }
      if (targetNodes[connection.target][connection.source] == undefined) {
        targetNodes[connection.target][connection.source] = [];
      }
      sourceNodes[connection.source][connection.target].push(connection.targetInput);
      targetNodes[connection.target][connection.source].push(connection.sourceOutput);
    }
    let initiatorNodeIds: string[] = arrayDifference(nodeIds, Object.keys(targetNodes));
    for (let initiatorNodeId of initiatorNodeIds) {
      let initiatorNode = nodesMap[initiatorNodeId];
      this.getLinearNodeFlowPath(initiatorNode);
      result.push(initiatorNode);
    }
    return result;
  }

  getLinearNodeFlowPath(node: any, initiatorNodeId: string = "") {
    let nodeId = node.id;
    if (initiatorNodeId == "") {
      initiatorNodeId = nodeId;
    }
    let nodesMap: any = this.getNodesMap();
    let connections = this.editor.getConnections();
    if (nodesMap[nodeId]) {
      let node = nodesMap[nodeId];
      this.logger.log("Found node in nodesMap : " + node.label);
      if (node.outputs) {
        this.logger.log("Found outputs for node : " + node.label);
        let nextFlows: any = {};
        let nextNodes: any = {};
        for (let outputId in node.outputs) {
          let output = node.outputs[outputId];
          this.logger.log("Found output for node : " + node.label + " > " + outputId);
          for (let connection of connections) {
            this.logger.log("Checking connection for node output in :", connection, output);
            if (connection.source == nodeId && connection.sourceOutput == outputId) {
              this.logger.log("Found connection for node output : " + node.label + " > " + outputId);
              let nextNodeId = connection.target;
              let nextNode = nodesMap[nextNodeId];
              if (nextNode && nextNodeId != initiatorNodeId) {
                if (nextNodeId != initiatorNodeId) {
                  this.logger.log("Target node is not initiator node : " + nextNodeId);
                  let nextNodeInputId = connection.targetInput;
                  let nextNodeInput = nextNode.inputs[nextNodeInputId];
                  if (nextNodeInput) {
                    this.logger.log("Found node input : " + nextNodeInputId + " in " + nextNodeId);
                    if (nextNodes[nextNodeId] == undefined) {
                      nextNodes[nextNodeId] = nextNode;
                    }
                    if (nextFlows[outputId] == undefined) {
                      nextFlows[outputId] = { "output": output, "nodes": {} };
                    }
                    if (nextFlows[outputId]["nodes"][nextNodeId] == undefined) {
                      nextFlows[outputId]["nodes"][nextNodeId] = {
                        "node": nextNodes[nextNodeId],
                        "inputs": {}
                      };
                    }
                    nextFlows[outputId]["nodes"][nextNodeId]["inputs"][nextNodeInputId] = { "input": nextNodeInput };
                    this.logger.log("Added next flow input");
                  }
                  else {
                    this.logger.log("Target node input not found : " + nextNodeInputId + " in " + nextNodeId);
                  }
                }
                else {
                  this.logger.log("Target node is initiator node so stopping : " + nextNodeId);
                }

              }
              else {
                this.logger.log("Target node not found in nodesMap : " + nextNodeId);
              }
            }
            else {
              this.logger.log("Found no connection for node output : " + node.label + "(" + nodeId + ") > " + outputId);
            }
          }
        }
        for (let nextNodeId in nextNodes) {
          this.getLinearNodeFlowPath(nextNodes[nextNodeId], initiatorNodeId);
        }
        node["next_nodes"] = nextFlows;
      }
      else {
        this.logger.log("Node has no outputs : " + node.label);
      }
    }
  }

  getNodeComponentFromNode(node: any) {
    let result: AcNodeComponent | undefined;
    if (node) {
      if (node.data) {
        if (node.data["node_component"]) {
          result = node.data["node_component"];
        }
      }
    }
    return result;
  }

  async initEditor() {
    if (this.container) {
      this.logger.log("Found Container & Initializing Editor");
      await this.createEditor(this.container.nativeElement);
      this.onEditorInitialized.emit();
      this.events.execute('editorInitialized')
    }
    else {
      this.logger.log("Cannot find container so will try in 500ms");
      setTimeout(() => {
        this.initEditor();
      }, 500);
    }
  }

  logConnections() {
    this.logger.log(this.getConnectionsMap());
  }

  logNodes() {
    this.logger.log(this.getNodesMap());
  }

  resetEditor() {

  }

  resolveConnection(data: any = {}): any {
    let result: any = this.defaultConnectionType;
    return result;
  }

  resolveNode(data: any): any {
    let result: any = this.defaultNodeType;
    return result;
  }

  async setZoomLevel(zoomLevel: number) {
    await this.pluginArea.area.zoom(zoomLevel, 0, 0);  // zoom to the center (0, 0)
  }

  async setCenterPosition(x: number, y: number) {
    const { container } = this.pluginArea;
    const containerRect = container.getBoundingClientRect();
    const transform = this.pluginArea.area.transform;

    const newX = containerRect.width / 2 - x * transform.k;
    const newY = containerRect.height / 2 - y * transform.k;

    await this.pluginArea.area.translate(newX, newY);
  }

  showContextMenu(contextMenuTemplate: TemplateRef<any>, event: any, context: any = {}): void {
    this.closeContextMenu();
    this._contextMenuRef = this.viewContainer.createEmbeddedView(contextMenuTemplate, context);
    const menuElement = this._contextMenuRef.rootNodes[0];
    menuElement.style.position = 'fixed';
    menuElement.style.top = `${event.y}px`;
    menuElement.style.left = `${event.x}px`;
    setTimeout(() => {
      this._documentClickListenerForContext = this.elementRef.nativeElement.ownerDocument.addEventListener('click', () => {
        this.closeContextMenu();
      });
      this._documentContextMenuListenerForContext = this.elementRef.nativeElement.ownerDocument.addEventListener('contextmenu', () => {
        this.closeContextMenu();
      });
    }, 500);

  }

  toJson() {
    let result: any = {
      nodes: [],
      connections: [],
      editor: {
        zoom: this.getCurrentZoomLevel(),
        center: this.getCurrentCenterPosition(),
      }
    };
    const nodes: any[] = this.editor.getNodes();
    const connections = this.editor.getConnections();
    for (const node of nodes) {
      let nodeComponent = this.getNodeComponentFromNode(node);
      if (nodeComponent) {
        let nodeJson = nodeComponent.toJson();
        result["nodes"].push(nodeJson);
      }
    }
    for (const connection of connections) {
      result.connections.push({
        id: connection.id,
        source_node_id: connection.source,
        source_output_id: connection.sourceOutput,
        target_node_id: connection.target,
        target_input_id: connection.targetInput,
      });
    }
    return result;
  }

}
@Component({
  selector: 'blank-component',
  template: '',
  standalone: false
})
class BlankComponent implements OnChanges {
  @Input() data!: any;
  @Input() rendered!: any;

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
    requestAnimationFrame(() => this.rendered());
  }
}

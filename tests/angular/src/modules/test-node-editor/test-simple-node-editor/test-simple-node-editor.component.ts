/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core';
import { BulkTestNodeComponent } from '../bulk-test-node/bulk-test-node.component';
import { AcNodeEditorComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node-editor/ac-node-editor.component';
import { AcNodeConnectionComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node-connection/ac-node-connection.component';
import { AcNodeComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node/ac-node.component';

@Component({
  selector: 'app-test-simple-node-editor',
  standalone: false,
  templateUrl: './test-simple-node-editor.component.html',
  styleUrl: './test-simple-node-editor.component.scss'
})
export class TestSimpleNodeEditorComponent {
  @ViewChild("nodeEditor") nodeEditor!: AcNodeEditorComponent;
  TestNodeComponent = BulkTestNodeComponent;
  nodesJson: any = [
    {
      "label": "Example 1",
      "value": {
        "nodes": [
          {
            "id": "83b0a78259f9d105",
            "position": {
              "x": -422.727294921875,
              "y": -537.2727203369141
            },
            "label": "Node A",
            "data": {
              "input": 1253,
              "select": "INDIA"
            }
          },
          {
            "id": "24eae0c847999302",
            "position": {
              "x": -707.272705078125,
              "y": 96.36370849609375
            },
            "label": "Node B",
            "data": {
              "input": "35699",
              "select": "USA"
            }
          },
          {
            "id": "6d36393077a01f79",
            "position": {
              "x": 14.54541015625,
              "y": 0
            },
            "label": "Node C",
            "data": {
              "input": "312652",
              "select": "UK"
            }
          }
        ],
        "connections": [
          {
            "id": "10195342aac8d3b2",
            "source_node_id": "83b0a78259f9d105",
            "source_output_id": "output_variable_out_83b0a78259f9d105",
            "target_node_id": "24eae0c847999302",
            "target_input_id": "input_variables_24eae0c847999302"
          },
          {
            "id": "924affc38be89e8e",
            "source_node_id": "24eae0c847999302",
            "source_output_id": "output_variable_out_24eae0c847999302",
            "target_node_id": "6d36393077a01f79",
            "target_input_id": "input_variables_6d36393077a01f79"
          },
          {
            "id": "9b00ec86e8733361",
            "source_node_id": "6d36393077a01f79",
            "source_output_id": "output_variable_out_6d36393077a01f79",
            "target_node_id": "83b0a78259f9d105",
            "target_input_id": "input_variables_83b0a78259f9d105"
          }
        ]
      }
    },
    {
      "label": "Example 2",
      "value": {
        "nodes": [
          {
            "id": "83b0a78259f9d105",
            "position": {
              "x": -828.1818389892578,
              "y": -360.9091033935547
            },
            "label": "Node A",
            "data": {
              "input": 1253,
              "select": "INDIA"
            }
          },
          {
            "id": "24eae0c847999302",
            "position": {
              "x": -527.272705078125,
              "y": -174.54534912109375
            },
            "label": "Node B",
            "data": {
              "input": "35699",
              "select": "USA"
            }
          },
          {
            "id": "6d36393077a01f79",
            "position": {
              "x": -198.181884765625,
              "y": -7.27276611328125
            },
            "label": "Node C",
            "data": {
              "input": "312652",
              "select": "UK"
            }
          },
          {
            "id": "fbbdc7bc21a43635",
            "position": {
              "x": 112.7271728515625,
              "y": 154.54547119140625
            },
            "label": "Node D",
            "data": {
              "input": "98556",
              "select": "USA"
            }
          },
          {
            "id": "a181b01d5a34c486",
            "position": {
              "x": 496.3636474609375,
              "y": 289.0909423828125
            },
            "label": "Node E",
            "data": {
              "input": "1258",
              "select": "USA"
            }
          }
        ],
        "connections": [
          {
            "id": "10195342aac8d3b2",
            "source_node_id": "83b0a78259f9d105",
            "source_output_id": "output_variable_out_83b0a78259f9d105",
            "target_node_id": "24eae0c847999302",
            "target_input_id": "input_variables_24eae0c847999302"
          },
          {
            "id": "924affc38be89e8e",
            "source_node_id": "24eae0c847999302",
            "source_output_id": "output_variable_out_24eae0c847999302",
            "target_node_id": "6d36393077a01f79",
            "target_input_id": "input_variables_6d36393077a01f79"
          },
          {
            "id": "16ab311257a3bacd",
            "source_node_id": "6d36393077a01f79",
            "source_output_id": "output_variable_out_6d36393077a01f79",
            "target_node_id": "fbbdc7bc21a43635",
            "target_input_id": "input_variables_fbbdc7bc21a43635"
          },
          {
            "id": "a8f9ad3262d57010",
            "source_node_id": "fbbdc7bc21a43635",
            "source_output_id": "output_variable_out_fbbdc7bc21a43635",
            "target_node_id": "a181b01d5a34c486",
            "target_input_id": "input_variables_a181b01d5a34c486"
          }
        ]
      }
    },
    {
      "label": "Example 3",
      "value": {
        "nodes": [
          {
            "id": "83b0a78259f9d105",
            "position": {
              "x": "-905.1818389892578",
              "y": "193.0908966064453"
            },
            "label": "Node A",
            "data": {
              "input": 1253,
              "select": "INDIA",
              "phone_number": []
            }
          },
          {
            "id": "24eae0c847999302",
            "position": {
              "x": "-616.272705078125",
              "y": 191.45465087890625
            },
            "label": "Node B",
            "data": {
              "input": "35699",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "6d36393077a01f79",
            "position": {
              "x": "-323.181884765625",
              "y": 190.72723388671875
            },
            "label": "Node C",
            "data": {
              "input": "312652",
              "select": "UK",
              "phone_number": []
            }
          },
          {
            "id": "fbbdc7bc21a43635",
            "position": {
              "x": -33.2728271484375,
              "y": 189.54547119140625
            },
            "label": "Node D",
            "data": {
              "input": "98556",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "a181b01d5a34c486",
            "position": {
              "x": 254.3636474609375,
              "y": 187.0909423828125
            },
            "label": "Node E",
            "data": {
              "input": "1258",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "c423cf070a7ae98d",
            "position": {
              "x": -915,
              "y": -477
            },
            "label": "Node 1",
            "data": {
              "input": "1",
              "select": "UK",
              "phone_number": []
            }
          },
          {
            "id": "0464f9c7e0587366",
            "position": {
              "x": -594,
              "y": -481
            },
            "label": "Node 2",
            "data": {
              "input": "2",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "44743e686af52909",
            "position": {
              "x": -296,
              "y": -481
            },
            "label": "Node 3",
            "data": {
              "input": "3",
              "select": "INDIA",
              "phone_number": []
            }
          },
          {
            "id": "0fa07a1164878de5",
            "position": {
              "x": -425,
              "y": -195
            },
            "label": "Node X",
            "data": {
              "input": "963",
              "select": "INDIA",
              "phone_number": []
            }
          },
          {
            "id": "e59ec2708ab3eb4e",
            "position": {
              "x": -61,
              "y": -195
            },
            "label": "Node Y",
            "data": {
              "input": "852",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "9a94459bb8e23ee9",
            "position": {
              "x": 297,
              "y": -198
            },
            "label": "Node Z",
            "data": {
              "input": "123",
              "select": "UK",
              "phone_number": []
            }
          }
        ],
        "connections": [
          {
            "id": "10195342aac8d3b2",
            "source_node_id": "83b0a78259f9d105",
            "source_output_id": "output_variable_out_83b0a78259f9d105",
            "target_node_id": "24eae0c847999302",
            "target_input_id": "input_variables_24eae0c847999302"
          },
          {
            "id": "924affc38be89e8e",
            "source_node_id": "24eae0c847999302",
            "source_output_id": "output_variable_out_24eae0c847999302",
            "target_node_id": "6d36393077a01f79",
            "target_input_id": "input_variables_6d36393077a01f79"
          },
          {
            "id": "16ab311257a3bacd",
            "source_node_id": "6d36393077a01f79",
            "source_output_id": "output_variable_out_6d36393077a01f79",
            "target_node_id": "fbbdc7bc21a43635",
            "target_input_id": "input_variables_fbbdc7bc21a43635"
          },
          {
            "id": "a8f9ad3262d57010",
            "source_node_id": "fbbdc7bc21a43635",
            "source_output_id": "output_variable_out_fbbdc7bc21a43635",
            "target_node_id": "a181b01d5a34c486",
            "target_input_id": "input_variables_a181b01d5a34c486"
          },
          {
            "id": "8a11d7168782b213",
            "source_node_id": "c423cf070a7ae98d",
            "source_output_id": "output_variable_out_c423cf070a7ae98d",
            "target_node_id": "0464f9c7e0587366",
            "target_input_id": "input_variables_0464f9c7e0587366"
          },
          {
            "id": "b3304d4f6ba3051c",
            "source_node_id": "0464f9c7e0587366",
            "source_output_id": "output_variable_out_0464f9c7e0587366",
            "target_node_id": "44743e686af52909",
            "target_input_id": "input_variables_44743e686af52909"
          },
          {
            "id": "914009d1934230dd",
            "source_node_id": "0fa07a1164878de5",
            "source_output_id": "output_variable_out_0fa07a1164878de5",
            "target_node_id": "e59ec2708ab3eb4e",
            "target_input_id": "input_variables_e59ec2708ab3eb4e"
          },
          {
            "id": "cbc323b04933a2f4",
            "source_node_id": "e59ec2708ab3eb4e",
            "source_output_id": "output_variable_out_e59ec2708ab3eb4e",
            "target_node_id": "9a94459bb8e23ee9",
            "target_input_id": "input_variables_9a94459bb8e23ee9"
          }
        ],
        "editor": {
          "zoom": 1,
          "center": {
            "x": 0,
            "y": 0
          }
        }
      }
    },
    {
      "label": "Example 4 (Zoom & Position)",
      "value": {
        "nodes": [
          {
            "id": "83b0a78259f9d105",
            "position": {
              "x": "-905.1818389892578",
              "y": "193.0908966064453"
            },
            "label": "Node A",
            "data": {
              "input": 1253,
              "select": "INDIA",
              "phone_number": []
            }
          },
          {
            "id": "24eae0c847999302",
            "position": {
              "x": "-616.272705078125",
              "y": 191.45465087890625
            },
            "label": "Node B",
            "data": {
              "input": "35699",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "6d36393077a01f79",
            "position": {
              "x": "-323.181884765625",
              "y": 190.72723388671875
            },
            "label": "Node C",
            "data": {
              "input": "312652",
              "select": "UK",
              "phone_number": []
            }
          },
          {
            "id": "fbbdc7bc21a43635",
            "position": {
              "x": -33.2728271484375,
              "y": 189.54547119140625
            },
            "label": "Node D",
            "data": {
              "input": "98556",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "a181b01d5a34c486",
            "position": {
              "x": 254.3636474609375,
              "y": 187.0909423828125
            },
            "label": "Node E",
            "data": {
              "input": "1258",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "c423cf070a7ae98d",
            "position": {
              "x": -915,
              "y": -477
            },
            "label": "Node 1",
            "data": {
              "input": "1",
              "select": "UK",
              "phone_number": []
            }
          },
          {
            "id": "0464f9c7e0587366",
            "position": {
              "x": -594,
              "y": -481
            },
            "label": "Node 2",
            "data": {
              "input": "2",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "44743e686af52909",
            "position": {
              "x": -296,
              "y": -481
            },
            "label": "Node 3",
            "data": {
              "input": "3",
              "select": "INDIA",
              "phone_number": []
            }
          },
          {
            "id": "0fa07a1164878de5",
            "position": {
              "x": -425,
              "y": -195
            },
            "label": "Node X",
            "data": {
              "input": "963",
              "select": "INDIA",
              "phone_number": []
            }
          },
          {
            "id": "e59ec2708ab3eb4e",
            "position": {
              "x": -61,
              "y": -195
            },
            "label": "Node Y",
            "data": {
              "input": "852",
              "select": "USA",
              "phone_number": []
            }
          },
          {
            "id": "9a94459bb8e23ee9",
            "position": {
              "x": 297,
              "y": -198
            },
            "label": "Node Z",
            "data": {
              "input": "123",
              "select": "UK",
              "phone_number": []
            }
          }
        ],
        "connections": [
          {
            "id": "10195342aac8d3b2",
            "source_node_id": "83b0a78259f9d105",
            "source_output_id": "output_variable_out_83b0a78259f9d105",
            "target_node_id": "24eae0c847999302",
            "target_input_id": "input_variables_24eae0c847999302"
          },
          {
            "id": "924affc38be89e8e",
            "source_node_id": "24eae0c847999302",
            "source_output_id": "output_variable_out_24eae0c847999302",
            "target_node_id": "6d36393077a01f79",
            "target_input_id": "input_variables_6d36393077a01f79"
          },
          {
            "id": "16ab311257a3bacd",
            "source_node_id": "6d36393077a01f79",
            "source_output_id": "output_variable_out_6d36393077a01f79",
            "target_node_id": "fbbdc7bc21a43635",
            "target_input_id": "input_variables_fbbdc7bc21a43635"
          },
          {
            "id": "a8f9ad3262d57010",
            "source_node_id": "fbbdc7bc21a43635",
            "source_output_id": "output_variable_out_fbbdc7bc21a43635",
            "target_node_id": "a181b01d5a34c486",
            "target_input_id": "input_variables_a181b01d5a34c486"
          },
          {
            "id": "8a11d7168782b213",
            "source_node_id": "c423cf070a7ae98d",
            "source_output_id": "output_variable_out_c423cf070a7ae98d",
            "target_node_id": "0464f9c7e0587366",
            "target_input_id": "input_variables_0464f9c7e0587366"
          },
          {
            "id": "b3304d4f6ba3051c",
            "source_node_id": "0464f9c7e0587366",
            "source_output_id": "output_variable_out_0464f9c7e0587366",
            "target_node_id": "44743e686af52909",
            "target_input_id": "input_variables_44743e686af52909"
          },
          {
            "id": "914009d1934230dd",
            "source_node_id": "0fa07a1164878de5",
            "source_output_id": "output_variable_out_0fa07a1164878de5",
            "target_node_id": "e59ec2708ab3eb4e",
            "target_input_id": "input_variables_e59ec2708ab3eb4e"
          },
          {
            "id": "cbc323b04933a2f4",
            "source_node_id": "e59ec2708ab3eb4e",
            "source_output_id": "output_variable_out_e59ec2708ab3eb4e",
            "target_node_id": "9a94459bb8e23ee9",
            "target_input_id": "input_variables_9a94459bb8e23ee9"
          }
        ],
        "editor": {
          "zoom": 0.28601480772481824,
          "center": {
            "x": 1739.2456986932868,
            "y": 118.17920566575681
          }
        }
      }
    }
  ];

  ngOnInit(): void {
    consoleLog(this);
  }

  async addNode(nodeName: any) {
    const nodeA = await this.nodeEditor.addNode({ label: nodeName });
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

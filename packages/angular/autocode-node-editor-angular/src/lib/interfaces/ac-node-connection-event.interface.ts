import { AcNodeSocketComponent } from "../components/ac-node-socket/ac-node-socket.component";
import { AcNodeComponent } from "../components/ac-node/ac-node.component";
import { AcEnumNodeConnectionStatus } from "../enums/ac-node-connection-status.enum";

export interface IAcNodeConnectionEvent{
  connectionId:string;
  connectionStatus:AcEnumNodeConnectionStatus;
  sourceNode?:AcNodeComponent|undefined;
  sourceNodeId:string;
  sourceSocket?:AcNodeSocketComponent|undefined;
  sourceSocketId:string;
  targetNode?:AcNodeComponent|undefined;
  targetNodeId:string;
  targetSocket?:AcNodeSocketComponent|undefined;
  targetSocketId:string;
}

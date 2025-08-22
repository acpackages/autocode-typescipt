/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcConnection{
  static readonly KeyConnectionId = 'connection_id';
  static readonly KeyDestinationNodeId = 'destination_node_id';
  static readonly KeySourceNodeId = 'connection_id';

  connectionId:string = '';
  destinationNodeId:string = '';
  sourceNodeId:string = '';
}

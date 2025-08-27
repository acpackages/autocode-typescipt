/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcConnection{
  static readonly KeyConnectionId = 'connectionId';
  static readonly KeyDestinationNodeId = 'destinationNodeId';
  static readonly KeySourceNodeId = 'connectionId';

  connectionId:string = '';
  destinationNodeId:string = '';
  sourceNodeId:string = '';
}

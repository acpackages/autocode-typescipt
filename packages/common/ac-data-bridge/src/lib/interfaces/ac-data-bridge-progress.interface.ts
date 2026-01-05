export interface IAcDataBridgeProgress{
  id:string,
  title:string,
  description:string,
  completedCount:number,
  totalCount:number
  subTasksProgress?:IAcDataBridgeProgress[],
  percentage:number
}

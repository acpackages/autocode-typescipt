import { ComponentRef } from "@angular/core";

export interface IAcNgRouterOutlet {
  id: string;
  route?: any[];
  isActive: boolean;
  title?:string;
  additionalDetails?:any;
  componentRef?: ComponentRef<any>;
}

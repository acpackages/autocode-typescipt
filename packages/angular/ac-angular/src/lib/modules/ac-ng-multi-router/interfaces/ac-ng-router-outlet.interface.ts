import { ComponentRef } from "@angular/core";
import { AcNgRouterComponent } from "../components/_components.export";

export interface IAcNgRouterOutlet {
  id: string;
  route?: any;
  isActive: boolean;
  title?:string;
  additionalDetails?:any;
  routerComponent?:AcNgRouterComponent,
  routerComponentRef?: ComponentRef<AcNgRouterComponent>
}

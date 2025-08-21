import { IAcDDEMenuItem } from "./ac-dde-menu-item.interface";

export interface IAcDDEMenuGroup{
  label:string,
  iconClass?:string,
  iconUrl?:string,
  menuItems:IAcDDEMenuItem[]
}

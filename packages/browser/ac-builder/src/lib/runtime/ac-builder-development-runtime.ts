/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcBuilderApi } from "../core/ac-builder-api";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AcBuilderRuntimeComponent } from "./ac-builder-runtime-component";

export class AcBuilderDevelopmentRuntime {
  builderApi: AcBuilderApi;
  runtimeComponent?: AcBuilderRuntimeComponent;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.ActiveComponentChange,callback:()=>{
      this.handlePageChange();
    }});
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.EditorClose,callback:()=>{
      this.refreshPage();
    }});
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.ElementAdd,callback:()=>{
      this.refreshPage();
    }});
  }

  private handlePageChange() {
    this.runtimeComponent = new AcBuilderRuntimeComponent({ component: this.builderApi.component });
    this.runtimeComponent.render();
  }

  private refreshPage() {
    if(this.runtimeComponent){
      setTimeout(() => {
        this.runtimeComponent!.render();
      }, 10);
    }
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcBuilderApi } from "../core/ac-builder-api";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AcBuilderRuntimePage } from "./ac-builder-runtime-page";

export class AcBuilderDevelopmentRuntime {
  builderApi: AcBuilderApi;
  runtimePage?: AcBuilderRuntimePage;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.ActivePageChange,callback:()=>{
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
    this.runtimePage = new AcBuilderRuntimePage({ page: this.builderApi.page });
    this.runtimePage.render();
  }

  private refreshPage() {
    if(this.runtimePage){
      setTimeout(() => {
        this.runtimePage!.render();
      }, 10);
    }
  }
}

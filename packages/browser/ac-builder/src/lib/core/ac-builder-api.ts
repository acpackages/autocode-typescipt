import { AcBuilder } from "../elements/ac-builder.element";

export class AcBuilderApi{
  builder:AcBuilder;

  constructor({builder}:{builder:AcBuilder}){
    this.builder = builder;
  }

  fromJson(jsonObject: any): any {
    if (!jsonObject || jsonObject.length === 0) return;

    // if (this.editor) {
    //   this.editor.addComponents(jsonObject.builder_html);
    // }

    // if (jsonObject.builder_components) {
    //   jsonObject.builder_components.forEach((component: any) => {
    //     this.angularComponentReferences[component.instanceId] = {
    //       componentRef: undefined,
    //       events: component.events,
    //       properties: component.properties
    //     }
    //   });
    // }
  }
}

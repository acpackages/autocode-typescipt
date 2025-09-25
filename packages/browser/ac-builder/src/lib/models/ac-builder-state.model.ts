/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcBuilderState } from "../interfaces/ac-builder-state.interface";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";
import { stat } from "fs";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { IAcComponentElement } from "../interfaces/ac-component-element.interface";
import { IAcBuilderComponent } from "../interfaces/ac-component.interface";

export class AcBuilderState {
  static readonly KeyColumns = "columns";
  static readonly KeyExtensionStates = "extensionStates";

  builderApi!: AcBuilderApi;

  private _extensionStates: any = {};
  get extensionStates(): any {
    return this._extensionStates;
  }
  set extensionStates(value: any) {
    if (value != this._extensionStates) {
      this._extensionStates = value;
    }
  }

  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.builderApi.hooks.subscribe({
      hook: AcEnumBuilderHook.EditorClose, callback: () => {
        this.refresh();
      }
    });
    this.builderApi.hooks.subscribe({
      hook: AcEnumBuilderHook.ElementAdd, callback: () => {
        this.refresh();
      }
    });
    this.builderApi.hooks.subscribe({
      hook: AcEnumBuilderHook.ElementDelete, callback: () => {
        this.refresh();
      }
    });
  }

  fromJson(state: IAcBuilderState) {
    if (state) {
      if (state.components) {
        this.builderApi.components = state.components;
        if (this.builderApi.components.length > 0) {
          this.builderApi.setActiveComponent({ component: state.components[0] })
        }
      }
      if (state.extensionStates) {
        // this.setExtensionsState()
      }
      //
    }
  }

  refresh() {
    this.setExtensionsState();
    if (this.builderApi.component) {
      const activeComponent = this.builderApi.component;
      activeComponent.html = this.builderApi.grapesJSApi.getHtml({
        attributes(component, attr) {
          if (component && component.view && component.view.el && component.view.el.getAttribute(AcBuilderAttributeName.acBuilderElementInstanceName)) {
            attr[AcBuilderAttributeName.acBuilderElementInstanceName] = component.view.el.getAttribute(AcBuilderAttributeName.acBuilderElementInstanceName);
          }
          return attr;
        },
      });
      activeComponent.script = this.builderApi.scriptEditor.getCode();
    }
  }

  toJson(): IAcBuilderState {
    this.refresh();
    const activePage: IAcBuilderComponent = { ...this.builderApi.component };
    if (activePage.elements) {
      for (const element of Object.values(activePage.elements) as IAcComponentElement[]) {
        if (element.instance) {
          delete element.instance;
        }
      }
    }
    const result: IAcBuilderState = {
      extensionStates: { ...this.extensionStates },
      components: [activePage]
    };
    return result;
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }

  private setExtensionsState() {
    const extensions: any = {};
    for (const extensionName of Object.keys(this.builderApi.extensions)) {
      const extensionInstance = this.builderApi.extensions[extensionName];
      const extensionState = extensionInstance.getState();
      if (extensionState != undefined) {
        extensions[extensionName] = extensionState;
      }
    }
    this.extensionStates = extensions;
  }

}

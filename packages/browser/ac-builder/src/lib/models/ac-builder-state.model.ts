/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcBuilderState } from "../interfaces/ac-builder-state.interface";
import { IAcPage } from "../interfaces/ac-page.interface";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";
import { stat } from "fs";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";

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
        console.log("Editor close");
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
      if (state.pages) {
        this.builderApi.pages = state.pages;
        if (this.builderApi.pages.length > 0) {
          this.builderApi.setActivePage({ page: state.pages[0] })
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
    if (this.builderApi.page) {
      const activePage = this.builderApi.page;
      activePage.html = this.builderApi.grapesJSApi.getHtml({
        attributes(component, attr) {
          if (component && component.view && component.view.el && component.view.el.getAttribute(AcBuilderAttributeName.acBuilderElementId)) {
            attr[AcBuilderAttributeName.acBuilderElementId] = component.view.el.getAttribute(AcBuilderAttributeName.acBuilderElementId);
          }
          return attr;
        },
      });
      activePage.script = this.builderApi.scriptEditor.getCode();
    }
  }

  toJson(): IAcBuilderState {
    this.refresh();
    const activePage: IAcPage = { ...this.builderApi.page };
    if (activePage.elements) {
      for (const element of Object.values(activePage.elements) as IAcPageElement[]) {
        if (element.instance) {
          delete element.instance;
        }
      }
    }
    const result: IAcBuilderState = {
      extensionStates: { ...this.extensionStates },
      pages: [activePage]
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

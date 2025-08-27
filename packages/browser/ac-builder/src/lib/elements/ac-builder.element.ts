/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { grapesjs, Editor, EditorConfig } from 'grapesjs';
import { acAddClassToElement, acRemoveClassFromElement, AcTabs, AcTabsAttributeName } from '@autocode-ts/ac-browser';
import { AcBuilderApi } from '../core/ac-builder-api';
import { AcGrapesJSEventsHandler } from '../core/ac-grapesjs-events-handler';
export class AcBuilder {
  element: HTMLElement = document.createElement('div');
  grapesJSElement!: HTMLElement;

  builderApi: AcBuilderApi;
  grapesJSApi!: Editor;
  grapesJSEventsHandler?: AcGrapesJSEventsHandler;

  constructor() {
    this.builderApi = new AcBuilderApi({ builder: this });
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.element.style.display = 'flex';
    this.element.style.flexDirection = 'column';
    this.element.innerHTML = `
    <div class="ac-builder-body">
      <div class="ac-builder-sidebar ac-builder-left-sidebar">
        <div class="nav nav-tabs ac-sidebar-tabs" role="tablist" data-actabs-tablist>
          <button class="nav-link" type="button" role="tab" aria-selected="true" ${AcTabsAttributeName.acTab} ${AcTabsAttributeName.acTabTarget}=".ac-builder-components-tab">
            <i class="fa fa-puzzle-piece"></i>
          </button>
          <button class="nav-link" type="button" role="tab" aria-selected="true" ${AcTabsAttributeName.acTab} ${AcTabsAttributeName.acTabTarget}=".ac-builder-layers-panel">
            <i class="fa fa-layer-group"></i>
          </button>
        </div>
        <div class="tab-content">
          <div class="ac-builder-components-tab" ${AcTabsAttributeName.acTabPane} role="tabpanel" aria-labelledby="">
            <div class="p-2">
              <input type="text" class="form-control ac-builder-sidebar-input m-0 py-1" placeholder="Search...">
            </div>
            <div class="ac-builder-components-panel" >
            </div>
          </div>
          <div class="ac-builder-layers-panel"  ${AcTabsAttributeName.acTabPane} role="tabpanel" aria-labelledby=""></div>
        </div>
      </div>
      <div class="ac-builder-center-container">
        <div class="ac-builder-topbar">
          <div class="ac-builder-topbar-left">
          </div>
          <div class="ac-builder-topbar-center">
            <div class="btn-group btn-action-grp" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-action btn-device btn-desktop"><i class="fa fa-display text-white"></i></button>
              <button type="button" class="btn btn-action btn-device btn-tablet"><i class="fa fa-tablet-screen-button text-secondary"></i></button>
              <button type="button" class="btn btn-action btn-device btn-mobilePortrait"><i class="fa fa-mobile-screen text-secondary"></i></button>
            </div>
          </div>
          <div class="ac-builder-topbar-right">
            <div class="ac-builder-topbar-right-container me-2">
              <button type="button" class="btn btn-action btn-preview d-none" data-bs-toggle="tooltip" data-bs-title="Preview">
                <i class="fa fa-eye text-secondary"></i>
              </button>
              <button type="button" class="btn btn-action btn-outline" data-bs-toggle="tooltip" data-bs-title="Component Outline">
                <i class="fa fa-expand text-secondary"></i>
              </button>
              <button type="button" class="btn btn-action btn-fullscreen" data-bs-toggle="tooltip" data-bs-title="Fullscreen">
                <i class="fa fa-maximize text-secondary"></i>
              </button>
              <button type="button" class="btn btn-action btn-code" data-bs-toggle="tooltip" data-bs-title="Code">
                <i class="fa fa-code text-secondary"></i>
              </button>
              <button type="button" class="btn btn-action btn-clear-canvas" data-bs-toggle="tooltip" data-bs-title="Clear Content">
                <i class="fa fa-eraser text-secondary"></i>
              </button>
              <button type="button" class="btn btn-action btn-undo" data-bs-toggle="tooltip" data-bs-title="Undo">
                <i class="fa fa-undo text-secondary"></i>
              </button>
              <button type="button" class="btn btn-action btn-redo" data-bs-toggle="tooltip" data-bs-title="Redo">
                <i class="fa fa-redo text-secondary"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="ac-builder-canvas">
          <div class="card">
            <img src="https://grapesjs.com/img/grapesjs-logo.svg" alt="GrapesJS" width="120">
            <h2>Welcome to GrapesJS Studio SDK!</h2>
            <p>You’re currently viewing the default fallback project for web.</p>
            <p>This appears because no storage has been configured yet. To set up your own storage, follow the guide here: <br>
              👉 <a href="#">https://app.grapesjs.com/docs-sdk/configuration/projects#self-hosted-storage</a>
            </p>
            <p>Want to customize the fallback project? You can do so by setting <code>options.project.default</code>. Learn more here: <br>
              👉 <a href="#">https://app.grapesjs.com/docs-sdk/configuration/projects#setup</a>
            </p>
            <p>Happy building! 🚀</p>
          </div>
        </div>
      </div>
      <div class="ac-builder-sidebar">
        <div class="nav nav-tabs ac-sidebar-tabs" role="tablist" data-actabs-tablist>
          <button class="nav-link" type="button" role="tab" aria-selected="true" ${AcTabsAttributeName.acTab} ${AcTabsAttributeName.acTabTarget}=".ac-builder-styles-panel">
            <i class="fa fa-brush"></i>
          </button>
          <button class="nav-link" type="button" role="tab" aria-selected="true" ${AcTabsAttributeName.acTab} ${AcTabsAttributeName.acTabTarget}=".ac-builder-properties-panel">
            <i class="fa fa-pen-to-square"></i>
          </button>
          <button class="nav-link" type="button" role="tab" aria-selected="true" ${AcTabsAttributeName.acTab} ${AcTabsAttributeName.acTabTarget}=".ac-builder-events-panel">
            <i class="fa fa-bolt"></i>
          </button>
        </div>
        <div class="tab-content">
          <div class="ac-builder-styles-panel" ${AcTabsAttributeName.acTabPane}></div>
          <div class="ac-builder-properties-panel" ${AcTabsAttributeName.acTabPane}></div>
          <div class="ac-builder-events-panel" ${AcTabsAttributeName.acTabPane}></div>
        </div>
      </div>
    </div>
    `;
    const sidebars = Array.from(this.element.querySelectorAll('.ac-builder-sidebar'));
    for (const sidebar of sidebars) {
      new AcTabs({ element: sidebar as HTMLElement });
    }
    console.log(this);
  }

  init() {
    this.initGrapesJS();
  }

  initGrapesJS() {
    this.grapesJSApi = grapesjs.init({
      height: '100%',
      showOffsets: true,
      noticeOnUnload: false,
      storageManager: false,
      container: this.element.querySelector('.ac-builder-canvas') as HTMLElement,
      fromElement: true,
      blockManager: {
        appendTo: this.element.querySelector('.ac-builder-components-panel') as HTMLElement
      },
      layerManager: {
        appendTo: this.element.querySelector('.ac-builder-layers-panel') as HTMLElement
      },
      styleManager: {
        appendTo: this.element.querySelector('.ac-builder-styles-panel') as HTMLElement
      },
      traitManager: {
        appendTo: this.element.querySelector('.ac-builder-properties-panel') as HTMLElement
      },
      plugins: [
        'grapesjs-preset-webpage'
      ],
      pluginsOpts: {
        'grapesjs-preset-webpage': {}
      }
    });
    this.setGrapesJSElementStyles();
    this.setDeviceButtons();
    this.initGrapesJSCommands();
    this.grapesJSEventsHandler = new AcGrapesJSEventsHandler({ builderApi: this.builderApi });
  }



  private initGrapesJSCommands(): void {
    const btnPreview = this.element.querySelector('.btn-preview') as HTMLElement;
    btnPreview.addEventListener('click', () => {
      this.grapesJSApi.runCommand('preview');
    });

    const btnOutline = this.element.querySelector('.btn-outline') as HTMLElement;
    btnOutline.addEventListener('click', () => {
      this.grapesJSApi.runCommand('open-layers');
    });

    const btnFullscreen = this.element.querySelector('.btn-fullscreen') as HTMLElement;
    btnFullscreen.addEventListener('click', () => {
      this.grapesJSApi.runCommand('fullscreen');
    });


    const btnCode = this.element.querySelector('.btn-code') as HTMLElement;
    btnCode.addEventListener('click', () => {
      this.grapesJSApi.runCommand('gjs-open-code');
    });

    const btnClear = this.element.querySelector('.btn-clear-canvas') as HTMLElement;
    btnClear.addEventListener('click', () => {
      this.grapesJSApi.runCommand('core:canvas-clear');
    });

    const btnUndo = this.element.querySelector('.btn-undo') as HTMLElement;
    btnUndo.addEventListener('click', () => {
      this.grapesJSApi.runCommand('core:undo');
    });

    const btnRedo = this.element.querySelector('.btn-redo') as HTMLElement;
    btnRedo.addEventListener('click', () => {
      this.grapesJSApi.runCommand('core:redo');
    });
  }

  registerCustomElement({ elementName, elementTag, elementCategory, elementProperties, elementEvents }: { elementName: string, elementTag: string, elementCategory: string, elementProperties?: any, elementEvents?: any }) {
    const domc = this.grapesJSApi.DomComponents;
    domc.addType(elementTag, {
      model: {
        defaults: {
          tagName: elementTag,
        },
      },
      view: {
      },
    });
    this.grapesJSApi.BlockManager.add(elementTag, {
      label: elementName,
      content: { type: elementTag },
      category: elementCategory,
    });
  }

  registerCustomTrait() {
    const trm = this.grapesJSApi.TraitManager;

    trm.addType('color-picker', {
      createInput({ trait }: any) {
        const el = document.createElement('input');
        el.setAttribute('type', 'color');
        el.value = trait.getValue() || '#ff0000';
        el.addEventListener('input', (event: any) => {
          trait.setValue(event.target.value);
        });

        return el;
      },
    });
  }

  toJson(): any {
    const jsonObject: any = {};
    // const iframe = document.querySelector('iframe');
    // if (!iframe?.contentDocument) return [];

    // let wrapperElement: Element = iframe.contentDocument.querySelectorAll('[data-gjs-type=wrapper]')[0];
    // let html = wrapperElement.innerHTML;
    // jsonObject['builder_html'] = html;
    // let wrapperClone: any = wrapperElement.cloneNode(true);
    // const elements = wrapperClone.querySelectorAll('[data-angular-instance-id]');
    // const components: any[] = [];
    // let runtimeComponentHtmls: any = {};
    // let runtimeTypescriptVariables: string[] = [];
    // let runtimeTypescriptMethods: string[] = [];
    // elements.forEach((element: HTMLElement) => {
    //   const instanceId = element.getAttribute('data-angular-instance-id');
    //   if (!instanceId) return;
    //   const componentReference = this.angularComponentReferences[instanceId];
    //   if (!componentReference) return;
    //   const component = Array.from(element.children).find((el: any) => el.tagName.toLowerCase().includes('-')) as HTMLElement;
    //   if (!component) return;
    //   let runtimeComponentHtml = `<${component.tagName.toLowerCase()} `;
    //   let replaceKey = "{{" + this.simplify.generateId() + "}}";
    //   let wrapperHtml: string = wrapperClone.innerHTML;
    //   while (wrapperHtml.indexOf(replaceKey) >= 0) {
    //     replaceKey = "{{" + this.simplify.generateId() + "}}";
    //     wrapperHtml = wrapperClone.innerHTML;
    //   }
    //   let typescript: string[] = [];
    //   const properties:any[] = [];
    //   Object.values(componentReference.properties).forEach((property: any) => {
    //     if (!Simplify.validValue(property.variable_type)) return;
    //     const variableName = `${instanceId}_${property.input_name}`;
    //     runtimeComponentHtml += `[${property.input_name}]="${variableName}" `;
    //     const { variableType, variableValue } = this.getVariableTypeAndValue(property);
    //     runtimeTypescriptVariables.push(`${variableName}: ${variableType} = ${variableValue};`);
    //     properties.push({input_name:property.input_name.toString(),value:variableValue.toString(),variable_type:property.variable_type});
    //   });

    //   const outputs: any[] = [];
    //   Object.values(componentReference.events).forEach((eventDetails: any) => {
    //     if (typeof eventDetails !== 'object' || !eventDetails.event_code) return;
    //     const methodName = `${instanceId}_${eventDetails.output_name}`;
    //     runtimeComponentHtml += `(${eventDetails.output_name})="${methodName}($event)" `;
    //     runtimeTypescriptMethods.push(`${methodName}(event: any) {\n  ${eventDetails.event_code}\n};`);
    //     outputs.push({output_name:eventDetails.output_name,event_code:eventDetails.event_code});
    //   });

    //   runtimeComponentHtml += ` />`;
    //   element.children[0].replaceWith(replaceKey);
    //   runtimeComponentHtmls[replaceKey] = runtimeComponentHtml;

    //   components.push({
    //     instanceId,
    //     properties,
    //     events: outputs,
    //     runtime_html: runtimeComponentHtml,
    //     runtime_typescript: typescript.join('\n')
    //   });
    // });
    // let runtimeHtml:string = wrapperClone.innerHTML;
    // for(let key of Object.keys(runtimeComponentHtmls)){
    //   runtimeHtml = runtimeHtml.replace(key,runtimeComponentHtmls[key]);
    // }
    // jsonObject['builder_components'] = components;
    // jsonObject['runtime_typescript'] = runtimeTypescriptVariables.join("\n")+"\n\n\n"+runtimeTypescriptMethods.join("\n\n");
    // jsonObject['runtime_html'] = runtimeHtml;
    return jsonObject;
  }

  private setDeviceButtons() {
    const setActiveDevice: Function = (device: string) => {
      for (const el of Array.from(this.element.querySelectorAll('.btn-device'))) {
        const btnElement = el as HTMLElement;
        const iElement = btnElement.querySelector('i') as HTMLElement;
        console.log(btnElement, device);
        acAddClassToElement({ cssClass: 'text-secondary', element: iElement });
        acRemoveClassFromElement({ cssClass: 'text-white', element: iElement });
      }
      const iElement = (this.element.querySelector(`.btn-${device}`) as HTMLElement).querySelector('i') as HTMLElement;
      acAddClassToElement({ cssClass: 'text-white', element: iElement });
      acRemoveClassFromElement({ cssClass: 'text-secondary', element: iElement });
      this.grapesJSApi.setDevice(device);

    };
    const btnDesktop = this.element.querySelector('.btn-desktop') as HTMLElement;
    btnDesktop.addEventListener('click', () => {
      setActiveDevice('desktop');
    });

    const btnTablet = this.element.querySelector('.btn-tablet') as HTMLElement;
    btnTablet.addEventListener('click', () => {
      setActiveDevice('tablet');
    });

    const btnMobile = this.element.querySelector('.btn-mobilePortrait') as HTMLElement;
    btnMobile.addEventListener('click', () => {
      setActiveDevice('mobilePortrait');
    });
  }

  private setGrapesJSElementStyles() {
    const grapesJSElement = this.element.querySelector('.gjs-editor') as HTMLElement;
    grapesJSElement.style.height = "100%";
    grapesJSElement.style.width = "100%";
    const canvasElement = this.element.querySelector('.gjs-cv-canvas') as HTMLElement;
    canvasElement.style.height = "100%";
    canvasElement.style.width = "100%";
    canvasElement.style.top = "0px";
    const panelsElement = this.element.querySelector('.gjs-pn-panels') as HTMLElement;
    panelsElement.style.display = 'none';

  }
}

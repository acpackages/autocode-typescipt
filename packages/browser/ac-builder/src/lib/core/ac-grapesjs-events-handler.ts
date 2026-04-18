/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Editor } from "grapesjs";
import { AcBuilderApi } from "./ac-builder-api";
import { AcBuilderEventsHandler } from "./ac-builder-events-handler";
import { AC_BUILDER_ELEMENT_ATTRIBUTE } from "../consts/ac-builder-element-attribute.const";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { IAcComponentElement } from "../interfaces/ac-component-element.interface";
import { AcBuilderElementsManager } from "./ac-builder-elements-manager";
import { AcDelayedCallback } from "@autocode-ts/autocode";

export class AcGrapesJSEventsHandler {
  builderApi: AcBuilderApi;
  eventsHandler: AcBuilderEventsHandler;
  grapesJSApi: Editor;
  builderIframe?: HTMLIFrameElement;
  builderRoot?: HTMLElement;
  private delayedCallback:AcDelayedCallback = new AcDelayedCallback();

  private mutationObserver?: MutationObserver;
  private _grapesEvents: Array<{ event: string, handler: any }> = [];

  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.eventsHandler = builderApi.eventHandler;
    this.grapesJSApi = this.builderApi.builder.grapesJSApi;
    this.registerEventListeners();
  }

  destroy() {
    this.delayedCallback.cancelAll();
    this.mutationObserver?.disconnect();
    this._grapesEvents.forEach(e => this.grapesJSApi.off(e.event, e.handler));
    this._grapesEvents = [];
  }

  private grapesOn(event: string, handler: any) {
    this.grapesJSApi.on(event, handler);
    this._grapesEvents.push({ event, handler });
  }

  getComponentElement({ component }: { component: any }): IAcComponentElement | undefined {
    let result;
    if (component && component.view && component.view.el && this.builderApi && this.builderApi.component && this.builderApi.component.elements) {
      const element: HTMLElement = component.view.el;
      if (element.hasAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)) {
        const instanceName: string = element.getAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)!;
        result = this.builderApi.component.elements[instanceName];
      }
    }
    return result;
  }

  makeElementInteractive({ element }: { element: HTMLElement }) {
    if (!element) return;
    if (!element.hasAttribute('ac-builder-interactive-set')) {
      const wrapper = this.grapesJSApi.getWrapper()!;
      let cmp: any = wrapper.find('*').filter(c => c.getEl() === element)[0];
      if (!cmp) {
        const createComponent = () => {
          if (element.parentNode) {
            cmp = this.grapesJSApi.addComponents(element.outerHTML);
            element.replaceWith(cmp[0].view.el);
            cmp[0].view.el.setAttribute('ac-builder-interactive-set', "true");
            cmp = wrapper.components().last();
            const setInteractive = (component: any) => {
              component.set({
                editable: true,
                draggable: true,
                removable: true,
                copyable: true,
                droppable: true
              });
              component.components().each((child: any) => setInteractive(child));
            };
            setInteractive(cmp);
          }
          else {
            this.delayedCallback.add({callback:() => {
              createComponent();
            }, duration:1});
          }
        }
        createComponent();
      }

    }

  }

  registerAttributesChangeListener() {
    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type == 'attributes') {
          const element = mutation.target as HTMLElement;
          const attrName: string = mutation.attributeName!;
          if (attrName == AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInteractive) {
            this.makeElementInteractive({ element });
          }
        }
        else if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              if (element.hasAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInteractive)) {
                this.makeElementInteractive({ element });
              }
            }
          });
        }
        else {
          //
        }
      });
    });
    this.mutationObserver.observe(this.builderRoot!, {
      attributes: true,
      childList: true,
      subtree: true
    });
    const interactiveElements = this.builderRoot?.querySelectorAll(`[${AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInteractive}]`);
    if (interactiveElements) {
      for (const element of Array.from(interactiveElements) as HTMLElement[]) {
        this.makeElementInteractive({ element });
      }
    }
  }

  registerBlockListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('block:add', (args) => {
      this.delayedCallback.add({callback:() => {
        this.builderApi.builder.setFilterableElementsGroups();
      }, duration:1});
    });
    this.grapesOn('block:remove', (args) => {
      //
    });
    this.grapesOn('block:remove:before', (args) => {
      //
    });
    this.grapesOn('block:update', (args) => {
      //
    });
    this.grapesOn('block:drag:start', (args) => {
      //
    });
    this.grapesOn('block:drag', (args) => {
      //
    });
    this.grapesOn('block:drag:stop', (args) => {
      //
    });
    this.grapesOn('block:category:update', (args) => {
      //
    });
    this.grapesOn('block:category:add', (args) => {
      //
    });
    this.grapesOn('block:custom', (args) => {
      //
    });
    this.grapesOn('block', (args) => {
      //
    });
  }

  registerCommandListers() {
    const editor = this.grapesJSApi;
    this.grapesOn('command:run', (args) => {
      //
    });
    this.grapesOn('command:stop', (args) => {
      //
    });
  }

  registerElementListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('component:add', (args) => {
      const handleFunction = () => {
        if (args && args.view && args.view.el) {
          this.eventsHandler.handleElementAdd({ element: args.view.el });
        }
        else {
          this.delayedCallback.add({callback:() => {
            handleFunction();
          }, duration:10});
        }
      }
      handleFunction();
    });
    this.grapesOn('component:remove', (component) => {
      if (component && component.view && component.view.el) {
        this.eventsHandler.handleElementRemove({ element: component.view.el });
        const toolbarEl = this.grapesJSApi.Canvas.getToolbarEl();
        if (toolbarEl) {
          toolbarEl.style.display = 'none';
        }
      }
    });
    this.grapesOn('component:selected', (args) => {
      this.renderElementToolbar(args);
      const handleFunction = () => {
        if (args && args.view && args.view.el) {
          this.eventsHandler.handleElementSelect({ element: args.view.el });
        }
      }
      handleFunction();
    });
    this.grapesOn('component:deselected', (args) => {
      //
    });
    this.grapesOn('component:update:attributes', (args) => {
      //
    });
  }

  registerEventListeners() {
    this.grapesOn('run:tlb-edit', () => false);
    this.registerBlockListeners();
    this.registerCommandListers();
    this.registerElementListeners();
    this.registerLayerListeners();
    this.registerModalListeners();
    this.registerPageListeners();
    this.registerSelectorListeners();
    this.registerStorageListeners();
    this.registerStyleListeners();
    this.registerTraitListeners();
    this.grapesOn('load', () => {
      this.builderIframe = this.grapesJSApi.Canvas.getFrameEl();
      const iframeDocument = this.builderIframe.contentDocument || this.builderIframe.contentWindow?.document;
      if (iframeDocument) {
        document.querySelectorAll('link[rel="stylesheet"]').forEach((link: any) => {
          const newLink = iframeDocument.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = link.href;
          iframeDocument.head.appendChild(newLink);
        });
        document.querySelectorAll('script[src]').forEach((script: any) => {
          const newScript = iframeDocument.createElement('script');
          newScript.src = script.src;
          newScript.async = false;
          iframeDocument.body.appendChild(newScript);
        });
        this.builderRoot = iframeDocument.querySelector('body') as HTMLElement;
      }
      this.registerAttributesChangeListener();
    });
  }

  registerLayerListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('layer:root', (args) => {
      //
    });
    this.grapesOn('layer:Element', (args) => {
      //
    });
  }

  registerModalListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('modal:open', (args) => {
      //
    });
    this.grapesOn('modal:close', (args) => {
      //
    });
    this.grapesOn('modal', (args) => {
      //
    });
  }

  registerPageListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('page:add', (args) => {
      //
    });
    this.grapesOn('page:remove', (args) => {
      //
    });
    this.grapesOn('page:select', (args) => {
      //
    });
    this.grapesOn('page:update', (args) => {
      //
    });
    this.grapesOn('page', (args) => {
      //
    });
  }

  registerSelectorListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('selector:add', (args) => {
      //
    });
    this.grapesOn('selector:remove', (args) => {
      //
    });
    this.grapesOn('selector:update', (args) => {
      //
    });
    this.grapesOn('selector:state', (args) => {
      //
    });
    this.grapesOn('selector', (args) => {
      //
    });
  }

  registerStorageListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('storage:start', (args) => {
      //
    });
    this.grapesOn('storage:start:store', (args) => {
      //
    });
    this.grapesOn('storage:start:load', (args) => {
      //
    });
    this.grapesOn('storage:load', (args) => {
      //
    });
    this.grapesOn('storage:store', (args) => {
      //
    });
    this.grapesOn('storage:after', (args) => {
      //
    });
    this.grapesOn('storage:end', (args) => {
      //
    });
    this.grapesOn('storage:end:store', (args) => {
      //
    });
    this.grapesOn('storage:end:load', (args) => {
      //
    });
    this.grapesOn('storage:error', (args) => {
      //
    });
    this.grapesOn('storage:error:store', (args) => {
      //
    });
    this.grapesOn('storage:error:load', (args) => {
      //
    });
  }

  registerStyleListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('style:sector:add', (args) => {
      //
    });
    this.grapesOn('style:sector:remove', (args) => {
      //
    });
    this.grapesOn('style:sector:update', (args) => {
      //
    });
    this.grapesOn('style:property:add', (args) => {
      //
    });
    this.grapesOn('style:property:remove', (args) => {
      //
    });
    this.grapesOn('style:property:update', (args) => {
      //
    });
    this.grapesOn('style:target', (args) => {
      //
    });
  }

  registerTraitListeners() {
    const editor = this.grapesJSApi;
    this.grapesOn('trait:select', (args) => {
      //
    });
    this.grapesOn('trait:value', (args) => {
      //
    });
    this.grapesOn('trait:category:update', (args) => {
      //
    });
    this.grapesOn('trait:custom', (args) => {
      //
    });
    this.grapesOn('trait', (args) => {
      //
    });
  }

  renderElementToolbar(comp: any) {
    const toolbarEl = this.grapesJSApi.Canvas.getToolbarEl();

    if (!toolbarEl) return;
    const componentElement = this.getComponentElement({ component: comp });
    const element = comp.view.el as HTMLElement;

    const getMenuElement = ({ icon, title, callback, color = 'white' }: { icon: string, title: string, callback: Function, color?: string }) => {
      const menuElement = document.createElement('button');
      menuElement.style.background = "transparent";
      menuElement.style.border = "none";
      menuElement.style.color = color;
      menuElement.style.height = '20px';
      menuElement.style.width = '30px';
      menuElement.innerHTML = `<ac-svg-icon class="ac-builder-toolbar-btn">${icon}</ac-svg-icon>`;
      menuElement.setAttribute('ac-tooltip', title);
      menuElement.addEventListener('click', () => { callback(menuElement) });
      return menuElement;
    };
    this.delayedCallback.add({callback:() => {
      toolbarEl.innerHTML = '';
      toolbarEl.style.background = '#303030ff';
      toolbarEl.style.color = '#fff';
      toolbarEl.style.borderRadius = '4px';
      toolbarEl.style.padding = '2px';
      toolbarEl.style.border = 'solid 1px #555'
      this.delayedCallback.add({callback:() => {

        if (componentElement && componentElement.instance) {
          const builderElement = AcBuilderElementsManager.getElement({ name: componentElement.name });
          if (builderElement?.commands) {
            for (const command of builderElement.commands) {
              toolbarEl.append(getMenuElement({
                title: command.title, icon: command.iconSvg ?? ACI_SVG_SOLID.command, callback: () => {
                  componentElement.instance.handleCommand({ command: command.name, args: {} });
                }
              }));
            }
          }
        }
        if (element.getAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderKeepHtml) == 'true') {
          toolbarEl.append(getMenuElement({
            title: 'Html will be exported! <br>Click to exclude html', icon: ACI_SVG_SOLID.code, callback: (menuElement: HTMLElement) => {
              element.setAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderKeepHtml, 'false');
              menuElement.blur();
              this.renderElementToolbar(comp);
            }
          }));
        }
        else {
          toolbarEl.append(getMenuElement({
            title: 'Html will not be exported! <br>Click to keep html', icon: ACI_SVG_SOLID.code, color: '#555', callback: (menuElement: HTMLElement) => {
              element.setAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderKeepHtml, 'true');
              menuElement.blur();
              this.renderElementToolbar(comp);
            }
          }));
        }

        toolbarEl.append(getMenuElement({
          title: 'Clone', icon: ACI_SVG_SOLID.clone, callback: () => {
            const cloned = comp.clone();
            comp.parent()?.append(cloned);
          }
        }));

        toolbarEl.append(getMenuElement({
          title: 'Remove', icon: ACI_SVG_SOLID.trash, callback: () => {
            comp.remove();
          }
        }));
      }, duration:1});
    }, duration:1});
  }

}

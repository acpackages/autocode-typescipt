import { Editor } from "grapesjs";
import { AcBuilderApi } from "./ac-builder-api";
import { AcBuilderEventsHandler } from "./ac-builder-events-handler";

export class AcGrapesJSEventsHandler {
  builderApi: AcBuilderApi;
  eventsHandler:AcBuilderEventsHandler;
  grapesJSApi: Editor;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.eventsHandler = builderApi.eventHandler;
    this.grapesJSApi = this.builderApi.builder.grapesJSApi;
    this.registerEventListeners();
  }

  registerBlockListeners() {
    const editor = this.grapesJSApi;
    editor.on('block:add', (args) => {
      setTimeout(() => {
        this.builderApi.builder.setFilterableElementsGroups();
      }, 1);
    });
    editor.on('block:remove', (args) => {
      //
    });
    editor.on('block:remove:before', (args) => {
      //
    });
    editor.on('block:update', (args) => {
      //
    });
    editor.on('block:drag:start', (args) => {
      //
    });
    editor.on('block:drag', (args) => {
      //
    });
    editor.on('block:drag:stop', (args) => {
      //
    });
    editor.on('block:category:update', (args) => {
      console.log(args);
    });
    editor.on('block:category:add', (args) => {
      console.log(args);
    });
    editor.on('block:custom', (args) => {
      //
    });
    editor.on('block', (args) => {
      // console.log(args);
    });
  }

  registerCommandListers() {
    const editor = this.grapesJSApi;
    editor.on('command:run', (args) => {
      //
    });
    editor.on('command:stop', (args) => {
      //
    });
  }

  registerElementListeners() {
    const editor = this.grapesJSApi;
    editor.on('component:add', (args) => {
      const handleFunction = ()=>{
        if(args && args.view && args.view.el){
          this.eventsHandler.handleElementAdd({element:args.view.el});
        }
        else{
          setTimeout(() => {
            handleFunction();
          }, 10);
        }
      }
      handleFunction();
    });
    editor.on('component:remove', (args) => {
      // this.eventsHandler.handleElementAdd({element:args.view.el});
      // this.builderApi.hooks.execute({hook:AcEnumBuilderHook.ElementDelete,args:{}});
    });
    editor.on('component:selected', (args) => {
       const handleFunction = ()=>{
        if(args && args.view && args.view.el){
          this.eventsHandler.handleElementSelect({element:args.view.el});
        }
      }
      handleFunction();
    });
    editor.on('component:deselected', (args) => {
      //
    });
    editor.on('component:update:attributes', (args) => {
      //
    });
  }

  registerEventListeners() {
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
    this.grapesJSApi.on('load', () => {
      const iframe = this.grapesJSApi.Canvas.getFrameEl(); // Get the iframe
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDocument) {
        // Inject all parent stylesheets into the iframe
        document.querySelectorAll('link[rel="stylesheet"]').forEach((link: any) => {
          const newLink = iframeDocument.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = link.href;
          iframeDocument.head.appendChild(newLink);
        });

        // Inject all parent scripts into the iframe
        document.querySelectorAll('script[src]').forEach((script: any) => {
          const newScript = iframeDocument.createElement('script');
          newScript.src = script.src;
          newScript.async = false; // Ensure scripts execute in order
          iframeDocument.body.appendChild(newScript);
        });
      }
    });
  }

  registerLayerListeners() {
    const editor = this.grapesJSApi;
    editor.on('layer:root', (args) => {
      //
    });
    editor.on('layer:Element', (args) => {
      //
    });
  }

  registerModalListeners() {
    const editor = this.grapesJSApi;
    editor.on('modal:open', (args) => {
      //
    });
    editor.on('modal:close', (args) => {
      //
    });
    editor.on('modal', (args) => {
      //
    });
  }

  registerPageListeners() {
    const editor = this.grapesJSApi;
    editor.on('page:add', (args) => {
      //
    });
    editor.on('page:remove', (args) => {
      //
    });
    editor.on('page:select', (args) => {
      //
    });
    editor.on('page:update', (args) => {
      //
    });
    editor.on('page', (args) => {
      //
    });
  }

  registerSelectorListeners() {
    const editor = this.grapesJSApi;
    editor.on('selector:add', (args) => {
      //
    });
    editor.on('selector:remove', (args) => {
      //
    });
    editor.on('selector:update', (args) => {
      //
    });
    editor.on('selector:state', (args) => {
      //
    });
    editor.on('selector', (args) => {
      //
    });
  }

  registerStorageListeners() {
    const editor = this.grapesJSApi;
    editor.on('storage:start', (args) => {
      //
    });
    editor.on('storage:start:store', (args) => {
      //
    });
    editor.on('storage:start:load', (args) => {
      //
    });
    editor.on('storage:load', (args) => {
      //
    });
    editor.on('storage:store', (args) => {
      //
    });
    editor.on('storage:after', (args) => {
      //
    });
    editor.on('storage:end', (args) => {
      //
    });
    editor.on('storage:end:store', (args) => {
      //
    });
    editor.on('storage:end:load', (args) => {
      //
    });
    editor.on('storage:error', (args) => {
      //
    });
    editor.on('storage:error:store', (args) => {
      //
    });
    editor.on('storage:error:load', (args) => {
      //
    });
  }

  registerStyleListeners() {
    const editor = this.grapesJSApi;
    editor.on('style:sector:add', (args) => {
      //
    });
    editor.on('style:sector:remove', (args) => {
      //
    });
    editor.on('style:sector:update', (args) => {
      //
    });
    editor.on('style:property:add', (args) => {
      //
    });
    editor.on('style:property:remove', (args) => {
      //
    });
    editor.on('style:property:update', (args) => {
      //
    });
    editor.on('style:target', (args) => {
      //
    });
  }

  registerTraitListeners() {
    const editor = this.grapesJSApi;
    editor.on('trait:select', (args) => {
      //
    });
    editor.on('trait:value', (args) => {
      //
    });
    editor.on('trait:category:update', (args) => {
      //
    });
    editor.on('trait:custom', (args) => {
      //
    });
    editor.on('trait', (args) => {
      //
    });
  }

}

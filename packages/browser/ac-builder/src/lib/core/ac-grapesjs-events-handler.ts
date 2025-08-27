import { Editor } from "grapesjs";
import { AcBuilderApi } from "./ac-builder-api";

export class AcGrapesJSEventsHandler {
  builderApi: AcBuilderApi;
  grapesJSApi: Editor;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.grapesJSApi = this.builderApi.builder.grapesJSApi;
    this.registerEventListeners();
  }

  log(...args){
    // console.log(args);
  }

  registerBlockListeners() {
    const editor = this.grapesJSApi;
    editor.on('block:add', (args) => {
      this.log("Block Add");
      this.log(args);
    });
    editor.on('block:remove', (args) => {
      this.log("Block Remove");
      this.log(args);
    });
    editor.on('block:remove:before', (args) => {
      this.log("Block Remove Before");
      this.log(args);
    });
    editor.on('block:update', (args) => {
      this.log("Block Update");
      this.log(args);
    });
    editor.on('block:drag:start', (args) => {
      this.log("Block Drag Start");
      this.log(args);
    });
    editor.on('block:drag', (args) => {
      this.log("Block Drag");
      this.log(args);
    });
    editor.on('block:drag:stop', (args) => {
      this.log("Block Drag Stop");
      this.log(args);
    });
    editor.on('block:category:update', (args) => {
      this.log("Block Category Update");
      this.log(args);
    });
    editor.on('block:custom', (args) => {
      this.log("Block Custom");
      this.log(args);
    });
    editor.on('block', (args) => {
      this.log("Block");
      this.log(args);
    });
  }

  registerCommandListers() {
    const editor = this.grapesJSApi;
    editor.on('command:run', (args) => {
      this.log("Command Run");
      this.log(args);
    });
    editor.on('command:stop', (args) => {
      this.log("Command Stop");
      this.log(args);
    });
  }

  registerComponentListeners() {
    const editor = this.grapesJSApi;
    editor.on('component:add', (args) => {
      this.log("Component Add");
      this.log(args);
    });
    editor.on('component:remove', (args) => {
      this.log("Component Remove");
      this.log(args);
    });
    editor.on('component:selected', (args) => {
      this.log("Component Selected");
      this.log(args);
    });
    editor.on('component:deselected', (args) => {
      this.log("Component Deselected");
      this.log(args);
    });
    editor.on('component:update:attributes', (args) => {
      this.log("Component Attributes");
      this.log(args);
    });
  }

  registerEventListeners() {
    this.registerBlockListeners();
    this.registerCommandListers();
    this.registerComponentListeners();
    this.registerLayerListeners();
    this.registerModalListeners();
    this.registerPageListeners();
    this.registerSelectorListeners();
    this.registerStorageListeners();
    this.registerStyleListeners();
    this.registerTraitListeners();
  }

  registerLayerListeners() {
    const editor = this.grapesJSApi;
    editor.on('layer:root', (args) => {
      this.log("Layer Root");
      this.log(args);
    });
    editor.on('layer:component', (args) => {
      this.log("Layer Component");
      this.log(args);
    });
  }

  registerModalListeners() {
    const editor = this.grapesJSApi;
    editor.on('modal:open', (args) => {
      this.log("Modal Open");
      this.log(args);
    });
    editor.on('modal:close', (args) => {
      this.log("Modal Close");
      this.log(args);
    });
    editor.on('modal', (args) => {
      this.log("Modal");
      this.log(args);
    });
  }

  registerPageListeners() {
    const editor = this.grapesJSApi;
    editor.on('page:add', (args) => {
      this.log("Page Add");
      this.log(args);
    });
    editor.on('page:remove', (args) => {
      this.log("Page Remove");
      this.log(args);
    });
    editor.on('page:select', (args) => {
      this.log("Page Update");
      this.log(args);
    });
    editor.on('page:update', (args) => {
      this.log("Page State");
      this.log(args);
    });
    editor.on('page', (args) => {
      this.log("Page");
      this.log(args);
    });
  }

  registerSelectorListeners() {
    const editor = this.grapesJSApi;
    editor.on('selector:add', (args) => {
      this.log("Selector Add");
      this.log(args);
    });
    editor.on('selector:remove', (args) => {
      this.log("Selector Remove");
      this.log(args);
    });
    editor.on('selector:update', (args) => {
      this.log("Selector Update");
      this.log(args);
    });
    editor.on('selector:state', (args) => {
      this.log("Selector State");
      this.log(args);
    });
    editor.on('selector', (args) => {
      this.log("Selector");
      this.log(args);
    });
  }

  registerStorageListeners() {
    const editor = this.grapesJSApi;
    editor.on('storage:start', (args) => {
      this.log("Storage Start");
      this.log(args);
    });
    editor.on('storage:start:store', (args) => {
      this.log("Storage Start Store");
      this.log(args);
    });
    editor.on('storage:start:load', (args) => {
      this.log("Storage Start Load");
      this.log(args);
    });
    editor.on('storage:load', (args) => {
      this.log("Storage Load");
      this.log(args);
    });
    editor.on('storage:store', (args) => {
      this.log("Storage Store");
      this.log(args);
    });
    editor.on('storage:after', (args) => {
      this.log("Storage After");
      this.log(args);
    });
    editor.on('storage:end', (args) => {
      this.log("Storage End");
      this.log(args);
    });
    editor.on('storage:end:store', (args) => {
      this.log("Storage End Store");
      this.log(args);
    });
    editor.on('storage:end:load', (args) => {
      this.log("Storage End Load");
      this.log(args);
    });
    editor.on('storage:error', (args) => {
      this.log("Storage Error");
      this.log(args);
    });
    editor.on('storage:error:store', (args) => {
      this.log("Storage Error Store");
      this.log(args);
    });
    editor.on('storage:error:load', (args) => {
      this.log("Storage Error Load");
      this.log(args);
    });
  }

  registerStyleListeners() {
    const editor = this.grapesJSApi;
    editor.on('style:sector:add', (args) => {
      this.log("Style Sector Add");
      this.log(args);
    });
    editor.on('style:sector:remove', (args) => {
      this.log("Style Sector Remove");
      this.log(args);
    });
    editor.on('style:sector:update', (args) => {
      this.log("Style Sector Update");
      this.log(args);
    });
    editor.on('style:property:add', (args) => {
      this.log("Style Property Add");
      this.log(args);
    });
    editor.on('style:property:remove', (args) => {
      this.log("Style Property Remove");
      this.log(args);
    });
    editor.on('style:property:update', (args) => {
      this.log("Style Property Update");
      this.log(args);
    });
    editor.on('style:target', (args) => {
      this.log("Style Target");
      this.log(args);
    });
  }

  registerTraitListeners() {
    const editor = this.grapesJSApi;
    editor.on('trait:select', (args) => {
      this.log("Trait Select");
      this.log(args);
    });
    editor.on('trait:value', (args) => {
      this.log("Trait Value");
      this.log(args);
    });
    editor.on('trait:category:update', (args) => {
      this.log("Trait Value");
      this.log(args);
    });
    editor.on('trait:custom', (args) => {
      this.log("Trait Custom");
      this.log(args);
    });
    editor.on('trait', (args) => {
      this.log("Trait");
      this.log(args);
    });
  }

}

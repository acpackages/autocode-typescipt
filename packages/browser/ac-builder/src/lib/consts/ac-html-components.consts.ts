import { IAcBuilderElementEvent } from "../interfaces/ac-builder-element-event.interface";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementCallbackArgs } from "../interfaces/callback-args/ac-builder-component-callback-args.interface";
import { AcBuilderIconSvgs } from "./ac-builder-icon-svgs.consts";

const SHARED_PROPERTIES: IAcBuilderElementProperty[] = [
  { name: "id", type: "string", title: "Id", category: "General" },
  { name: "title", type: "string", title: "Tooltip", category: "General" },
];

const BOOL_PROPERTIES: IAcBuilderElementProperty[] = [
  { name: "disabled", type: "boolean", title: "Disabled", category: "Behavior" },
  { name: "readonly", type: "boolean", title: "Read Only", category: "Behavior" },
  { name: "checked", type: "boolean", title: "Checked", category: "Behavior" },
  { name: "required", type: "boolean", title: "Required", category: "Behavior" },
  { name: "multiple", type: "boolean", title: "Multiple", category: "Behavior" },
  { name: "autoplay", type: "boolean", title: "Autoplay", category: "Media" },
  { name: "controls", type: "boolean", title: "Controls", category: "Media" },
  { name: "loop", type: "boolean", title: "Loop", category: "Media" },
  { name: "muted", type: "boolean", title: "Muted", category: "Media" },
];

const SHARED_EVENTS: IAcBuilderElementEvent[] = [
  { name: "onclick", title: "Click", category: "Mouse" },
  { name: "ondblclick", title: "Double Click", category: "Mouse" },
  { name: "onmouseover", title: "Mouse Over", category: "Mouse" },
  { name: "onmouseout", title: "Mouse Out", category: "Mouse" },
  { name: "onchange", title: "Change", category: "Form" },
  { name: "oninput", title: "Input", category: "Form" },
  { name: "onsubmit", title: "Submit", category: "Form" },
];

const MEDIA_EVENTS: IAcBuilderElementEvent[] = [
  { name: "onplay", title: "Play", category: "Media" },
  { name: "onpause", title: "Pause", category: "Media" },
  { name: "onended", title: "Ended", category: "Media" },
  { name: "ontimeupdate", title: "Time Update", category: "Media" },
];

const BUILDER_COMPONENTS: IAcBuilderElement[] = [
  // ---------------- Layout ----------------
  {
    tag: "div",
    name: "div",
    title: "Container",
    category: "Layout",
    mediaSvg:AcBuilderIconSvgs.container,
    properties: [...SHARED_PROPERTIES],
    events: [...SHARED_EVENTS],
    initCallback:(args:IAcBuilderElementCallbackArgs)=>{
      const element = args.element;
      element.innerHTML = "Container Element";
    }
  },
  {
    tag: "p",
    name: "p",
    title: "Paragraph",
    category: "Text",
    mediaSvg:AcBuilderIconSvgs.paragraph,
    properties: [...SHARED_PROPERTIES],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "a",
    name: "a",
    title: "Link",
    category: "Navigation",
    mediaSvg:AcBuilderIconSvgs.link,
    properties: [...SHARED_PROPERTIES, { name: "href", type: "string", title: "Href", category: "Navigation" }, { name: "target", type: "dropdown", title: "Target", category: "Navigation" }],
    events: [...SHARED_EVENTS],
  },
  {
    tag: "img",
    name: "img",
    title: "Image",
    category: "Media",
    mediaSvg:AcBuilderIconSvgs.image,
    properties: [...SHARED_PROPERTIES, { name: "src", type: "string", title: "Source", category: "Media" }, { name: "alt", type: "string", title: "Alt Text", category: "Media" }],
    events: [...SHARED_EVENTS],
  },
  {
    tag: "video",
    name: "video",
    title: "Video",
    category: "Media",
    mediaSvg:AcBuilderIconSvgs.video,
    properties: [...SHARED_PROPERTIES, { name: "src", type: "string", title: "Source", category: "Media" }, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS, ...MEDIA_EVENTS],
  },
  {
    tag: "audio",
    name: "audio",
    title: "Audio",
    category: "Media",
    mediaSvg:AcBuilderIconSvgs.audio,
    properties: [...SHARED_PROPERTIES, { name: "src", type: "string", title: "Source", category: "Media" }, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS, ...MEDIA_EVENTS],
  },
  {
    tag: "canvas",
    name: "canvas",
    title: "Canvas",
    category: "Media",
    mediaSvg:AcBuilderIconSvgs.canvas,
    properties: [...SHARED_PROPERTIES, { name: "width", type: "string", title: "Width", category: "Media" }, { name: "height", type: "string", title: "Height", category: "Media" }],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "form",
    name: "form",
    title: "Form",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.form,
    properties: [...SHARED_PROPERTIES, { name: "action", type: "string", title: "Action", category: "Form" }, { name: "method", type: "dropdown", title: "Method", category: "Form" }],
    events: [...SHARED_EVENTS],
  },
  {
    tag: "input",
    name: "input",
    title: "Input Field",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.input,
    properties: [...SHARED_PROPERTIES, { name: "type", type: "dropdown", title: "Type", category: "Form" }, { name: "placeholder", type: "string", title: "Placeholder", category: "Form" }, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS],
  },
  {
    tag: "button",
    name: "button",
    title: "Button",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.button,
    properties: [...SHARED_PROPERTIES, { name: "type", type: "dropdown", title: "Type", category: "Form" }, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "select",
    name: "select",
    title: "Select",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.select,
    properties: [...SHARED_PROPERTIES, { name: "multiple", type: "boolean", title: "Multiple", category: "Behavior" }],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "textarea",
    name: "textarea",
    title: "Textarea",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.textarea,
    properties: [...SHARED_PROPERTIES, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "checkbox",
    name: "checkbox",
    title: "Checkbox",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.checkbox,
    properties: [...SHARED_PROPERTIES, { name: "type", type: "dropdown", title: "Type", category: "Form" }, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "radio",
    name: "radio",
    title: "Radio",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.radio,
    properties: [...SHARED_PROPERTIES, { name: "type", type: "dropdown", title: "Type", category: "Form" }, ...BOOL_PROPERTIES],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "label",
    name: "label",
    title: "Label",
    category: "Form",
    mediaSvg:AcBuilderIconSvgs.label,
    properties: [...SHARED_PROPERTIES, { name: "for", type: "string", title: "For", category: "Form" }],
    events: [...SHARED_EVENTS]
  },
  {
    tag: "ul",
    name: "ul-li",
    title: "Unordered List",
    category: "List",
    mediaSvg:AcBuilderIconSvgs.unorderdList,
    properties: [...SHARED_PROPERTIES],
    events: [...SHARED_EVENTS],
    initCallback: () => "<ul><li>Item</li></ul>",
  },
  {
    tag: "ol",
    name: "ol-li",
    title: "Ordered List",
    category: "List",
    mediaSvg:AcBuilderIconSvgs.orderedList,
    properties: [...SHARED_PROPERTIES],
    events: [...SHARED_EVENTS],
    initCallback: () => "<ol><li>Item</li></ol>",
  },
  {
    tag: "table",
    name: "table",
    title: "Table",
    category: "Table",
    mediaSvg:AcBuilderIconSvgs.table,
    properties: [...SHARED_PROPERTIES],
    events: [...SHARED_EVENTS],
    initCallback: () => "<table><tr><th>Header</th></tr><tr><td>Cell</td></tr></table>",
  },
];

export function acGetHtmlComponents():IAcBuilderElement[]{
  const result:IAcBuilderElement[] = [];
  for(const component of BUILDER_COMPONENTS){
    result.push(component);
  }
  return result;
}

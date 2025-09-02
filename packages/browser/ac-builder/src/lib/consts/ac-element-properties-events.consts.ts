import { AC_BUILDER_CONTAINER_ELEMENT } from "../builder-elements/ac-container-element.element";
import { IAcBuilderElementEvent } from "../interfaces/ac-builder-element-event.interface";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";

export const AC_ARIA_PROPERTIES = {
  "aria-activedescendant": { name: "aria-activedescendant", type: "string", title: "Active Descendant", category: "Aria", htmlAttributeName: "aria-activedescendant" },
  "aria-atomic": { name: "aria-atomic", type: "boolean", title: "Atomic", category: "Aria", htmlAttributeName: "aria-atomic" },
  "aria-autocomplete": { name: "aria-autocomplete", type: "string", title: "Autocomplete", category: "Aria", htmlAttributeName: "aria-autocomplete" },
  "aria-busy": { name: "aria-busy", type: "boolean", title: "Busy", category: "Aria", htmlAttributeName: "aria-busy" },
  "aria-checked": { name: "aria-checked", type: "string", title: "Checked", category: "Aria", htmlAttributeName: "aria-checked" },
  "aria-colcount": { name: "aria-colcount", type: "number", title: "Column Count", category: "Aria", htmlAttributeName: "aria-colcount" },
  "aria-colindex": { name: "aria-colindex", type: "number", title: "Column Index", category: "Aria", htmlAttributeName: "aria-colindex" },
  "aria-colspan": { name: "aria-colspan", type: "number", title: "Column Span", category: "Aria", htmlAttributeName: "aria-colspan" },
  "aria-controls": { name: "aria-controls", type: "string", title: "Controls", category: "Aria", htmlAttributeName: "aria-controls" },
  "aria-current": { name: "aria-current", type: "string", title: "Current", category: "Aria", htmlAttributeName: "aria-current" },
  "aria-describedby": { name: "aria-describedby", type: "string", title: "Described By", category: "Aria", htmlAttributeName: "aria-describedby" },
  "aria-description": { name: "aria-description", type: "string", title: "Description", category: "Aria", htmlAttributeName: "aria-description" },
  "aria-details": { name: "aria-details", type: "string", title: "Details", category: "Aria", htmlAttributeName: "aria-details" },
  "aria-disabled": { name: "aria-disabled", type: "boolean", title: "Disabled", category: "Aria", htmlAttributeName: "aria-disabled" },
  "aria-dropeffect": { name: "aria-dropeffect", type: "string", title: "Drop Effect (deprecated)", category: "Aria", htmlAttributeName: "aria-dropeffect" },
  "aria-errormessage": { name: "aria-errormessage", type: "string", title: "Error Message", category: "Aria", htmlAttributeName: "aria-errormessage" },
  "aria-expanded": { name: "aria-expanded", type: "boolean", title: "Expanded", category: "Aria", htmlAttributeName: "aria-expanded" },
  "aria-flowto": { name: "aria-flowto", type: "string", title: "Flow To", category: "Aria", htmlAttributeName: "aria-flowto" },
  "aria-grabbed": { name: "aria-grabbed", type: "boolean", title: "Grabbed (deprecated)", category: "Aria", htmlAttributeName: "aria-grabbed" },
  "aria-haspopup": { name: "aria-haspopup", type: "string", title: "Has Popup", category: "Aria", htmlAttributeName: "aria-haspopup" },
  "aria-hidden": { name: "aria-hidden", type: "boolean", title: "Hidden", category: "Aria", htmlAttributeName: "aria-hidden" },
  "aria-invalid": { name: "aria-invalid", type: "string", title: "Invalid", category: "Aria", htmlAttributeName: "aria-invalid" },
  "aria-keyshortcuts": { name: "aria-keyshortcuts", type: "string", title: "Key Shortcuts", category: "Aria", htmlAttributeName: "aria-keyshortcuts" },
  "aria-label": { name: "aria-label", type: "string", title: "Label", category: "Aria", htmlAttributeName: "aria-label" },
  "aria-labelledby": { name: "aria-labelledby", type: "string", title: "Labelled By", category: "Aria", htmlAttributeName: "aria-labelledby" },
  "aria-level": { name: "aria-level", type: "number", title: "Level", category: "Aria", htmlAttributeName: "aria-level" },
  "aria-live": { name: "aria-live", type: "string", title: "Live Region", category: "Aria", htmlAttributeName: "aria-live" },
  "aria-modal": { name: "aria-modal", type: "boolean", title: "Modal", category: "Aria", htmlAttributeName: "aria-modal" },
  "aria-multiline": { name: "aria-multiline", type: "boolean", title: "Multiline", category: "Aria", htmlAttributeName: "aria-multiline" },
  "aria-multiselectable": { name: "aria-multiselectable", type: "boolean", title: "Multi Selectable", category: "Aria", htmlAttributeName: "aria-multiselectable" },
  "aria-orientation": { name: "aria-orientation", type: "string", title: "Orientation", category: "Aria", htmlAttributeName: "aria-orientation" },
  "aria-owns": { name: "aria-owns", type: "string", title: "Owns", category: "Aria", htmlAttributeName: "aria-owns" },
  "aria-placeholder": { name: "aria-placeholder", type: "string", title: "Placeholder", category: "Aria", htmlAttributeName: "aria-placeholder" },
  "aria-posinset": { name: "aria-posinset", type: "number", title: "Position In Set", category: "Aria", htmlAttributeName: "aria-posinset" },
  "aria-pressed": { name: "aria-pressed", type: "string", title: "Pressed", category: "Aria", htmlAttributeName: "aria-pressed" },
  "aria-readonly": { name: "aria-readonly", type: "boolean", title: "Readonly", category: "Aria", htmlAttributeName: "aria-readonly" },
  "aria-relevant": { name: "aria-relevant", type: "string", title: "Relevant", category: "Aria", htmlAttributeName: "aria-relevant" },
  "aria-required": { name: "aria-required", type: "boolean", title: "Required", category: "Aria", htmlAttributeName: "aria-required" },
  "aria-roledescription": { name: "aria-roledescription", type: "string", title: "Role Description", category: "Aria", htmlAttributeName: "aria-roledescription" },
  "aria-rowcount": { name: "aria-rowcount", type: "number", title: "Row Count", category: "Aria", htmlAttributeName: "aria-rowcount" },
  "aria-rowindex": { name: "aria-rowindex", type: "number", title: "Row Index", category: "Aria", htmlAttributeName: "aria-rowindex" },
  "aria-rowspan": { name: "aria-rowspan", type: "number", title: "Row Span", category: "Aria", htmlAttributeName: "aria-rowspan" },
  "aria-selected": { name: "aria-selected", type: "boolean", title: "Selected", category: "Aria", htmlAttributeName: "aria-selected" },
  "aria-setsize": { name: "aria-setsize", type: "number", title: "Set Size", category: "Aria", htmlAttributeName: "aria-setsize" },
  "aria-sort": { name: "aria-sort", type: "string", title: "Sort", category: "Aria", htmlAttributeName: "aria-sort" },
  "aria-valuemax": { name: "aria-valuemax", type: "number", title: "Value Max", category: "Aria", htmlAttributeName: "aria-valuemax" },
  "aria-valuemin": { name: "aria-valuemin", type: "number", title: "Value Min", category: "Aria", htmlAttributeName: "aria-valuemin" },
  "aria-valuenow": { name: "aria-valuenow", type: "number", title: "Value Now", category: "Aria", htmlAttributeName: "aria-valuenow" },
  "aria-valuetext": { name: "aria-valuetext", type: "string", title: "Value Text", category: "Aria", htmlAttributeName: "aria-valuetext" }
};

export const AC_BASIC_PROPERTIES = {
  "accesskey": { name: "accesskey", type: "string", title: "Access Key", category: "Basic", htmlAttributeName: "accesskey" },
  "autocapitalize": { name: "autocapitalize", type: "string", title: "Autocapitalize", category: "Basic", htmlAttributeName: "autocapitalize" },
  "autofocus": { name: "autofocus", type: "boolean", title: "Autofocus", category: "Basic", htmlAttributeName: "autofocus" },
  // "class": { name: "class", type: "string", title: "Class", category: "Basic", htmlAttributeName: "class" },
  "contenteditable": { name: "contenteditable", type: "boolean", title: "Content Editable", category: "Basic", htmlAttributeName: "contenteditable" },
  "dir": { name: "dir", type: "string", title: "Direction", category: "Basic", htmlAttributeName: "dir" },
  "draggable": { name: "draggable", type: "boolean", title: "Draggable", category: "Basic", htmlAttributeName: "draggable" },
  "enterkeyhint": { name: "enterkeyhint", type: "string", title: "Enter Key Hint", category: "Basic", htmlAttributeName: "enterkeyhint" },
  "hidden": { name: "hidden", type: "boolean", title: "Hidden", category: "Basic", htmlAttributeName: "hidden" },
  "id": { name: "id", type: "string", title: "Id", category: "Basic", htmlAttributeName: "id" },
  "inert": { name: "inert", type: "boolean", title: "Inert", category: "Basic", htmlAttributeName: "inert" },
  "inputmode": { name: "inputmode", type: "string", title: "Input Mode", category: "Basic", htmlAttributeName: "inputmode" },
  "is": { name: "is", type: "string", title: "Is (custom element)", category: "Basic", htmlAttributeName: "is" },
  "itemid": { name: "itemid", type: "string", title: "Item ID", category: "Basic", htmlAttributeName: "itemid" },
  "itemprop": { name: "itemprop", type: "string", title: "Item Prop", category: "Basic", htmlAttributeName: "itemprop" },
  "itemref": { name: "itemref", type: "string", title: "Item Ref", category: "Basic", htmlAttributeName: "itemref" },
  "itemscope": { name: "itemscope", type: "boolean", title: "Item Scope", category: "Basic", htmlAttributeName: "itemscope" },
  "itemtype": { name: "itemtype", type: "string", title: "Item Type", category: "Basic", htmlAttributeName: "itemtype" },
  "lang": { name: "lang", type: "string", title: "Language", category: "Basic", htmlAttributeName: "lang" },
  "nonce": { name: "nonce", type: "string", title: "CSP Nonce", category: "Basic", htmlAttributeName: "nonce" },
  "part": { name: "part", type: "string", title: "Part", category: "Basic", htmlAttributeName: "part" },
  "popover": { name: "popover", type: "string", title: "Popover", category: "Basic", htmlAttributeName: "popover" },
  "role": { name: "role", type: "string", title: "Role", category: "Basic", htmlAttributeName: "role" },
  "slot": { name: "slot", type: "string", title: "Slot", category: "Basic", htmlAttributeName: "slot" },
  "spellcheck": { name: "spellcheck", type: "boolean", title: "Spellcheck", category: "Basic", htmlAttributeName: "spellcheck" },
  // "style": { name: "style", type: "string", title: "Style", category: "Basic", htmlAttributeName: "style" },
  "tabindex": { name: "tabindex", type: "number", title: "Tab Index", category: "Basic", htmlAttributeName: "tabindex" },
  "title": { name: "title", type: "string", title: "Title", category: "Basic", htmlAttributeName: "title" },
  "translate": { name: "translate", type: "string", title: "Translate", category: "Basic", htmlAttributeName: "translate" }
};

export const AC_FORM_PROPERTIES = {
  // <form> element attributes
  "acceptCharset": { name: "acceptCharset", type: "string", title: "Accept Charset", category: "Form", htmlAttributeName: "accept-charset" },
  "action": { name: "action", type: "string", title: "Action", category: "Form", htmlAttributeName: "action" },
  "autocomplete": { name: "autocomplete", type: "string", title: "Autocomplete", category: "Form", htmlAttributeName: "autocomplete" },
  "enctype": { name: "enctype", type: "string", title: "Encoding Type", category: "Form", htmlAttributeName: "enctype" },
  "method": { name: "method", type: "string", title: "Method", category: "Form", htmlAttributeName: "method" },
  "name": { name: "name", type: "string", title: "Name", category: "Form", htmlAttributeName: "name" },
  "novalidate": { name: "novalidate", type: "boolean", title: "No Validate", category: "Form", htmlAttributeName: "novalidate" },
  "target": { name: "target", type: "string", title: "Target", category: "Form", htmlAttributeName: "target" },

  // Common input-related form attributes
  "accept": { name: "accept", type: "string", title: "Accept", category: "Form", htmlAttributeName: "accept" },
  "alt": { name: "alt", type: "string", title: "Alt", category: "Form", htmlAttributeName: "alt" },
  "autocompleteInput": { name: "autocompleteInput", type: "string", title: "Autocomplete", category: "Form", htmlAttributeName: "autocomplete" },
  "checked": { name: "checked", type: "boolean", title: "Checked", category: "Form", htmlAttributeName: "checked" },
  "dirname": { name: "dirname", type: "string", title: "Dir Name", category: "Form", htmlAttributeName: "dirname" },
  "disabled": { name: "disabled", type: "boolean", title: "Disabled", category: "Form", htmlAttributeName: "disabled" },
  "form": { name: "form", type: "string", title: "Form", category: "Form", htmlAttributeName: "form" },
  "formAction": { name: "formAction", type: "string", title: "Form Action", category: "Form", htmlAttributeName: "formaction" },
  "formEnctype": { name: "formEnctype", type: "string", title: "Form Encoding Type", category: "Form", htmlAttributeName: "formenctype" },
  "formMethod": { name: "formMethod", type: "string", title: "Form Method", category: "Form", htmlAttributeName: "formmethod" },
  "formNoValidate": { name: "formNoValidate", type: "boolean", title: "Form No Validate", category: "Form", htmlAttributeName: "formnovalidate" },
  "formTarget": { name: "formTarget", type: "string", title: "Form Target", category: "Form", htmlAttributeName: "formtarget" },
  "height": { name: "height", type: "string", title: "Height", category: "Form", htmlAttributeName: "height" },
  "list": { name: "list", type: "string", title: "List", category: "Form", htmlAttributeName: "list" },
  "max": { name: "max", type: "string", title: "Max", category: "Form", htmlAttributeName: "max" },
  "maxlength": { name: "maxlength", type: "number", title: "Max Length", category: "Form", htmlAttributeName: "maxlength" },
  "min": { name: "min", type: "string", title: "Min", category: "Form", htmlAttributeName: "min" },
  "minlength": { name: "minlength", type: "number", title: "Min Length", category: "Form", htmlAttributeName: "minlength" },
  "multiple": { name: "multiple", type: "boolean", title: "Multiple", category: "Form", htmlAttributeName: "multiple" },
  "pattern": { name: "pattern", type: "string", title: "Pattern", category: "Form", htmlAttributeName: "pattern" },
  "placeholder": { name: "placeholder", type: "string", title: "Placeholder", category: "Form", htmlAttributeName: "placeholder" },
  "readonly": { name: "readonly", type: "boolean", title: "Read Only", category: "Form", htmlAttributeName: "readonly" },
  "required": { name: "required", type: "boolean", title: "Required", category: "Form", htmlAttributeName: "required" },
  "size": { name: "size", type: "number", title: "Size", category: "Form", htmlAttributeName: "size" },
  "src": { name: "src", type: "string", title: "Source", category: "Form", htmlAttributeName: "src" },
  "step": { name: "step", type: "string", title: "Step", category: "Form", htmlAttributeName: "step" },
  "type": { name: "type", type: "string", title: "Type", category: "Form", htmlAttributeName: "type" },
  "value": { name: "value", type: "string", title: "Value", category: "Form", htmlAttributeName: "value" },
  "width": { name: "width", type: "string", title: "Width", category: "Form", htmlAttributeName: "width" },

  // <textarea> specific
  "cols": { name: "cols", type: "number", title: "Columns", category: "Form", htmlAttributeName: "cols" },
  "rows": { name: "rows", type: "number", title: "Rows", category: "Form", htmlAttributeName: "rows" },
  "wrap": { name: "wrap", type: "string", title: "Wrap", category: "Form", htmlAttributeName: "wrap" },

  // <select> specific
  "multipleSelect": { name: "multipleSelect", type: "boolean", title: "Multiple", category: "Form", htmlAttributeName: "multiple" },
  "requiredSelect": { name: "requiredSelect", type: "boolean", title: "Required", category: "Form", htmlAttributeName: "required" },

  // <button> specific
  "disabledButton": { name: "disabledButton", type: "boolean", title: "Disabled", category: "Form", htmlAttributeName: "disabled" },
  "typeButton": { name: "typeButton", type: "string", title: "Type", category: "Form", htmlAttributeName: "type" },
  "valueButton": { name: "valueButton", type: "string", title: "Value", category: "Form", htmlAttributeName: "value" },
};

export const AC_IMAGE_PICTURE_PROPERTIES = {
  // --------------------
  // <img> specific
  // --------------------
  "alt": { name: "alt", type: "string", title: "Alt Text", category: "Image & Picture", htmlAttributeName: "alt" },
  "src": { name: "src", type: "string", title: "Source", category: "Image & Picture", htmlAttributeName: "src" },
  "srcSet": { name: "srcSet", type: "string", title: "Source Set", category: "Image & Picture", htmlAttributeName: "srcset" },
  "sizes": { name: "sizes", type: "string", title: "Sizes", category: "Image & Picture", htmlAttributeName: "sizes" },
  "crossOrigin": { name: "crossOrigin", type: "string", title: "Cross Origin", category: "Image & Picture", htmlAttributeName: "crossorigin" },
  "useMap": { name: "useMap", type: "string", title: "Use Map", category: "Image & Picture", htmlAttributeName: "usemap" },
  "isMap": { name: "isMap", type: "boolean", title: "Is Map", category: "Image & Picture", htmlAttributeName: "ismap" },
  "width": { name: "width", type: "number", title: "Width", category: "Image & Picture", htmlAttributeName: "width" },
  "height": { name: "height", type: "number", title: "Height", category: "Image & Picture", htmlAttributeName: "height" },
  "decoding": { name: "decoding", type: "string", title: "Decoding", category: "Image & Picture", htmlAttributeName: "decoding" },
  "loading": { name: "loading", type: "string", title: "Loading", category: "Image & Picture", htmlAttributeName: "loading" },
  "referrerPolicy": { name: "referrerPolicy", type: "string", title: "Referrer Policy", category: "Image & Picture", htmlAttributeName: "referrerpolicy" },
  "fetchPriority": { name: "fetchPriority", type: "string", title: "Fetch Priority", category: "Image & Picture", htmlAttributeName: "fetchpriority" },

  // --------------------
  // <picture> / <source> specific
  // --------------------
  "media": { name: "media", type: "string", title: "Media Query", category: "Image & Picture", htmlAttributeName: "media" },
  "type": { name: "type", type: "string", title: "Type", category: "Image & Picture", htmlAttributeName: "type" }
};

export const AC_INTERACTIVE_DIALOG_PROPERTIES = {
  // <details>
  "open": { name: "open", type: "boolean", title: "Open", category: "Interactive & Dialog", htmlAttributeName: "open" },
  // <dialog>
  "openDialog": { name: "openDialog", type: "boolean", title: "Open", category: "Interactive & Dialog", htmlAttributeName: "open" },
  "returnValue": { name: "returnValue", type: "string", title: "Return Value", category: "Interactive & Dialog", htmlAttributeName: "returnValue" },
  // <menu>
  "typeMenu": { name: "typeMenu", type: "string", title: "Type", category: "Interactive & Dialog", htmlAttributeName: "type" },
  "labelMenu": { name: "labelMenu", type: "string", title: "Label", category: "Interactive & Dialog", htmlAttributeName: "label" }
};

export const AC_LINK_ANCHOR_PROPERTIES = {
  // Shared between <a> and <link>
  "href": { name: "href", type: "string", title: "Href", category: "Link & Anchor", htmlAttributeName: "href" },
  "hreflang": { name: "hreflang", type: "string", title: "Href Language", category: "Link & Anchor", htmlAttributeName: "hreflang" },
  "rel": { name: "rel", type: "string", title: "Relationship", category: "Link & Anchor", htmlAttributeName: "rel" },
  "type": { name: "type", type: "string", title: "Type", category: "Link & Anchor", htmlAttributeName: "type" },

  // <a> specific
  "target": { name: "target", type: "string", title: "Target", category: "Anchor", htmlAttributeName: "target" },
  "download": { name: "download", type: "string", title: "Download", category: "Anchor", htmlAttributeName: "download" },
  "ping": { name: "ping", type: "string", title: "Ping", category: "Anchor", htmlAttributeName: "ping" },
  "referrerpolicy": { name: "referrerpolicy", type: "string", title: "Referrer Policy", category: "Anchor", htmlAttributeName: "referrerpolicy" }

  // <link> specific
  ,
  "as": { name: "as", type: "string", title: "As", category: "Link", htmlAttributeName: "as" },
  "crossorigin": { name: "crossorigin", type: "string", title: "Cross Origin", category: "Link", htmlAttributeName: "crossorigin" },
  "media": { name: "media", type: "string", title: "Media", category: "Link", htmlAttributeName: "media" },
  "sizes": { name: "sizes", type: "string", title: "Sizes", category: "Link", htmlAttributeName: "sizes" },
  "imagesrcset": { name: "imagesrcset", type: "string", title: "Image Srcset", category: "Link", htmlAttributeName: "imagesrcset" },
  "imagesizes": { name: "imagesizes", type: "string", title: "Image Sizes", category: "Link", htmlAttributeName: "imagesizes" },
  "integrity": { name: "integrity", type: "string", title: "Integrity", category: "Link", htmlAttributeName: "integrity" },
  "disabled": { name: "disabled", type: "boolean", title: "Disabled", category: "Link", htmlAttributeName: "disabled" },
  "blocking": { name: "blocking", type: "string", title: "Blocking", category: "Link", htmlAttributeName: "blocking" }
};

export const AC_LIST_PROPERTIES = {
  // <ol> <ul> → no unique attributes <dl>, <dt>, <dd> → no unique attributes
  "reversed": { name: "reversed", type: "boolean", title: "Reversed", category: "List",htmlAttributeName: "reversed"},
  "start": {name: "start",type: "number",title: "Start",category: "List",htmlAttributeName: "start"},
  "type": {name: "type",type: "string",title: "Type",category: "List",htmlAttributeName: "type"},
  // <li>
  "value": {name: "value",type: "number",title: "Value",category: "List",htmlAttributeName: "value" },
};

export const AC_MEDIA_PROPERTIES = {
  src: { name: "src", type: "string", title: "Source", category: "Media", htmlAttributeName: "src" },
  alt: { name: "alt", type: "string", title: "Alt", category: "Media", htmlAttributeName: "alt" },
  crossorigin: { name: "crossorigin", type: "string", title: "Crossorigin", category: "Media", htmlAttributeName: "crossorigin" },
  preload: { name: "preload", type: "string", title: "Preload", category: "Media", htmlAttributeName: "preload" },
  autoplay: { name: "autoplay", type: "boolean", title: "Autoplay", category: "Media", htmlAttributeName: "autoplay" },
  loop: { name: "loop", type: "boolean", title: "Loop", category: "Media", htmlAttributeName: "loop" },
  muted: { name: "muted", type: "boolean", title: "Muted", category: "Media", htmlAttributeName: "muted" },
  controls: { name: "controls", type: "boolean", title: "Controls", category: "Media", htmlAttributeName: "controls" },
  poster: { name: "poster", type: "string", title: "Poster", category: "Media", htmlAttributeName: "poster" },
  width: { name: "width", type: "string", title: "Width", category: "Media", htmlAttributeName: "width" },
  height: { name: "height", type: "string", title: "Height", category: "Media", htmlAttributeName: "height" },
  playsinline: { name: "playsinline", type: "boolean", title: "Plays Inline", category: "Media", htmlAttributeName: "playsinline" },

  // Track element attributes
  kind: { name: "kind", type: "string", title: "Kind", category: "Media", htmlAttributeName: "kind" },
  srclang: { name: "srclang", type: "string", title: "Source Language", category: "Media", htmlAttributeName: "srclang" },
  label: { name: "label", type: "string", title: "Label", category: "Media", htmlAttributeName: "label" },
  default: { name: "default", type: "boolean", title: "Default", category: "Media", htmlAttributeName: "default" }
};

export const AC_META_DOCUMENT_PROPERTIES = {
  // -----------------
  // <meta> attributes
  // -----------------
  "name": { name: "name", type: "string", title: "Name", category: "Meta & Document", htmlAttributeName: "name" },
  "httpEquiv": { name: "httpEquiv", type: "string", title: "HTTP-Equiv", category: "Meta & Document", htmlAttributeName: "http-equiv" },
  "content": { name: "content", type: "string", title: "Content", category: "Meta & Document", htmlAttributeName: "content"   },
  "charset": { name: "charset", type: "string", title: "Charset", category: "Meta & Document", htmlAttributeName: "charset" },

  // -----------------
  // <html> element attributes
  // -----------------
  "lang": { name: "lang", type: "string", title: "Language", category: "Meta & Document", htmlAttributeName: "lang" },
  "dir": { name: "dir", type: "string", title: "Text Direction", category: "Meta & Document", htmlAttributeName: "dir" },
  "translate": { name: "translate", type: "boolean", title: "Translate", category: "Meta & Document", htmlAttributeName: "translate" },

  // -----------------
  // <base> element attributes
  // -----------------
  "href": { name: "href", type: "string", title: "Base URL", category: "Meta & Document", htmlAttributeName: "href" },
  "target": { name: "target", type: "string", title: "Default Target", category: "Meta & Document", htmlAttributeName: "target" },

  // -----------------
  // <title> element (no attributes except global)
  // -----------------

  // -----------------
  // <link> element (document-level link relations)
  // -----------------
  "rel": { name: "rel", type: "string", title: "Relationship", category: "Meta & Document", htmlAttributeName: "rel" },
  "media": { name: "media", type: "string", title: "Media Query", category: "Meta & Document", htmlAttributeName: "media" },
  "type": { name: "type", type: "string", title: "Type", category: "Meta & Document",     htmlAttributeName: "type" },
  "as": { name: "as", type: "string", title: "As (Resource Hint)", category: "Meta & Document", htmlAttributeName: "as" },
  "crossOrigin": { name: "crossOrigin", type: "string", title: "Cross-Origin", category: "Meta & Document", htmlAttributeName: "crossorigin" },
  "referrerPolicy": { name: "referrerPolicy", type: "string", title: "Referrer Policy", category: "Meta & Document", htmlAttributeName: "referrerpolicy" },
  "integrity": { name: "integrity", type: "string", title: "Subresource Integrity", category: "Meta & Document", htmlAttributeName: "integrity" },
  "blocking": { name: "blocking", type: "string", title: "Blocking", category: "Meta & Document", htmlAttributeName: "blocking" },
};

export const AC_SCRIPT_MODULE_PROPERTIES = {
  "async": { name: "async", type: "boolean", title: "Async", category: "Script & Module", htmlAttributeName: "async" },
  "defer": { name: "defer", type: "boolean", title: "Defer", category: "Script & Module", htmlAttributeName: "defer" },
  "crossOrigin": { name: "crossOrigin", type: "string", title: "Cross Origin", category: "Script & Module", htmlAttributeName: "crossorigin" },
  "integrity": { name: "integrity", type: "string", title: "Integrity", category: "Script & Module", htmlAttributeName: "integrity" },
  "noModule": { name: "noModule", type: "boolean", title: "No Module", category: "Script & Module", htmlAttributeName: "nomodule" },
  "referrerPolicy": { name: "referrerPolicy", type: "string", title: "Referrer Policy", category: "Script & Module", htmlAttributeName: "referrerpolicy" },
  "src": { name: "src", type: "string", title: "Source", category: "Script & Module", htmlAttributeName: "src" },
  "type": { name: "type", type: "string", title: "Type", category: "Script & Module", htmlAttributeName: "type" },
  "blocking": { name: "blocking", type: "string", title: "Blocking", category: "Script & Module", htmlAttributeName: "blocking" },
  "fetchPriority": { name: "fetchPriority", type: "string", title: "Fetch Priority", category: "Script & Module", htmlAttributeName: "fetchpriority" }
};

export const AC_TABLE_PROPERTIES = {
  // <table>
  "border": { name: "border", type: "string", title: "Border", category: "Table", htmlAttributeName: "border" },

  // <col>, <colgroup>, <tbody>, <thead>, <tfoot>, <tr>
  "span": { name: "span", type: "number", title: "Span", category: "Table", htmlAttributeName: "span" },

  // <col>, <colgroup>, <td>, <th>
  "width": { name: "width", type: "string", title: "Width", category: "Table", htmlAttributeName: "width" },

  // <td>, <th>
  "colspan": { name: "colspan", type: "number", title: "Column Span", category: "Table", htmlAttributeName: "colspan" },
  "rowspan": { name: "rowspan", type: "number", title: "Row Span", category: "Table", htmlAttributeName: "rowspan" },
  "headers": { name: "headers", type: "string", title: "Headers", category: "Table", htmlAttributeName: "headers" },
  "scope": { name: "scope", type: "string", title: "Scope", category: "Table", htmlAttributeName: "scope" },
  "abbr": { name: "abbr", type: "string", title: "Abbreviation", category: "Table", htmlAttributeName: "abbr" }
};

export const AC_TRACK_SOURCE_PROPERTIES = {
  "default": {name: "default",type: "boolean",title: "Default",category: "Track",htmlAttributeName: "default"},
  "kind": {name: "kind",type: "string",title: "Kind",category: "Track",htmlAttributeName: "kind"},
  "label": {name: "label",type: "string",title: "Label",category: "Track",htmlAttributeName: "label"},
  "src": {name: "src",type: "string",title: "Source",category: "Track",htmlAttributeName: "src"},
  "srclang": {name: "srclang",type: "string",title: "Source Language",category: "Track",htmlAttributeName: "srclang"},
  // ----------------------------
  // <source> specific attributes
  // ----------------------------
  "typeSource": {name: "typeSource",type: "string",title: "Type",category: "Source",htmlAttributeName: "type"},
  "srcSource": {name: "srcSource",type: "string",title: "Source",category: "Source",htmlAttributeName: "src"},
  "srcset": {name: "srcset",type: "string",title: "Source Set",category: "Source",htmlAttributeName: "srcset"},
  "sizes": {name: "sizes",type: "string",title: "Sizes",category: "Source",htmlAttributeName: "sizes"},
  "media": {name: "media",type: "string",title: "Media Query",category: "Source",htmlAttributeName: "media"}
};



/* EVENTS */
export const AC_ANIMATION_EVENTS = {
  "animationStart":{name:'animationStart',title:'Animation Start',category:'Animation',htmlEventName:'animationstart'},
  "animationEnd":{name:'animationEnd',title:'Animation End',category:'Animation',htmlEventName:'animationend'},
  "animationIteration":{name:'animationIteration',title:'Animation Iteration',category:'Animation',htmlEventName:'animationiteration'}
};

export const AC_CLIPBOARD_EVENTS = {
  "copy":{name:'copy',title:'Copy',category:'Clipboard',htmlEventName:'copy'},
  "cut":{name:'cut',title:'Cut',category:'Clipboard',htmlEventName:'cut'},
  "paste":{name:'paste',title:'Paste',category:'Clipboard',htmlEventName:'paste'}
};

export const AC_DRAG_EVENTS = {
  "drag":{name:'drag',title:'Drag',category:'Drag & Drop',htmlEventName:'drag'},
  "drop":{name:'drop',title:'Drop',category:'Drag & Drop',htmlEventName:'drop'},
  "dragStart":{name:'dragStart',title:'Drag Start',category:'Drag & Drop',htmlEventName:'dragstart'},
  "dragEnd":{name:'dragEnd',title:'Drag End',category:'Drag & Drop',htmlEventName:'dragend'},
  "dragEnter":{name:'dragStart',title:'Drag Enter',category:'Drag & Drop',htmlEventName:'dragenter'},
  "dragLeave":{name:'dragLeave',title:'Drag Leave',category:'Drag & Drop',htmlEventName:'dragleave'},
  "dragOver":{name:'dragOver',title:'Drag Over',category:'Drag & Drop',htmlEventName:'dragover'}
};

export const AC_FORM_EVENTS = {
  "submit":{name:'submit',title:'Submit',category:'Form',htmlEventName:'submit'},
  "reset":{name:'reset',title:'Reset',category:'Form',htmlEventName:'reset'},
};

export const AC_INPUT_EVENTS = {
  "input":{name:'input',title:'Input',category:'Input',htmlEventName:'input'},
  "change":{name:'change',title:'Change',category:'Input',htmlEventName:'change'},
  "invalid":{name:'invalid',title:'Invalid',category:'Input',htmlEventName:'invalid'},
  "select":{name:'select',title:'Select',category:'Input',htmlEventName:'select'}
};

export const AC_KEYBOARD_EVENTS = {
  "keyDown":{name:'keyDown',title:'Key Down',category:'Keyboard',htmlEventName:'keydown'},
  "keyUp":{name:'keyUp',title:'Key Up',category:'Keyboard',htmlEventName:'keyup'}
};

export const AC_MEDIA_EVENTS = {
  "play":{name:'play',title:'Play',category:'Media',htmlEventName:'play'},
  "pause":{name:'pause',title:'Pause',category:'Media',htmlEventName:'pause'},
  "playing":{name:'playing',title:'Playing',category:'Media',htmlEventName:'playing'},
  "ended":{name:'ended',title:'Ended',category:'Media',htmlEventName:'ended'},
  "waiting":{name:'waiting',title:'Waiting',category:'Media',htmlEventName:'waiting'},
  "seeking":{name:'seeking',title:'Seeking',category:'Media',htmlEventName:'seeking'},
  "seeked":{name:'seeked',title:'Seeked',category:'Media',htmlEventName:'seeked'},
  "load":{name:'load',title:'Load',category:'Media',htmlEventName:'load'},
  "loadedData":{name:'loadedData',title:'Loaded Data',category:'Media',htmlEventName:'loadeddata'},
  "loadedMetadata":{name:'loadedMetadata',title:'Loaded Metadata',category:'Media',htmlEventName:'loadedmetadata'},
  "canPlay":{name:'canPlay',title:'Can Play',category:'Media',htmlEventName:'canplay'},
  "canPlayThrough":{name:'canPlayThrough',title:'Can Play Through',category:'Media',htmlEventName:'canplaythrough'},
  "error":{name:'error',title:'Error',category:'Media',htmlEventName:'error'},
  "abort":{name:'abort',title:'Abort',category:'Media',htmlEventName:'abort'},
  "durationChange":{name:'durationChange',title:'Duration Change',category:'Media',htmlEventName:'durationchange'},
  "emptied":{name:'emptied',title:'Emptied',category:'Media',htmlEventName:'emptied'},
  "rateChange":{name:'rateChange',title:'Rate Change',category:'Media',htmlEventName:'ratechange'},
  "stalled":{name:'stalled',title:'Stalled',category:'Media',htmlEventName:'stalled'},
  "suspend":{name:'suspend',title:'Suspend',category:'Media',htmlEventName:'suspend'},
  "timeUpdate":{name:'timeUpdate',title:'Time Update',category:'Media',htmlEventName:'timeupdate'},
  "volumeChange":{name:'volumeChange',title:'Volume Change',category:'Media',htmlEventName:'volumechange'},
  "progress":{name:'progress',title:'Progress',category:'Media',htmlEventName:'progress'}
}

export const AC_MOUSE_EVENTS = {
  "click":{name:'click',title:'Click',category:'Mouse',htmlEventName:'click'},
  "doubleClick":{name:'doubleClick',title:'Double Click',category:'Mouse',htmlEventName:'dblclick'},
  "mouseDown":{name:'mouseDown',title:'Mouse Down',category:'Mouse',htmlEventName:'mousedown'},
  "mouseUp":{name:'mouseUp',title:'Mouse Up',category:'Mouse',htmlEventName:'mouseup'},
  "mouseMove":{name:'mouseMove',title:'Mouse Move',category:'Mouse',htmlEventName:'mousemove'},
  "mouseEnter":{name:'mouseEnter',title:'Mouse Enter',category:'Mouse',htmlEventName:'mouseenter'},
  "mouseLeave":{name:'mouseLeave',title:'Mouse Leave',category:'Mouse',htmlEventName:'mouseleave'},
  "mouseOver":{name:'mouseOver',title:'Mouse Over',category:'Mouse',htmlEventName:'mouseover'},
  "mouseOut":{name:'mouseOut',title:'Mouse Out',category:'Mouse',htmlEventName:'mouseout'},
  "contextMenu":{name:'contextMenu',title:'Context Menu',category:'Mouse',htmlEventName:'contextmenu'}
};

export const AC_POINTER_EVENTS = {
  "pointerDown":{name:'pointerDown',title:'Pointer Down',category:'Pointer',htmlEventName:'pointerdown'},
  "pointerUp":{name:'pointerUp',title:'Pointer Up',category:'Pointer',htmlEventName:'pointerup'},
  "pointerMove":{name:'pointerMove',title:'Pointer Move',category:'Pointer',htmlEventName:'pointermove'},
  "pointerOver":{name:'pointerOver',title:'Pointer Over',category:'Pointer',htmlEventName:'pointerover'},
  "pointerOut":{name:'pointerOut',title:'Pointer Out',category:'Pointer',htmlEventName:'pointerout'},
  "pointerEnter":{name:'pointerEnter',title:'Pointer Enter',category:'Pointer',htmlEventName:'pointerenter'},
  "pointerLeave":{name:'pointerLeave',title:'Pointer Leave',category:'Pointer',htmlEventName:'pointerleave'},
  "gotPointerCapture":{name:'gotPointerCapture',title:'Got Pointer Capture',category:'Pointer',htmlEventName:'gotpointercapture'},
  "lostPointerCapture":{name:'lostPointerCapture',title:'Lost Pointer Capture',category:'Pointer',htmlEventName:'lostpointercapture'}
};

export const AC_SCROLL_EVENTS = {
  "scroll":{name:'scroll',title:'Scroll',category:'Scroll & Wheel',htmlEventName:'scroll'},
  "wheel":{name:'wheel',title:'Wheel',category:'Scroll & Wheel',htmlEventName:'wheel'}
};

export const AC_TOUCH_EVENTS = {
  "touchStart":{name:'touchStart',title:'Touch Start',category:'Touch',htmlEventName:'touchstart'},
  "touchEnd":{name:'touchEnd',title:'Touch End',category:'Touch',htmlEventName:'touchend'},
  "touchMove":{name:'touchMove',title:'Touch Move',category:'Touch',htmlEventName:'touchmove'},
  "touchCancel":{name:'touchCancel',title:'Touch Cancel',category:'Touch',htmlEventName:'touchcancel'}
};

export const AC_TRANSITION_EVENTS = {
  "transitionStart":{name:'transitionStart',title:'Transition Start',category:'Transition',htmlEventName:'transitionstart'},
  "transitionEnd":{name:'transitionEnd',title:'Transition End',category:'Transition',htmlEventName:'transitionend'},
  "transitionCancel":{name:'transitionCancel',title:'Transition Cancel',category:'Transition',htmlEventName:'transitioncancel'},
  "transitionRun":{name:'transitionRun',title:'Transition Run',category:'Transition',htmlEventName:'transitionrun'}
};

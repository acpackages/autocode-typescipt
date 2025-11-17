export const AC_DOM_EVENT_TYPES = {
  mouse: [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mousemove",
    "mouseenter",
    "mouseleave",
    "mouseover",
    "mouseout",
    "contextmenu",
    "auxclick",
    "pointerlockchange",
    "pointerlockerror",
    "wheel",
  ],

  pointer: [
    "pointerdown",
    "pointerup",
    "pointermove",
    "pointercancel",
    "pointerenter",
    "pointerleave",
    "pointerover",
    "pointerout",
    "gotpointercapture",
    "lostpointercapture",
  ],

  touch: [
    "touchstart",
    "touchend",
    "touchmove",
    "touchcancel",
    "touchforcechange",
  ],

  keyboard: [
    "keydown",
    "keyup",
    "keypress", // deprecated
  ],

  focus: [
    "focus",
    "blur",
    "focusin",
    "focusout",
  ],

  form: [
    "input",
    "change",
    "submit",
    "reset",
    "invalid",
    "beforeinput",
    "select",
  ],

  clipboard: [
    "copy",
    "cut",
    "paste",
    "beforecopy",
    "beforecut",
    "beforepaste",
  ],

  drag: [
    "drag",
    "dragstart",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "drop",
  ],

  media: [
    "abort",
    "canplay",
    "canplaythrough",
    "durationchange",
    "emptied",
    "ended",
    "error",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "seeked",
    "seeking",
    "stalled",
    "suspend",
    "timeupdate",
    "volumechange",
    "waiting",
  ],

  animation: [
    "animationstart",
    "animationend",
    "animationiteration",
    "transitionstart",
    "transitionend",
    "transitionrun",
    "transitioncancel",
  ],

  viewport: [
    "scroll",
    "resize",
  ],

  window: [
    "load",
    "beforeunload",
    "unload",
    "pageshow",
    "pagehide",
    "visibilitychange",
    "DOMContentLoaded",
    "error",
  ],

  network: [
    "online",
    "offline",
  ],

  fullscreen: [
    "fullscreenchange",
    "fullscreenerror",
  ],

  history: [
    "popstate",
    "hashchange",
  ],

  websocket: [
    "open",
    "message",
    "error",
    "close",
  ],

  serviceWorker: [
    "install",
    "activate",
    "fetch",
    "message",
    "statechange",
    "controllerchange",
    "updatefound",
  ],

  worker: [
    "message",
    "messageerror",
    "error",
  ],

  mutationDeprecated: [
    "DOMNodeInserted",
    "DOMNodeRemoved",
    "DOMSubtreeModified",
    "DOMAttrModified",
  ],
} as const;

/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
declare var acWebviewJavascriptChannel: any;

export class AcWebviewChannel {
  events:AcEvents = new AcEvents();
  webviewEvents:AcEvents = new AcEvents();
  private actions: AcHooks = new AcHooks();
  private callbacks: any = {};
  type: 'cefBrowser'|'webviewBrowser'|undefined = undefined;
  webviewBrowser: any;
  cefBrowser: any;

  isAppBrowser() {
    return this.isCefBrowser() || this.isWebviewBrowser();
  }

  isCefBrowser() {
    let result = false;
    if (typeof this.cefBrowser != "undefined") {
      result = true;
      this.type = 'cefBrowser';
    }
    return result;
  }

  isWebviewBrowser() {
    let result = false;
    try{
      if (acWebviewJavascriptChannel) {
        result = true;
        this.webviewBrowser = acWebviewJavascriptChannel;
        this.type = 'webviewBrowser';
      }
    }
    catch(ex){
      //
    }
    return result;
  }

  on({event,callback}:{event:string,callback:any}):string {
    return this.events.subscribe({event,callback});
  }

  onEvent({event,callback}:{event:string,callback:any}):string {
    return this.webviewEvents.subscribe({event,callback});
  }

  performAction({name,data = {},callback}:{name: string,data?:any, callback?: any}) {
    this.send({data:{action:name,data:data},callback:callback});
  }

  receive({data = {}}:{data?: any}) {
    if (data["callbackId"] != undefined) {
      const functionId = data["callbackId"];
      if (this.callbacks[functionId] != undefined) {
        let actionResponse = data["actionResponse"];
        if (actionResponse == undefined) {
          actionResponse = data;
        }
        this.callbacks[functionId](actionResponse);
        delete this.callbacks[functionId];
      }
    }
    else if (data["event"] != undefined) {
      const event = data["event"];
      const eventData = data["data"];
      this.webviewEvents.execute({event:event,args:eventData});
      this.events.execute({event:'receive',args:data});
    }
    else {
      const action:string = data["action"];
      if (action != undefined) {
        this.actions.execute({hook:action,args:data});
      }
      this.events.execute({event:'receive',args:data});
    }
  }

  send({data,callback}:{data: any, callback?: any}) {
    let dataResult: any = {};
    if (typeof data != "object") {
      dataResult["message"] = data;
    }
    else {
      dataResult = data;
    }
    if (callback) {
      const functionId = Autocode.uniqueId();
      dataResult["callbackId"] = functionId;
      this.callbacks[functionId] = callback;
    }
    if (this.type == "cefBrowser") {
      this.cefBrowser({
        request: JSON.stringify(dataResult),
        onSuccess: function (response: any) {
          console.log(response);
        },
        onFailure: function () {
          console.log("Error ")
        }
      });
    }
    else if (this.type == 'webviewBrowser') {
      this.webviewBrowser.postMessage(JSON.stringify(dataResult));
    }
    this.events.execute({event:'send',args:dataResult});
  }
}

export const acWebviewChannel = new AcWebviewChannel();
acWebviewChannel.isAppBrowser();
window["acWebviewChannel"] = acWebviewChannel;

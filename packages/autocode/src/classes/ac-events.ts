import { AcEventExecutionResult } from "./ac-event-execution-result";
import { Autocode } from "./autocode";
import "@ac_packages/autocode-extensions";

export class AcEvents {
    events: any = {};

    async execute(key: string, ...args: any[]) {
        let result: AcEventExecutionResult = new AcEventExecutionResult();
        try {
            let functionResults: any = {};
            if (this.events[key]) {
                let functionsToExecute: any = this.events[key]!;
                for (var functionId in functionsToExecute) {
                    let fun: Function = functionsToExecute[functionId]!;
                    let functionResult: any;
                    if (args.isNotEmpty()) {
                        functionResult = await fun(args);
                    }
                    else {
                        functionResult = await fun();
                    }
                    if (functionResult != null) {
                        if (functionResult.status == "success") {
                            functionResults[functionId] = functionResult;
                        }
                    }
                }
            }
            if (functionResults.isNotEmpty) {
                result.hasResults = true;
                result.results = functionResults;
            }
            result.setSuccess();
        }
        catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    subscribe(eventName: string, fun: Function): string {
        if (!this.events.containsKey(eventName)) {
            this.events[eventName] = {};
        }
        let functionId: string = Autocode.uniqueId();
        this.events[eventName]![functionId] = fun;
        return functionId;
    }

    unsubscribe(subscriptionId: string): boolean {
        let eventNames:string[] = Object.keys(this.events);
        let foundSubscription:boolean = false;
        for(let eventName of eventNames){
            if (this.events[eventName][subscriptionId]) {
                delete this.events[eventName][subscriptionId];
                foundSubscription = true;
            }
        } 
        return foundSubscription;      
    }

}


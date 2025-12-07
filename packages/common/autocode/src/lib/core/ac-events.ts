/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { AcEventExecutionResult } from "../models/ac-event-execution-result.model";
import { Autocode } from "./autocode";

interface Subscription {
  callback: Function;
}

export class AcEvents {
  // Map<lowercaseEventName, Map<subscriptionId, callback>>
  private events = new Map<string, Map<string, Function>>();

  // Map<subscriptionId, callback> for "all events" listeners
  private allEventCallbacks = new Map<string, Function>();

  /** Clear all subscriptions (useful for hot-reload, tests, cleanup) */
  clearSubscriptions() {
    this.events.clear();
    this.allEventCallbacks.clear();
  }

  /**
   * Execute an event and collect results
   */
  execute({ event, args }: { event: string; args?: any }): AcEventExecutionResult {
    const result = new AcEventExecutionResult();
    const name = event.toLowerCase();
    const functionResults: Record<string, AcEventExecutionResult> = {};

    try {
      // Execute specific event listeners
      const eventListeners = this.events.get(name);
      if (eventListeners) {
        for (const [subId, callback] of eventListeners.entries()) {
          try {
            const res = callback(args);
            if (res instanceof AcEventExecutionResult && res.status === "success") {
              functionResults[subId] = res;
            }
          } catch (ex: any) {
            console.error(`Event handler failed [${name}] (id: ${subId}):`, ex);
          }
        }
      }

      // Execute "all events" listeners
      for (const [subId, callback] of this.allEventCallbacks.entries()) {
        try {
          const res = callback(name, args);
          if (res instanceof AcEventExecutionResult && res.status === "success") {
            functionResults[subId] = res;
          }
        } catch (ex: any) {
          console.error(`Global event handler failed (id: ${subId}):`, ex);
        }
      }

      if (Object.keys(functionResults).length > 0) {
        result.hasResults = true;
        result.results = functionResults;
      }

      result.setSuccess();
    } catch (ex: any) {
      result.setException({ exception: ex });
      console.error("Critical error in AcEvents.execute():", ex);
    }
    (args as any) = null;
    return result;
  }

  /**
   * Subscribe to a specific event
   * @returns subscriptionId — use this to unsubscribe
   */
  subscribe({ event, callback }: { event: string; callback: Function }): string {
    const name = event.toLowerCase();
    let eventMap = this.events.get(name);
    if (!eventMap) {
      eventMap = new Map<string, Function>();
      this.events.set(name, eventMap);
    }

    const subscriptionId = Autocode.uniqueId();
    eventMap.set(subscriptionId, callback);
    return subscriptionId;
  }

  /**
   * Subscribe to ALL events
   * @returns subscriptionId
   */
  subscribeAllEvents({ callback }: { callback: Function }): string {
    const subscriptionId = Autocode.uniqueId();
    this.allEventCallbacks.set(subscriptionId, callback);
    return subscriptionId;
  }

  /**
   * Unsubscribe using subscriptionId (recommended & safe)
   */
  unsubscribe({ event,callback,subscriptionId }: { event?:string,callback?: Function,subscriptionId?: string }): boolean {
    if(event && callback){
      for (const name of Object.keys(this.events)) {
        if (name == event) {
          for (const id of Object.keys(this.events.get(name)!)) {
            subscriptionId = id;
            break;
          }
          break;
        }
      }
    }
    if (!subscriptionId) return false;

    let removed = false;

    // Remove from specific events
    for (const eventMap of this.events.values()) {
      if (eventMap.delete(subscriptionId)) {
        removed = true;
      }
    }

    return removed;
  }

  /**
   * Unsubscribe from all events listeners (global only)
   */
  unsubscribeAllEvents({ callback,subscriptionId }: { callback?:Function,subscriptionId?: string }): boolean {
    if(callback){
      for (const id of Object.keys(this.allEventCallbacks)) {
        if (this.allEventCallbacks.get(id) == callback) {
            subscriptionId = id;
          }
      }
    }
    if (!subscriptionId) return false;
    return this.allEventCallbacks.delete(subscriptionId);
  }

  /**
   * (Optional) Remove entire event and all its listeners
   */
  removeEvent({ event }: { event: string }): void {
    this.events.delete(event.toLowerCase());
  }

  /**
   * (Debug) Get current subscription count
   */
  getSubscriptionCount(): { total: number; perEvent: Record<string, number>; allEvents: number } {
    const perEvent: Record<string, number> = {};
    let total = 0;

    for (const [event, map] of this.events.entries()) {
      perEvent[event] = map.size;
      total += map.size;
    }

    return {
      total: total + this.allEventCallbacks.size,
      perEvent,
      allEvents: this.allEventCallbacks.size,
    };
  }
}


export interface IAcTabsOptions {

  /**
   * Orientation of the tab headers: "horizontal" or "vertical".
   * Overrides flex layout if provided.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Animation duration in milliseconds for tab transitions.
   * Defaults to 200ms.
   */
  animationDuration?: number;

  /**
   * Automatically activate the first tab on initialization.
   * Defaults to true.
   */
  autoActivateFirst?: boolean;

  /**
   * If true, only activate tab manually via JS; disables automatic activation on click.
   */
  manualActivation?: boolean;
}

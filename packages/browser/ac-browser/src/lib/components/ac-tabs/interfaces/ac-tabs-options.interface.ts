export interface IAcTabsOptions {
  initialIndex?: number;        // Tab to activate on init (default: first non-disabled)
  loop?: boolean;               // Loop when navigating with arrows/home/end (default: true)
  updateHash?: boolean;         // Update window.location.hash when a tab is shown (default: false)
  preventScrollOnHash?: boolean;// Prevent scrolling when updating hash (default: true)
}

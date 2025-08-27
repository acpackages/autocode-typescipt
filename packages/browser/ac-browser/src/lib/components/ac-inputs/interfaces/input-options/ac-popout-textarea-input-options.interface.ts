export interface IAcPopoutTextareaOptions {
  /** Show popout on focus (default: true). You can also trigger manually via .open() */
  triggerOnFocus?: boolean;
  /** Also open on double-click (default: false) */
  triggerOnDblClick?: boolean;
  /** Keep open even on blur/click outside; close via API or Esc (default: false) */
  persistent?: boolean;

  /** Preferred placement order; will try in sequence (default: ["bottom","top","right","left"]) */
  placementPreference?: any[];

  /** Animation config */
  animationDurationMs?: number; // default 180
  animationEasing?: string;     // default "ease"

  /** Sizing */
  minWidthPx?: number;          // default: match input width
  maxWidthPx?: number;          // default: clamp to viewport
  matchInputWidth?: boolean;    // default: true
  minHeightPx?: number;         // default: input height
  maxHeightPx?: number;         // default: 300
  paddingPx?: number;           // default: 8
  borderRadiusPx?: number;      // default: 6

  /** Text behavior */
  autoGrow?: boolean;           // default: true
  autoTrimOnClose?: boolean;    // default: false
  respectMaxLength?: boolean;   // default: true
  liveSync?: boolean;           // default: true (textarea -> input on every keystroke)
  styleOverrides?: Partial<CSSStyleDeclaration>;
  copyInputPlaceholder?: boolean; // default: true
  copyDisabledReadonly?: boolean; // default: true
}

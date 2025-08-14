import { AcTabsAttributeName } from "../consts/ac-tabs-attribute-name.const";
import { AcTabsCssClassName } from "../consts/ac-tabs-css-class-name.const";
import { IAcTabsOptions } from "../interfaces/ac-tabs-options.interface";

export class AcTabs {
  private element: HTMLElement;
  private tabsList?:HTMLElement;
  private tabs: HTMLElement[] = [];
  private tabPanes: HTMLElement[] = [];
  private currentIndex = -1;
  private loop: boolean;
  private updateHash: boolean;
  private preventScrollOnHash: boolean;
  private boundClick?: (e: Event) => void;
  private boundKeydown?: (e: KeyboardEvent) => void;

  constructor({element,options = {}}:{element: HTMLElement, options?: IAcTabsOptions}) {
    this.element = element;

    this.tabPanes = Array.from((element).querySelectorAll(`.${AcTabsCssClassName.acTabPane}, [${AcTabsAttributeName.acTabPane}]`));

    this.loop = options.loop ?? true;
    this.updateHash = options.updateHash ?? false;
    this.preventScrollOnHash = options.preventScrollOnHash ?? true;

    if (this.tabs.length === 0 || this.tabPanes.length === 0) return;

    this.setupA11y();
    this.attachHandlers();

    const initial =
      this.resolveIndexFromHash() ??
      options.initialIndex ??
      this.findFirstEnabledIndex();

    this.show({target:initial, options:{ skipFocus: true, skipIfSame: true }});
  }

  public show({target,options}:{target: number | string | HTMLElement, options?: { skipFocus?: boolean,skipIfSame?:boolean }}) {
    const index = this.resolveIndex(target);
    this.activate(index, { ...options, programmatic: true });
  }

  public next() {
    const idx = this.nextEnabledIndex(this.currentIndex + 1);
    if (idx !== -1) this.activate(idx, { programmatic: true });
  }

  public prev() {
    const idx = this.prevEnabledIndex(this.currentIndex - 1);
    if (idx !== -1) this.activate(idx, { programmatic: true });
  }

  public getActiveIndex() {
    return this.currentIndex;
  }

  public enable(target: number | string | HTMLElement, enable = true) {
    const i = this.resolveIndex(target);
    if (i < 0) return;
    const tab = this.tabs[i];
    tab.setAttribute('aria-disabled', (!enable).toString());
    tab.classList.toggle('disabled', !enable);
    (tab as any).disabled = !enable;
  }

  public dispose() {
    if (this.boundClick) this.element.removeEventListener('click', this.boundClick);
    if (this.boundKeydown && this.element)
      this.element.removeEventListener('keydown', this.boundKeydown);
  }

  /** Setup */

  private setupA11y() {
    // tablist
    if (this.element) {
      if (!this.element.hasAttribute('role')) this.element.setAttribute('role', 'tablist');
    }

    // tabs
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
      const paneId = this.getTargetIdFromTab(tab);
      if (paneId) tab.setAttribute('aria-controls', paneId);
      const isDisabled =
        tab.classList.contains('disabled') ||
        tab.getAttribute('aria-disabled') === 'true' ||
        (tab as any).disabled === true;
      tab.setAttribute('aria-disabled', isDisabled.toString());
    });

    // panes
    this.tabPanes.forEach((pane) => {
      pane.setAttribute('role', 'tabpanel');
      const id = pane.id || this.ensureId(pane, 'ac-tabpane');
      pane.setAttribute('aria-labelledby', this.findTabIdForPane(id) ?? '');
      // Ensure baseline hidden state; actual activation will adjust visibility.
      if (!pane.classList.contains('active')) this.hidePane(pane, /*immediate*/ true);
    });
  }

  private attachHandlers() {
    this.boundClick = (e: Event) => {
      const tab:any = (e.target as HTMLElement)?.closest(`.${AcTabsCssClassName.acTabPane}, [${AcTabsAttributeName.acTabPane}]`);
      if (!tab || !this.element.contains(tab)) return;

      e.preventDefault(); // prevent page jump if it's an <a>

      const disabled =
        tab.classList.contains('disabled') ||
        tab.getAttribute('aria-disabled') === 'true' ||
        (tab as any).disabled === true;
      if (disabled) return;

      const index = this.tabs.indexOf(tab);
      if (index !== -1) this.activate(index);
    };

    this.element.addEventListener('click', this.boundClick, { capture: true });

    this.boundKeydown = (e: KeyboardEvent) => {
      const key = e.key;
      const current = document.activeElement as HTMLElement | null;
      if (!current || !this.tabs.includes(current)) return;

      // Arrow/Home/End navigation per WAI-ARIA
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
        e.preventDefault();
        const dir = this.isHorizontal() ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown'];
        let idx = this.tabs.indexOf(current);

        if (key === 'Home') idx = this.findFirstEnabledIndex() ?? idx;
        else if (key === 'End') idx = this.findLastEnabledIndex() ?? idx;
        else if (key === dir[0]) idx = this.prevEnabledIndex(idx - 1, /*wrap*/ this.loop);
        else if (key === dir[1]) idx = this.nextEnabledIndex(idx + 1, /*wrap*/ this.loop);

        if (idx !== -1) this.activate(idx);
      }

      if (['Enter', ' '].includes(key)) {
        e.preventDefault();
        const idx = this.tabs.indexOf(current);
        if (idx !== -1) this.activate(idx);
      }
    };

    // if (this.tabs) this.tablist.addEventListener('keydown', this.boundKeydown);
  }

  /** Core activation */

  private activate(
    index: number,
    opts: { skipFocus?: boolean; programmatic?: boolean; skipIfSame?: boolean } = {}
  ) {
    if (index < 0 || index >= this.tabs.length) return;
    if (opts.skipIfSame && index === this.currentIndex) return;

    const newTab = this.tabs[index];
    const isDisabled =
      newTab.classList.contains('disabled') ||
      newTab.getAttribute('aria-disabled') === 'true' ||
      (newTab as any).disabled === true;
    if (isDisabled) return;

    const oldIndex = this.currentIndex;
    const oldTab = this.tabs[oldIndex] || null;
    const newPane = this.getPaneForTab(newTab);
    const oldPane = oldTab ? this.getPaneForTab(oldTab) : null;

    // Fire cancellable "show" event
    if (
      !this.dispatch('actabs:show', { from: oldIndex, to: index, oldTab, newTab, oldPane, newPane })
    )
      return;

    // Deactivate old
    if (oldTab) {
      oldTab.classList.remove('active');
      oldTab.setAttribute('aria-selected', 'false');
      oldTab.setAttribute('tabindex', '-1');
    }
    if (oldPane) this.hidePane(oldPane);

    // Activate new
    newTab.classList.add('active');
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    if (!opts.skipFocus) newTab.focus();

    if (newPane) this.showPane(newPane);

    this.currentIndex = index;

    if (this.updateHash) {
      const paneId = newPane?.id;
      if (paneId) {
        const method = this.preventScrollOnHash ? 'replaceState' : 'pushState';
        try {
          history[method](null, '', `#${paneId}`);
        } catch {
          // Fallback: assign hash (may scroll)
          location.hash = paneId;
        }
      }
    }

    // Fire non-cancellable "shown"
    this.dispatch('actabs:shown', { from: oldIndex, to: index, oldTab, newTab, oldPane, newPane });
    this.dispatch('actabs:changed', { index, tab: newTab, pane: newPane });
  }

  /** Helpers */

  private showPane(pane: HTMLElement) {
    const useFade = pane.classList.contains('fade');
    pane.classList.add('active');
    pane.removeAttribute('hidden');
    pane.setAttribute('aria-hidden', 'false');

    if (useFade) {
      // Trigger reflow for CSS transition then add 'show'
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      pane.offsetWidth;
      pane.classList.add('show');
    }
  }

  private hidePane(pane: HTMLElement, immediate = false) {
    const useFade = pane.classList.contains('fade');
    if (useFade && !immediate) {
      pane.classList.remove('show');
      const onEnd = (e: Event) => {
        if (e.target !== pane) return;
        pane.removeEventListener('transitionend', onEnd);
        pane.classList.remove('active');
        pane.setAttribute('hidden', 'true');
        pane.setAttribute('aria-hidden', 'true');
      };
      pane.addEventListener('transitionend', onEnd, { once: true });
    } else {
      pane.classList.remove('show', 'active');
      pane.setAttribute('hidden', 'true');
      pane.setAttribute('aria-hidden', 'true');
    }
  }

  private dispatch(name: string, detail: Record<string, unknown>) {
    const ev = new CustomEvent(name, { bubbles: true, cancelable: name.endsWith(':show'), detail });
    return this.element.dispatchEvent(ev);
  }

  private resolveIndex(target: number | string | HTMLElement): number {
    if (typeof target === 'number') return target;
    if (typeof target === 'string') {
      // string can be pane id "#id" or tab selector
      const id = target.startsWith('#') ? target.slice(1) : target;
      const pane = this.tabPanes.find((p) => p.id === id);
      if (pane) {
        const tabId = pane.getAttribute('aria-labelledby');
        if (tabId) {
          const tab = this.tabs.find((t) => this.ensureId(t as HTMLElement, 'ac-tab') === tabId);
          if (tab) return this.tabs.indexOf(tab);
        }
      }
      const el = this.element.querySelector<HTMLElement>(target);
      if (el) return this.tabs.indexOf(el);
      return -1;
    }
    return this.tabs.indexOf(target);
  }

  private resolveIndexFromHash(): number | null {
    const hash = (location.hash || '').replace('#', '');
    if (!hash) return null;
    const pane = this.tabPanes.find((p) => p.id === hash);
    if (!pane) return null;
    const tabId = pane.getAttribute('aria-labelledby');
    const tab = tabId ? this.tabs.find((t) => this.ensureId(t as HTMLElement, 'ac-tab') === tabId) : null;
    return tab ? this.tabs.indexOf(tab) : null;
  }

  private getPaneForTab(tab: HTMLElement): HTMLElement | null {
    const id = this.getTargetIdFromTab(tab);
    if (!id) return null;
    return this.tabPanes.find((p) => p.id === id) ?? null;
  }

  private getTargetIdFromTab(tab: HTMLElement): string | null {
    const explicit = tab.getAttribute('data-tab-target') || tab.getAttribute('data-target');
    if (explicit) return explicit.replace('#', '');

    if (tab instanceof HTMLAnchorElement && tab.hash) return tab.hash.replace('#', '');

    const controls = tab.getAttribute('aria-controls');
    if (controls) return controls.replace('#', '');

    return null;
  }

  private ensureId(el: HTMLElement, prefix: string) {
    if (!el.id) el.id = `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    return el.id;
  }

  private findTabIdForPane(paneId: string) {
    const tab = this.tabs.find((t) => this.getTargetIdFromTab(t) === paneId) as HTMLElement | undefined;
    return tab ? this.ensureId(tab, 'ac-tab') : null;
  }

  private findFirstEnabledIndex() {
    return this.tabs.findIndex((t) => !this.isDisabled(t));
  }

  private findLastEnabledIndex() {
    for (let i = this.tabs.length - 1; i >= 0; i--) {
      if (!this.isDisabled(this.tabs[i])) return i;
    }
    return -1;
  }

  private nextEnabledIndex(start: number, wrap = this.loop) {
    for (let i = 0; i < this.tabs.length; i++) {
      const idx = (start + i) % this.tabs.length;
      if (!this.isDisabled(this.tabs[idx])) return idx;
      if (!wrap && start + i >= this.tabs.length) break;
    }
    return -1;
  }

  private prevEnabledIndex(start: number, wrap = this.loop) {
    for (let i = 0; i < this.tabs.length; i++) {
      const idx = ((start - i) % this.tabs.length + this.tabs.length) % this.tabs.length;
      if (!this.isDisabled(this.tabs[idx])) return idx;
      if (!wrap && start - i < 0) break;
    }
    return -1;
  }

  private isDisabled(tab: HTMLElement) {
    return (
      tab.classList.contains('disabled') ||
      tab.getAttribute('aria-disabled') === 'true' ||
      (tab as any).disabled === true
    );
  }

  private isHorizontal() {
    // You can set data-orientation="vertical" on tablist to switch.
    const orient =
      (this.tabsList?.getAttribute('aria-orientation') ||
        this.tabsList?.getAttribute('data-orientation') ||
        'horizontal') as 'horizontal' | 'vertical';
    return orient !== 'vertical';
  }
}

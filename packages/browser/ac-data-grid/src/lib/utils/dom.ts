import type { BeanCollection } from '../context/context';
import type { CellStyle, HeaderStyle } from '../entities/colDef';
import type { RowStyle } from '../entities/gridOptions';
import { _getRootNode, _getWindow } from '../gridOptionsUtils';
import type { AgComponentSelector } from '../widgets/component';
import { _setAriaHidden } from './aria';
import { _isBrowserFirefox, _isBrowserSafari } from './browser';

/**
 * This method adds a class to an element and remove that class from all siblings.
 * Useful for toggling state.
 * @param {HTMLElement} element The element to receive the class
 * @param {string} elementClass The class to be assigned to the element
 * @param {boolean} otherElementClass The class to be assigned to siblings of the element, but not the element itself
 */
export function _radioCssClass(element: HTMLElement, elementClass: string | null, otherElementClass?: string | null) {
    const parent = element.parentElement;
    let sibling = parent && (parent.firstChild as HTMLElement);

    while (sibling) {
        if (elementClass) {
            sibling.classList.toggle(elementClass, sibling === element);
        }
        if (otherElementClass) {
            sibling.classList.toggle(otherElementClass, sibling !== element);
        }
        sibling = sibling.nextSibling as HTMLElement;
    }
}

export const FOCUSABLE_SELECTOR = '[tabindex], input, select, button, textarea, [href]';
export const FOCUSABLE_EXCLUDE = '[disabled], .ag-disabled:not(.ag-button), .ag-disabled *';

export function _isFocusableFormField(element: HTMLElement): boolean {
    const matches: (str: string) => boolean = Element.prototype.matches || (Element as any).prototype.msMatchesSelector;

    const inputSelector = 'input, select, button, textarea';
    const isFocusable = matches.call(element, inputSelector);
    const isNotFocusable = matches.call(element, FOCUSABLE_EXCLUDE);
    const isElementVisible = _isVisible(element);

    const focusable = isFocusable && !isNotFocusable && isElementVisible;

    return focusable;
}

export function _setDisplayed(element: Element, displayed: boolean, options: { skipAriaHidden?: boolean } = {}) {
    const { skipAriaHidden } = options;
    element.classList.toggle('ag-hidden', !displayed);
    if (!skipAriaHidden) {
        _setAriaHidden(element, !displayed);
    }
}

export function _setVisible(element: HTMLElement, visible: boolean, options: { skipAriaHidden?: boolean } = {}) {
    const { skipAriaHidden } = options;
    element.classList.toggle('ag-invisible', !visible);
    if (!skipAriaHidden) {
        _setAriaHidden(element, !visible);
    }
}

export function _setDisabled(element: HTMLElement, disabled: boolean) {
    const attributeName = 'disabled';
    const addOrRemoveDisabledAttribute = disabled
        ? (e: HTMLElement) => e.setAttribute(attributeName, '')
        : (e: HTMLElement) => e.removeAttribute(attributeName);

    addOrRemoveDisabledAttribute(element);

    const inputs = element.querySelectorAll('input') ?? [];
    for (const input of inputs) {
        addOrRemoveDisabledAttribute(input as HTMLElement);
    }
}

export function _isElementChildOfClass(
    element: HTMLElement | null,
    cls: string,
    maxNest?: HTMLElement | number
): boolean {
    let counter = 0;

    while (element) {
        if (element.classList.contains(cls)) {
            return true;
        }

        element = element.parentElement;

        if (typeof maxNest == 'number') {
            if (++counter > maxNest) {
                break;
            }
        } else if (element === maxNest) {
            break;
        }
    }

    return false;
}

// returns back sizes as doubles instead of strings. similar to
// getBoundingClientRect, however getBoundingClientRect does not:
// a) work with fractions (eg browser is zooming)
// b) has CSS transitions applied (eg CSS scale, browser zoom), which we don't want, we want the un-transitioned values
export function _getElementSize(el: HTMLElement): {
    height: number;
    width: number;
    borderTopWidth: number;
    borderRightWidth: number;
    borderBottomWidth: number;
    borderLeftWidth: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    boxSizing: string;
} {
    const {
        height,
        width,
        borderTopWidth,
        borderRightWidth,
        borderBottomWidth,
        borderLeftWidth,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        boxSizing,
    } = window.getComputedStyle(el);

    return {
        height: parseFloat(height || '0'),
        width: parseFloat(width || '0'),
        borderTopWidth: parseFloat(borderTopWidth || '0'),
        borderRightWidth: parseFloat(borderRightWidth || '0'),
        borderBottomWidth: parseFloat(borderBottomWidth || '0'),
        borderLeftWidth: parseFloat(borderLeftWidth || '0'),
        paddingTop: parseFloat(paddingTop || '0'),
        paddingRight: parseFloat(paddingRight || '0'),
        paddingBottom: parseFloat(paddingBottom || '0'),
        paddingLeft: parseFloat(paddingLeft || '0'),
        marginTop: parseFloat(marginTop || '0'),
        marginRight: parseFloat(marginRight || '0'),
        marginBottom: parseFloat(marginBottom || '0'),
        marginLeft: parseFloat(marginLeft || '0'),
        boxSizing,
    };
}

export function _getInnerHeight(el: HTMLElement): number {
    const size = _getElementSize(el);

    if (size.boxSizing === 'border-box') {
        return size.height - size.paddingTop - size.paddingBottom;
    }

    return size.height;
}

export function _getInnerWidth(el: HTMLElement): number {
    const size = _getElementSize(el);

    if (size.boxSizing === 'border-box') {
        return size.width - size.paddingLeft - size.paddingRight;
    }

    return size.width;
}

export function _getAbsoluteHeight(el: HTMLElement): number {
    const { height, marginBottom, marginTop } = _getElementSize(el);

    return Math.floor(height + marginBottom + marginTop);
}

export function _getAbsoluteWidth(el: HTMLElement): number {
    const { width, marginLeft, marginRight } = _getElementSize(el);

    return Math.floor(width + marginLeft + marginRight);
}

export function _getElementRectWithOffset(el: HTMLElement): {
    top: number;
    left: number;
    right: number;
    bottom: number;
} {
    const offsetElementRect = el.getBoundingClientRect();
    const { borderTopWidth, borderLeftWidth, borderRightWidth, borderBottomWidth } = _getElementSize(el);

    return {
        top: offsetElementRect.top + (borderTopWidth || 0),
        left: offsetElementRect.left + (borderLeftWidth || 0),
        right: offsetElementRect.right + (borderRightWidth || 0),
        bottom: offsetElementRect.bottom + (borderBottomWidth || 0),
    };
}

export function _getScrollLeft(element: HTMLElement, rtl: boolean): number {
    let scrollLeft = element.scrollLeft;

    if (rtl) {
        scrollLeft = Math.abs(scrollLeft);
    }

    return scrollLeft;
}

export function _setScrollLeft(element: HTMLElement, value: number, rtl: boolean): void {
    if (rtl) {
        value *= -1;
    }
    element.scrollLeft = value;
}

export function _clearElement(el: HTMLElement): void {
    while (el && el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

export function _removeFromParent(node: Element | null) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

export function _isInDOM(element: HTMLElement): boolean {
    return !!element.offsetParent;
}

export function _isVisible(element: HTMLElement) {
    const el = element as any;
    if (el.checkVisibility) {
        return el.checkVisibility({ checkVisibilityCSS: true });
    }

    const isHidden = !_isInDOM(element) || window.getComputedStyle(element).visibility !== 'visible';
    return !isHidden;
}

/**
 * Loads the template and returns it as an element.
 * NOTE: Prefer _createElement
 * @param {string} template
 * @returns {HTMLElement}
 */
export function _loadTemplate(template: string | undefined | null): HTMLElement {
    const tempDiv = document.createElement('div');
    // eslint-disable-next-line no-restricted-properties -- no other way to parse custom HTML strings from the user
    tempDiv.innerHTML = (template || '').trim();

    return tempDiv.firstChild as HTMLElement;
}

export function _ensureDomOrder(eContainer: HTMLElement, eChild: HTMLElement, eChildBefore?: HTMLElement | null): void {
    // if already in right order, do nothing
    if (eChildBefore && eChildBefore.nextSibling === eChild) {
        return;
    }

    if (!eContainer.firstChild) {
        eContainer.appendChild(eChild);
    } else if (eChildBefore) {
        if (eChildBefore.nextSibling) {
            // insert between the eRowBefore and the row after it
            eContainer.insertBefore(eChild, eChildBefore.nextSibling);
        } else {
            // if nextSibling is missing, means other row is at end, so just append new row at the end
            eContainer.appendChild(eChild);
        }
    } else if (eContainer.firstChild && eContainer.firstChild !== eChild) {
        // otherwise put at start
        // insert it at the first location
        eContainer.insertAdjacentElement('afterbegin', eChild);
    }
}

export function _setDomChildOrder(eContainer: HTMLElement, orderedChildren: (HTMLElement | null)[]): void {
    for (let i = 0; i < orderedChildren.length; i++) {
        const correctCellAtIndex = orderedChildren[i];
        const actualCellAtIndex = eContainer.children[i];

        if (actualCellAtIndex !== correctCellAtIndex) {
            eContainer.insertBefore(correctCellAtIndex!, actualCellAtIndex);
        }
    }
}

export function _insertWithDomOrder(
    eContainer: HTMLElement,
    eToInsert: HTMLElement,
    eChildBefore: HTMLElement | null
): void {
    if (eChildBefore) {
        // if previous element exists, just slot in after the previous element
        eChildBefore.insertAdjacentElement('afterend', eToInsert);
    } else {
        if (eContainer.firstChild) {
            // insert it at the first location
            eContainer.insertAdjacentElement('afterbegin', eToInsert);
        } else {
            // otherwise eContainer is empty, so just append it
            eContainer.appendChild(eToInsert);
        }
    }
}

/**
 * Converts a camelCase string into hyphenated string
 * @param {string} camelCase
 * @return {string}
 */
function _camelCaseToHyphenated(camelCase: string): string {
    return camelCase.replace(/[A-Z]/g, (s) => `-${s.toLocaleLowerCase()}`);
}

export function _addStylesToElement(eElement: any, styles: RowStyle | CellStyle | HeaderStyle | null | undefined) {
    if (!styles) {
        return;
    }

    for (const key of Object.keys(styles)) {
        const value = styles[key];
        if (!key || !key.length || value == null) {
            continue;
        }

        // changes the key from camelCase into a hyphenated-string
        const parsedKey = _camelCaseToHyphenated(key);
        const valueAsString = value.toString();
        const parsedValue = valueAsString.replace(/\s*!important/g, '');
        const priority = parsedValue.length != valueAsString.length ? 'important' : undefined;

        eElement.style.setProperty(parsedKey, parsedValue, priority);
    }
}

export function _isHorizontalScrollShowing(element: HTMLElement): boolean {
    return element.clientWidth < element.scrollWidth;
}

export function _isVerticalScrollShowing(element: HTMLElement): boolean {
    return element.clientHeight < element.scrollHeight;
}

export function _setElementWidth(element: HTMLElement, width: string | number) {
    if (width === 'flex') {
        element.style.removeProperty('width');
        element.style.removeProperty('minWidth');
        element.style.removeProperty('maxWidth');
        element.style.flex = '1 1 auto';
    } else {
        _setFixedWidth(element, width);
    }
}

export function _setFixedWidth(element: HTMLElement, width: string | number) {
    width = _formatSize(width);
    element.style.width = width;
    element.style.maxWidth = width;
    element.style.minWidth = width;
}

export function _setFixedHeight(element: HTMLElement, height: string | number) {
    height = _formatSize(height);
    element.style.height = height;
    element.style.maxHeight = height;
    element.style.minHeight = height;
}

export function _formatSize(size: number | string) {
    return typeof size === 'number' ? `${size}px` : size;
}

export function _isNodeOrElement(o: any): o is Node | Element {
    return o instanceof Node || o instanceof HTMLElement;
}

export function _addOrRemoveAttribute(element: HTMLElement, name: string, value: string | number | null | undefined) {
    if (value == null || value === '') {
        element.removeAttribute(name);
    } else {
        element.setAttribute(name, value.toString());
    }
}

export function _observeResize(
    beans: BeanCollection,
    element: HTMLElement,
    callback: ResizeObserverCallback
): () => void {
    const win = _getWindow(beans);
    const ResizeObserverImpl = win.ResizeObserver;
    const resizeObserver = ResizeObserverImpl ? new ResizeObserverImpl(callback) : null;
    resizeObserver?.observe(element);
    return () => resizeObserver?.disconnect();
}

function _getTextSelectionRanges(beans: BeanCollection): { selection: Selection | null; ranges: Range[] } {
    const rootNode = _getRootNode(beans);
    const selection = 'getSelection' in rootNode ? (rootNode.getSelection() as Selection) : null;
    const ranges: Range[] = [];

    for (let i = 0; i < (selection?.rangeCount ?? 0); i++) {
        const range = selection?.getRangeAt(i);

        if (range) {
            ranges.push(range);
        }
    }

    return { selection, ranges };
}

/**
 * FF and Safari remove text selections when the focus changes. This is inconsistent with Chrome, whose behaviour
 * we prefer in this case. This utility preserves whatever text selection exists before the given action is taken.
 */
export function _preserveRangesWhile(beans: BeanCollection, fn: () => void): void {
    const enableCellTextSelection = beans.gos.get('enableCellTextSelection');
    if (!enableCellTextSelection) {
        return fn();
    }

    if (!_isBrowserFirefox() && !_isBrowserSafari()) {
        return fn();
    }

    const { selection, ranges } = _getTextSelectionRanges(beans);

    fn();

    selection?.removeAllRanges();
    for (const range of ranges) {
        selection?.addRange(range);
    }
}

export function _requestAnimationFrame(beans: BeanCollection, callback: any) {
    const win = _getWindow(beans);

    if (win.requestAnimationFrame) {
        win.requestAnimationFrame(callback);
    } else if ((win as any).webkitRequestAnimationFrame) {
        (win as any).webkitRequestAnimationFrame(callback);
    } else {
        win.setTimeout(callback, 0);
    }
}

export type Attributes = { [key: string]: string };
type TagName = keyof HTMLElementTagNameMap | Lowercase<AgComponentSelector>;
/** Type to help avoid typos, add new roles as required. */
type RoleType =
    | 'button'
    | 'columnheader'
    | 'gridcell'
    | 'menu'
    | 'option'
    | 'presentation'
    | 'role'
    | 'row'
    | 'rowgroup'
    | 'status'
    | 'tab'
    | 'tablist'
    | 'tabpanel'
    | 'treeitem';

export type ElementParams = {
    /** The tag name to use for the element, either browser tag or one of the AG Grid components such as ag-checkbox
     * For span and div consider using the _span() and _div() helper functions instead to save bundle size.
     */
    tag: TagName;
    /** AG Grid data-ref attribute, should match a property on the class that uses the same name and is initialised with RefPlaceholder
     * @example
     * ref: 'eLabel'
     * private eLabel: HTMLElement = RefPlaceholder;
     */
    ref?: string;
    /**
     * Should be a single string of space-separated class names
     * @example
     * cls: 'ag-header-cell ag-header-cell-sortable'
     */
    cls?: string;

    /** The role attribute to add to the dom element */
    role?: RoleType;

    /** Key Value pair of attributes to add to the dom element via `element.setAttribute(key,value)` */
    attrs?: Attributes;

    /**
     * A single string can be passed to the children property and this will call `element.textContent = children` on the element.
     *
     * Otherwise an array of children is passed.
     * A child element can be an ElementParams / string / null/undefined.
     *  - If an ElementParams is passed it will be created and appended to the parent element. It will be wrapped with whitespace to mimic the previous behaviour of multi line strings.
     *  - If a string is passed it will be appended as a text node.
     *  - If null or undefined is passed it will be ignored.
     */
    children?: (ElementParams | string | null | undefined)[] | string;
};

/** AG Grid attribute used to automatically assign DOM Elements to class properties */
export const DataRefAttribute = 'data-ref';

let whitespaceNode: Node | null;
function getWhitespaceNode() {
    // Cloning is slightly faster than creating a new node each time
    whitespaceNode ??= document.createTextNode(' ');
    return whitespaceNode.cloneNode();
}
export function _createElement<T extends HTMLElement = HTMLElement>(params: ElementParams): T {
    const { attrs, children, cls, ref, role, tag } = params;
    const element = document.createElement(tag);

    if (cls) {
        element.className = cls;
    }
    if (ref) {
        element.setAttribute(DataRefAttribute, ref);
    }
    if (role) {
        element.setAttribute('role', role);
    }

    if (attrs) {
        for (const key of Object.keys(attrs)) {
            element.setAttribute(key, attrs[key]);
        }
    }

    if (children) {
        if (typeof children === 'string') {
            element.textContent = children;
        } else {
            let addFirstWhitespace = true;
            for (const child of children) {
                if (child) {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                        addFirstWhitespace = false;
                    } else {
                        // NOTE: To match the previous behaviour of when component templates where defined on multi line strings we need
                        // to add a whitespace node before and after each child element.
                        // Ideally we would not do this but this reduces the chance of breaking changes.
                        if (addFirstWhitespace) {
                            element.appendChild(getWhitespaceNode());
                            addFirstWhitespace = false;
                        }
                        element.append(_createElement(child));
                        element.appendChild(getWhitespaceNode());
                    }
                }
            }
        }
    }
    return element as T;
}

import type { BeanCollection } from '../context/context';
import type { AgColumn } from '../entities/agColumn';
import { _warn } from '../validation/logging';
import { _createElement, _isNodeOrElement, _loadTemplate } from './dom';

//
// IMPORTANT NOTE!
//
// If you change the list below, copy/paste the new content into the docs page custom-icons
//
export type IconName =
    | 'columnGroupOpened'
    | 'columnGroupClosed'
    | 'columnSelectClosed'
    | 'columnSelectOpen'
    | 'columnSelectIndeterminate'
    | 'accordionClosed'
    | 'accordionOpen'
    | 'accordionIndeterminate'
    | 'columnMovePin'
    | 'columnMoveHide'
    | 'columnMoveMove'
    | 'columnMoveLeft'
    | 'columnMoveRight'
    | 'columnMoveGroup'
    | 'columnMoveValue'
    | 'columnMovePivot'
    | 'dropNotAllowed'
    | 'groupContracted'
    | 'groupExpanded'
    | 'setFilterGroupClosed'
    | 'setFilterGroupOpen'
    | 'setFilterGroupIndeterminate'
    | 'setFilterLoading'
    | 'chart'
    | 'close'
    | 'cancel'
    | 'check'
    | 'first'
    | 'previous'
    | 'next'
    | 'last'
    | 'linked'
    | 'unlinked'
    | 'colorPicker' // deprecated v33
    | 'groupLoading'
    | 'menu'
    | 'legacyMenu'
    | 'loadingMenuItems'
    | 'menuAlt'
    | 'filter'
    | 'filterActive'
    | 'filterTab'
    | 'filtersToolPanel'
    | 'columns'
    | 'columnsToolPanel'
    | 'maximize'
    | 'minimize'
    | 'menuPin'
    | 'menuValue'
    | 'menuAddRowGroup'
    | 'menuRemoveRowGroup'
    | 'clipboardCopy'
    | 'clipboardCut'
    | 'clipboardPaste'
    | 'pivotPanel'
    | 'rowGroupPanel'
    | 'valuePanel'
    | 'columnDrag'
    | 'rowDrag'
    | 'rowPin'
    | 'rowPinTop'
    | 'rowPinBottom'
    | 'rowUnpin'
    | 'save'
    | 'csvExport'
    | 'excelExport'
    | 'smallDown' // deprecated v33
    | 'selectOpen'
    | 'richSelectOpen'
    | 'richSelectRemove'
    | 'smallLeft' // deprecated v33
    | 'smallRight' // deprecated v33
    | 'panelDelimiter'
    | 'panelDelimiterRtl'
    | 'subMenuOpen'
    | 'subMenuOpenRtl'
    | 'smallUp' // deprecated v33
    | 'sortAscending'
    | 'sortDescending'
    | 'sortUnSort'
    | 'advancedFilterBuilder'
    | 'advancedFilterBuilderDrag'
    | 'advancedFilterBuilderInvalid'
    | 'advancedFilterBuilderMoveUp'
    | 'advancedFilterBuilderMoveDown'
    | 'advancedFilterBuilderAdd'
    | 'advancedFilterBuilderRemove'
    | 'advancedFilterBuilderSelectOpen'
    | 'chartsMenu'
    | 'chartsMenuEdit'
    | 'chartsMenuAdvancedSettings'
    | 'chartsMenuAdd'
    | 'chartsColorPicker'
    | 'chartsThemePrevious'
    | 'chartsThemeNext'
    | 'chartsDownload'
    | 'ensureColumnVisible'
    | 'checkboxChecked' // deprecated v33
    | 'checkboxIndeterminate' // deprecated v33
    | 'checkboxUnchecked' // deprecated v33
    | 'radioButtonOn' // deprecated v33
    | 'radioButtonOff'; // deprecated v33

export type IconValue =
    | 'expanded'
    | 'contracted'
    | 'tree-closed'
    | 'tree-open'
    | 'tree-indeterminate'
    | 'pin'
    | 'eye-slash'
    | 'arrows'
    | 'left'
    | 'right'
    | 'group'
    | 'aggregation'
    | 'pivot'
    | 'not-allowed'
    | 'chart'
    | 'cross'
    | 'cancel'
    | 'tick'
    | 'first'
    | 'previous'
    | 'next'
    | 'last'
    | 'linked'
    | 'unlinked'
    | 'color-picker'
    | 'loading'
    | 'menu'
    | 'menu-alt'
    | 'filter'
    | 'columns'
    | 'maximize'
    | 'minimize'
    | 'copy'
    | 'cut'
    | 'paste'
    | 'grip'
    | 'save'
    | 'csv'
    | 'excel'
    | 'small-down'
    | 'small-left'
    | 'small-right'
    | 'small-up'
    | 'asc'
    | 'desc'
    | 'none'
    | 'up'
    | 'down'
    | 'plus'
    | 'minus'
    | 'settings'
    | 'checkbox-checked'
    | 'checkbox-indeterminate'
    | 'checkbox-unchecked'
    | 'radio-button-on'
    | 'radio-button-off'
    | 'eye'
    | 'column-arrow'
    | 'un-pin'
    | 'pinned-bottom'
    | 'pinned-top';

/**
 * If icon provided, use this (either a string, or a function callback).
 * if not, then use the default icon from the theme.
 * Technically `iconName` could be any string, if using user-provided icons map.
 * However, in most cases we're providing a specific icon name, so better to have type-checking.
 */
export function _createIcon(iconName: IconName, beans: BeanCollection, column: AgColumn | null): Element {
    const iconContents = _createIconNoSpan(iconName, beans, column);

    if (iconContents) {
        const { className } = iconContents;
        if (
            (typeof className === 'string' && className.indexOf('ag-icon') > -1) ||
            (typeof className === 'object' && className['ag-icon'])
        ) {
            return iconContents;
        }
    }

    const eResult = _createElement({ tag: 'span' });
    eResult.appendChild(iconContents!);

    return eResult;
}

/**
 * Technically `iconName` could be any string, if using user-provided icons map.
 * However, in most cases we're providing a specific icon name, so better to have type-checking.
 */
export function _createIconNoSpan(
    iconName: IconName,
    beans: BeanCollection,
    column?: AgColumn | null
): Element | undefined {
    let userProvidedIcon: ((...args: any[]) => any) | string | null = null;

    if (iconName === 'smallDown') {
        _warn(262);
    } else if (iconName === 'smallLeft') {
        _warn(263);
    } else if (iconName === 'smallRight') {
        _warn(264);
    }

    // check col for icon first
    const icons: any = column && column.getColDef().icons;

    if (icons) {
        userProvidedIcon = icons[iconName];
    }

    // if not in col, try grid options
    if (beans.gos && !userProvidedIcon) {
        const optionsIcons = beans.gos.get('icons');
        if (optionsIcons) {
            userProvidedIcon = optionsIcons[iconName];
        }
    }

    // now if user provided, use it
    if (userProvidedIcon) {
        let rendererResult: any;

        if (typeof userProvidedIcon === 'function') {
            rendererResult = userProvidedIcon();
        } else if (typeof userProvidedIcon === 'string') {
            rendererResult = userProvidedIcon;
        } else {
            _warn(38, { iconName });
            return undefined;
        }

        if (typeof rendererResult === 'string') {
            return _loadTemplate(rendererResult);
        }

        if (_isNodeOrElement(rendererResult)) {
            return rendererResult as Element;
        }

        _warn(133, { iconName });
        return undefined;
    } else {
        const iconValue = beans.registry.getIcon(iconName as IconName);
        if (!iconValue) {
            beans.validation?.validateIcon(iconName);
        }

        return _createElement({
            tag: 'span',
            cls: `ag-icon ag-icon-${iconValue ?? iconName}`,
            role: 'presentation',
            attrs: { unselectable: 'on' },
        });
    }
}

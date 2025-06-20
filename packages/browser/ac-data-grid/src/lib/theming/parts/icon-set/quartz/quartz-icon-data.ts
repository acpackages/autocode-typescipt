const iconNameToSvgFragment: Record<string, string | undefined> = {
    aggregation: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    arrows: '<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>',
    asc: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    cancel: '<path d="m18 6-12 12"/><path d="m6 6 12 12"/>',
    chart: '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>',
    'color-picker':
        '<path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>',
    columns:
        '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>',
    contracted: '<path d="m9 18 6-6-6-6"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    cross: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    csv: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/>',
    cut: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    desc: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    down: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    excel: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/>',
    expanded: '<path d="m15 18-6-6 6-6"/>',
    'eye-slash':
        '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    filter: '<path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/>',
    first: '<path d="m17 18-6-6 6-6"/><path d="M7 6v12"/>',
    group: '<path d="M16 12H3"/><path d="M16 18H3"/><path d="M10 6H3"/><path d="M21 18V8a2 2 0 0 0-2-2h-5"/><path d="m16 8-2-2 2-2"/>',
    last: '<path d="m7 18 6-6-6-6"/><path d="M17 6v12"/>',
    left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    linked: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>',
    loading:
        '<line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/>',
    maximize:
        '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    'menu-alt':
        '<circle cx="12" cy="5" r="0.75" fill="#D9D9D9"/><circle cx="12" cy="12" r="0.75" fill="#D9D9D9"/><circle cx="12" cy="19" r="0.75" fill="#D9D9D9"/>',
    minimize:
        '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/>',
    minus: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    none: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
    'not-allowed': '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    paste: '<path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"/><path d="m17 10 4 4-4 4"/>',
    pin: '<line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>',
    pivot: '<path d="M15 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/>',
    plus: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
    previous: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    save: '<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>',
    'small-left': '<path d="m15 18-6-6 6-6"/>',
    'small-right': '<path d="m9 18 6-6-6-6"/>',
    tick: '<path d="M20 6 9 17l-5-5"/>',
    'tree-closed': '<path d="m9 18 6-6-6-6"/>',
    'tree-indeterminate': '<path d="M5 12h14"/>',
    'tree-open': '<path d="m6 9 6 6 6-6"/>',
    unlinked:
        '<path d="M9 17H7A5 5 0 0 1 7 7"/><path d="M15 7h2a5 5 0 0 1 4 8"/><line x1="8" x2="12" y1="12" y2="12"/><line x1="2" x2="22" y1="2" y2="22"/>',
    up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    grip:
        '<circle cx="5" cy="8" r="0.5"/><circle cx="12" cy="8" r="0.5"/><circle cx="19" cy="8" r="0.5"/><circle cx="5" cy="16" r="0.5"/><circle cx="12" cy="16" r="0.5"/><circle cx="19" cy="16" r="0.5"/>' +
        '<g stroke="none" fill="currentColor"><circle cx="5" cy="8" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="19" cy="8" r="1"/><circle cx="5" cy="16" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="19" cy="16" r="1"/></g>',
    settings: '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
};

const iconNameToFullSvg: Record<string, string | undefined> = {
    'column-arrow':
        '<svg xmlns="http://www.w3.org/2000/svg" class="ag-icon" fill="none" viewBox="0 0 32 32"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 26C0 28.2092 1.79086 30 4 30H14C16.2091 30 18 28.2092 18 26V15H25.8786L24.4394 16.4393C23.8536 17.0251 23.8536 17.9749 24.4394 18.5607C25.0252 19.1464 25.9748 19.1464 26.5606 18.5607L30.5606 14.5607C31.1464 13.9749 31.1464 13.0251 30.5606 12.4393L26.5606 8.43934C25.9748 7.85356 25.0252 7.85356 24.4394 8.43934C23.8536 9.02512 23.8536 9.97488 24.4394 10.5607L25.8786 12H18V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V26ZM14 5H10.5V12H15V6C15 5.44772 14.5523 5 14 5ZM4 5H7.5V12H3V6C3 5.44772 3.44772 5 4 5ZM10.5 15H15V26C15 26.5522 14.5523 27 14 27H10.5V15ZM4 27H7.5V15H3V26C3 26.5522 3.44772 27 4 27Z" fill="currentColor"/></svg>',
    'small-down':
        '<svg xmlns="http://www.w3.org/2000/svg" class="ag-icon" fill="black" stroke="none" viewBox="0 0 32 32"><path d="M7.334 10.667 16 21.334l8.667-10.667H7.334Z"/></svg>',
    'small-up':
        '<svg xmlns="http://www.w3.org/2000/svg" class="ag-icon" fill="black" stroke="none" viewBox="0 0 32 32"><path d="M7.334 21.333 16 10.666l8.667 10.667H7.334Z"/></svg>',
    'pinned-top':
        '<svg xmlns="http://www.w3.org/2000/svg" class="ag-icon" fill="none" viewBox="0 0 16 16"><path fill="currentColor" d="M12.53 3.72A.75.75 0 0 1 12 5H4a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 .53.22ZM3.269 10.744a.75.75 0 0 1 .2-.524l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06L8.75 8.56V14a.75.75 0 0 1-1.5 0V8.56l-2.72 2.72a.75.75 0 0 1-1.26-.536Z"/></svg>',
    'pinned-bottom':
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="ag-icon" viewBox="0 0 16 16"><path fill="currentColor" d="M3.47 12.28A.75.75 0 0 1 4 11h8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.53-.22ZM12.731 5.256a.75.75 0 0 1-.2.524l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V2a.75.75 0 0 1 1.5 0v5.44l2.72-2.72a.75.75 0 0 1 1.26.536Z"/></svg>',
    'un-pin':
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="ag-icon" viewBox="0 0 16 16"><path fill="currentColor" d="M8 11a.75.75 0 0 0-.75.75v3.333a.75.75 0 1 0 1.5 0V11.75A.75.75 0 0 0 8 11Z"/><path fill="currentColor" d="M13.11 1.436a.75.75 0 0 0-1.22-.872l-10 14a.75.75 0 1 0 1.22.872L5.207 12.5h7.376a.75.75 0 0 0 .75-.75v-1.174a2.08 2.08 0 0 0-1.153-1.863l-1.185-.599-.005-.002a.58.58 0 0 1-.323-.522V5.165a2.083 2.083 0 0 0 1.854-2.904l.589-.825Zm-3.943 5.52v.634a2.08 2.08 0 0 0 1.153 1.863l1.185.6.005.002a.58.58 0 0 1 .323.522V11H6.28l2.887-4.044ZM9.277 1H5.25a2.084 2.084 0 0 0-.083 4.165v1.676l1.5-2.132v-.292a.75.75 0 0 0-.75-.75H5.25a.584.584 0 0 1 0-1.167h2.972L9.277 1Z"/></svg>',
};

export const getQuartzIconsCss = (args: { strokeWidth?: number } = {}) => {
    let result = '';
    for (const iconName of [...Object.keys(iconNameToSvgFragment), ...Object.keys(iconNameToFullSvg)]) {
        const iconSvg = quartzIconSvg(iconName, args.strokeWidth);
        result += `.ag-icon-${iconName}::before { mask-image: url('data:image/svg+xml,${encodeURIComponent(iconSvg)}'); }\n`;
    }
    return result;
};

const quartzIconSvg = (name: string, strokeWidth = 1.5): string => {
    const fullSVG = iconNameToFullSvg[name];
    if (fullSVG) return fullSVG;
    const svgFragment = iconNameToSvgFragment[name];
    if (!svgFragment) throw new Error(`Missing icon data for ${name}`);
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" class="ag-icon" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="black" stroke-width="${strokeWidth}" viewBox="0 0 24 24">` +
        '<style>* { vector-effect: non-scaling-stroke; }</style>' +
        svgFragment +
        '</svg>'
    );
};

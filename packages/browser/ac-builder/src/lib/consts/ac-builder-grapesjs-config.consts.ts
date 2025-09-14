import { EditorConfig } from "grapesjs"

export const acBuilderGrapesJSConfig: EditorConfig = {
  height: '100%',
  fromElement: false,
  showOffsets: true,
  canvas: {
    styles: [],
    scripts: [],
  },
  assetManager: {
    embedAsBase64: true
  },
  blockManager: {
    appendTo: '.components-panel'
  },
  layerManager: {
    appendTo: '.layers-panel',
  },
  selectorManager: {
    appendTo: '.styles-panel',
    componentFirst: true
  },
  storageManager: false,
  styleManager: {
    appendTo: '.styles-panel',
    sectors: [{
      name: 'General',
      properties: [
        {
          extend: 'float',
          type: 'radio',
          default: 'none',
          options: [
            { id: '', value: 'none', className: 'fa fa-times' },
            { id: '', value: 'left', className: 'fa fa-align-left' },
            { id: '', value: 'right', className: 'fa fa-align-right' }
          ],
        },
        'display',
        { extend: 'position', type: 'select' },
        'top',
        'right',
        'left',
        'bottom',
      ],
    }, {
      name: 'Dimension',
      open: false,
      properties: [
        'width',
        {
          id: 'flex-width',
          type: 'integer',
          name: 'Width',
          units: ['px', '%'],
          property: 'flex-basis',
        },
        'height',
        'max-width',
        'min-height',
        'margin',
        'padding'
      ],
    }, {
      name: 'Typography',
      open: false,
      properties: [
        'font-family',
        'font-size',
        'font-weight',
        'letter-spacing',
        'color',
        'line-height',
        {
          extend: 'text-align',
          options: [
            { id: 'left', label: 'Left', className: 'fa fa-align-left' },
            { id: 'center', label: 'Center', className: 'fa fa-align-center' },
            { id: 'right', label: 'Right', className: 'fa fa-align-right' },
            { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
          ],
        },
        {
          property: 'text-decoration',
          type: 'radio',
          default: 'none',
          options: [
            { id: 'none', label: 'None', className: 'fa fa-times' },
            { id: 'underline', label: 'underline', className: 'fa fa-underline' },
            { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
          ],
        },
        'text-shadow'
      ],
    }, {
      name: 'Decorations',
      open: false,
      properties: [
        'opacity',
        'border-radius',
        'border',
        'box-shadow',
        'background', // { id: 'background-bg', property: 'background', type: 'bg' }
      ],
    }, {
      name: 'Extra',
      open: false,
      buildProps: [
        'transition',
        'perspective',
        'transform'
      ],
    }, {
      name: 'Flex',
      open: false,
      properties: [{
        name: 'Flex Container',
        property: 'display',
        type: 'select',
        defaults: 'block',
        list: [
          { id: '', value: 'block', name: 'Disable' },
          { id: '', value: 'flex', name: 'Enable' }
        ],
      }, {
        name: 'Flex Parent',
        property: 'label-parent-flex',
        type: 'integer',
      }, {
        name: 'Direction',
        property: 'flex-direction',
        type: 'radio',
        defaults: 'row',
        list: [{
          id: '',
          value: 'row',
          name: 'Row',
          className: 'icons-flex icon-dir-row',
          title: 'Row',
        }, {
          id: '',
          value: 'row-reverse',
          name: 'Row reverse',
          className: 'icons-flex icon-dir-row-rev',
          title: 'Row reverse',
        }, {
          id: '',
          value: 'column',
          name: 'Column',
          title: 'Column',
          className: 'icons-flex icon-dir-col',
        }, {
          id: '',
          value: 'column-reverse',
          name: 'Column reverse',
          title: 'Column reverse',
          className: 'icons-flex icon-dir-col-rev',
        }],
      }, {
        name: 'Justify',
        property: 'justify-content',
        type: 'radio',
        defaults: 'flex-start',
        list: [{
          id: '',
          value: 'flex-start',
          className: 'icons-flex icon-just-start',
          title: 'Start',
        }, {
          id: '',
          value: 'flex-end',
          title: 'End',
          className: 'icons-flex icon-just-end',
        }, {
          id: '',
          value: 'space-between',
          title: 'Space between',
          className: 'icons-flex icon-just-sp-bet',
        }, {
          id: '',
          value: 'space-around',
          title: 'Space around',
          className: 'icons-flex icon-just-sp-ar',
        }, {
          id: '',
          value: 'center',
          title: 'Center',
          className: 'icons-flex icon-just-sp-cent',
        }],
      }, {
        name: 'Align',
        property: 'align-items',
        type: 'radio',
        defaults: 'center',
        list: [{
          id: '',
          value: 'flex-start',
          title: 'Start',
          className: 'icons-flex icon-al-start',
        }, {
          id: '',
          value: 'flex-end',
          title: 'End',
          className: 'icons-flex icon-al-end',
        }, {
          id: '',
          value: 'stretch',
          title: 'Stretch',
          className: 'icons-flex icon-al-str',
        }, {
          id: '',
          value: 'center',
          title: 'Center',
          className: 'icons-flex icon-al-center',
        }],
      }, {
        name: 'Flex Children',
        property: 'label-parent-flex',
        type: 'integer',
      }, {
        name: 'Order',
        property: 'order',
        type: 'integer',
        defaults: '0',
        min: 0
      }, {
        name: 'Flex',
        property: 'flex',
        type: 'composite',
        properties: [{
          name: 'Grow',
          property: 'flex-grow',
          type: 'integer',
          defaults: '0',
          min: 0
        }, {
          name: 'Shrink',
          property: 'flex-shrink',
          type: 'integer',
          defaults: '0',
          min: 0
        }, {
          name: 'Basis',
          property: 'flex-basis',
          type: 'integer',
          units: ['px', '%', ''],
          unit: '',
          defaults: 'auto',
        }],
      }, {
        name: 'Align',
        property: 'align-self',
        type: 'radio',
        defaults: 'auto',
        list: [{
          id: '',
          value: 'auto',
          name: 'Auto',
        }, {
          id: '',
          value: 'flex-start',
          title: 'Start',
          className: 'icons-flex icon-al-start',
        }, {
          id: '',
          value: 'flex-end',
          title: 'End',
          className: 'icons-flex icon-al-end',
        }, {
          id: '',
          value: 'stretch',
          title: 'Stretch',
          className: 'icons-flex icon-al-str',
        }, {
          id: '',
          value: 'center',
          title: 'Center',
          className: 'icons-flex icon-al-center',
        }],
      }]
    }
    ],
  },
  traitManager: {
    appendTo: '.properties-panel'
  },
  plugins: [
    'gjs-blocks-basic',
    // 'grapesjs-plugin-forms',
    'grapesjs-plugin-export',
    'grapesjs-tabs',
    'grapesjs-custom-code',
    'grapesjs-touch',
    'grapesjs-parser-postcss',
    'grapesjs-tooltip',
    'grapesjs-tui-image-editor',
    'grapesjs-typed',
    // 'grapesjs-preset-webpage'
  ],
};

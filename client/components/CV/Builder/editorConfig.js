import cookies from 'axios/lib/helpers/cookies'

const styleManager = {
  appendTo: '#styles-container',
  sectors: [
    {
      name: 'General',
      buildProps: [
        'float',
        'display',
        'position',
        'top',
        'right',
        'left',
        'bottom',
      ],
      properties: [
        {
          name: 'Alignment',
          property: 'float',
          type: 'radio',
          defaults: 'none',
          list: [
            { value: 'none', className: 'fa fa-times' },
            { value: 'left', className: 'fa fa-align-left' },
            { value: 'right', className: 'fa fa-align-right' },
          ],
        },
        { property: 'position', type: 'select' },
      ],
    },
  ],
}

const editorConfig = (id) => ({
  container: '#editor',
  fromElement: true,
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 1,
    options: {
      remote: {
        urlLoad: `http://localhost:3001/resumes/${id}/load-content`,
        urlStore: `http://localhost:3001/resumes/${id}/save-content`,
      },
    },
    contentTypeJson: true,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': cookies.read('XSRF-TOKEN'),
    },
    id: 'my-',
    // urlStore: 'http://localhost:3001/resumes/1/save-content',
    // urlLoad: 'http://localhost:3001/resumes/1/load-content',
  },
  blockManager: {
    appendTo: '#blocks-container',
  },
  styleManager,
  panels: {
    defaults: [
      {
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
          {
            id: 'visibility',
            active: true,
            className: 'btn-toggle-borders',
            label: '<span class="mdi mdi-border-all"></span>',
            command: 'sw-visibility',
          },
        ],
      },
    ],
  },
  plugins: ['gjs-preset-newsletter'],
  pluginsOpts: {
    'gjs-preset-newsletter': {},
  },
})

export default editorConfig

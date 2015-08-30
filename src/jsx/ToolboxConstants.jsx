module.exports = {
  CELL_CHANGE:              'CELL_CHANGE',
  UPDATE_PAGE_TITLE:        'UPDATE_PAGE_TITLE',
  UPDATE_EDIT_MODE:         'UPDATE_EDIT_MODE',
  UPDATE_CONTAINER_MODE:    'UPDATE_CONTAINER_MODE',
  UPDATE_BUTTON_MODE:       'UPDATE_BUTTON_MODE',
  UPDATE_CELL_TYPE:         'UPDATE_CELL_TYPE',
  UPDATE_TYPE:              'UPDATE_TYPE',
  UPDATE_SIZE:              'UPDATE_SIZE',
  UPDATE_CLASS_NAME:        'UPDATE_CLASS_NAME',
  UPDATE_HTML:              'UPDATE_HTML',
  UPDATE_SELECT_SIZE:       'UPDATE_SELECT_SIZE',
  UPDATE_OPTIONS:           'UPDATE_OPTIONS',
  UPDATE_COLUMNS:           'UPDATE_COLUMNS',
  UPDATE_TABS:              'UPDATE_TABS',
  UPDATE_LEFT_BUTTONS:      'UPDATE_LEFT_BUTTONS',
  UPDATE_RIGHT_BUTTONS:     'UPDATE_RIGHT_BUTTONS',
  UPDATE_NAME:              'UPDATE_NAME',
  UPDATE_COLOR:             'UPDATE_COLOR',
  UPDATE_SHOW_LABEL:        'UPDATE_SHOW_LABEL',
  UPDATE_LABEL:             'UPDATE_LABEL',
  UPDATE_VALUE:             'UPDATE_VALUE',
  UPDATE_HREF:              'UPDATE_HREF',
  UPDATE_PRE_TEXT:          'UPDATE_PRE_TEXT',
  UPDATE_TABLE_CHECKBOX:    'UPDATE_TABLE_CHECKBOX',
  UPDATE_POST_TEXT:         'UPDATE_POST_TEXT',
  TOOLBOX_INITIALIZED:      'TOOLBOX_INITIALIZED',
  ADD_COMPONENTS:           'ADD_COMPONENTS',
  ALIGN_LEFT:               'left',
  ALIGN_CENTER:             'center',
  ALIGN_RIGHT:              'right'
};
module.exports.COMPONENTS = [];

// system components
var Empty =                             require('./components/items/system/empty');

// element components
var Header =                         require('./components/items/element/header');
var StaticTextLabeled =              require('./components/items/element/static_text');
var LinkLabeld =                     require('./components/items/element/link');
var FormTextLabeled =                require('./components/items/element/textbox');
var FormPasswordLabeled =            require('./components/items/element/password');
var FormSelectLabeled =              require('./components/items/element/select');
var FormSelectMultipleLabeled =      require('./components/items/element/select_multiple');
var FormCheckboxLabeled =            require('./components/items/element/checkbox');
var FormCheckboxInlineLabeled =      require('./components/items/element/checkbox_inline');
var FormRadioLabeled =               require('./components/items/element/radio');
var FormRadioInlineLabeled =         require('./components/items/element/radio_inline');
var FormTextareaLabeled =            require('./components/items/element/textarea');
var TableLabeled =                   require('./components/items/element/table');
var CalendarLabeled =                require('./components/items/element/calendar');
var MasterSearchBoxLabeled =         require('./components/items/element/master_search_box');

var Hr =                             require('./components/items/element/hr');
var Label =                          require('./components/items/element/label');
var Button =                         require('./components/items/element/button');
var Pagination =                     require('./components/items/element/pagination');
var Alert =                          require('./components/items/element/alert');
var Html =                           require('./components/items/element/html');

// container components
var Tab =                               require('./components/items/container/tab');
var Panel =                             require('./components/items/container/panel');

([
  {
    label: 'system',
    components: [
      { alias: 'empty',               constructor: Empty }
    ]
  },
  {
    label: 'container',
    components: [
      { alias: 'panel',               constructor: Panel},
      { alias: 'tab',                 constructor: Tab}
    ]
  },
  {
    label: 'element',
    components: [
      { alias: 'static_text',                     constructor: StaticTextLabeled},
      { alias: 'link',                            constructor: LinkLabeld},
      { alias: 'text',                            constructor: FormTextLabeled},
      { alias: 'password',                        constructor: FormPasswordLabeled},
      { alias: 'select',                          constructor: FormSelectLabeled},
      { alias: 'select_multiple',                 constructor: FormSelectMultipleLabeled},
      { alias: 'checkbox',                        constructor: FormCheckboxLabeled},
      { alias: 'checkbox_inline',                 constructor: FormCheckboxInlineLabeled},
      { alias: 'radio',                           constructor: FormRadioLabeled},
      { alias: 'radio_inline',                    constructor: FormRadioInlineLabeled},
      { alias: 'textarea',                        constructor: FormTextareaLabeled},
      { alias: 'table',                           constructor: TableLabeled},
      { alias: 'calendar',                        constructor: CalendarLabeled},
      { alias: 'master_saerch_box',               constructor: MasterSearchBoxLabeled},
      { alias: 'hr',                              constructor: Hr},
      { alias: 'button',                          constructor: Button},
      { alias: 'pagination',                      constructor: Pagination},
      { alias: 'label',                           constructor: Label},
      { alias: 'alert',                           constructor: Alert},
      { alias: 'html',                            constructor: Html}
    ]
  }
]).forEach(function(componentGroup) {
  module.exports.COMPONENTS.push(componentGroup);
});

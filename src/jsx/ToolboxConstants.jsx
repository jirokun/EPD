module.exports = {
  CELL_CHANGE:              'CELL_CHANGE',
  UPDATE_PAGE_TITLE:        'UPDATE_PAGE_TITLE',
  UPDATE_EDIT_MODE:         'UPDATE_EDIT_MODE',
  UPDATE_CONTAINER_MODE:    'UPDATE_CONTAINER_MODE',
  UPDATE_FOOTER_MODE:       'UPDATE_FOOTER_MODE',
  UPDATE_CELL_TYPE:         'UPDATE_CELL_TYPE',
  UPDATE_TYPE:              'UPDATE_TYPE',
  UPDATE_SIZE:              'UPDATE_SIZE',
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

// labeled components
var Header =                            require('./components/items/labeled/header');
var Link =                              require('./components/items/labeled/link');
var FormText =                          require('./components/items/labeled/textbox');
var FormPassword =                      require('./components/items/labeled/password');
var FormSelect =                        require('./components/items/labeled/select');
var FormSelectMultiple =                require('./components/items/labeled/select_multiple');
var FormCheckbox =                      require('./components/items/labeled/checkbox');
var FormCheckboxInline =                require('./components/items/labeled/checkbox_inline');
var FormRadio =                         require('./components/items/labeled/radio');
var FormRadioInline =                   require('./components/items/labeled/radio_inline');
var FormTextarea =                      require('./components/items/labeled/textarea');
var Table =                             require('./components/items/labeled/table');
var Calendar =                          require('./components/items/labeled/calendar');
var MasterSearchBox =                   require('./components/items/labeled/master_search_box');

// non-labeled components
var LinkNonLabeld =                              require('./components/items/non-labeled/link');
var FormTextNonLabeled =                require('./components/items/non-labeled/textbox');
var FormPasswordNonLabeled =            require('./components/items/non-labeled/password');
var FormSelectNonLabeled =              require('./components/items/non-labeled/select');
var FormSelectMultipleNonLabeled =      require('./components/items/non-labeled/select_multiple');
var FormCheckboxNonLabeled =            require('./components/items/non-labeled/checkbox');
var FormCheckboxInlineNonLabeled =      require('./components/items/non-labeled/checkbox_inline');
var FormRadioNonLabeled =               require('./components/items/non-labeled/radio');
var FormRadioInlineNonLabeled =         require('./components/items/non-labeled/radio_inline');
var FormTextareaNonLabeled =            require('./components/items/non-labeled/textarea');
var TableNonLabeled =                   require('./components/items/non-labeled/table');
var CalendarNonLabeled =                require('./components/items/non-labeled/calendar');
var MasterSearchBoxNonLabeled =         require('./components/items/non-labeled/master_search_box');

var Hr =                                require('./components/items/non-labeled/hr');
var Label =                             require('./components/items/non-labeled/label');
var Button =                            require('./components/items/non-labeled/button');
var Pagination =                        require('./components/items/non-labeled/pagination');
var Alert =                             require('./components/items/non-labeled/alert');
var Html =                              require('./components/items/non-labeled/html');

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
    label: 'labeled',
    components: [
      { alias: 'header',              constructor: Header},
      { alias: 'link',                constructor: Link},
      { alias: 'text',                constructor: FormText},
      { alias: 'password',            constructor: FormPassword},
      { alias: 'select',              constructor: FormSelect},
      { alias: 'select_multiple',     constructor: FormSelectMultiple},
      { alias: 'checkbox',            constructor: FormCheckbox},
      { alias: 'checkbox_inline',     constructor: FormCheckboxInline},
      { alias: 'radio',               constructor: FormRadio},
      { alias: 'radio_inline',        constructor: FormRadioInline},
      { alias: 'textarea',            constructor: FormTextarea},
      { alias: 'table',               constructor: Table},
      { alias: 'calendar',            constructor: Calendar},
      { alias: 'master_saerch_box',   constructor: MasterSearchBox}
    ]
  },
  {
    label: 'non-labeled',
    components: [
      { alias: 'link_non_labeled',                constructor: LinkNonLabeld},
      { alias: 'text_non_labeled',                constructor: FormTextNonLabeled},
      { alias: 'password_non_labeled',            constructor: FormPasswordNonLabeled},
      { alias: 'select_non_labeled',              constructor: FormSelectNonLabeled},
      { alias: 'select_multiple_non_labeled',     constructor: FormSelectMultipleNonLabeled},
      { alias: 'checkbox_non_labeled',            constructor: FormCheckboxNonLabeled},
      { alias: 'checkbox_inline_non_labeled',     constructor: FormCheckboxInlineNonLabeled},
      { alias: 'radio_non_labeled',               constructor: FormRadioNonLabeled},
      { alias: 'radio_inline_non_labeled',        constructor: FormRadioInlineNonLabeled},
      { alias: 'textarea_non_labeled',            constructor: FormTextareaNonLabeled},
      { alias: 'table_non_labeled',               constructor: TableNonLabeled},
      { alias: 'calendar_non_labeled',            constructor: CalendarNonLabeled},
      { alias: 'master_saerch_box_non_labeled',   constructor: MasterSearchBoxNonLabeled},

      { alias: 'hr',                  constructor: Hr},
      { alias: 'button',              constructor: Button},
      { alias: 'pagination',          constructor: Pagination},
      { alias: 'label',               constructor: Label},
      { alias: 'alert',               constructor: Alert},
      { alias: 'html',                constructor: Html}
    ]
  },
  {
    label: 'container',
    components: [
      { alias: 'panel',               constructor: Panel},
      { alias: 'tab',                 constructor: Tab}
    ]
  }
]).forEach(function(componentGroup) {
  module.exports.COMPONENTS.push(componentGroup);
});

module.exports = {
  CELL_CHANGE: 'CELL_CHANGE',
  UPDATE_PAGE_TITLE: 'UPDATE_PAGE_TITLE',
  UPDATE_EDIT_MODE: 'UPDATE_EDIT_MODE',
  UPDATE_TYPE: 'UPDATE_TYPE',
  UPDATE_SIZE: 'UPDATE_SIZE',
  UPDATE_HTML: 'UPDATE_HTML',
  UPDATE_SELECT_SIZE: 'UPDATE_SELECT_SIZE',
  UPDATE_OPTIONS: 'UPDATE_OPTIONS',
  UPDATE_COLUMNS: 'UPDATE_COLUMNS',
  UPDATE_TABS: 'UPDATE_TABS',
  UPDATE_LEFT_BUTTONS: 'UPDATE_LEFT_BUTTONS',
  UPDATE_RIGHT_BUTTONS: 'UPDATE_RIGHT_BUTTONS',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_COLOR: 'UPDATE_COLOR',
  UPDATE_SHOW_LABEL: 'UPDATE_SHOW_LABEL',
  UPDATE_LABEL: 'UPDATE_LABEL',
  TOOLBOX_INITIALIZED: 'TOOLBOX_INITIALIZED',
  ALIGN_LEFT: 'left',
  ALIGN_CENTER: 'center',
  ALIGN_RIGHT: 'right'
};
module.exports.COMPONENTS = []

var Empty = require('./components/items/empty');
var FormText = require('./components/items/textbox');
var FormPassword = require('./components/items/password');
var FormSelect = require('./components/items/select');
var FormSelectMultiple = require('./components/items/select_multiple');
var FormCheckbox = require('./components/items/checkbox');
var FormCheckboxInline = require('./components/items/checkbox_inline');
var FormRadio = require('./components/items/radio');
var FormRadioInline = require('./components/items/radio_inline');
var FormTextarea = require('./components/items/textarea');
var Table = require('./components/items/table');
var Hr = require('./components/items/hr');
var Label = require('./components/items/label');
var Button = require('./components/items/button');
var Pagination = require('./components/items/pagination');
var Alert = require('./components/items/alert');
var Calendar = require('./components/items/calendar');
var MasterSearchBox = require('./components/items/master_search_box');
var Html = require('./components/items/html');
var Tab = require('./components/items/tab');

module.exports.COMPONENTS = [
  { alias: 'empty', constructor: Empty },
  { alias: 'text', constructor: FormText},
  { alias: 'password', constructor: FormPassword},
  { alias: 'select', constructor: FormSelect},
  { alias: 'select_multiple', constructor: FormSelectMultiple},
  { alias: 'checkbox', constructor: FormCheckbox},
  { alias: 'checkbox_inline', constructor: FormCheckboxInline},
  { alias: 'radio', constructor: FormRadio},
  { alias: 'radio_inline', constructor: FormRadioInline},
  { alias: 'textarea', constructor: FormTextarea},
  { alias: 'table', constructor: Table},
  { alias: 'calendar', constructor: Calendar},
  { alias: 'master_saerch_box', constructor: MasterSearchBox},
  { alias: 'hr', constructor: Hr},
  { alias: 'button', constructor: Button},
  { alias: 'pagination', constructor: Pagination},
  { alias: 'label', constructor: Label},
  { alias: 'alert', constructor: Alert},
  { alias: 'html', constructor: Html},
  { alias: 'tab', constructor: Tab}
];


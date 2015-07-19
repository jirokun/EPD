var ToolboxConstants = require('../ToolboxConstants');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');
var EventEmitter = require('events').EventEmitter;
var PageConstants = require('../PageConstants');
var beautify_html = require('js-beautify').html;
var Util = require('../Util');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var CELL_CHANGE_EVENT = 'cellSelect';

var _pageTitle, _editMode = true, _showLabel = false, _dataid, _name, _label, _preHtml, _postHtml,
    _type, _size, _html, _rowSize, _options, _columns, _tabs, _align, _color, _leftButtons = [], _rows,
    _rightButtons = [], _containerMode = 'container-fluid', _cellType = 'col-md';

function updateType(type) {
  _type = type;
  var component = ToolboxStore.findComponentConstructor(_type);
  _size = Math.max(component.minSize, parseInt(_size, 10));
  if (component.editors.color) {
    var colorIndex = component.editors.color.indexOf(_color);
    if (colorIndex === -1) _color = component.editors.color[0];
  }
  if (_size > component.maxSize) _size = component.maxSize;
  if (typeof(_label) === 'undefined') _label = component.defaultLabel;
  updateHTML();
  ToolboxStore.emitChange();
}
function updateHTML() {
  var previewIframe = document.getElementById('preview');
  var d = previewIframe.contentWindow.document;
  var el = d.querySelector('div[data-dataid="' + _dataid + '"]').cloneNode(true);
  Util.removeSystemAttributes(el);
  var html = beautify_html(el.innerHTML, { indent_size: 2 });
  _html = html;
}
var ToolboxStore = merge(EventEmitter.prototype, {
  getPageTitle: function() { return _pageTitle; },
  isEditMode: function() { return _editMode; },
  getContainerMode: function() { return _containerMode; },
  getCellType: function() { return _cellType; },
  isShowLabel: function() { return _showLabel; },
  getDataid: function() { return _dataid; },
  getName: function() { return _name; },
  getLabel: function() { return _label; },
  getPreHtml: function() { return _preHtml; },
  getPostHtml: function() { return _postHtml; },
  getType: function() { return _type; },
  getAlign: function() { return _align; },
  getSize: function() { return _size; },
  getHtml: function() { return _html; },
  getColor: function() { return _color; },
  getRowSize: function() { return _rowSize; },
  getOptions: function() { return _options; },
  getColumns: function() { return _columns; },
  getTabs: function() { return _tabs; },
  getRows: function() { return _rows; },
  getLeftButtons: function() { return _leftButtons; },
  getRightButtons: function() { return _rightButtons; },
  getPageStore: function() {
      var previewIframe = document.getElementById('preview');
      var w = previewIframe.contentWindow;
      return w.PageStore;
  },
  load: function(json) {
    _leftButtons = json.leftButtons;
    _rightButtons = json.rightButtons;
    _pageTitle = json.pageTitle;
    this.emitChange();
  },
  findComponentConstructor: function(type) {
    for (var i = 0, len = ToolboxConstants.COMPONENTS.length; i < len; i++) {
      var group = ToolboxConstants.COMPONENTS[i];
      var label = group.label;
      var options = [];
      for (var j = 0, jlen = group.components.length; j < jlen; j++) {
        var component = group.components[j];
        if (component.alias === type) return component.constructor;
      }
    }
    return null;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },  
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitCellChange: function() {
    this.emit(CELL_CHANGE_EVENT);
  },  
  addCellChangeListener: function(callback) {
    this.on(CELL_CHANGE_EVENT, callback);
  },
  removeCellChangeListener: function(callback) {
    this.removeListener(CELL_CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
ToolboxDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case ToolboxConstants.UPDATE_PAGE_TITLE:
      _pageTitle = payload.pageTitle;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_EDIT_MODE:
      _editMode = payload.editMode;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_CONTAINER_MODE:
      _containerMode = payload.containerMode;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_CELL_TYPE:
      _cellType = payload.cellType;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_NAME:
      _name = payload.name;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_SHOW_LABEL:
      _showLabel = payload.showLabel;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_LABEL:
      _label = payload.label;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_PRE_TEXT:
      _preHtml = payload.preHtml;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_POST_TEXT:
      _postHtml = payload.postHtml;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_ALIGN:
      _align = payload.align;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_SIZE:
      _size = parseInt(payload.size, 10);
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_HTML:
      _html = payload.html;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_COLOR:
      _color = payload.color;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_OPTIONS:
      _options = payload.options;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_COLUMNS:
      _columns = payload.columns;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_LEFT_BUTTONS:
      _leftButtons= payload.leftButtons;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_RIGHT_BUTTONS:
      _rightButtons= payload.rightButtons;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_SELECT_SIZE:
      _rowSize = payload.rowSize;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_TABS:
      _tabs = payload.tabs;
      ToolboxStore.emitChange();
      break;
    case ToolboxConstants.UPDATE_TYPE:
      updateType(payload.type);
      break;
    case ToolboxConstants.TOOLBOX_INITIALIZED:
      var previewIframe = document.getElementById('preview');
      var w = previewIframe.contentWindow;
      w.PageDispatcher.register(function(payload) {
        switch(payload.actionType) {
          case PageConstants.COMPONENT_SELECT:
            var cell = payload.cell;
            _dataid = cell.dataid;
            _showLabel = cell.showLabel;
            _label = cell.label;
            _preHtml = cell.preHtml;
            _postHtml = cell.postHtml;
            _type = cell.type;
            _align = cell.align;
            _size = cell.size;
            _html = cell.html;
            _color = cell.color;
            _rowSize = cell.rowSize;
            _options = cell.options;
            _columns = cell.columns;
            _tabs = cell.tabs;
            _rows = cell.rows;
            ToolboxStore.emitCellChange();
            ToolboxStore.emitChange();
            break;
          default:
            break;
        }
      });
      break;
    default:
      return true;
  }
  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ToolboxStore;

var PageDispatcher = require('../dispatchers/PageDispatcher');
var EventEmitter = require('events').EventEmitter;
var PageConstants = require('../PageConstants');
var ToolboxConstants = require('../ToolboxConstants');
var merge = require('react/lib/merge');
var beautify_html = require('js-beautify').html;
var Util = require('../Util');

var PAGE_STORE_CHANGE = 'PAGE_STORE_CHANGE';
var ROWS_CHANGE= 'ROWS_CHANGE';
var PAGE_STATE_CHANGE = 'PAGE_STATE_CHANGE';

var _pageTitle, _editMode = true, _selectedCell = {}, _selectedElement, _rows = [], _sequence = 0,
  _copiedCell, _leftButtons = [], _rightButtons = [], _containerMode, _buttonMode, _cellType = 'col-md',
  _undoStack = [], _undoStackTimeout, _redoStack = [], _lastJSON;

function createEmpty() {
  return {
    type: 'empty',
    align: ToolboxConstants.ALIGN_LEFT,
    showLabel: true,
    size: 1,
    className: '',
    color: 'default',
    options: [],
    dataid: ++_sequence,
    rowSize: 3,
    columns: [],
    tabs: []
  };
}

// type to empty
function del() {
  if (!_selectedCell) return;
  var newCell = JSON.parse(JSON.stringify(_selectedCell));
  newCell.type = 'empty';
  newCell.size = 1;
  replaceCell(newCell);
  PageStore.emitChange();
}
function undo() {
  if (_undoStack.length === 0) return;
  var lastJSON = _undoStack.pop();
  var currentJSON = JSON.stringify(PageStore.toJSON());
  if (currentJSON === lastJSON) {
    if (_undoStack.length === 0) return;
    lastJSON = _undoStack.pop();
  }
  _redoStack.push(currentJSON);
  PageStore.load(JSON.parse(lastJSON), true);
}
function redo() {
  if (_redoStack.length === 0) return;
  var lastJSON = _redoStack.pop();
  var currentJSON = JSON.stringify(PageStore.toJSON());
  _undoStack.push(currentJSON);
  PageStore.load(JSON.parse(lastJSON), true);
}
function pushUndoStackInner() {
  var lastJSON = _undoStack[_undoStack.length - 1];
  var currentJSON = JSON.stringify(PageStore.toJSON());
  if (lastJSON === currentJSON) return;
  _undoStack.push(currentJSON);
  _redoStack = [];
}

function pushUndoStack() {
  if (_undoStackTimeout) clearTimeout(_undoStackTimeout);
  _undoStackTimeout = setTimeout(pushUndoStackInner, 500);
}

// for container. like tab
function findTargetRows(rows, dataid) {
  for (var i = 0, len = rows.length; i < len; i++) {
    var row = rows[i];
    for (var j = 0, jlen = row.length; j < jlen; j++) {
      var cell = row[j];
      if (cell.dataid === dataid) return rows;
      if (cell.tabs) {
        for (var k = 0, klen = cell.tabs.length; k < klen; k++) {
          var tab = cell.tabs[k];
          var ret = findTargetRows(tab.rows, dataid);
          if (ret !== null) return ret;
        }
      }
      if (cell.rows) {
        var ret = findTargetRows(cell.rows, dataid);
        if (ret !== null) return ret;
      }
    }
  }
  return null;
}
/**
 * find cell index (y, x) which has dataid
 */
function findIndex(dataid) {
  var rows = findTargetRows(_rows, dataid);
  for (var i = 0, len = rows.length; i < len; i++) {
    var row = rows[i];
    for (var j = 0, jlen = row.length; j < jlen; j++) {
      var cell = row[j];
      if (cell.dataid === dataid) return {y: i, x: j};
    }
  }
  throw 'unknown dataid: ' + dataid;
}
function deleteRow(dataid) {
  var rows = findTargetRows(_rows, dataid);
  var y = findIndex(dataid).y;
  rows.splice(y, 1);
  if (rows.length === 0) {
    var row = [];
    for (var j = 0; j < 12; j++) row.push(createEmpty());
    rows.push(row);
  }
}

function paste() {
  if (!_copiedCell || !_selectedCell) return;
  var dataid = _selectedCell.dataid;
  var freeSpace = PageStore.calcFreeSpace(dataid);
  if (freeSpace < _copiedCell.size) return;
  _copiedCell.dataid = dataid;
  replaceCell(_copiedCell);
  _selectedCell = _copiedCell;
  PageStore.emitChange();
}
function replaceCell(newCell) {
  var rows = findTargetRows(_rows, newCell.dataid);
  for (var i = 0, len = rows.length; i < len; i++) {
    var row = rows[i];
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      if (cell.dataid !== newCell.dataid) continue;
      if (cell.size < newCell.size) {
        row.splice(j + 1, newCell.size - cell.size);
      } else {
        for (var k = 0, klen = cell.size - newCell.size; k < klen; k++) {
          row.splice(j + 1, 0, createEmpty());
        }
      }
      cell.name = newCell.name;
      cell.showLabel = newCell.showLabel;
      cell.type = newCell.type;
      cell.label = newCell.label;
      cell.value = newCell.value;
      cell.href = newCell.href;
      cell.preHtml = newCell.preHtml;
      cell.tableCheckbox = newCell.tableCheckbox;
      cell.postHtml = newCell.postHtml;
      cell.align = newCell.align;
      cell.size = newCell.size;
      cell.className = newCell.className;
      cell.html = newCell.html;
      cell.color = newCell.color;
      cell.rowSize = newCell.rowSize;
      cell.options = newCell.options;
      cell.columns = newCell.columns;
      if (cell.type === 'tab') {
        cell.tabs = replaceDataid(newCell.tabs);
      }
      if (cell.type === 'panel') {
        if (!newCell.rows) {
          cell.rows = [createEmptyCells()];
        } else {
          cell.rows = replaceDataid(newCell.rows);
        }
      }
      break;
    }
  }
}
function is(type, obj) {
  var clas = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && clas === type;
}

function replaceDataid(obj, needLessClone) {
  if (!needLessClone) {
    obj = JSON.parse(JSON.stringify(obj));
  }
  if (Array.isArray(obj)) {
    obj.forEach(function(e) { replaceDataid(e, true);});
  } else {
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) continue;
      if (prop === 'dataid') {
        obj.dataid = ++_sequence;
      }
      if (is('Object', obj)) {
        replaceDataid(obj[prop], true);
      }
    }
  }
  return obj;
}

function createEmptyCells() {
  var row = [];
  for (var j = 0; j < 12; j++) row.push(createEmpty());
  return row;
}

/**
 * insert row.
 * ex. insertRow(0) insert row first.
 */
function insertRow(dataid, below) {
  if (_rows.length === 0) {
    _rows.push(createEmptyCells());
    return;
  }
  var rows = findTargetRows(_rows, dataid);
  var y = findIndex(dataid).y;
  if (below) y += 1;
  rows.splice(y, 0, createEmptyCells());
}

var PageStore = merge(EventEmitter.prototype, {
  getPageTitle: function() { return _pageTitle; },
  isEditMode: function() { return _editMode; },
  getContainerMode: function() { return _containerMode; },
  getButtonMode: function() { return _buttonMode; },
  getCellType: function() { return _cellType; },
  getSelectedCell: function() { return _selectedCell; },  
  getSelectedElement: function() { return _selectedElement; },
  getRows: function() { return _rows; },
  getLeftButtons: function() { return _leftButtons; },
  getRightButtons: function() { return _rightButtons; },
  getSelectedCellRowIndex: function() {
    return this.getRowIndex(_selectedCell.dataid);
  },
  createEmptyCells: createEmptyCells,
  toHTML: function() {
    var json = this.toJSON();
    var clearedJSON = this.toJSON();
    clearedJSON.rows = [createEmptyCells()];
    this.load(clearedJSON); // for default value
    this.load(json); // for default value
    var el = document.getElementById('container').cloneNode(true);
    Util.removeSystemAttributes(el);
    var html = '<!doctype html>\
<html class="no-js">\
  <head>\
    <meta charset="utf-8">\
    <title>EPD</title>\
    <meta name="viewport" content="width=device-width">\
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">\
    <style>\
      .docked-footer {\
        position: fixed;\
        bottom: 0;\
        left: 0;\
        width: 100%;\
        box-shadow: 10px 10px 10px 10px black;\
        background: #fff;\
        z-index: 5;\
      }\
    </style>\
  </head>\
  <body>\
    ' + el.outerHTML + '\
  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>\
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>\
  </body>\
</html>';
    html = beautify_html(html, { indent_size: 2 });
    return html;
  },
  toJSON: function() {
    return {
      rows: _rows,
      pageTitle: _pageTitle,
      leftButtons: _leftButtons,
      rightButtons: _rightButtons,
      containerMode: _containerMode,
      buttonMode: _buttonMode,
      cellType: _cellType,
      sequence: _sequence
    };
  },
  load: function(json, ignoreUndostack) {
    _rows = json.rows;
    _selectedCell = _rows[0][0];
    _pageTitle = json.pageTitle;
    _leftButtons = json.leftButtons;
    _rightButtons = json.rightButtons;
    _containerMode = json.containerMode;
    _buttonMode = json.buttonMode;
    _cellType = json.cellType;
    _sequence = json.sequence;
    this.emitChange(ignoreUndostack);
  },
  
  // if rows isn't specified, check _rows variables
  calcFreeSpace: function(dataid) {
    if (!dataid) return -1;
    var rows = findTargetRows(_rows, dataid);
    var componentSize;
    for (var i = 0, len = rows.length; i < len; i++) {
      var row = rows[i];
      var freeSpace = -1;
      for (var j = 0, jlen = row.length; j < jlen; j++) {
        var cell = row[j];
        if (freeSpace == -1) {
          if (cell.dataid === dataid) {
            freeSpace = cell.size;
          }
        } else {
          if (cell.type !== 'empty') return freeSpace;
          freeSpace++;
        }
      }
      if (freeSpace !== -1) return freeSpace;
    }
    return freeSpace;
  },
  emitChange: function(ignoreUndostack) {
    this.emit(PAGE_STORE_CHANGE);
    if (ignoreUndostack) return;
    pushUndoStack();
  },  
  addListener: function(callback) {
    this.on(PAGE_STORE_CHANGE, callback);
  },  
  removeListener: function(callback) {
    this.removeListener(PAGE_STORE_CHANGE, callback);
  }
});

// Register to handle all updates
PageDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case PageConstants.UPDATE_PAGE_INFO:
      _pageTitle = payload.info.pageTitle;
      _editMode = payload.info.editMode;
      _containerMode = payload.info.containerMode;
      _buttonMode = payload.info.buttonMode;
      _cellType = payload.info.cellType;
      PageStore.emitChange();
      break;
    case PageConstants.UPDATE_LEFT_BUTTONS:
      _leftButtons = payload.leftButtons;
      PageStore.emitChange();
      break;
    case PageConstants.UPDATE_RIGHT_BUTTONS:
      _rightButtons = payload.rightButtons;
      PageStore.emitChange();
      break;
    case PageConstants.COMPONENT_SELECT:
      _selectedCell = payload.cell;
      _selectedElement = payload.element;
      PageStore.emitChange();
      break;
    case PageConstants.INSERT_ROW:
      insertRow(payload.dataid, payload.below);
      PageStore.emitChange();
      break;
    case PageConstants.DELETE_ROW:
      deleteRow(payload.dataid);
      PageStore.emitChange();
      break;
    case PageConstants.UPDATE_VALUE:
      var cell = payload.cell;
      cell.value = payload.value;
      replaceCell(cell);
      PageStore.emitChange();
      break;
    case PageConstants.UPDATE_CELL:
      replaceCell(payload.cell);
      PageStore.emitChange();
      break;
    case PageConstants.PASTE:
      paste();
      break;
    case PageConstants.COPY:
      _copiedCell = JSON.parse(JSON.stringify(_selectedCell));
      break;
    case PageConstants.UNDO:
      undo();
      break;
    case PageConstants.REDO:
      redo();
      break;
    case PageConstants.DELETE:
      del();
      break;
    default:
      return true;
  }
  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageStore;

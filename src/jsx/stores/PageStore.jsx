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
  _copiedCell, _leftButtons, _rightButtons;

function createEmpty() {
  return {
    type: 'empty',
    align: ToolboxConstants.ALIGN_LEFT,
    showLabel: true,
    size: 1,
    color: 'default',
    options: [],
    dataid: ++_sequence,
    rowSize: 3,
    columns: [],
    tabs: []
  };
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
  throw 'unknwon dataid: ' + dataid;
}
function deleteRow(dataid) {
  var y = findIndex(dataid).y;
  var rows = [];
  for (var i = 0, len = _rows.length; i < len; i++) {
    if (y === i) continue;
    rows.push(_rows[i]);
  }
  if (rows.length === 0) {
    var row = [];
    for (var j = 0; j < 12; j++) row.push(createEmpty());
    rows.push(row);
  }
  _rows = rows;
}

function paste(newCell) {
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
      cell.align = newCell.align;
      cell.size = newCell.size;
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
  getSelectedCell: function() { return _selectedCell; },  
  getSelectedElement: function() { return _selectedElement; },
  getRows: function() { return _rows; },
  getLeftButtons: function() { return _leftButtons; },
  getRightButtons: function() { return _rightButtons; },
  getSelectedCellRowIndex: function() {
    return this.getRowIndex(_selectedCell.dataid);
  },
  createEmptyCells: createEmptyCells,
  toJSON: function() {
    return {
      rows: _rows,
      pageTitle: _pageTitle,
      leftButtons: _leftButtons,
      rightButtons: _rightButtons,
      sequence: _sequence
    };
  },
  load: function(json) {
    _rows = json.rows;
    _pageTitle = json.pageTitle;
    _leftButtons = json.leftButtons;
    _rightButtons = json.rightButtons;
    _sequence = json.sequence;
    this.emitChange();
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
  emitChange: function() {
    this.emit(PAGE_STORE_CHANGE);
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
    case PageConstants.UPDATE_PAGE_TITLE:
      _pageTitle = payload.pageTitle;
      PageStore.emitChange();
      break;
    case PageConstants.UPDATE_EDIT_MODE:
      _editMode = payload.editMode;
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
    default:
      return true;
  }
  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageStore;

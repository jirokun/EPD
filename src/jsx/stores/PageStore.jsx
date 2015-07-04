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

function _nextSequence() {
  return ++_sequence;
}
function createEmpty() {
  return {
    type: 'empty',
    align: ToolboxConstants.ALIGN_LEFT,
    showLabel: true,
    size: 1,
    color: 'default',
    options: [],
    dataid: _nextSequence(),
    rowSize: 3,
    columns: []
  };
}

/**
 * find cell index (y, x) which has dataid
 */
function findIndex(dataid) {
  for (var i = 0, len = _rows.length; i < len; i++) {
    var row = _rows[i];
    for (var j = 0, jlen = row.length; j < jlen; j++) {
      var cell = row[j];
      if (cell.dataid === dataid) return {y: i, x: j};
    }
  }
  return null;
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
  var rows = _rows;
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
      break;
    }
  }
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
  var rows = [];
  if (_rows.length === 0) {
    rows.push(createEmptyCells());
    _rows = rows;
    return;
  }
  var y = findIndex(dataid).y;
  if (below) y += 1;
  if (_rows.length === y) {
    for (var i = 0, len = _rows.length; i < len; i++) {
      rows.push(_rows[i]);
    }
    rows.push(createEmptyCells());
    _rows = rows;
    return;
  }
  for (var i = 0, len = _rows.length; i < len; i++) {
    if (i === y) {
      rows.push(createEmptyCells());
    }
    rows.push(_rows[i]);
  }
  _rows = rows;
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
  calcFreeSpace: function(dataid) {
    var componentSize;
    for (var i = 0, len = _rows.length; i < len; i++) {
      var row = _rows[i];
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

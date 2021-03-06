var PageDispatcher = require('../dispatchers/PageDispatcher');
var PageConstants = require('../PageConstants');

var PageAction = {
  undo: function() {
    PageDispatcher.dispatch({
      actionType: PageConstants.UNDO
    });
  },
  redo: function() {
    PageDispatcher.dispatch({
      actionType: PageConstants.REDO
    });
  },
  del: function() {
    PageDispatcher.dispatch({
      actionType: PageConstants.DELETE
    });
  },
  updateLabel: function(cell, label) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_LABEL,
      cell: cell,
      label: label
    });
  },
  updateValue: function(cell, value) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_VALUE,
      cell: cell,
      value: value
    });
  },
  updateHtml: function(cell, html) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_HTML,
      cell: cell,
      html: html 
    });
  },
  updatePageInfo: function(info) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_PAGE_INFO,
      info: info 
    });
  },
  updateLeftButtons: function(buttons) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_LEFT_BUTTONS,
      leftButtons:buttons 
    });
  },
  updateRightButtons: function(buttons) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_RIGHT_BUTTONS,
      rightButtons:buttons 
    });
  },
  componentSelect: function(cell, element) {
    PageDispatcher.dispatch({
      actionType: PageConstants.COMPONENT_SELECT,
      cell: cell,
      element: element
    });
  },
  insertRow: function(dataid, below) {
    PageDispatcher.dispatch({
      actionType: PageConstants.INSERT_ROW,
      dataid: dataid,
      below: below
    });
  },
  deleteRow: function(dataid) {
    PageDispatcher.dispatch({
      actionType: PageConstants.DELETE_ROW,
      dataid: dataid
    });
  },
  updateCell: function(cell) {
    PageDispatcher.dispatch({
      actionType: PageConstants.UPDATE_CELL,
      cell: cell
    });
  },
  paste: function() {
    PageDispatcher.dispatch({
      actionType: PageConstants.PASTE
    });
  },
  copy: function() {
    PageDispatcher.dispatch({
      actionType: PageConstants.COPY
    });
  }
};

module.exports = PageAction;

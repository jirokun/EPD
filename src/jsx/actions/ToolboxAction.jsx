var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');
var ToolboxConstants = require('../ToolboxConstants');

var ToolboxAction = {
  updatePageTitle: function(pageTitle) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_PAGE_TITLE,
      pageTitle: pageTitle
    });
  },
  updateEditMode: function(editMode) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_EDIT_MODE,
      editMode: editMode
    });
  },
  updateContainerMode: function(mode) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_CONTAINER_MODE,
      containerMode: mode 
    });
  },
  updateCellType: function(type) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_CELL_TYPE,
      cellType: type
    });
  },
  updateType: function(type) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_TYPE,
      type:type 
    });
  },
  updateName: function(name) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_NAME,
      name: name
    });
  },
  updateShowLabel: function(showLabel) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_SHOW_LABEL,
      showLabel: showLabel
    });
  },
  updateLabel: function(label) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_LABEL,
      label: label
    });
  },
  updatePreHtml: function(preHtml) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_PRE_TEXT,
      preHtml: preHtml
    });
  },
  updatePostHtml: function(postHtml) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_POST_TEXT,
      postHtml: postHtml
    });
  },
  updateAlign: function(align) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_ALIGN,
      align:align 
    });
  },
  updateSize: function(size) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_SIZE,
      size: size
    });
  },
  updateHtml: function(html) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_HTML,
      html: html 
    });
  },
  updateColor: function(color) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_COLOR,
      color: color
    });
  },
  updateOptions: function(options) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_OPTIONS,
      options: options 
    });
  },
  updateColumns: function(columns) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_COLUMNS,
      columns: columns 
    });
  },
  updateTabs: function(tabs) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_TABS,
      tabs: tabs 
    });
  },
  updateLeftButtons: function(buttons) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_LEFT_BUTTONS,
      leftButtons: buttons 
    });
  },
  updateRightButtons: function(buttons) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_RIGHT_BUTTONS,
      rightButtons: buttons 
    });
  },
  updateRowSize: function(rowSize) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.UPDATE_SELECT_SIZE,
      rowSize: rowSize
    });
  },
  changeCell: function(cell) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.CELL_CHANGE,
      cell:cell 
    });
  },
  addComponents: function(components) {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.ADD_COMPONENTS,
      components: components
    });
  },
  initializeToolbox: function() {
    ToolboxDispatcher.dispatch({
      actionType: ToolboxConstants.TOOLBOX_INITIALIZED
    });
  }
};

module.exports = ToolboxAction;

var React = require('react');
var OptionEditor = require('./option_editor');
var RowSizeEditor = require('./row_size_editor');
var TableEditor = require('./table_editor');
var TabEditor = require('./tab_editor');
var ButtonEditor = require('./button_editor');
var ToolboxAction = require('../actions/ToolboxAction');
var ToolboxStore = require('../stores/ToolboxStore');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');
var ToolboxConstants = require('../ToolboxConstants');
var beautify_html = require('js-beautify').html;
var Util = require('../Util');

var ToolboxTabPage = React.createClass({
  getInitialState: function() {
    return {
      editMode: true,
      pageTitle: '',
      interfaceText: '',
      containerMode: 'container-fluid',
      cellType: 'col-md'
    };
  },
  componentDidMount: function() {
    ToolboxStore.addChangeListener(this._onToolboxStoreChange);
  },
  getPageAction: function() {
    var previewIframe = document.getElementById(this.props.preview);
    var w = previewIframe.contentWindow;
    return w.PageAction;
  },
  getPageDispatcher: function() {
    var previewIframe = document.getElementById(this.props.preview);
    var w = previewIframe.contentWindow;
    return w.PageDispatcher;
  },
  _onToolboxStoreChange: function() {
    var newState = {
      pageTitle: ToolboxStore.getPageTitle(),
      editMode: ToolboxStore.isEditMode(),
      containerMode: ToolboxStore.getContainerMode(),
      cellType: ToolboxStore.getCellType()
    };
    this.setState(newState);
    if (this.getPageDispatcher().isDispatching()) return;
    var PageAction = this.getPageAction();
    PageAction.updatePageInfo(newState);
  },

  _onClickExport: function(e) {
    var PageStore = ToolboxStore.getPageStore();
    var json = PageStore.toJSON();
    this.setState({interfaceText: JSON.stringify(json, null, '  ')});
  },
  _onClickImport: function(e) {
    var PageStore = ToolboxStore.getPageStore();
    try {
      var json = JSON.parse(this.state.interfaceText);
      ToolboxStore.load(json);
      PageStore.load(json);
    } catch(e) {
      console.error(e);
    }
  },
  _onClickHTML: function(e) {
    var PageStore = ToolboxStore.getPageStore();
    var html = PageStore.toHTML();
    this.setState({interfaceText: html});
  },
  _changePageTitle: function(e) {
    ToolboxAction.updatePageTitle(e.target.value);
  },
  _onChangeEditMode: function(e) {
    ToolboxAction.updateEditMode(e.target.checked);
  },
  _onChangeInterfaceText: function(e) {
    this.setState({interfaceText: e.target.value});
  },
  _onChangeContainerMode: function(e) {
    ToolboxAction.updateContainerMode(e.target.value);
  },
  _onChangeCellType: function(e) {
    ToolboxAction.updateCellType(e.target.value);
  },
  _renderExports: function() {
    if (window.navigator.userAgent.toLowerCase().indexOf('electron') !== -1) return null;
    return (
      <div>
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={this._onClickExport}>Export</button>
          <button type="button" className="btn btn-danger" onClick={this._onClickImport}>Import</button>
          <button type="button" className="btn btn-success" onClick={this._onClickHTML}>HTML</button>
        </div>
        <textarea className="form-control" value={this.state.interfaceText} onChange={this._onChangeInterfaceText}/>
      </div>
    );
  },
  render: function() {
    return  (
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={this.state.pageTitle} onChange={this._changePageTitle}/>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={this.state.editMode} onChange={this._onChangeEditMode}/> Edit Mode
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="container-mode">Container Mode</label>
          <select className="form-control" id="container-mode" value={this.state.contaierMode} onChange={this._onChangeContainerMode}>
            <option value="container-fluid">container-fluid</option>
            <option value="container">container</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cell-type">Cell Type</label>
          <select className="form-control" id="cell-type" value={this.state.cellType} onChange={this._onChangeCellType}>
            <option value="col-xs">col-xs</option>
            <option value="col-sm">col-sm</option>
            <option value="col-md">col-md</option>
            <option value="col-lg">col-lg</option>
          </select>
        </div>
        {this._renderExports()}
      </form>
    );
  }
});

module.exports = ToolboxTabPage;

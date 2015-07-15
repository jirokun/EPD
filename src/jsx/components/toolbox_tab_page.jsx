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
      interfaceText: ''
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
      editMode: ToolboxStore.isEditMode()
    };
    this.setState(newState);
    console.log(newState);
    if (this.getPageDispatcher().isDispatching()) return;
    var PageAction = this.getPageAction();
    PageAction.updateEditMode(newState.editMode);
    PageAction.updatePageTitle(newState.pageTitle);
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
      PageStore.load(json);
      ToolboxStore.load(json);
    } catch(e) {
      console.error(e);
    }
  },
  _onClickHTML: function(e) {
    var previewIframe = document.getElementById(this.props.preview);
    var el = previewIframe.contentWindow.document.getElementById('container').cloneNode(true);
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
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={this._onClickExport}>Export</button>
          <button type="button" className="btn btn-danger" onClick={this._onClickImport}>Import</button>
          <button type="button" className="btn btn-success" onClick={this._onClickHTML}>HTML</button>
        </div>
        <textarea className="form-control" value={this.state.interfaceText} onChange={this._onChangeInterfaceText}/>
      </form>
    );
  }
});

module.exports = ToolboxTabPage;

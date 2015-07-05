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
require('bootstrap');

var Toolbox = React.createClass({
  mixins: [],

  getInitialState: function() {
    return {
      editMode: true,
      pageTitle: '',
      dataid: null,
      name: '',
      label: '',
      type: 'empty',
      size: 12,
      interfaceText: '',
      options: [],
      columns: [],
      tabs: [],
      leftButtons: [],
      rightButtons: []
    };
  },
  componentDidMount: function() {
    var PageStore = ToolboxStore.getPageStore();
    ToolboxStore.addChangeListener(this._onToolboxStoreChange);
    ToolboxStore.addCellChangeListener(this._onCellChange);
    ToolboxAction.initializeToolbox();
  },
  componentWillUpdate: function(nextProps, nextState) {
  },
  componentDidUpdate: function(prevProps, prevState) {
  },
  componentWillUnmount: function() {
    Toolbox.removeChangeListener(this._onToolboxStoreChange);
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
  _onCellChange: function() {
    $(this.refs['component-tab-link'].getDOMNode()).tab('show');
  },
  _onToolboxStoreChange: function() {
    var newState = {
      pageTitle: ToolboxStore.getPageTitle(),
      editMode: ToolboxStore.isEditMode(),
      dataid: ToolboxStore.getDataid(),
      name: ToolboxStore.getName(),
      showLabel: ToolboxStore.isShowLabel(),
      label: ToolboxStore.getLabel(),
      preText: ToolboxStore.getPreText(),
      postText: ToolboxStore.getPostText(),
      type: ToolboxStore.getType(),
      align: ToolboxStore.getAlign(),
      size: ToolboxStore.getSize(),
      html: ToolboxStore.getHtml(),
      color: ToolboxStore.getColor(),
      rowSize: ToolboxStore.getRowSize(),
      options: ToolboxStore.getOptions(),
      columns: ToolboxStore.getColumns(),
      tabs: ToolboxStore.getTabs(),
      leftButtons: ToolboxStore.getLeftButtons(),
      rightButtons: ToolboxStore.getRightButtons()
    };
    this.setState(newState);
    if (this.getPageDispatcher().isDispatching()) return;
    var PageAction = this.getPageAction();
    PageAction.updateCell(newState);
    PageAction.updateEditMode(newState.editMode);
    PageAction.updateLeftButtons(newState.leftButtons);
    PageAction.updateRightButtons(newState.rightButtons);
    PageAction.updatePageTitle(newState.pageTitle);
  },
  _calcAvailableTypes: function() {
    var options = [];
    var PageStore = ToolboxStore.getPageStore();
    var freeSpace = PageStore.calcFreeSpace(this.state.dataid);
    for (var i = 0, len = ToolboxConstants.COMPONENTS.length; i < len; i++) {
      var component = ToolboxConstants.COMPONENTS[i];
      var disabled = component.constructor.minSize > freeSpace
      options.push(<option disabled={disabled}>{component.alias}</option>);
    }
    return options;
  },
  _changePageTitle: function(e) {
    ToolboxAction.updatePageTitle(e.target.value);
  },
  _changeName: function(e) {
    ToolboxAction.updateName(e.target.value);
  },
  _changeShowLabel: function(e) {
    ToolboxAction.updateShowLabel(e.target.checked);
  },
  _changeLabel: function(e) {
    ToolboxAction.updateLabel(e.target.value);
  },
  _changePreText: function(e) {
    ToolboxAction.updatePreText(e.target.value);
  },
  _changePostText: function(e) {
    ToolboxAction.updatePostText(e.target.value);
  },
  _changeType: function(e) {
    ToolboxAction.updateType(e.target.value);
  },
  _changeAlign: function(e) {
    ToolboxAction.updateAlign(e.target.value);
  },
  _changeSize: function(e) {
    ToolboxAction.updateSize(e.target.value);
  },
  _changeHtml: function(e) {
    ToolboxAction.updateHtml(e.target.value);
  },
  _changeColor: function(e) {
    ToolboxAction.updateColor(e.target.value);
  },
  _changeSelectDataid: function(dataid) {
    this.setState({dataid: dataid});
  },
  _onSubmit: function(e) {
    e.preventDefault();
  },
  _typeEditor: function() {
    return (
      <div className="form-group">
        <label htmlFor="type">Component Type</label>
        <select ref="componentType" className="form-control" id="type" value={this.state.type} onChange={this._changeType}>
          {this._calcAvailableTypes()}
        </select>
      </div>
    );
  },
  _nameEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.name) return null;
    return (
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input ref="componentLabel" type="text" className="form-control" id="name" value={this.state.name} onChange={this._changeName}/>
      </div>
    );
  },

  _tableEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.table) return null;
    return <TableEditor type={this.state.type} columns={this.state.columns}/>;
  },

  _showLabelEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || component.editors.forceShowLabel || !component.editors.label) return null;
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" checked={this.state.showLabel} onChange={this._changeShowLabel} disabled={this.state.size < 3} /> Show Label
        </label>
      </div>
    );
  },
  _labelEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.label) return null;
    if (!component.editors.forceShowLabel && !this.state.showLabel) return null;
    return (
      <div className="form-group">
        <label htmlFor="label">Label</label>
        <input ref="componentLabel" type="text" className="form-control" id="label" value={this.state.label} onChange={this._changeLabel}/>
      </div>
    );
  },
  _preTextEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.preText) return null;
    return (
      <div className="form-group">
        <label htmlFor="label">PreText</label>
        <input type="text" className="form-control" value={this.state.preText} onChange={this._changePreText}/>
      </div>
    );
  },
  _postTextEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.postText) return null;
    return (
      <div className="form-group">
        <label htmlFor="label">PostText</label>
        <input type="text" className="form-control" value={this.state.postText} onChange={this._changePostText}/>
      </div>
    );
  },

  _alignEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.align) return null;
    var _this = this;
    var radios = [
      ToolboxConstants.ALIGN_LEFT,
      ToolboxConstants.ALIGN_CENTER,
      ToolboxConstants.ALIGN_RIGHT
    ].map(function(align) {
      return (
        <label className="radio-inline">
          <input
            type="radio"
            name="align"
            value={align}
            checked={_this.state.align === align}
            onChange={_this._changeAlign}/> {align}
        </label>
      );
    });
    return (
      <div className="form-group">
        <label>Align</label>
        <div>
          {radios}
        </div>
      </div>
    );
  },
  _colorEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.color) return null;
    var options = [];
    for (var i = 0, len = component.editors.color.length; i < len; i++) {
      options.push(<option>{component.editors.color[i]}</option>);
    }
    return (
      <div className="form-group">
        <label htmlFor="color">Color</label>
        <select id="color" className="form-control" value={this.state.color} onChange={this._changeColor}>
          {options}
        </select>
      </div>
    );
  },
  _sizeEditor: function() {
    var options = [];
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.size) return null;
    if (component) {
      var PageStore = ToolboxStore.getPageStore();
      var freeSpace = PageStore.calcFreeSpace(this.state.dataid);
      for (var i = component.minSize; i <= freeSpace; i++) {
        options.push(<option>{i}</option>);
      }
    }
    return (
      <div className="form-group">
        <label htmlFor="size">Size</label>
        <select ref="comopnentSize" className="form-control" id="size" value={this.state.size} onChange={this._changeSize}>{options}</select>
      </div>
    );
  },
  _optionEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.option) return null;
    return <OptionEditor type={this.state.type} options={this.state.options}/>;
  },
  _htmlEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.html) return null;
    return (
      <div className="form-group">
        <label htmlFor="size">HTML</label>
        <textarea className="form-control" value={this.state.html} onChange={this._changeHtml}/>
      </div>
    );
  },
  _tabEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.tab) return null;
    return <TabEditor type={this.state.type} tabs={this.state.tabs}/>;
  },
  _rowSizeEditor: function() {
    var component = ToolboxStore.findComponentConstructor(this.state.type);
    if (!component || !component.editors.rowSize) return null;
    return <RowSizeEditor type={this.state.type} rowSize={this.state.rowSize}/>;
  },
  _onChangeEditMode: function(e) {
    ToolboxAction.updateEditMode(e.target.checked);
  },
  _onChangeInterfaceText: function(e) {
    this.setState({interfaceText: e.target.value});
  },
  _onClickExport: function(e) {
    var PageStore = ToolboxStore.getPageStore();
    var json = PageStore.toJSON();
    this.setState({interfaceText: JSON.stringify(json, null, '  ')});
  },
  _onClickImport: function(e) {
    var PageStore = ToolboxStore.getPageStore();
    try {
      PageStore.load(JSON.parse(this.state.interfaceText));
      ToolboxStore.load(JSON.parse(this.state.interfaceText));
    } catch(e) {
    }
  },
  _onLeftButtonChange: function(hot) {
    if (ToolboxDispatcher.isDispatching()) return;
    var buttons = hot.getData().map(function(arr) { return {label: arr[0], type: arr[1] }; }).filter(function(obj) { return obj.label != '' });
    buttons.splice(buttons.length - 1, 1);
    ToolboxAction.updateLeftButtons(buttons);
  },
  _onRightButtonChange: function(hot) {
    if (ToolboxDispatcher.isDispatching()) return;
    var buttons = hot.getData().map(function(arr) { return {label: arr[0], type: arr[1] }; }).filter(function(obj) { return obj.label != '' });
    buttons.splice(buttons.length - 1, 1);
    ToolboxAction.updateRightButtons(buttons);
  },
  _onClickHTML: function(e) {
    var previewIframe = document.getElementById(this.props.preview);
    var el = previewIframe.contentWindow.document.getElementById('container').cloneNode(true);
    Util.removeSystemAttributes(el);
    var html = beautify_html(el.outerHTML, { indent_size: 2 });
    this.setState({interfaceText: html});
  },
  render: function() {
    return (
<div className="toolbox">
  <ul className="nav nav-tabs" role="tablist">
    <li className="active"><a href="#page" data-toggle="tab" ref="page-tab-link">Page</a></li>
    <li><a href="#component" data-toggle="tab" ref="component-tab-link">Component</a></li>
    <li><a href="#buttons" data-toggle="tab" ref="buttons-tab-link">Buttons</a></li>
  </ul>
  <div className="tab-content">
    <div className="tab-pane active" id="page">
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
    </div>
    <div className="tab-pane" id="component">
      <form onSubmit={this._onSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <p className="form-control-static">{this.state.dataid}</p>
        </div>
        { this._typeEditor() }
        { this._nameEditor() }
        { this._showLabelEditor() }
        { this._labelEditor() }
        { this._preTextEditor() }
        { this._postTextEditor() }
        { this._sizeEditor() }
        { this._alignEditor() }
        { this._colorEditor() }
        { this._rowSizeEditor() }
        { this._optionEditor() }
        { this._htmlEditor() }
        { this._tabEditor() }
        { this._tableEditor() }
      </form>
    </div>
    <div className="tab-pane" id="buttons">
      <label>Left buttons</label>
      <ButtonEditor onChange={this._onLeftButtonChange} buttons={this.state.leftButtons}/>
      <label>Right buttons</label>
      <ButtonEditor onChange={this._onRightButtonChange} buttons={this.state.rightButtons}/>
    </div>
  </div>
</div>)
  }
});

module.exports = Toolbox;

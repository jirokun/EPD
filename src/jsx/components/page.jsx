var React = require('react');
var Grid = require('./grid');
var EventEmitter2 = require('eventemitter2');
var PageAction = require('../actions/PageAction');
var PageStore = require('../stores/PageStore');
var PageDispatcher = require('../dispatchers/PageDispatcher');

var Page = React.createClass({
  getInitialState: function() {
    return {
      editMode: true,
      pageTitle: "",
      containerMode: 'container-fluid',
      selectedDataid: null,
      rows: [],
      buttons: []
    };
  },
  componentWillMount: function() {
    this._emitter = new EventEmitter2();
    this._sequence = 0;
  },
  componentDidMount: function() {
    PageStore.addListener(this._onPageStoreChange);
    // for access from Toolbox
    window.PageAction = PageAction;
    window.PageStore = PageStore;
    window.PageDispatcher = PageDispatcher;
    document.addEventListener('keydown', function(e) {
      // inputやselectに入力された場合にはこれらの処理は行わない
      if (e.target.tagName.toLowerCase() !== 'body') return;
      if (e.keyCode == 67) PageAction.copy();
      else if (e.keyCode == 46) PageAction.del();
      else if (e.keyCode == 86) PageAction.paste();
      else if (e.keyCode == 90) PageAction.undo();
      else if (e.keyCode == 89) PageAction.redo();
    }, false);
  },
  _leftButtons: function() {
    var buttons = PageStore.getLeftButtons();
    if (!buttons) return null;
    var style = { float: 'left', marginRight: '5px' };
    var els = [];
    for (var i = 0, len = buttons.length; i < len; i++) {
      var btn = buttons[i];
      var type = btn.type ? btn.type : 'default';
      var className = 'btn btn-' + type;
      if (!btn.label || btn.label == '') continue;
      els.push(<button className={className} style={style}>{btn.label}</button>);
    }
    return els;
  },
  _rightButtons: function() {
    var buttons = PageStore.getRightButtons();
    if (!buttons) return null;
    var style = { float: 'right', marginLeft: '5px' };
    var els = [];
    for (var i = 0, len = buttons.length; i < len; i++) {
      var btn = buttons[i];
      var type = btn.type ? btn.type : 'default';
      var className = 'btn btn-' + type;
      if (!btn.label || btn.label == '') continue;
      els.push(<button className={className} style={style}>{btn.label}</button>);
    }
    return els;
  },
  _onPageStoreChange: function() {
    this.setState({
      selectedDataid: PageStore.getSelectedCell().dataid,
      rows: PageStore.getRows(),
      editMode: PageStore.isEditMode(),
      pageTitle: PageStore.getPageTitle(),
      containerMode: PageStore.getContainerMode()
    });
  },
  render: function() {
    var containerClassName = "form-horizontal " + this.state.containerMode;
    var className = this.state.editMode ? 'edit-mode' : '';
    return (
<div className={containerClassName}>
  <div ref="container" className={className}>
    <h1>{this.state.pageTitle}</h1>
    <Grid rows={this.state.rows} selectedDataid={this.state.selectedDataid}/>
  </div>
  <div className="docked-footer">
    <div className={this.state.containerMode}>
      {this._leftButtons()}
      {this._rightButtons()}
    </div>
  </div>
</div>
    );
  },

});

module.exports = Page;

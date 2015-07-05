var React = require('react');
var ToolboxAction = require('../actions/ToolboxAction');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');
var ToolboxStore = require('../stores/ToolboxStore');

var TabEditor = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    var tabs = this.props.tabs;
    if (tabs.length != 0) return;
    this._addTab();
  },
  componentWillReceiveProps: function(nextProp) { },
  componentWillUnmount: function() {},
  _labelChange: function(e) {
    var tabIndex = e.target.getAttribute('data-index');
    var tabs = this.props.tabs;
    if (!tabs[tabIndex]) {
      tabs[tabIndex] = {
        label: e.target.value,
        rows: [ToolboxStore.getPageStore().createEmptyCells()]
      };
    } else {
      tabs[tabIndex].label = e.target.value;
    }
    ToolboxAction.updateTabs(tabs);
  },
  _activeTabChange: function(e) {
    var tabIndex = e.target.getAttribute('data-index');
    var tabs = this.props.tabs;
    tabs.forEach(function(tab) {
      tab.active = false;
    });
    tabs[tabIndex].active = true;
    ToolboxAction.updateTabs(tabs);
  },
  _renderTabEditor: function() {
    var tabs = this.props.tabs;
    var rows = [];
    for (var i = 0, len = tabs.length; i < len; i++) {
      var label = tabs[i].label;
      var active = !!tabs[i].active;
      rows.push(
        <div className="input-group">
          <span className="input-group-addon">
            <input type="radio" name="tabs" checked={active} data-index={i} onChange={this._activeTabChange}/>
          </span>
          <input type="text" className="form-control" value={label} data-index={i} onChange={this._labelChange}/>
          <span className="input-group-btn">
            <button type="button" className="btn btn-danger" data-index={i} onClick={this._removeTab}><span className="glyphicon glyphicon-remove"></span></button>
          </span>
        </div>
      );
    }
    return rows;
  },
  _removeTab: function(e) {
    var tabIndex = e.target.getAttribute('data-index');
    var tabs = this.props.tabs;
    tabs.splice(tabIndex, 1);
    if (tabs.length === 0) this._addTab();
    if (tabs.filter(function(tab) { return tab.active; }).length === 0) {
      tabs[0].active = true;
    }
    ToolboxAction.updateTabs(tabs);
  },
  _addTab: function() {
    var tabs = this.props.tabs;
    tabs.push({
      label: 'Default Label',
      active: tabs.length === 0,
      rows: [ToolboxStore.getPageStore().createEmptyCells()]
    });
    ToolboxAction.updateTabs(tabs);
  },
  render: function() {
    return (
      <div className="form-group">
        <label>Tabs</label>
        {this._renderTabEditor()}
        <div className="text-right">
          <button type="button" className="btn btn-primary" onClick={this._addTab}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      </div>
    );
  }
});

module.exports = TabEditor;

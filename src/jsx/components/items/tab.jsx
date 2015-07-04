var React = require('react');
var Component = require('./component');

var Tab = React.createClass({
  statics: {
    editors: {
      name: true,
      label: false,
      size: true,
      align: false,
      color: false,
      option: false,
      rowSize: false,
      tab: true,
      table: false
    },
    minSize: 4,
    maxSize: 12
  },
  mixins: [Component],
  _labels: function() {
    return this.props.cell.tabs.map(function(tab) {
      return <li className={tab.active ? 'active' : ''}><a href="#home" data-toggle="tab">{tab.label}</a></li>;
    });
  },
  _tabContents: function() {
    var selectedDataid = PageStore.getSelectedCell().dataid;
    return this.props.cell.tabs.map(function(tab) {
      var className = 'tab-pane';
      if (tab.active) className += ' active';
      return (
        <div className={className}>
          <Grid rows={tab.rows} selectedDataid={selectedDataid}/>
        </div>
      );
    });
  },
  render: function() {
    var sizeClassName = "col-md-" + this.props.cell.size;
    return (
      <div key={this.props.cell.dataid} className="epd-component" onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={sizeClassName}>
          <ul className="nav nav-tabs" role="tablist">
            {this._labels()}
          </ul>
          <div className="tab-content">
            {this._tabContents()}
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Tab;
var Grid = require('../grid');

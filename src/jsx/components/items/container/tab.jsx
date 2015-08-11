var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Tab = React.createClass({
  statics: {
    editors: {
      name: true,
      toggleLabel: false,
      label: false,
      size: true,
      align: false,
      color: false,
      option: false,
      rowSize: false,
      tab: true,
      table: false
    },
    minSize: 1,
    maxSize: 12
  },
  mixins: [Component],
  _labels: function() {
    var _this = this;
    return this.props.cell.tabs.map(function(tab, i) {
      var tabName = '#tab-' + _this.props.cell.dataid + '-' + i;
      return <li className={tab.active ? 'active' : ''}><a href={tabName} data-toggle="tab">{tab.label}</a></li>;
    });
  },
  _tabContents: function() {
    var _this = this;
    var selectedDataid = PageStore.getSelectedCell().dataid;
    return this.props.cell.tabs.map(function(tab, i) {
      var className = 'tab-pane';
      if (tab.active) className += ' active';
      var tabName = 'tab-' + _this.props.cell.dataid + '-' + i;
      return (
        <div id={tabName} className={className}>
          <Grid rows={tab.rows} selectedDataid={selectedDataid}/>
        </div>
      );
    });
  },
  render: function() {
    var sizeClassName = PageStore.getCellType() + "-" + this.props.cell.size;
    var componentClassName = 'epd-' + this.props.cell.type + " epd-component";
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
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
var Grid = require('../../grid');

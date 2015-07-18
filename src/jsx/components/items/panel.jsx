var React = require('react');
var Component = require('./component');
var PageStore = require('../../stores/PageStore');

var Panel = React.createClass({
  statics: {
    editors: {
      name: true,
      label: true,
      size: true,
      align: false,
      color: ['default', 'primary', 'success', 'info', 'warning', 'danger'],
      option: false,
      rowSize: false,
      tab: false,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 4,
    maxSize: 12
  },
  mixins: [Component],
  _tabContents: function() {
    var selectedDataid = PageStore.getSelectedCell().dataid;
    return this.props.cell.tabs.map(function(tab, i) {
      var className = 'tab-pane';
      if (tab.active) className += ' active';
      var tabName = 'tab-' + i;
      return (
        <div id={tabName} className={className}>
          <Grid rows={tab.rows} selectedDataid={selectedDataid}/>
        </div>
      );
    });
  },
  render: function() {
    var sizeClassName = PageStore.getCellType() + "-" + this.props.cell.size;
    var panelClassName = "panel panel-" + this.props.cell.color;
    var selectedDataid = PageStore.getSelectedCell().dataid;
    if (this.props.cell.showLabel || PageStore.isEditMode()) {
      var label = this.props.cell.showLabel ? this.props.cell.label : 'This border is not shown when editMode is disabled';
      return (
        <div key={this.props.cell.dataid} className="epd-component" onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
          <div className={sizeClassName}>
            <div className={panelClassName}>
              <div className="panel-heading">{label}</div>
              <div className="panel-body">
                <Grid rows={this.props.cell.rows} selectedDataid={selectedDataid}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={this.props.cell.dataid} className="epd-component" onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
          <div className={sizeClassName}>
            <Grid rows={this.props.cell.rows} selectedDataid={selectedDataid}/>
          </div>
        </div>
      );

    }
  }
});
module.exports = Panel;
var Grid = require('../grid');

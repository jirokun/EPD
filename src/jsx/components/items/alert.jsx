var React = require('react');
var Component = require('./component');

var Alert = React.createClass({
  statics: {
    editors: {
      name: false,
      forceShowLabel: true,
      label: true,
      size: true,
      align: true,
      color: [ 'success', 'info', 'warning', 'danger' ],
      option: false,
      rowSize: false,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 1
  },
  getDefaultProps: function() {
    return { };
  },
  mixins: [Component],
  render: function() {
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    var sizeClassName = 'col-md-' + this.calcSizeClassName();
    var className = 'alert alert-' + this.props.cell.color;
    var style = {
      textAlign: this.props.cell.align
    };
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <div className={sizeClassName}>
    <div className={className} style={style}>{this.props.cell.label}</div>
  </div>
</div>
    );
  }
});

module.exports = Alert;

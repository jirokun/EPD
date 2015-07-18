var React = require('react');
var Component = require('./component');
var PageStore = require('../../stores/PageStore');

var Button = React.createClass({
  statics: {
    editors: {
      name: true,
      forceShowLabel: true,
      label: true,
      size: true,
      align: false,
      color: [ 'default', 'primary', 'success', 'info', 'warning', 'danger', 'link' ],
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
    var sizeClassName = PageStore.getCellType() + '-' + this.calcSizeClassName();
    var className = 'btn btn-block btn-' + this.props.cell.color;
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  {this.label()}
  <div className={sizeClassName}>
    <button type="button" className={className}>{this.props.cell.label}</button>
  </div>
</div>
    );
  }
});

module.exports = Button;

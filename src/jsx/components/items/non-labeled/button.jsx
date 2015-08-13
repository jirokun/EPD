var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Button = React.createClass({
  statics: {
    editors: {
      name: true,
      toggleLabel: false,
      label: true,
      size: true,
      className: true,
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
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "");
    var sizeClassName = PageStore.getCellType() + '-' + this.calcSizeClassName();
    var className = 'btn btn-block btn-' + this.props.cell.color;
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <div className={sizeClassName}>
    <button type="button" className={className}>{this.props.cell.label}</button>
  </div>
</div>
    );
  }
});

module.exports = Button;

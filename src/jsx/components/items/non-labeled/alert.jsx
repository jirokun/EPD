var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Alert = React.createClass({
  statics: {
    editors: {
      name: false,
      label: true,
      size: true,
      className: true,
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
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "");
    var sizeClassName = PageStore.getCellType() + '-' + this.calcSizeClassName();
    var className = 'alert alert-' + this.props.cell.color;
    var style = {
      textAlign: this.props.cell.align
    };
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <div className={sizeClassName}>
    <div className={className} style={style} contentEditable="true" onInput={this.onLabelChange}></div>
  </div>
</div>
    );
  }
});

module.exports = Alert;

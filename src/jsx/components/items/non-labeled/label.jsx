var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Label = React.createClass({
  statics: {
    editors: {
      name: false,
      toggleLabel: false,
      label: true,
      size: true,
      className: true,
      align: true,
      color: [ 'default', 'muted', 'primary', 'success', 'info', 'warning', 'danger' ],
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
    var className = PageStore.getCellType() + '-' + this.props.cell.size + ' control-label text-' + this.props.cell.color;
    var style = {
      textAlign: this.props.cell.align
    };
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <label contentEditable="true" className={className} style={style} onInput={this.onLabelChange}>{this.props.cell.label}</label>
</div>
    );
  }
});

module.exports = Label;

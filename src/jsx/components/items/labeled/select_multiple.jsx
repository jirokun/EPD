var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var FormSelectMultiple = React.createClass({
  statics: {
    editors: {
      name: true,
      showLabel: true,
      label: true,
      size: true,
      className: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: true,
      rowSize: true,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 4,
    maxSize: 12
  },
  getDefaultProps: function() {
    return {
      options: []
    };
  },
  mixins: [Component],
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    var sizeClassName = PageStore.getCellType() + "-" + this.calcSizeClassName();
    var options = this.props.cell.options.map(function(option) { return <option value={option.value}>{option.label}</option>; });
    return (
<div className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  {this.label()}
  <div className={sizeClassName}>
    <select name={this.props.cell.name} className="form-control" multiple="true" size={this.props.cell.rowSize}>{options}</select>
  </div>
</div>
    );
  }
});

module.exports = FormSelectMultiple;

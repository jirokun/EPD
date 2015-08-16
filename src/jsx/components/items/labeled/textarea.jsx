var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var FormTextarea = React.createClass({
  statics: {
    editors: {
      name: false,
      showLabel: true,
      label: true,
      value: true,
      valueMultipleLine: true,
      size: true,
      className: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: false,
      rowSize: true,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 4,
    maxSize: 12
  },
  mixins: [Component],
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    var sizeClassName = PageStore.getCellType() + "-" + this.calcSizeClassName();
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  {this.label()}
  <div className={sizeClassName}>
    <textarea className="form-control" rows={this.props.cell.rowSize} value={this.props.cell.value} onChange={this.onValueChange}/>
  </div>
</div>
    );
  }
});

module.exports = FormTextarea;

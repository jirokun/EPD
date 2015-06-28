var React = require('react');
var Component = require('./component');

var FormTextarea = React.createClass({
  statics: {
    editors: {
      name: false,
      label: true,
      size: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: false,
      rowSize: true,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 3,
    maxSize: 12
  },
  mixins: [Component],
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    var sizeClassName = "col-md-" + this.calcSizeClassName();
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  {this.label()}
  <div className={sizeClassName}>
    <textarea className="form-control" rows={this.props.cell.rowSize}/>
  </div>
</div>
    );
  }
});

module.exports = FormTextarea;

var React = require('react');
var Component = require('./component');

var FormPassword = React.createClass({
  statics: {
    editors: {
      name: true,
      label: true,
      size: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: false,
      rowSize: false,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 3,
    maxSize: 12
  },
  mixins: [Component],
  render: function() {
    var sizeClassName = "col-md-" + this.calcSizeClassName();
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  {this.label()}
  <div className={sizeClassName}>
    <input type="password" name={this.props.cell.name} className="form-control" />
  </div>
</div>
    );
  }
});

module.exports = FormPassword;

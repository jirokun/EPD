var React = require('react');
var Component = require('./component');

var FormRadio = React.createClass({
  statics: {
    editors: {
      name: true,
      label: true,
      size: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: true,
      rowSize: false,
      table: false
    },
    defaultLabel: 'Default Label',
    minSize: 3,
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
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    var _this = this;
    var sizeClassName = "col-md-" + this.calcSizeClassName();
    var options = this.props.cell.options.map(function(option) {
      return (
        <div className="checkbox">
          <label>
            <input type="radio" name={_this.props.cell.name} value={option.value}/>&nbsp;{option.label}
          </label>
        </div>
      );
    });
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  {this.label()}
  <div className={sizeClassName}>
    { options }
  </div>
</div>
    );
  }
});

module.exports = FormRadio;

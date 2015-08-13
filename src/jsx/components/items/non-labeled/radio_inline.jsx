var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var FormRadioInline = React.createClass({
  statics: {
    editors: {
      name: true,
      label: false,
      size: true,
      className: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: true,
      rowSize: false,
      table: false
    },
    minSize: 1,
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
    var _this = this;
    var sizeClassName = PageStore.getCellType() + "-" + this.calcSizeClassName();
    var options = this.props.cell.options.map(function(option) {
      return (
        <label className="radio-inline">
          <input type="radio" name={_this.props.cell.name} value={option.value}/>&nbsp;{option.label}
        </label>
      );
    });
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <div className={sizeClassName}>
    { options }
  </div>
</div>
    );
  }
});

module.exports = FormRadioInline;

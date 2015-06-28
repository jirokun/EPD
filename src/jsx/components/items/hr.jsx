var React = require('react');
var Component = require('./component');

var Hr = React.createClass({
  statics: {
    editors: {
      name: false,
      label: false,
      showLabel: false,
      size: true,
      align: false,
      color: false,
      option: false,
      rowSize: false,
      table: false
    },
    minSize: 1
  },
  getDefaultProps: function() {
    return {};
  },
  mixins: [Component],
  render: function() {
    var sizeClassName = "col-md-" + this.props.cell.size;
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    var columns = this.props.cell.columns;
    columns = columns ? columns : [{label:'sample', sample: 'value'}];
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={sizeClassName}>
          <hr/>
        </div>
      </div>
    );
  }
});

module.exports = Hr;

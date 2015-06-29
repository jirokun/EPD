var React = require('react');
var Component = require('./component');

var Html = React.createClass({
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
      table: false,
      html: true
    },
    defaultLabel: 'Default Label',
    minSize: 1,
    maxSize: 12
  },
  getDefaultProps: function() {
    return { };
  },
  mixins: [Component],
  render: function() {
    var sizeClassName = "col-md-" + this.calcSizeClassName();
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}dangerouslySetInnerHTML={{__html: this.props.cell.html}}/>
    );
  }
});

module.exports = Html;

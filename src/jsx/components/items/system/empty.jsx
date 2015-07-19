var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Empty = React.createClass({
  statics: {
    editors: {
      name: false,
      label: false,
      size: false,
      align: false,
      color: false,
      option: false,
      rowSize: false,
      table: false
    },
    defaultLabel: '',
    minSize: 1,
    maxSize: 1
  },
    
  mixins: [Component],
  editors: {
  },
  render: function() {
    var sizeClassName = PageStore.getCellType() + "-" + this.props.cell.size + " empty";
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <div className={sizeClassName}></div>
</div>
    );
  }
});

module.exports = Empty;

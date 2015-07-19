var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Pagination = React.createClass({
  statics: {
    editors: {
      name: true,
      label: false,
      size: true,
      align: false,
      color: false,
      option: false,
      rowSize: false,
      table: false
    },
    minSize: 3
  },
  getDefaultProps: function() {
    return { };
  },
  mixins: [Component],
  render: function() {
    var sizeClassName = PageStore.getCellType() + "-" + (this.props.cell.size);
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <nav className={sizeClassName}>
    <ul className="pagination">
      <li className="disabled">
        <a href="#">
          <span>&laquo;</span>
        </a>
      </li>
      <li className="active"><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li>
        <a href="#">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
    );
  }
});

module.exports = Pagination;

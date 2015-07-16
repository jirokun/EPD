var React = require('react');
var Component = require('./component');
var PageStore = require('../../stores/PageStore');

var Table = React.createClass({
  statics: {
    editors: {
      name: false,
      label: true,
      size: true,
      align: false,
      option: false,
      rowSize: false,
      table: true 
    },
    defaultLabel: 'Default Label',
    minSize: 3
  },
  getDefaultProps: function() {
    return {
      cell: {
        columns: []
      }
    };
  },
  mixins: [Component],
  render: function() {
    var sizeClassName = PageStore.getCellType() + "-" + this.calcSizeClassName();
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    var columns = this.props.cell.columns;
    columns = columns ? columns : [{label:'sample', sample: 'value'}];
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        {this.label()}
        <div className={sizeClassName}>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                { columns.map(function(c) { return <th>{ c.label }</th>; }) }
              </tr>
            </thead>
            <tbody>
              <tr>{ columns.map(function(c) { return <td>{ c.sample }</td>; }) }</tr>
              <tr>{ columns.map(function(c) { return <td>{ c.sample }</td>; }) }</tr>
              <tr>{ columns.map(function(c) { return <td>{ c.sample }</td>; }) }</tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Table;

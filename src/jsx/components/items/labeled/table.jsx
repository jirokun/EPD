var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var Table = React.createClass({
  statics: {
    editors: {
      name: false,
      showLabel: true,
      label: true,
      size: true,
      align: false,
      option: false,
      rowSize: false,
      table: true 
    },
    defaultLabel: 'Default Label',
    minSize: 4
  },
  getDefaultProps: function() {
    return {
      cell: {
        columns: []
      }
    };
  },
  mixins: [Component],
  _renderCell: function(c) {
    switch(c.type) {
      case 'text':
        return <input type="text" className="form-control"/>;
        break;
      case 'textarea':
        return <textarea className="form-control"></textarea>
        break;
      case 'link':
        return <a href="javascript:void(0);">{c.sample}</a>;
        break;
      case 'select':
        return (
          <select className="form-control">
            <option>sample1</option>
            <option>sample2</option>
          </select>
        );
        break;
      case 'checkbox':
        return <input type="checkbox"/>
        break;
      case 'radio':
        return <input type="radio"/>
        break;
      case 'calendar':
        return (
          <div className="input-group">
            <input type="text" className="form-control" />
            <span className="input-group-btn">
              <button className="btn btn-default">
                <span className="glyphicon glyphicon-calendar" />
              </button>
            </span>
          </div>
        );
        break;
      case 'master_search_box':
        return (
          <div className="input-group">
            <input type="text" className="form-control" />
            <span className="input-group-btn">
              <button className="btn btn-default">
                <span className="glyphicon glyphicon-search" />
              </button>
            </span>
          </div>
        );
        break;
      default:
        return c.sample;
        break;
    }
  },
  render: function() {
    var _this = this;
    var sizeClassName = PageStore.getCellType() + "-" + this.calcSizeClassName();
    var componentClassName = 'epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "");
    var columns = this.props.cell.columns;
    columns = columns ? columns : [{label:'sample', sample: 'value'}];
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        {this.label()}
        <div className={sizeClassName}>
          <table className="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                { columns.map(function(c) { return <th>{ c.label }</th>; }) }
              </tr>
            </thead>
            <tbody>
              <tr>{ columns.map(function(c) { return <td>{ _this._renderCell(c) }</td>; }) }</tr>
              <tr>{ columns.map(function(c) { return <td>{ _this._renderCell(c) }</td>; }) }</tr>
              <tr>{ columns.map(function(c) { return <td>{ _this._renderCell(c) }</td>; }) }</tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Table;

var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var PageConstants = require('../../../PageConstants');

var Table = React.createClass({
  statics: {
    editors: {
      name: false,
      label: false,
      size: true,
      className: true,
      align: false,
      option: false,
      rowSize: false,
      table: true 
    },
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
        return <input type="text" className="form-control" value={c.sample}/>;
        break;
      case 'textarea':
        return <textarea className="form-control" value={c.sample}></textarea>
        break;
      case 'link':
        return <a href="javascript:void(0);">{c.sample}</a>;
        break;
      case 'select':
        return (
          <select className="form-control">
            <option>{c.sample}</option>
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
            <input type="text" className="form-control" value={c.sample}/>
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
            <input type="text" className="form-control" value={c.sample}/>
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
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "");

    var cell = this.props.cell;
    var columns = cell.columns;
    columns = columns ? columns : [{label:'sample', sample: 'value'}];
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={sizeClassName}>
          <table className="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                { cell.tableCheckbox ? <th><input type="checkbox" className="epd-select-all-checkbox"/></th> : null }
                { columns.map(function(c) { return <th>{ c.label }</th>; }) }
              </tr>
            </thead>
            <tbody>
              <tr>
                { cell.tableCheckbox ? <td><input type="checkbox" className="epd-row-checkbox"/></td> : null }
                { columns.map(function(c) { return <td>{ _this._renderCell(c) }</td>; }) }
              </tr>
              <tr>
                { cell.tableCheckbox ? <td><input type="checkbox" className="epd-row-checkbox"/></td> : null }
                { columns.map(function(c) { return <td>{ _this._renderCell(c) }</td>; }) }
              </tr>
              <tr>
                { cell.tableCheckbox ? <td><input type="checkbox" className="epd-row-checkbox"/></td> : null }
                { columns.map(function(c) { return <td>{ _this._renderCell(c) }</td>; }) }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Table;

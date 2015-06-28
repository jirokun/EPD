var React = require('react');
var ToolboxStore = require('../stores/ToolboxStore');

var Grid = React.createClass({
  render: function() {
    var _this = this;
    var rows = [];
    var onComponentSelect = this.props.onComponentSelect;
    var onContextMenu = this.props.onContextMenu;
    this.props.rows.forEach(function(row) {
      var cells = [];
      row.forEach(function(cell) {
        var selected = _this.props.selectedDataid == cell.dataid;
        var component = ToolboxStore.findComponentConstructor(cell.type);
        if (!component) throw 'Not supported component type: ' + cell.type;
        cells.push(React.createElement(component, {cell: cell, onComponentSelect: onComponentSelect, selected: selected, onContextMenu: onContextMenu}));
      });
      rows.push(<div className="row">{cells}</div>);
    });
    return <div>{rows}</div>;
  }
});

module.exports = Grid;

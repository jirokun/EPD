var React = require('react');
var PageAction = require('../../actions/PageAction');

var Component = {
  label: function() {
    if (!this.props.cell.showLabel) return null;
    var style = { align: 'right' };
    return <label className="col-md-2 control-label" style={style}>{this.props.cell.label}</label>;
  },
  calcSizeClassName: function() {
    return this.props.cell.showLabel ? this.props.cell.size - 2 : this.props.cell.size;
  },
  onComponentSelect: function(e) {
    PageAction.componentSelect(this.props.cell, e.target);
  }
};

module.exports = Component;

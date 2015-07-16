var React = require('react');
var PageAction = require('../../actions/PageAction');
var PageStore = require('../../stores/PageStore');

var Component = {
  label: function() {
    if (!this.props.cell.showLabel) return null;
    var style = { align: 'right' };
    var className = PageStore.getCellType() + '-2 control-label';
    return <label className={className} style={style}>{this.props.cell.label}</label>;
  },
  calcSizeClassName: function() {
    return this.props.cell.showLabel ? this.props.cell.size - 2 : this.props.cell.size;
  },
  onComponentSelect: function(e) {
    e.stopPropagation();
    PageAction.componentSelect(this.props.cell, e.target);
  }
};

module.exports = Component;

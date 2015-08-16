var React = require('react');
var PageAction = require('../../actions/PageAction');
var PageStore = require('../../stores/PageStore');

var Component = {
  label: function() {
    var style = { align: 'right' };
    var className = PageStore.getCellType() + '-2 control-label';
    return <label className={className} style={style}>{this.props.cell.label}</label>;
  },
  calcSizeClassName: function() {
    // showLabelは条件関係なしにラベルを表示するフラグ
    if (this.constructor.editors.showLabel === true) return this.props.cell.size - 2;
    return this.props.cell.size;
  },
  onValueChange: function(e) {
    PageAction.updateValue(this.props.cell, e.target.value);
  },
  onComponentSelect: function(e) {
    e.stopPropagation();
    PageAction.componentSelect(this.props.cell, e.target);
  }
};

module.exports = Component;

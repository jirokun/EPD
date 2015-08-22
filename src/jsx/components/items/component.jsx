var React = require('react');
var PageAction = require('../../actions/PageAction');
var PageStore = require('../../stores/PageStore');

var Component = {
  label: function() {
    var style = { align: 'right' };
    var className = PageStore.getCellType() + '-2 control-label';
    return <label contentEditable="true" className={className} style={style} onInput={this.onLabelChange}>{this.props.cell.label}</label>;
  },
  calcSizeClassName: function() {
    // showLabelは条件関係なしにラベルを表示するフラグ
    if (this.constructor.editors.showLabel === true) return this.props.cell.size - 2;
    return this.props.cell.size;
  },
  onLabelChange: function(e) {
    var value = e.target.innerText || e.target.textContent;
    PageAction.updateLabel(this.props.cell, value);
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

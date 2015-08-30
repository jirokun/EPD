var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');

var Label = React.createClass({
  statics: {
    editors: {
      name: false,
      toggleLabel: false,
      value: true,
      valueMultipleLine: true,
      size: true,
      className: true,
      align: true,
      color: [ 'default', 'muted', 'primary', 'success', 'info', 'warning', 'danger' ],
      option: false,
      rowSize: false,
      table: false
    },
    defaultValue: 'Default Value',
    minSize: 1
  },
  getDefaultProps: function() {
    return { };
  },
  mixins: [Component],
  getInitialState: function() {
    return {
      editMode: false
    };
  },
  renderInner: function() {
    var _this = this;
    if (this.state.editMode) {
      return this.renderEditor();
    } else {
      var className = 'control-label text-' + this.props.cell.color;
      return <label className={className} onMouseDown={this.onEditorEnable} dangerouslySetInnerHTML={{__html: Util.nl2br(this.props.cell.value)}}/>;
    }
  },
  render: function() {
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "");
    var sizeClassName = PageStore.getCellType() + '-' + this.props.cell.size;
    var style = {
      textAlign: this.props.cell.align
    };
    return (
<div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
  <div className={sizeClassName} style={style}>
    {this.renderInner()}
  </div>
</div>
    );
  }
});

module.exports = Label;

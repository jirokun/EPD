var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');
var PageConstants = require('../../../PageConstants');

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
    var sizeClassName = PageStore.getCellType() + '-' + this.props.cell.size;
    if (this.state.editMode) {
      return (
        <div className={sizeClassName}>
          {this.renderEditor()}
        </div>
      );
    } else {
      var style = {};
      if (this.props.cell.align !== 'default') style.textAlign = this.props.cell.align;
      var className = sizeClassName + ' control-label text-' + this.props.cell.color;
      return <label className={className} style={style} onMouseDown={this.onEditorEnable} dangerouslySetInnerHTML={{__html: Util.nl2br(this.props.cell.value)}}/>;
    }
  },
  render: function() {
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "");
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        {this.renderInner()}
     </div>
    );
  }
});

module.exports = Label;

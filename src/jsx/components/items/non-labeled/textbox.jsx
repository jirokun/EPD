var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');

var FormText = React.createClass({
  statics: {
    editors: {
      name: true,
      showLabel: false,
      label: false,
      size: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: false,
      rowSize: false,
      preText: true,
      postText: true,
      table: false
    },
    minSize: 1,
    maxSize: 12
  },
  mixins: [Component],
  _preText: function() {
    if (Util.isEmpty(this.props.cell.preText)) return null;
    return <span className="input-group-addon" dangerouslySetInnerHTML={{__html: this.props.cell.preText}}/>
  },
  _postText: function() {
    if (Util.isEmpty(this.props.cell.postText)) return null;
    return <span className="input-group-addon" dangerouslySetInnerHTML={{__html: this.props.cell.postText}}/>
  },
  _inputGroup: function() {
    var inputGroupClassName = Util.isEmpty(this.props.cell.preText) && Util.isEmpty(this.props.cell.postText) ? '' : 'input-group';
    return (
      <div className={inputGroupClassName}>
        {this._preText()}
        <input type="text" className="form-control" />
        {this._postText()}
      </div>
    );
  },
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={PageStore.getCellType() + "-" + this.calcSizeClassName()}>
          {this._inputGroup()}
        </div>
      </div>
    );
  }
});

module.exports = FormText;

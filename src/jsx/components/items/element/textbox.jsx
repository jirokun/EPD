var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');
var PageConstants = require('../../../PageConstants');

var FormText = React.createClass({
  statics: {
    editors: {
      name: true,
      showLabel: false,
      label: false,
      size: true,
      value: true,
      className: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: false,
      rowSize: false,
      preHtml: true,
      postHtml: true,
      table: false
    },
    minSize: 1,
    maxSize: PageConstants.GRID_SIZE
  },
  mixins: [Component],
  _preHtml: function() {
    if (Util.isEmpty(this.props.cell.preHtml)) return null;
    return <span className="input-group-addon" dangerouslySetInnerHTML={{__html: this.props.cell.preHtml}}/>
  },
  _postHtml: function() {
    if (Util.isEmpty(this.props.cell.postHtml)) return null;
    return <span className="input-group-addon" dangerouslySetInnerHTML={{__html: this.props.cell.postHtml}}/>
  },
  _inputGroup: function() {
    var inputGroupClassName = Util.isEmpty(this.props.cell.preHtml) && Util.isEmpty(this.props.cell.postHtml) ? '' : 'input-group';
    return (
      <div className={inputGroupClassName}>
        {this._preHtml()}
        <input type="text" className="form-control" value={this.props.cell.value} onChange={this.onValueChange}/>
        {this._postHtml()}
      </div>
    );
  },
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
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

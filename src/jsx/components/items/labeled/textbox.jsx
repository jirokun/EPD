var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');

var FormText = React.createClass({
  statics: {
    editors: {
      name: true,                                           // name属性エディタの表示フラグ
      toggleLabel: false,                                   // ラベルの表示・非表示エディタの表示フラグ
      showLabel: true,                                      // ラベルのサイズを考慮するかどうか
      label: true,                                          // ラベルエティタの表示フラグ
      size: true,                                           // サイズエディタの表示フラグ
      align: false,                                         // alignエディタの表示フラグ
      color: [ 'default', 'warning', 'error', 'success' ],  // 選択可能な色の一覧
      option: false,                                        // オプションエディタ表示フラグ
      rowSize: false,                                       // rowサイズエディタの表示フラグ
      preHtml: true,                                        // preテキストエディタの表示フラグ
      postHtml: true,                                       // postテキストエディタの表示フラグ
      table: false                                          // tableエディタの表示フラグ
    },
    defaultLabel: 'Default Label',
    minSize: 4,
    maxSize: 12
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
        <input type="text" className="form-control" />
        {this._postHtml()}
      </div>
    );
  },
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = 'epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        {this.label()}
        <div className={PageStore.getCellType() + "-" + this.calcSizeClassName()}>
          {this._inputGroup()}
        </div>
      </div>
    );
  }
});

module.exports = FormText;

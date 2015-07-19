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
      preText: true,                                        // preテキストエディタの表示フラグ
      postText: true,                                       // postテキストエディタの表示フラグ
      table: false                                          // tableエディタの表示フラグ
    },
    defaultLabel: 'Default Label',
    minSize: 4,
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
        {this.label()}
        <div className={PageStore.getCellType() + "-" + this.calcSizeClassName()}>
          {this._inputGroup()}
        </div>
      </div>
    );
  }
});

module.exports = FormText;

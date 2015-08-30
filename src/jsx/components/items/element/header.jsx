var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');

var Header = React.createClass({
  statics: {
    editors: {
      name: false,                                          // name属性エディタの表示フラグ
      toggleLabel: false,                                   // ラベルの表示・非表示エディタの表示フラグ
      showLabel: false,                                     // ラベルのサイズを考慮するかどうか
      label: true,                                          // ラベルエティタの表示フラグ
      value: false,                                         // 値の表示フラグ
      href: false,                                          // リンク先の表示フラグ
      size: true,                                           // サイズエディタの表示フラグ
      className: true,                                      // クラスを定義する
      align: true,                                          // alignエディタの表示フラグ
      color: [ 'default', 'warning', 'error', 'success' ],  // 選択可能な色の一覧
      option: false,                                        // オプションエディタ表示フラグ
      rowSize: false,                                       // rowサイズエディタの表示フラグ
      preHtml: false,                                       // preテキストエディタの表示フラグ
      postHtml: false,                                      // postテキストエディタの表示フラグ
      table: false                                          // tableエディタの表示フラグ
    },
    defaultLabel: 'Default Label',
    minSize: 1,
    maxSize: 12
  },
  mixins: [Component],
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    var className = PageStore.getCellType() + '-' + this.props.cell.size + ' control-label text-' + this.props.cell.color;
    var style = {
      textAlign: this.props.cell.align
    };
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={className}>
          <h3 contentEditable="true" onInput={this.onLabelChange} style={style}>{this.props.cell.label}</h3>
        </div>
      </div>
    );
  }
});

module.exports = Header;

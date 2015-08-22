var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');

var Link = React.createClass({
  statics: {
    editors: {
      name: true,                                           // name属性エディタの表示フラグ
      toggleLabel: false,                                   // ラベルの表示・非表示エディタの表示フラグ
      showLabel: true,                                      // ラベルのサイズを考慮するかどうか
      label: true,                                          // ラベルエティタの表示フラグ
      value: true,                                          // 値の表示フラグ
      href: true,                                           // リンク先の表示フラグ
      size: true,                                           // サイズエディタの表示フラグ
      className: true,                                      // クラスを定義する
      align: false,                                         // alignエディタの表示フラグ
      color: [ 'default', 'warning', 'error', 'success' ],  // 選択可能な色の一覧
      option: false,                                        // オプションエディタ表示フラグ
      rowSize: false,                                       // rowサイズエディタの表示フラグ
      preHtml: false,                                       // preテキストエディタの表示フラグ
      postHtml: false,                                      // postテキストエディタの表示フラグ
      table: false                                          // tableエディタの表示フラグ
    },
    defaultLabel: 'Default Label',
    defaultValue: 'Default Value',
    minSize: 4,
    maxSize: 12
  },
  mixins: [Component],
  onValueTextChange: function(e) {
    var value = e.target.innerText || e.target.textContent;
    PageAction.updateValue(this.props.cell, value);
  },
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        {this.label()}
        <div className={PageStore.getCellType() + "-" + this.calcSizeClassName()}>
          <a className="btn btn-link" href={this.props.cell.href} contentEditable="true" onInput={this.onValueTextChange}>{this.props.cell.value}</a>
        </div>
      </div>
    );
  }
});

module.exports = Link;

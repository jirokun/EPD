var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');
var Util = require('../../../Util');
var PageConstants = require('../../../PageConstants');

var StaticText = React.createClass({
  statics: {
    editors: {
      name: true,                                           // name属性エディタの表示フラグ
      toggleLabel: false,                                   // ラベルの表示・非表示エディタの表示フラグ
      showLabel: false,                                     // ラベルのサイズを考慮するかどうか
      label: false,                                         // ラベルエティタの表示フラグ
      value: true,                                          // 値の表示フラグ
      valueMultipleLine: true,
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
    defaultValue: 'Default Value',
    minSize: 1,
    maxSize: PageConstants.GRID_SIZE
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
      var style = {
        textAlign: this.props.cell.align
      };
      return <p style={style} className="form-control-static" contentEditable="true" onMouseDown={this.onEditorEnable} dangerouslySetInnerHTML={{__html: Util.nl2br(this.props.cell.value)}}/>
    }
  },
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = this.props.cell.className + ' epd-' + this.props.cell.type + " epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={PageStore.getCellType() + "-" + this.calcSizeClassName()}>
          { this.renderInner() }
        </div>
      </div>
    );
  }
});

module.exports = StaticText;

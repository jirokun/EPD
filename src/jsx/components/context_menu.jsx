var React = require('react');
var PageAction = require('../actions/PageAction');

var ContextMenu = React.createClass({
  getInitialState: function() {
    return {
      dataid: -1,
      show: false,
      pageX: 0,
      pageY: 0
    };
  },
  componentDidMount: function() {
    var _this = this;
    $(document.body).on('contextmenu', '.epd-component', function(e) {
      e.preventDefault();
      var dataid = $(this).data('dataid');
      _this.setState({
        dataid: dataid,
        show: true,
        pageX: e.pageX,
        pageY: e.pageY
      });
    });
    $(window).on('click', function(e) {
      if (e.button !== 0) return;
      if ($(e.target).parents('.contextmenu').length > 0) return;
      _this.setState({ show: false });
    });
  },
  render: function() {
    var style = {
      display: this.state.show ? '' : 'none',
      left: this.state.pageX + 'px',
      top: this.state.pageY + 'px'
    };
    return (
<div className="dropdown contextmenu" style={style}>
  <ul className="dropdown-menu">
    <li><a href="#" onClick={this._onClickInsertRowAbove}><span className="glyphicon glyphicon-arrow-up"></span> Insert Row Above</a></li>
    <li><a href="#" onClick={this._onClickInsertRowBelow}><span className="glyphicon glyphicon-arrow-down"></span> Insert Row Below</a></li>
    <li><a href="#" onClick={this._onClickDeleteRow}><span className="glyphicon glyphicon-remove text-danger"></span> Delete Row</a></li>
  </ul>
</div>
    );
  },
  _onClickInsertRowAbove: function(e) {
    this.setState({show: false});
    PageAction.insertRow(this.state.dataid, false);
  },
  _onClickInsertRowBelow: function(e) {
    this.setState({show: false});
    PageAction.insertRow(this.state.dataid, true);
  },
  _onClickDeleteRow: function(e) {
    this.setState({show: false});
    PageAction.deleteRow(this.state.dataid);
  }
});

module.exports = ContextMenu;

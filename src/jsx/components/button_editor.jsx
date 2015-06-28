var React = require('react');
var ToolboxAction = require('../actions/ToolboxAction');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');

var ButtonEditor = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() {
    return {};
  },
  getInitialProps: function() {
    return {
      buttons: []
    };
  },

  componentWillMount: function() { },
  componentWillReceiveProps: function(nextProp) { },
  componentWillUnmount: function() {},
  shouldComponentUpdate: function(nextProps, nextState) {
    return JSON.stringify(nextProps.buttons) !== JSON.stringify(this.props.buttons);
  },
  componentDidMount: function() {
    this._renderHandsontable(this.props.buttons);
  },
  _renderHandsontable: function(buttons) {
    var _this = this;
    this._handsontable = new Handsontable(this.refs.handsontable.getDOMNode(), {
      data: this._convertButtons(buttons),
      columns: [
        { type: 'text' },
        {
          editor: 'select',
          selectOptions: [ 'default', 'primary', 'success', 'info', 'warning', 'danger', 'link' ]
        }
      ],
      colHeaders: ['Label', 'Type'],
      colWidths: [80, 80],
      width: 200,
      height: 150,
      minHeight: 50,
      minRows: 2,
      minSpareRows: 1,
      contextMenu: ["row_above", "row_below", "remove_row", "undo", "redo"],
      afterChange: function() {
        _this.props.onChange(this);
      }
    });
    this._handsontable.render();
  },
  componentWillUpdate: function(nextProp, nextState) {
    this._handsontable.destroy();
    this._renderHandsontable(nextProp.buttons);
  },
  componentWillUnmount: function() {
    this._handsontable.destroy();
  },
  _convertButtons: function(buttons) {
    return buttons.map(function(button) { return [button.label, button.type ]});
  },
  render: function() {
    return (
      <div className="form-group">
        <div ref="handsontable"></div>
      </div>
    );
  }
});

module.exports = ButtonEditor;

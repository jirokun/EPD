var React = require('react');
var ToolboxAction = require('../actions/ToolboxAction');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');

var ButtonEditor = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() {
    return {
      buttons: []
    };
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
      data: buttons,
      columns: [
        { data: 'label', type: 'text' },
        {
          data: 'type',
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
      afterChange: function(data, eventName) {
        if (eventName === 'loadData') return;
        var buttons = this.getData().filter(function(obj) { return obj.label != '' && typeof obj.label !== 'undefined'});
        _this.props.onChange(buttons);
      }
    });
    this._handsontable.render();
  },
  componentWillUpdate: function(nextProp, nextState) {
    this._handsontable.loadData(nextProp.buttons);
  },
  componentWillUnmount: function() {
    this._handsontable.destroy();
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

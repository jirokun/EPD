var React = require('react');
var ToolboxAction = require('../actions/ToolboxAction');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');

var OptionEditor = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() {
    return {};
  },
  getInitialProps: function() {
    return {
      options: []
    };
  },

  componentWillMount: function() { },
  componentWillReceiveProps: function(nextProp) { },
  componentWillUnmount: function() {},
  shouldComponentUpdate: function(nextProps, nextState) {
    return JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options);
  },
  componentDidMount: function() {
    var _this = this;
    this._handsontable = new Handsontable(this.refs.handsontable.getDOMNode(), {
      data: this._convertOptions(this.props.options),
      columns: [
        { type: 'text' },
        { type: 'text' }
      ],
      colHeaders: ['Label', 'Value'],
      colWidths: [100, 100],
      width: 200,
      minHeight: 50,
      minRows: 2,
      minSpareRows: 1,
      contextMenu: ["row_above", "row_below", "remove_row", "undo", "redo"],
      afterChange: function(changes, source) {
        if (ToolboxDispatcher.isDispatching()) return;
        var options = this.getData().map(function(arr) { return {label: arr[0], value: arr[1] }; });
        options.splice(options.length - 1, 1);
        ToolboxAction.updateOptions(options);
      }
    });
    this._handsontable.render();
  },
  componentWillUpdate: function(nextProp, nextState) {
  },
  componentWillUnmount: function() {
    this._handsontable.destroy();
  },

  _convertOptions: function(options) {
    return options.map(function(option) { return [option.label, option.value]});
  },

  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="options">Options</label>
        <div ref="handsontable"></div>
      </div>
    );
  }
});

module.exports = OptionEditor;

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
    var data;
    var options = this.props.options;
    if (options.length === 1 && typeof options.label === 'undefined') data = [];
    else data = options;
    this._handsontable = new Handsontable(this.refs.handsontable.getDOMNode(), {
      data: data,
      columns: [
        { data: 'label', type: 'text' },
        { data: 'value', type: 'text' }
      ],
      colHeaders: ['Label', 'Value'],
      colWidths: [100, 100],
      width: 200,
      minHeight: 50,
      minRows: 2,
      minSpareRows: 1,
      contextMenu: ["row_above", "row_below", "remove_row", "undo", "redo"],
      afterChange: function(changes, eventName) {
        if (eventName === 'loadData') return;
        if (ToolboxDispatcher.isDispatching()) return;
        var options = JSON.parse(JSON.stringify(this.getData()));
        options.splice(options.length - 1, 1);
        ToolboxAction.updateOptions(options);
      }
    });
    this._handsontable.render();
  },
  componentWillUpdate: function(nextProp, nextState) {
    this._handsontable.loadData(nextProp.options);
  },
  componentWillUnmount: function() {
    this._handsontable.destroy();
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

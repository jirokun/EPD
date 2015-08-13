var React = require('react');
var ToolboxAction = require('../actions/ToolboxAction');
var ToolboxDispatcher = require('../dispatchers/ToolboxDispatcher');

var TableEditor = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() {
    return {};
  },
  getInitialProps: function() {
    return {
      columns: []
    };
  },

  componentWillMount: function() { },
  componentWillReceiveProps: function(nextProp) { },
  componentWillUnmount: function() {},
  shouldComponentUpdate: function(nextProps, nextState) {
    return JSON.stringify(nextProps.columns) !== JSON.stringify(this.props.columns);
  },
  componentDidMount: function() {
    var _this = this;
    this._handsontable = new Handsontable(this.refs.handsontable.getDOMNode(), {
      data: this.props.columns,
      columns: [
        { data: 'label', type: 'text' },
        {
          data: 'type',
          type: 'text',
          editor: 'select',
          selectOptions: [ 'label', 'text', 'link', 'select', 'checkbox', 'radio', 'textarea', 'calendar', 'master_search_box' ]
        },
        { data: 'sample', type: 'text' }
      ],
      colHeaders: ['Label', 'Type', 'Sample'],
      colWidths: [70, 60, 60],
      width: 200,
      minHeight: 50,
      minRows: 2,
      minSpareRows: 1,
      contextMenu: ["row_above", "row_below", "remove_row", "undo", "redo"],
      afterChange: function(changes, source) {
        if (ToolboxDispatcher.isDispatching()) return;
        var columns = this.getData();
        columns.splice(columns.length - 1, 1);
        ToolboxAction.updateColumns(columns);
      }
    });
    this._handsontable.render();
  },
  componentWillUpdate: function(nextProp, nextState) {
  },
  componentWillUnmount: function() {
    this._handsontable.destroy();
  },
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="columns">Columns</label>
        <div ref="handsontable"></div>
      </div>
    );
  }
});

module.exports = TableEditor;

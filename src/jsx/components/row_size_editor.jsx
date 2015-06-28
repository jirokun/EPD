var React = require('react');
var ToolboxAction = require('../actions/ToolboxAction');
var RowSizeEditor = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() { return {}; },
  getInitialProps: function() {
    return {
      changeRowsHandler: function() {}
    };
  },

  componentWillMount: function() { },
  componentWillReceiveProps: function(nextProp) { },
  componentWillUnmount: function() {},
  componentDidMount: function() { },
  componentWillUpdate: function(nextProp, nextState) { },
  componentWillUnmount: function() { },

  _changeRowSize: function(e) {
    var value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    ToolboxAction.updateRowSize(value);
  },

  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="rows">Rows</label>
        <input type="number" className="form-control" id="rows" value={this.props.rowSize} onChange={this._changeRowSize}/>
      </div>
    );
  }
});

module.exports = RowSizeEditor;

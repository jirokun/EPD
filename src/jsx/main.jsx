var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var Toolbox = require('./components/toolbox');

var Main = React.createClass({
  propTypes: {},
  mixins : [],

  getInitialState: function() {
    return {
      iframeInitialized: false
    };
  },
  getDefaultProps: function() {},

  componentWillMount: function() { },
  componentWillReceiveProps: function() {},
  componentWillUnmount: function() {},
  componentDidMount: function() {
    var _this = this;
    var previewIframe = this.refs.previewIframe.getDOMNode();
    previewIframe.addEventListener('load', function() {
      _this.setState({
        iframeInitialized: true
      });
    }, false);
  },

  _parseData : function() {},
  _onSelect : function() {},

  render : function() {
    var style = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };
    return (
      <div style={style}>
        <div id="top">Top</div>
        <div id="main">
          <div className="title">Preview</div>
          <iframe ref="previewIframe" id="preview" src="view.html"></iframe>
        </div>
        <div id="right">
          <div className="title">Toolbox</div>
          <div className="toolbox-container">
            { this.state.iframeInitialized ? <Toolbox preview="preview"/> : null }
          </div>
        </div>
      </div>
    )
  }
});

$(function () {
  "use strict";
  React.render(<Main/>, document.body);
});

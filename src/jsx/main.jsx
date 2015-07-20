var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var Toolbox = require('./components/toolbox');
var ToolboxStore = require('./stores/ToolboxStore');

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

    // for electron
    try {
      var ipc = window.require('ipc');
      ipc.on('loadJSON', function(json) {
        ToolboxStore.getPageStore().load(json);
        ToolboxStore.load(json);
      });
      ipc.on('requestJSON', function(event, arg) {
        var json = ToolboxStore.getPageStore().toJSON();
        ipc.send('responseJSON', json);
      });
      ipc.on('requestHTML', function(event, arg) {
        var html = ToolboxStore.getPageStore().toHTML();
        ipc.send('responseHTML', html);
      });
      ipc.on('showShortcuts', function(event, arg) {
        $(_this.refs['shortcut-modal'].getDOMNode()).modal('show');
      });
      ipc.on('showVersion', function(event, arg) {
        $(_this.refs['version-modal'].getDOMNode()).modal('show');
      });
    } catch(e) {
      console.warn(e);
    }
  },

  _parseData : function() {},
  _onSelect : function() {},

  _renderVersion: function() {
    return (
      <div ref="version-modal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Version</h4>
            </div>
            <div className="modal-body">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Author</th>
                    <td>Jiro Iwamoto</td>
                  </tr>
                  <tr>
                    <th>License</th>
                    <td>GPL v2</td>
                  </tr>
                  <tr>
                    <th>Source</th>
                    <td><a href="https://github.com/jirokun/EPD">https://github.com/jirokun/EPD</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  _renderShortcuts: function() {
    return (
      <div ref="shortcut-modal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Shortcuts</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <h5>Cell shortcuts</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 text-right">Copy</div>
                <div className="col-xs-3">c</div>
              </div>
              <div className="row">
                <div className="col-xs-3 text-right">Paste</div>
                <div className="col-xs-3">v</div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h5>File shortcuts</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 text-right">Open file</div>
                <div className="col-xs-3">CTRL + o</div>
              </div>
              <div className="row">
                <div className="col-xs-3 text-right">Save File</div>
                <div className="col-xs-3">CTRL + s</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  render : function() {
    var style = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };
    return (
      <div style={style}>
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
        {this._renderShortcuts()}
        {this._renderVersion()}
      </div>
    )
  }
});

$(function () {
  "use strict";
  React.render(<Main/>, document.body);
});

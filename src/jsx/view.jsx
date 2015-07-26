window.EPD = {};
var React = require('react');
var Page = require('./components/page');
var ContextMenu = require('./components/context_menu');
var PageAction = require('./actions/PageAction');
var ToolboxStore = require('./stores/ToolboxStore');
require('bootstrap');

$(function() {
  var page = React.render(<Page />, document.getElementById('container'));
  PageAction.insertRow(0);
  var contextMenuContainer = document.body.appendChild(document.createElement('div'));
  var contextMenu = React.render(<ContextMenu />, contextMenuContainer);
  // disable link clicking
  $(document).on('click', 'a', function(e) {
    e.preventDefault();
  });
});
window.EPD.React = React;
window.EPD.Component = require('./components/items/component');
window.EPD.ToolboxAction = require('./actions/ToolboxAction');

var React = require('react');
var Page = require('./components/page');
var ContextMenu = require('./components/context_menu');
var PageAction = require('./actions/PageAction');

$(function() {
  var page = React.render(<Page />, document.getElementById('container'));
  PageAction.insertRow(0);
  var contextMenuContainer = document.body.appendChild(document.createElement('div'));
  var contextMenu = React.render(<ContextMenu />, contextMenuContainer);
});

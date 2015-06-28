var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var ToolboxDispatcher = copyProperties(new Dispatcher(), {}); 

module.exports = ToolboxDispatcher;

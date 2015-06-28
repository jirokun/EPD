var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var PageDispatcher = copyProperties(new Dispatcher(), {}); 

module.exports = PageDispatcher;

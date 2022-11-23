// MODULE DEPENDENCIES
var app = require('./server/config/app');
var debug = require('debug')('finalproject_ws:server');
var http = require('http');
const { normalize } = require('path');

// GET PORT FROM ENVIRONMENT AND STORE IN EXPRESS
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// CREATE HTTP SERVER
var server = http.createServer(app);

// LISTEN ON PORT GIVEN, ALL NETWORK DEVICES
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// NORMALIZE PORT INTO A NUMBER, STRING, OR FALSE
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // NAMED PIPE
      return val;
    }
  
    if (port >= 0) {
      // PORT NUMBER
      return port;
    }
  
    // ELSE RETURN FALSE
    return false;
  }

// LISTEN FOR HTTP SERVER 'error' EVENT
function onError(error) {
    if (error.syscall !== 'listen') {
    throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // ERROR MESSAGES
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
 
// EVENT LISTENER FOR HTTP SERVER 'LISTENING' EVENT
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
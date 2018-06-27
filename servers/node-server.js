'use strict';

const debug = require('debug')('express-temp:server');
const http = require('http');
const chalk = require('chalk');
const portfinder = require('portfinder');

// Find a free port
portfinder.getPort((port) => {
    const server = http.createServer();
    
    server.listen(port, () => {
        onListening(server);
    });
    server.on('error', onError);
});

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log(`server is listening on ${chalk.green(bind)}`);
}
